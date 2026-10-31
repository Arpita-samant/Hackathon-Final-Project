"""
Fake Scheme & WhatsApp Forward Scam Detection Engine.
Analyzes viral forwards for phishing markers, urgency indicators, advance-fee fraud,
non-gov domain spoofing, and cross-references against verified scheme databases.
"""

import re
from typing import List, Dict, Any, Tuple
from app.models import ScamCheckRequest, ScamCheckResponse
from app.schemes_data import SCHEMES_DB

# Suspicious domain indicators
SUSPICIOUS_DOMAINS = [
    r"\.xyz\b", r"\.top\b", r"\.club\b", r"\.online\b", r"\.site\b", r"\.vip\b",
    r"\.live\b", r"\.tk\b", r"\.ml\b", r"\.ga\b", r"\.cf\b", r"\.gq\b",
    r"bit\.ly", r"tinyurl\.com", r"is\.gd", r"t\.me", r"wa\.me"
]

# Legitimate government domains
GOV_DOMAINS = [r"\.gov\.in\b", r"\.nic\.in\b", r"india\.gov\.in\b"]

# Red flag phrase dictionaries (English & Hindi)
RED_FLAGS_PATTERNS = [
    {
        "pattern": r"(forward to \d+|share with \d+|ग्रुप में भेजें|फॉरवर्ड करें|१० लोगों को भेजें)",
        "label": "Viral Chain Message Forwarding Trait",
        "label_hi": "संदेश को 5-10 ग्रुप में भेजने का दबाव (वायरल चेन स्कैम)",
        "weight": 25
    },
    {
        "pattern": r"(processing fee|registration fee|courier charge|charges? of rs\.?\s*\d+|शुल्क|रजिस्ट्रेशन फीस|₹\s*\d+\s*जमा करें)",
        "label": "Upfront Processing Fee / Advance-Fee Demand",
        "label_hi": "पंजीकरण शुल्क या कूरियर चार्ज की मांग (सरकारी योजनाएं कभी अग्रिम शुल्क नहीं मांगतीं)",
        "weight": 35
    },
    {
        "pattern": r"(last date today|only today|hurry|offer ends|valid till midnight|सीमित समय|आज रात १२ बजे तक|जल्दी करें)",
        "label": "Artificial Urgency & Deadline Pressure",
        "label_hi": "झूठी हड़बड़ी और कृत्रिम समय सीमा का दबाव",
        "weight": 20
    },
    {
        "pattern": r"(otp|bank pin|atm pin|cvv|password|ओटीपी साझा करें|पासवर्ड|खाता नंबर और पिन)",
        "label": "Confidential Banking / OTP Harvesting Request",
        "label_hi": "ओटीपी (OTP), पिन या गोपनीय बैंकिंग जानकारी की मांग",
        "weight": 40
    },
    {
        "pattern": r"(free smartphone|free laptop|free recharge|फ्री स्मार्टफोन|फ्री लैपटॉप|फ्री रिचार्ज|₹\s*1,00,000\s*खता में)",
        "label": "Unrealistic Free Gift / Cash Handout Promise",
        "label_hi": "अवास्तविक मुफ्त उपहार, मुफ्त रिचार्ज या सीधे नकद राशि का लालच",
        "weight": 25
    }
]

