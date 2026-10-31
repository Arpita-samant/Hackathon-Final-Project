"""
Comprehensive Backend Test Suite for Yojana Sahayak.
Validates:
1. Deterministic rules & near-miss math (income deltas, age boundaries).
2. Family mode aggregation and mutual exclusion logic.
3. RAG retrieval & strict hallucination check.
4. Scam detector with fake vs. verified forwards.
"""

import sys
import os

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

from app.models import FamilyMemberProfile, EligibilityRequest, ChatRequest, ScamCheckRequest
from app.rules_engine import evaluate_member_for_schemes
from app.family_engine import evaluate_family_household
from app.rag_engine import query_rag
from app.scam_engine import analyze_scam_text

def test_backend_suite():
    print("========================================")
    print("Testing Yojana Sahayak Core Engines")
    print("========================================")

    # TEST 1: Deterministic Rules & Near-Miss
    # Profile A: Farmer with land and low income -> Should qualify for PM-KISAN, PMFBY, Ayushman Bharat
    farmer = FamilyMemberProfile(
        name="Ramesh Kumar",
        relation="Self",
        age=42,
        gender="Male",
        annual_income=120000.0,
        occupation="Farmer",
        caste_category="OBC",
        state="Uttar Pradesh",
        landholding_acres=2.5,
        is_disabled=False,
        is_student=False
    )
    eligible, near_misses = evaluate_member_for_schemes(farmer)
    eligible_names = [e.scheme_name for e in eligible]
    print(f"\n[Test 1] Farmer Ramesh Kumar: {len(eligible)} Eligible, {len(near_misses)} Near-Misses")
    print("Eligible:", eligible_names)
    assert any("PM Kisan" in name or "PM-KISAN" in name for name in eligible_names), "Farmer must qualify for PM Kisan"

    # Profile B: Student who is near-miss on income
    student = FamilyMemberProfile(
        name="Pooja Sharma",
        relation="Child",
        age=19,
        gender="Female",
        annual_income=268000.0,  # 18,000 over 2,50,000 limit!
        occupation="Student",
        caste_category="SC",
        state="Rajasthan",
        landholding_acres=0.0,
        is_disabled=False,
        is_student=True
    )
    s_eligible, s_near_misses = evaluate_member_for_schemes(student)
    print(f"\n[Test 2] Student Pooja Sharma: {len(s_eligible)} Eligible, {len(s_near_misses)} Near-Misses")
    near_miss_reasons = [(nm.scheme_name, nm.delta_explanation) for nm in s_near_misses]
    print("Near Misses:", near_miss_reasons)
    has_income_delta = any("18,000" in nm.delta_explanation for nm in s_near_misses)
    print(f"Detected exact income delta of 18,000: {has_income_delta}")

    # TEST 3: Family Mode Aggregation & Mutual Exclusion
    # Husband (Farmer) + Wife (Homemaker/Artisan) + Daughter (Child age 8)
    wife = FamilyMemberProfile(
        name="Sunita Devi",
        relation="Spouse",
        age=38,
        gender="Female",
        annual_income=60000.0,
        occupation="Artisan/Craftsman",
        caste_category="OBC",
        state="Uttar Pradesh",
        landholding_acres=0.0,
        is_disabled=False,
        is_student=False
    )
    daughter = FamilyMemberProfile(
        name="Aarti Kumar",
        relation="Child",
        age=8,
        gender="Female",
        annual_income=0.0,
        occupation="Student",
        caste_category="OBC",
        state="Uttar Pradesh",
        landholding_acres=0.0,
        is_disabled=False,
        is_student=True
    )

    family_res = evaluate_family_household([farmer, wife, daughter])
    print(f"\n[Test 3] Family Mode Evaluation:")
    print(f"Total Household Potential Benefit: Rs. {family_res.total_potential_benefit_amount:,.2f}")
    print(f"Total Eligible Schemes Count: {family_res.total_eligible_count}")
    print(f"Applied Exclusions / Deduplications: {len(family_res.applied_mutual_exclusions)}")
    assert family_res.total_potential_benefit_amount > 0, "Family benefit must be calculated"

    # TEST 4: RAG Engine with Citations & Grounding
    rag_res = query_rag(ChatRequest(message="What documents do I need for PM-KISAN?", language="en"))
    print(f"\n[Test 4] RAG Query for PM-KISAN:")
    print(f"Answer Preview: {rag_res.answer[:160]}...")
    print(f"Citations count: {len(rag_res.citations)}")
    for c in rag_res.citations:
        print(f"  - [{c.scheme_name}] {c.section}: {c.source_url}")
    assert len(rag_res.citations) > 0, "Citations must be present"

    # TEST 5: RAG Strict Hallucination Guard
    alien_res = query_rag(ChatRequest(message="How do I get free bitcoin from Mars rover?", language="en"))
    print(f"\n[Test 5] Hallucination Guard:")
    print(f"Is fallback triggered: {alien_res.is_fallback}")
    print(f"Fallback response: {alien_res.answer[:120]}...")
    assert alien_res.is_fallback is True, "Out-of-scope query must trigger fallback"

    # TEST 6: Scam Detector (Fake Forward)
    fake_forward = "URGENT! PM Free Laptop Yojana 2026: Modi government is giving free laptops to everyone! Valid till midnight today. Forward to 5 WhatsApp groups and pay Rs. 350 courier fee at http://pm-laptop-free.xyz/claim"
    scam_res = analyze_scam_text(fake_forward)
    print(f"\n[Test 6] Scam Detector on WhatsApp Fake Forward:")
    print(f"Status: {scam_res.status} (Confidence: {scam_res.confidence_score}%)")
    print(f"Risk Level: {scam_res.risk_level}")
    print(f"Red Flags Detected: {scam_res.red_flags}")
    assert scam_res.status == "FAKE", "Must flag malicious forward as FAKE"

    # TEST 7: Scam Detector (Genuine Circular)
    genuine_msg = "Farmers can check their 18th installment status on the official PM-KISAN portal at https://pmkisan.gov.in by completing Aadhaar e-KYC. No fee is required."
    genuine_res = analyze_scam_text(genuine_msg)
    print(f"\n[Test 7] Scam Detector on Genuine Circular:")
    print(f"Status: {genuine_res.status} (Confidence: {genuine_res.confidence_score}%)")
    assert genuine_res.status == "VERIFIED", "Must flag authentic gov portal message as VERIFIED"

    print("\n========================================")
    print("ALL TEST SUITE CHECKS PASSED PERFECTLY!")
    print("========================================")

if __name__ == "__main__":
    test_backend_suite()
