"""
Deterministic Eligibility and Near-Miss Calculation Engine.
Evaluates individual and family demographic profiles mathematically without LLM hallucination.
"""

from typing import List, Dict, Any, Tuple
from app.models import FamilyMemberProfile, EligibleSchemeResult, NearMissResult
from app.schemes_data import SCHEMES_DB

def evaluate_member_for_schemes(member: FamilyMemberProfile) -> Tuple[List[EligibleSchemeResult], List[NearMissResult]]:
    eligible_list: List[EligibleSchemeResult] = []
    near_miss_list: List[NearMissResult] = []

    for scheme in SCHEMES_DB:
        rules = scheme.get("rules", {})
        scheme_id = scheme["id"]
        scheme_name = scheme["name"]
        scheme_name_hi = scheme["name_hi"]

        # Track failure reasons
        failures: List[Dict[str, Any]] = []

        # 1. Age Evaluation
        min_age = rules.get("min_age", 0)
        max_age = rules.get("max_age", 120)
        if member.age < min_age:
            age_diff_years = min_age - member.age
            months_left = age_diff_years * 12
            failures.append({
                "field": "age_min",
                "message": f"Minimum age required is {min_age} years, applicant is {member.age} years old.",
                "message_hi": f"न्यूनतम आयु {min_age} वर्ष आवश्यक है, आवेदक की आयु {member.age} वर्ष है।",
                "delta": f"Qualifies in {months_left} months (at age {min_age})",
                "delta_hi": f"{months_left} महीने बाद योग्य होंगे ({min_age} वर्ष की आयु में)",
                "actionable": f"Prepare required documentation (Aadhaar, Bank account) to apply as soon as member turns {min_age}.",
                "actionable_hi": f"आवश्यक दस्तावेज तैयार रखें ताकि सदस्य के {min_age} वर्ष का होते ही तुरंत आवेदन किया जा सके।",
                "current": member.age,
                "threshold": min_age,
                "is_near": age_diff_years <= 2  # within 2 years is near-miss
            })
        elif member.age > max_age:
            age_over = member.age - max_age
            failures.append({
                "field": "age_max",
                "message": f"Maximum age limit is {max_age} years, applicant is {member.age} years old.",
                "message_hi": f"अधिकतम आयु सीमा {max_age} वर्ष है, आवेदक की आयु {member.age} वर्ष है।",
                "delta": f"Exceeds age ceiling by {age_over} years",
                "delta_hi": f"आयु सीमा से {age_over} वर्ष अधिक",
                "actionable": "Explore alternative senior or adult welfare programs or consider if another family member qualifies.",
                "actionable_hi": "वैकल्पिक वरिष्ठ कल्याणकारी योजनाओं की जांच करें या परिवार के अन्य सदस्य के माध्यम से आवेदन पर विचार करें।",
                "current": member.age,
                "threshold": max_age,
                "is_near": age_over <= 3
            })

        # 2. Annual Income Evaluation
        max_income = rules.get("max_annual_income", float("inf"))
        if member.annual_income > max_income:
            income_excess = member.annual_income - max_income
            # near-miss if excess is <= 40% of max_income or <= 50,000
            is_near_income = (income_excess <= 0.40 * max_income) or (income_excess <= 50000)
            failures.append({
                "field": "income",
                "message": f"Annual income of Rs. {member.annual_income:,.0f} exceeds maximum threshold of Rs. {max_income:,.0f}.",
                "message_hi": f"वार्षिक आय {member.annual_income:,.0f} रुपये अधिकतम सीमा {max_income:,.0f} रुपये से अधिक है।",
                "delta": f"Over limit by Rs. {income_excess:,.0f}",
                "delta_hi": f"सीमा से {income_excess:,.0f} रुपये अधिक",
                "actionable": f"If net taxable or family disposable income after permissible deductions is within Rs. {max_income:,.0f}, verify official income certificate issued by competent authority (Tehsildar/Revenue Dept).",
                "actionable_hi": f"यदि मानक कटौतियों के बाद पारिवारिक शुद्ध आय {max_income:,.0f} रुपये के भीतर आती है, तो सक्षम राजस्व अधिकारी से आय प्रमाण पत्र सत्यापित करवाएं।",
                "current": member.annual_income,
                "threshold": max_income,
                "is_near": is_near_income
            })

        # 3. Gender Evaluation
        req_gender = rules.get("required_gender")
        if req_gender and member.gender != "Any" and member.gender != req_gender:
            failures.append({
                "field": "gender",
                "message": f"This scheme is exclusively reserved for {req_gender} beneficiaries.",
                "message_hi": f"यह योजना विशेष रूप से केवल {req_gender} लाभार्थियों के लिए आरक्षित है।",
                "delta": f"Requires {req_gender} beneficiary",
                "delta_hi": f"{req_gender} लाभार्थी होना आवश्यक है",
                "actionable": f"A female household member (spouse, mother, or daughter) can apply for this benefit under Family Mode.",
                "actionable_hi": "परिवार मोड के तहत परिवार की महिला सदस्य (पत्नी, माता या पुत्री) इस लाभ के लिए आवेदन कर सकती हैं।",
                "current": member.gender,
                "threshold": req_gender,
                "is_near": True  # Family member replacement is a prime recommendation
            })

        # 4. Occupation Evaluation
        req_occupations = rules.get("required_occupations", [])
        if req_occupations and len(req_occupations) > 0:
            if member.occupation not in req_occupations and member.occupation != "Other":
                failures.append({
                    "field": "occupation",
                    "message": f"Requires occupation in {', '.join(req_occupations)}. Applicant is listed as {member.occupation}.",
                    "message_hi": f"व्यवसाय {', '.join(req_occupations)} होना आवश्यक है। आवेदक का व्यवसाय {member.occupation} है।",
                    "delta": f"Expected: {', '.join(req_occupations)}",
                    "delta_hi": f"अपेक्षित व्यवसाय: {', '.join(req_occupations)}",
                    "actionable": f"If member engages in any allied agricultural, artisan, or vendor work, register trade via local authority or portal.",
                    "actionable_hi": "यदि सदस्य कृषि, कारीगरी या स्वरोजगार में संलग्न हैं, तो स्थानीय निकाय या पोर्टल पर पंजीकरण कराएं।",
                    "current": member.occupation,
                    "threshold": req_occupations,
                    "is_near": False
                })

        # 5. Landholding Evaluation
        requires_land = rules.get("requires_landholding", False)
        if requires_land:
            min_land = rules.get("min_land_acres", 0.0)
            max_land = rules.get("max_land_acres", float("inf"))
            if member.landholding_acres < min_land:
                failures.append({
                    "field": "landholding_min",
                    "message": f"Requires cultivable agricultural landholding (min {min_land} acres). Member declared {member.landholding_acres} acres.",
                    "message_hi": f"कृषि योग्य भूमि का स्वामित्व आवश्यक है (न्यूनतम {min_land} एकड़)।",
                    "delta": f"Needs agricultural land ownership title",
                    "delta_hi": f"कृषि भूमि स्वामित्व आवश्यक",
                    "actionable": "If land is jointly held or in hereditary transfer, ensure Record of Rights (Khata/RoR) is updated.",
                    "actionable_hi": "यदि भूमि संयुक्त खाते में है, तो जमाबंदी/खतौनी को अपने नाम पर अद्यतन कराएं।",
                    "current": member.landholding_acres,
                    "threshold": min_land,
                    "is_near": False
                })
            elif member.landholding_acres > max_land:
                land_excess = member.landholding_acres - max_land
                failures.append({
                    "field": "landholding_max",
                    "message": f"Exceeds ceiling for small/marginal farmer categorization ({max_land} acres).",
                    "message_hi": f"लघु एवं सीमांत किसान की अधिकतम भूमि सीमा ({max_land} एकड़) से अधिक है।",
                    "delta": f"Exceeds by {land_excess:.2f} acres",
                    "delta_hi": f"{land_excess:.2f} एकड़ अधिक",
                    "actionable": "Explore commercial agricultural credit or general institutional farmer subsidies.",
                    "actionable_hi": "व्यावसायिक कृषि ऋण या सामान्य संस्थागत किसान योजनाओं का लाभ उठाएं।",
                    "current": member.landholding_acres,
                    "threshold": max_land,
                    "is_near": land_excess <= 1.0
                })

        # 6. Caste Category Evaluation
        allowed_cats = rules.get("allowed_categories", ["General", "OBC", "SC", "ST", "EWS"])
        if member.caste_category not in allowed_cats:
            failures.append({
                "field": "category",
                "message": f"Scheme benefits reserved for {', '.join(allowed_cats)}. Applicant is {member.caste_category}.",
                "message_hi": f"योजना का लाभ केवल {', '.join(allowed_cats)} के लिए उपलब्ध है।",
                "delta": f"Target categories: {', '.join(allowed_cats)}",
                "delta_hi": f"लक्षित वर्ग: {', '.join(allowed_cats)}",
                "actionable": "Check general category Central Merit schemes or general education subsidy programs.",
                "actionable_hi": "सामान्य वर्ग की केंद्रीय मेरिट या सामान्य शिक्षा सब्सिडी योजनाओं की जांच करें।",
                "current": member.caste_category,
                "threshold": allowed_cats,
                "is_near": False
            })

        # 7. Student Status Evaluation
        if rules.get("is_student", False) and not member.is_student:
            failures.append({
                "field": "student",
                "message": "Must be an actively enrolled student in a recognized educational institution.",
                "message_hi": "मान्यता प्राप्त शैक्षणिक संस्थान में सक्रिय रूप से नामांकित विद्यार्थी होना अनिवार्य है।",
                "delta": "Enrolled student status required",
                "delta_hi": "विद्यार्थी नामांकन आवश्यक",
                "actionable": "Obtain bonafide certificate from educational institution upon enrollment.",
                "actionable_hi": "शैक्षणिक संस्थान में प्रवेश लेने पर अध्ययनरत प्रमाण पत्र प्राप्त करें।",
                "current": "Not student",
                "threshold": "Student",
                "is_near": member.age <= 28
            })

        # 8. Disability Status Evaluation
        if rules.get("is_disabled", False) and not member.is_disabled:
            failures.append({
                "field": "disability",
                "message": "Requires benchmark certified disability (>=40% or >=80% based on sub-clause).",
                "message_hi": "प्रमाणित दिव्यांगता (कम से कम 40% या 80%) होना आवश्यक है।",
                "delta": "Disability certificate (UDID) required",
                "delta_hi": "दिव्यांगता प्रमाण पत्र (यूडीआईडी) आवश्यक",
                "actionable": "Apply for Unique Disability ID (UDID) via Swavlamban portal if suffering from qualifying impairment.",
                "actionable_hi": "यदि संबंधित अक्षमता है तो स्वावलंबन पोर्टल के माध्यम से विशिष्ट दिव्यांगता पहचान पत्र (UDID) बनवाएं।",
                "current": "No disability recorded",
                "threshold": "UDID Certified",
                "is_near": False
            })

        # 9. LPG Connection Status Evaluation
        if "has_lpg_connection" in rules and rules["has_lpg_connection"] is False:
            if member.has_lpg_connection is True:
                failures.append({
                    "field": "lpg_connection",
                    "message": "Applicant household already possesses an active domestic LPG cylinder connection.",
                    "message_hi": "परिवार के पास पहले से सक्रिय घरेलू एलपीजी कनेक्शन मौजूद है।",
                    "delta": "Requires no prior LPG connection",
                    "delta_hi": "पूर्व में कोई गैस कनेक्शन न होना आवश्यक",
                    "actionable": "Existing connection holders can check for direct refill subsidies (DBTL / PAHAL) on existing consumer number.",
                    "actionable_hi": "मौजूदा उपभोक्ता अपने उपभोक्ता नंबर पर प्रत्यक्ष रिफिल सब्सिडी (डीबीटीएल/पहल) की जांच करें।",
                    "current": "Has LPG",
                    "threshold": "No prior LPG",
                    "is_near": False
                })

        # 10. Marital Status Evaluation (for widow pensions, etc.)
        req_marital = rules.get("marital_status")
        if req_marital and member.marital_status != req_marital:
            failures.append({
                "field": "marital_status",
                "message": f"Requires marital status '{req_marital}'. Applicant is '{member.marital_status}'.",
                "message_hi": f"वैवाहिक स्थिति '{req_marital}' होना आवश्यक है।",
                "delta": f"Target: {req_marital}",
                "delta_hi": f"अपेक्षित स्थिति: {req_marital}",
                "actionable": "Explore alternative general old age or disability social welfare schemes.",
                "actionable_hi": "वैकल्पिक सामान्य वृद्धावस्था या दिव्यांग कल्याणकारी योजनाओं की जांच करें।",
                "current": member.marital_status,
                "threshold": req_marital,
                "is_near": False
            })

        # RESULT DETERMINATION
        if len(failures) == 0:
            # 100% Eligible!
            why_en = f"Age {member.age} yrs meets criteria ({min_age}-{max_age} yrs); income Rs. {member.annual_income:,.0f} <= Rs. {max_income:,.0f}; occupation & demographic criteria verified."
            why_hi = f"आयु {member.age} वर्ष मानदंड ({min_age}-{max_age} वर्ष) में है; वार्षिक आय {member.annual_income:,.0f} रुपये सीमा {max_income:,.0f} रुपये से कम है; सभी पात्रता शर्तें पूर्ण हैं।"
            
            eligible_list.append(EligibleSchemeResult(
                scheme_id=scheme_id,
                scheme_name=scheme_name,
                scheme_name_hi=scheme_name_hi,
                ministry=scheme["ministry"],
                category=scheme["category"],
                description=scheme["description"],
                description_hi=scheme["description_hi"],
                max_benefit_amount=scheme["max_benefit_amount"],
                benefit_frequency=scheme["benefit_frequency"],
                direct_apply_url=scheme["direct_apply_url"],
                required_documents=scheme["required_documents"],
                matched_member=member.name,
                why_eligible=why_en,
                why_eligible_hi=why_hi
            ))
        elif len(failures) == 1 or all(f.get("is_near", False) for f in failures):
            # Qualified as a Near-Miss! (Only 1 primary blocker or near thresholds)
            primary_fail = failures[0]
            near_miss_list.append(NearMissResult(
                scheme_id=scheme_id,
                scheme_name=scheme_name,
                scheme_name_hi=scheme_name_hi,
                failed_criteria=primary_fail["field"],
                delta_explanation=primary_fail["delta"],
                delta_explanation_hi=primary_fail["delta_hi"],
                future_eligibility_timeline=primary_fail.get("delta") if "Qualifies in" in primary_fail.get("delta", "") else None,
                actionable_tip=primary_fail["actionable"],
                actionable_tip_hi=primary_fail["actionable_hi"],
                current_value=primary_fail["current"],
                threshold_value=primary_fail["threshold"],
                matched_member=member.name
            ))

    return eligible_list, near_miss_list