def analyze_scam_text(text: str) -> ScamCheckResponse:
    text_clean = text.strip()
    lowered = text_clean.lower()

    red_flags_detected: List[str] = []
    scam_score = 0

    # 1. Check for suspicious links
    has_suspicious_url = False
    has_gov_url = False

    for s_domain in SUSPICIOUS_DOMAINS:
        if re.search(s_domain, lowered):
            has_suspicious_url = True
            scam_score += 35
            red_flags_detected.append("Suspicious / Unofficial link domain detected (e.g., non-.gov.in link or shortener)")
            break

    for g_domain in GOV_DOMAINS:
        if re.search(g_domain, lowered):
            has_gov_url = True
            break

    # 2. Check for Red Flag Patterns
    for item in RED_FLAGS_PATTERNS:
        if re.search(item["pattern"], lowered, re.IGNORECASE):
            red_flags_detected.append(f"{item['label']} / {item['label_hi']}")
            scam_score += item["weight"]

    # 3. Check for Government Scheme Name Mentions
    matched_schemes: List[str] = []
    for s in SCHEMES_DB:
        s_name_parts = [
            s["id"].replace("_", " "),
            "kisan", "pm-kisan", "ayushman", "ujjwala", "sukanya",
            "awas", "pmay", "pension", "mudra", "vishwakarma", "svanidhi", "surya"
        ]
        for part in s_name_parts:
            if part in lowered:
                matched_schemes.append(s["name"])
                break

    matched_schemes = list(set(matched_schemes))

    # 4. Status Determination
    # If legitimate .gov.in URL is present and zero red flags -> VERIFIED
    if has_gov_url and not red_flags_detected:
        status = "VERIFIED"
        risk_level = "Safe"
        confidence = 95
        explanation = (
            "This message contains verified official government links (.gov.in / .nic.in) "
            "and does not ask for upfront money, OTPs, or chain forwards. It aligns with genuine public welfare announcements."
        )
        explanation_hi = (
            "यह संदेश आधिकारिक सरकारी डोमेन (.gov.in / .nic.in) से प्रमाणित प्रतीत होता है "
            "तथा इसमें किसी अग्रिम शुल्क, ओटीपी या चेन-फॉरवर्ड की मांग नहीं है।"
        )
        safe_guidance = "Always double check the browser address bar to ensure the URL ends strictly in .gov.in before inputting any details."
        safe_guidance_hi = "हमेशा सुनिश्चित करें कि वेबसाइट का वेब पता .gov.in या .nic.in पर ही समाप्त होता हो।"
        official_url = "https://www.india.gov.in"

    elif scam_score >= 35 or (has_suspicious_url and not has_gov_url):
        status = "FAKE"
        risk_level = "Severe Risk"
        confidence = min(98, 60 + scam_score)
        explanation = (
            f"HIGH RISK SCAM DETECTED: This message exhibits {len(red_flags_detected)} known fraudulent markers "
            "commonly found in phishing WhatsApp messages. Genuine Indian welfare schemes NEVER ask for money transfers, "
            "courier fees, or chain forwards, and authentic portals always reside on .gov.in or .nic.in domains."
        )
        explanation_hi = (
            f"सावधान! यह एक फर्जी (फेक) और धोखाधड़ी वाला संदेश है। इसमें {len(red_flags_detected)} संदिग्ध लक्षण पाए गए हैं। "
            "भारत सरकार की कोई भी योजना कभी भी पंजीकरण शुल्क, कूरियर चार्ज, या व्हाट्सएप ग्रुप में फॉरवर्ड करने के लिए नहीं कहती है।"
        )
        safe_guidance = "DO NOT click any links, DO NOT pay any registration fee, and DO NOT forward this to any groups. Report this message to 1930 (National Cyber Crime Helpline) or cybercrime.gov.in."
        safe_guidance_hi = "कृपया किसी लिंक पर क्लिक न करें, कोई शुल्क न दें और इसे फॉरवर्ड न करें। साइबर अपराध की शिकायत हेतु 1930 पर कॉल करें।"
        official_url = "https://cybercrime.gov.in"

    elif scam_score > 0:
        status = "SUSPICIOUS"
        risk_level = "Caution"
        confidence = 65
        explanation = (
            "POTENTIALLY SUSPICIOUS: This message contains exaggerated claims or urgent language. "
            "While it may reference genuine schemes, the details or forwarding format appear unverified."
        )
        explanation_hi = (
            "संदिग्ध संदेश: इसमें अतिशयोक्तिपूर्ण दावे या अनधिकृत भाषा का प्रयोग है। किसी भी जानकारी को सीधे आधिकारिक पोर्टल से जांचें।"
        )
        safe_guidance = "Cross-check this scheme on the National Portal (myScheme.gov.in) before acting on it."
        safe_guidance_hi = "कार्रवाई करने से पहले myScheme.gov.in या आधिकारिक सरकारी पोर्टल पर इसकी पुष्टि करें।"
        official_url = "https://www.myscheme.gov.in"

    else:
        # Generic inquiry or ambiguous text
        status = "SUSPICIOUS"
        risk_level = "Caution"
        confidence = 50
        explanation = "The input text is ambiguous or lacks official government attribution. No authorized circular matches this exact text."
        explanation_hi = "दिए गए विवरण में कोई आधिकारिक संदर्भ नहीं मिला है। कृपया आधिकारिक पोर्टल पर ही योजना की जांच करें।"
        safe_guidance = "Verify any scheme eligibility directly through Yojana Sahayak's questionnaire or myScheme.gov.in."
        safe_guidance_hi = "योजना सहायक के पात्रता फॉर्म या myScheme.gov.in के माध्यम से सीधे पात्रता की जांच करें।"
        official_url = "https://www.myscheme.gov.in"

    return ScamCheckResponse(
        status=status,
        confidence_score=confidence,
        risk_level=risk_level,
        matched_schemes=matched_schemes,
        red_flags=red_flags_detected,
        explanation=explanation,
        explanation_hi=explanation_hi,
        safe_guidance=safe_guidance,
        safe_guidance_hi=safe_guidance_hi,
        official_verification_url=official_url
    )
