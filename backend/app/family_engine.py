"""
Family-Level Aggregation & Mutual Exclusion Conflict Solver.
Combines multiple member evaluations, resolves conflicts, and aggregates household benefits.
"""

from typing import List, Dict, Any, Set
from app.models import (
    FamilyMemberProfile,
    FamilyEvaluationResponse,
    EligibleSchemeResult,
    NearMissResult
)
from app.rules_engine import evaluate_member_for_schemes
from app.schemes_data import SCHEMES_DB

def evaluate_family_household(members: List[FamilyMemberProfile]) -> FamilyEvaluationResponse:
    raw_eligible: List[EligibleSchemeResult] = []
    all_near_misses: List[NearMissResult] = []
    member_breakdown: Dict[str, Dict[str, Any]] = {}

    # Map of scheme_id to scheme metadata
    schemes_map = {s["id"]: s for s in SCHEMES_DB}

    # Step 1: Evaluate each member independently
    for member in members:
        mem_eligible, mem_near_miss = evaluate_member_for_schemes(member)
        raw_eligible.extend(mem_eligible)
        all_near_misses.extend(mem_near_miss)

        member_breakdown[member.name] = {
            "relation": member.relation,
            "age": member.age,
            "occupation": member.occupation,
            "eligible_schemes_count": len(mem_eligible),
            "near_miss_count": len(mem_near_miss),
            "eligible_scheme_names": [s.scheme_name for s in mem_eligible],
            "member_benefit_potential": sum(s.max_benefit_amount for s in mem_eligible)
        }

    # Step 2: Conflict & Mutual Exclusion Checker
    # 2a. Household Limit (e.g. max 1 PM-KISAN, max 1 PMAY per family)
    # 2b. Mutual Exclusions between different schemes
    scheme_counts_in_household: Dict[str, int] = {}
    accepted_scheme_ids: Set[str] = set()
    final_eligible: List[EligibleSchemeResult] = []
    applied_exclusions: List[Dict[str, str]] = []

    for item in raw_eligible:
        scheme_meta = schemes_map.get(item.scheme_id, {})
        rules = scheme_meta.get("rules", {})
        hh_limit = rules.get("household_limit", 99)
        current_count = scheme_counts_in_household.get(item.scheme_id, 0)

        # Check household quota
        if current_count >= hh_limit:
            applied_exclusions.append({
                "member": item.matched_member,
                "scheme_name": item.scheme_name,
                "reason": f"Household limit of {hh_limit} beneficiary per family reached for this scheme."
            })
            continue

        # Check mutual exclusion against already accepted schemes
        mut_excl = scheme_meta.get("mutually_exclusive_with", [])
        conflict_found = False
        for active_id in accepted_scheme_ids:
            if active_id in mut_excl:
                conflict_found = True
                active_name = schemes_map.get(active_id, {}).get("name", active_id)
                applied_exclusions.append({
                    "member": item.matched_member,
                    "scheme_name": item.scheme_name,
                    "reason": f"Mutually exclusive with '{active_name}' already claimed by household."
                })
                break

        if conflict_found:
            continue

        # Accept scheme for household
        final_eligible.append(item)
        accepted_scheme_ids.add(item.scheme_id)
        scheme_counts_in_household[item.scheme_id] = current_count + 1

    # Step 3: Total Household Benefit Calculation
    total_benefit = sum(item.max_benefit_amount for item in final_eligible)

    return FamilyEvaluationResponse(
        total_eligible_count=len(final_eligible),
        total_potential_benefit_amount=round(total_benefit, 2),
        eligible_schemes=final_eligible,
        near_misses=all_near_misses,
        member_breakdown=member_breakdown,
        applied_mutual_exclusions=applied_exclusions
    )
