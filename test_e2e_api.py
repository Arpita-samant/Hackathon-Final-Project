"""
Direct Route Integration Verification for Yojana Sahayak.
Calls the FastAPI route handlers directly with Pydantic request models,
verifies response schemas, database persistence, RAG Q&A, and scam engine.
"""

import sys
import os

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "backend"))

from app.main import (
    health_check,
    list_all_schemes,
    evaluate_eligibility,
    chat_assistant,
    verify_scam,
    save_family_profile,
    get_family_profile
)
from app.models import (
    FamilyMemberProfile,
    EligibilityRequest,
    ChatRequest,
    ScamCheckRequest
)
from app.database import SessionLocal

def test_routes():
    print("========================================================")
    print("Testing Yojana Sahayak Endpoints Directly")
    print("========================================================")

    # 1. Health check
    print("\n--- [1] GET /api/health ---")
    h = health_check()
    print("Health Status:", h["status"])
    print("Verified schemes:", h["total_verified_schemes"])
    assert h["status"] == "healthy"
    assert h["total_verified_schemes"] >= 16

    # 2. Scheme Directory
    print("\n--- [2] GET /api/schemes ---")
    s = list_all_schemes()
    print(f"Total schemes returned: {s['count']}")
    assert s["count"] >= 16

    # 3. Deterministic Eligibility & Near-Miss
    print("\n--- [3] POST /api/eligibility/evaluate ---")
    req = EligibilityRequest(
        family_members=[
            FamilyMemberProfile(
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
            ),
            FamilyMemberProfile(
                name="Pooja Sharma",
                relation="Child",
                age=19,
                gender="Female",
                annual_income=268000.0,
                occupation="Student",
                caste_category="SC",
                state="Uttar Pradesh",
                landholding_acres=0.0,
                is_disabled=False,
                is_student=True
            )
        ]
    )
    eval_res = evaluate_eligibility(req)
    print(f"Total Eligible Schemes: {eval_res.total_eligible_count}")
    print(f"Total Household Potential Benefit: Rs. {eval_res.total_potential_benefit_amount:,.2f}")
    print(f"Near-Miss Count: {len(eval_res.near_misses)}")
    assert eval_res.total_eligible_count > 0
    assert len(eval_res.near_misses) > 0

    # 4. Multilingual RAG Chatbot with Citations
    print("\n--- [4] POST /api/chat ---")
    chat_req = ChatRequest(
        message="What is the monthly pension amount under Atal Pension Yojana?",
        language="en",
        history=[]
    )
    chat_res = chat_assistant(chat_req)
    print("Answer snippet:", chat_res.answer[:160], "...")
    print(f"Citations count: {len(chat_res.citations)}")
    assert len(chat_res.citations) > 0

    # 5. WhatsApp Scam Detector
    print("\n--- [5] POST /api/scam-check ---")
    db = SessionLocal()
    scam_req = ScamCheckRequest(
        text_to_verify="URGENT! Modi government is giving free smartphone to all women! Click bit.ly/free-phone-modi and pay Rs. 199 registration fee immediately!"
    )
    scam_res = verify_scam(scam_req, db)
    print(f"Verdict: {scam_res.status} ({scam_res.risk_level}) - Confidence: {scam_res.confidence_score}%")
    print(f"Red Flags: {len(scam_res.red_flags)} detected")
    assert scam_res.status == "FAKE"

    # 6. Database Persistence: Save & Retrieve Family Profile
    print("\n--- [6] POST /api/family/save ---")
    save_res = save_family_profile(req, db)
    user_id = save_res["user_id"]
    print(f"Saved User ID: {user_id}")
    assert save_res["status"] == "success"

    print(f"\n--- [7] GET /api/family/{user_id} ---")
    fam_res = get_family_profile(user_id, db)
    print(f"Retrieved {len(fam_res['members'])} family members from database.")
    assert len(fam_res["members"]) == 2
    assert fam_res["latest_evaluation"] is not None

    db.close()

    print("\n========================================================")
    print(">>> ALL 7 END-TO-END APPLICATION CHECKS PASSED 100%! <<<")
    print("========================================================")

if __name__ == "__main__":
    test_routes()
