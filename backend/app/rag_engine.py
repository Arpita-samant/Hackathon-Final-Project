"""
Advanced Multilingual RAG Engine for Government Schemes - Yojana Sahayak.
Supports all 12 Indian languages, conversation context & follow-ups,
intent classification, structured multi-section response synthesis,
and dual indexing across official documents and verified scheme databases.
"""

import os
import re
import math
from typing import List, Dict, Any, Tuple, Optional
from pathlib import Path
from dotenv import load_dotenv

# Ensure .env is read dynamically
_base_dir = Path(__file__).resolve().parent.parent
if (_base_dir / ".env").exists():
    load_dotenv(_base_dir / ".env", override=False)
if (_base_dir.parent / ".env").exists():
    load_dotenv(_base_dir.parent / ".env", override=False)

from app.models import ChatRequest, ChatResponse, CitationItem
from knowledge.documents import SCHEME_DOCUMENTS
from app.schemes_data import SCHEMES_DB

def get_llm_keys():
    """Dynamically re-reads environment keys on every invocation."""
    gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY") or ""
    openai_key = os.getenv("OPENAI_API_KEY") or ""
    return gemini_key.strip(), openai_key.strip()

# ==============================================================================
# 1. MULTILINGUAL INDIAN LANGUAGE DETECTION
# ==============================================================================

LANGUAGE_NAMES = {
    "hi": "Hindi (हिन्दी)",
    "bn": "Bengali (বাংলা)",
    "te": "Telugu (తెలుగు)",
    "ta": "Tamil (தமிழ்)",
    "mr": "Marathi (मराठी)",
    "gu": "Gujarati (ગુજરાતી)",
    "kn": "Kannada (ಕನ್ನಡ)",
    "ml": "Malayalam (മലയാളം)",
    "pa": "Punjabi (ਪੰਜਾਬੀ)",
    "or": "Odia (ଓଡ଼ିଆ)",
    "as": "Assamese (অসমীয়া)",
    "en": "English"
}

def detect_indian_language(text: str) -> str:
    """
    Detects which of the 12 Indian languages a user query is written in.
    Returns: 'hi', 'bn', 'te', 'ta', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'en'
    """
    clean = text.strip()
    if not clean:
        return 'en'
    
    counts = {
        'devanagari': len(re.findall(r'[\u0900-\u097F]', clean)),
        'bengali_assamese': len(re.findall(r'[\u0980-\u09FF]', clean)),
        'gurmukhi': len(re.findall(r'[\u0A00-\u0A7F]', clean)),
        'gujarati': len(re.findall(r'[\u0A80-\u0AFF]', clean)),
        'odia': len(re.findall(r'[\u0B00-\u0B7F]', clean)),
        'tamil': len(re.findall(r'[\u0B80-\u0BFF]', clean)),
        'telugu': len(re.findall(r'[\u0C00-\u0C7F]', clean)),
        'kannada': len(re.findall(r'[\u0C80-\u0CFF]', clean)),
        'malayalam': len(re.findall(r'[\u0D00-\u0D7F]', clean)),
    }
    
    max_block = max(counts, key=counts.get)
    if counts[max_block] > 0:
        if max_block == 'devanagari':
            # Check distinctive Marathi words only (DO NOT include 'योजना' which is Hindi/Pan-Indian)
            marathi_distinctive = ['आहे', 'नाही', 'काय', 'कसे', 'मिळेल', 'शेतकरी', 'करावे', 'च्या', 'बद्दल', 'झाले', 'द्या']
            if any(m in clean for m in marathi_distinctive):
                return 'mr'
            return 'hi'
        elif max_block == 'bengali_assamese':
            if 'ৰ' in clean or 'ৱ' in clean or any(w in clean for w in ['আঁচনি', 'কেনেদৰে', 'পাম', 'চৰকাৰী', 'লাগে']):
                return 'as'
            return 'bn'
        elif max_block == 'gurmukhi':
            return 'pa'
        elif max_block == 'gujarati':
            return 'gu'
        elif max_block == 'odia':
            return 'or'
        elif max_block == 'tamil':
            return 'ta'
        elif max_block == 'telugu':
            return 'te'
        elif max_block == 'kannada':
            return 'kn'
        elif max_block == 'malayalam':
            return 'ml'
    
    return 'en'

# ==============================================================================
# 2. CONVERSATION CONTEXT & FOLLOW-UP RESOLUTION
# ==============================================================================

KNOWN_SCHEME_IDENTIFIERS = [
    ("pm-kisan", ["pm kisan", "kisan", "pm-kisan", "किसान सम्मान", "किसान", "पीएम किसान", "কৃষক", "రైతు", "ಕಿಸಾನ್"]),
    ("ayushman bharat", ["ayushman", "pmjay", "jan arogya", "आयुष्मान", "health card", "இலாஜ்", "వైద్య"]),
    ("pmay", ["pmay", "awas", "housing", "आवास", "pm awas", "ঘর", "வீடு", "మನೆ"]),
    ("pm ujjwala", ["ujjwala", "gas", "lpg", "cylinder", "उज्ज्वला", "गैस"]),
    ("sukanya samriddhi", ["sukanya", "ssy", "sukanya samriddhi", "सुकन्या", "बेटी"]),
    ("atal pension", ["atal pension", "apy", "pension", "अटल पेंशन", "पेंशन", "ஓய்வூதியம்"]),
    ("pm vishwakarma", ["vishwakarma", "artisan", "craftsman", "विश्वकर्मा", "कारीगर"]),
    ("pm svanidhi", ["svanidhi", "street vendor", "vendor", "स्वनिधि", "रेहड़ी"]),
    ("national scholarship", ["scholarship", "nsp", "post-matric", "छात्रवृत्ति", "स्कॉलरशिप", "विद्यार्थी"]),
    ("pm mudra", ["mudra", "mudra loan", "shishu", "kishore", "tarun", "मुद्रा", "कर्ज", "ऋण"]),
    ("pm surya ghar", ["surya ghar", "solar", "rooftop solar", "सूर्य घर", "बिजली", "सौर"]),
    ("pmfby", ["fasal bima", "crop insurance", "pmfby", "फसल बीमा"]),
    ("uttarakhand swarojgar", ["uttarakhand", "uk swarojgar", "msy", "उत्तराखंड", "स्वरोजगार"]),
    ("gaura devi", ["gaura devi", "kanya dhan", "गौरा देवी", "कन्या धन"]),
    ("mgnrega", ["mgnrega", "nrega", "100 days", "मनरेगा", "रोजगार"])
]

FOLLOW_UP_INDICATORS = [
    "what about documents", "documents required", "required documents", "what documents",
    "how to apply", "how can i apply", "apply process", "application process",
    "who is eligible", "eligibility", "eligibility criteria", "am i eligible",
    "what benefits", "benefits", "what are the benefits", "how much money",
    "application status", "check status", "track status", "official link", "portal",
    "दस्तावेज", "पात्रता", "आवेदन", "लाभ", "स्थिति", "कागजात", "लिंक"
]

def resolve_contextual_query(query: str, history: Optional[List[Any]] = None) -> Tuple[str, Optional[str]]:
    """
    If the user query is a follow-up or incomplete question, inspect previous turns in
    conversation history to carry over the active scheme topic.
    """
    clean_q = query.strip()
    q_lower = clean_q.lower()

    # Check if query already names a specific scheme explicitly
    for scheme_key, aliases in KNOWN_SCHEME_IDENTIFIERS:
        if any(alias in q_lower for alias in aliases):
            return clean_q, scheme_key

    # Check if it looks like a follow-up question
    is_follow_up = any(fi in q_lower for fi in FOLLOW_UP_INDICATORS) or len(clean_q.split()) <= 4

    if is_follow_up and history and len(history) > 0:
        # Scan recent history messages backwards
        for item in reversed(history[-6:]):
            text = ""
            if isinstance(item, dict):
                text = (item.get("content") or item.get("text") or "").lower()
            elif hasattr(item, "content"):
                text = getattr(item, "content", "").lower()
            elif hasattr(item, "text"):
                text = getattr(item, "text", "").lower()

            for scheme_key, aliases in KNOWN_SCHEME_IDENTIFIERS:
                if any(alias in text for alias in aliases):
                    augmented_query = f"{scheme_key} {clean_q}"
                    return augmented_query, scheme_key

    return clean_q, None

# ==============================================================================
# 3. DUAL-SOURCE VECTOR RETRIEVER (DOCUMENTS + SCHEMES_DB)
# ==============================================================================

class DocumentChunk:
    def __init__(self, chunk_id: str, scheme_name: str, section_title: str, content: str, source_url: str, category: str = "", state: str = "All-India", extra_keywords: str = ""):
        self.chunk_id = chunk_id
        self.scheme_name = scheme_name
        self.section_title = section_title
        self.content = content
        self.source_url = source_url
        self.category = category
        self.state = state
        self.tokens = self._tokenize(content + " " + scheme_name + " " + section_title + " " + category + " " + state + " " + extra_keywords)

    @staticmethod
    def _tokenize(text: str) -> List[str]:
        clean = re.sub(r"[^\w\s]", " ", text.lower())
        words = clean.split()
        stopwords = {"the", "is", "at", "which", "on", "and", "a", "an", "in", "to", "for", "of", "with", "as", "by", "or", "from", "are", "can", "how", "what", "who", "की", "का", "के", "में", "से", "को", "है"}
        return [w for w in words if len(w) >= 2 and w not in stopwords]

class VectorRetriever:
    def __init__(self):
        self.chunks: List[DocumentChunk] = []
        self._build_index()

    def _build_index(self):
        chunk_idx = 0

        # Source 1: Detailed narrative documents from SCHEME_DOCUMENTS (28 documents)
        for doc in SCHEME_DOCUMENTS:
            scheme_name = doc["scheme_name"]
            source_url = doc.get("source_url", "https://www.myscheme.gov.in")
            for sec in doc.get("sections", []):
                chunk_id = f"doc_{doc['doc_id']}_c{chunk_idx}"
                chunk = DocumentChunk(
                    chunk_id=chunk_id,
                    scheme_name=scheme_name,
                    section_title=sec["section_title"],
                    content=sec["content"],
                    source_url=source_url
                )
                self.chunks.append(chunk)
                chunk_idx += 1

        # Source 2: Verified structured specifications from SCHEMES_DB (21 database schemes)
        for s in SCHEMES_DB:
            s_name = s.get("name", "Government Scheme")
            s_name_hi = s.get("name_hi", "")
            s_url = s.get("direct_apply_url") or s.get("source_portal_url") or "https://www.myscheme.gov.in"
            s_cat = s.get("category", "")
            s_state = s.get("state", "All-India")

            # Chunk A: Benefits & Overview
            benefits_text = " ".join(s.get("key_benefits", []))
            overview_content = f"{s.get('description', '')} {s.get('description_hi', '')} Max financial benefit: Rs. {s.get('max_benefit_amount', 0):,.0f} ({s.get('benefit_frequency', 'yearly')}). Key Benefits: {benefits_text}"
            self.chunks.append(DocumentChunk(
                chunk_id=f"db_{s['id']}_overview",
                scheme_name=s_name,
                section_title="Overview & Key Benefits",
                content=overview_content,
                source_url=s_url,
                category=s_cat,
                state=s_state,
                extra_keywords=s_name_hi
            ))

            # Chunk B: Eligibility & Documents
            eligibility_text = " ".join(s.get("eligibility_criteria_bullets", []))
            docs_text = ", ".join(s.get("required_documents", []))
            excl_text = ", ".join(s.get("exclusion_criteria", []))
            elig_content = f"Eligibility Criteria: {eligibility_text} Required Documents: {docs_text}. Exclusions: {excl_text}."
            self.chunks.append(DocumentChunk(
                chunk_id=f"db_{s['id']}_eligibility",
                scheme_name=s_name,
                section_title="Eligibility & Required Documents",
                content=elig_content,
                source_url=s_url,
                category=s_cat,
                state=s_state,
                extra_keywords=s_name_hi
            ))
            chunk_idx += 2

    def search(self, query: str, top_k: int = 4) -> List[Tuple[DocumentChunk, float]]:
        q_tokens = DocumentChunk._tokenize(query)
        if not q_tokens:
            return []

        q_lower = query.lower()
        scored_chunks: List[Tuple[DocumentChunk, float]] = []
        q_freq: Dict[str, int] = {}
        for t in q_tokens:
            q_freq[t] = q_freq.get(t, 0) + 1

        # Comprehensive multilingual category intent detection
        is_women_query = any(w in q_lower for w in [
            "women", "woman", "girl", "female", "mahila", "beti", "widow",
            "महिला", "लड़की", "बेटी", "विधवा", "नारी",
            "মহিলা", "মেয়ে", "বিধবা",
            "మహిళ", "స్త్రీ", "అమ్మాయి",
            "பெண்", "மகளிர்",
            "स्त्री", "मुलगी",
            "મહિલા", "દીકરી",
            "ಮಹಿಳೆ", "ಹೆಣ್ಣು",
            "സ്ത്രീ", "പെൺകുട്ടി",
            "ਔਰਤ", "ਕੁੜੀ",
            "ମହିଳା", "ଝିଅ",
            "মহিলা", "ছোৱালী"
        ])

        is_student_query = any(w in q_lower for w in [
            "student", "students", "scholarship", "scholarships", "education", "study", "college", "school",
            "छात्र", "विद्यार्थी", "छात्रवृत्ति", "स्कॉलरशिप", "पढ़ाई", "कॉलेज",
            "ছাত্র", "শিক্ষার্থী", "স্কলারশিপ", "বৃত্তি",
            "విద్యార్థి", "స్కాలర్‌షిప్",
            "மாணவர்", "கல்வி", "உதவித்தொகை",
            "विद्यार्थी", "शिष्यवृत्ती",
            "વિદ્યાર્થી", "શિષ્યવૃત્તિ",
            "ವಿದ್ಯಾರ್ಥಿ", "ಶಿಷ್ಯವೇತನ",
            "വിദ്യാർത്ഥി", "സ്കോളർഷിപ്പ്",
            "ਵਿਦਿਆਰਥੀ", "ਵਜ਼ੀਫ਼ਾ",
            "ଛାତ୍ର", "ବୃତ୍ତି",
            "ছাত্ৰ", "বৃত্তি"
        ])

        is_farmer_query = any(w in q_lower for w in [
            "farmer", "farmers", "agriculture", "kisan", "crop", "cultivator", "tractor",
            "किसान", "खेती", "कृषि", "फसल", "खाद", "ट्रैक्टर",
            "কৃষক", "কৃষি", "চাষী",
            "రైతు", "వ్యవసాయం",
            "விவசாயி", "விவசாயம்",
            "शेतकरी", "शेती",
            "ખેડૂત", "ખેતી",
            "ರೈತ", "ಕೃಷಿ",
            "കർഷകൻ", "കൃഷി",
            "ਕਿਸਾਨ", "ਖੇਤੀਬਾੜੀ",
            "କୃଷକ", "ଚାଷୀ",
            "কৃষক", "খেতি"
        ])

        is_pension_query = any(w in q_lower for w in [
            "pension", "old age", "senior citizen", "widow pension", "disability",
            "पेंशन", "वृद्धावस्था", "दिव्यांग", "बुजुर्ग",
            "পেনশন", "বার্ধক্য",
            "పెన్షన్", "వృద్ధాప్య",
            "ஓய்வூதியம்", "முதியோர்",
            "पेन्शन", "वृद्ध",
            "પેન્શન", "વૃદ્ધ",
            "ಪಿಂಚಣಿ", "ವೃದ್ಧಾಪ್ಯ",
            "പെൻഷൻ", "വാർദ്ധക്യം",
            "ਪੈਨਸ਼ਨ", "ਬੁਢਾਪਾ",
            "ପେନସନ", "ବାର୍ଦ୍ଧକ୍ୟ",
            "পেনচন", "বৃদ্ধ"
        ])

        is_uk_query = any(w in q_lower for w in [
            "uttarakhand", "uttaranchal", "uk ", "उत्तराखंड", "उत्तरांचल", "देहरादून", "गौरा देवी", "apuni sarkar"
        ])

        is_status_query = any(w in q_lower for w in [
            "status", "check status", "track", "application status", "installment status", "dbt",
            "स्थिति", "जांच", "चेक", "किस्त", "पैसा",
            "স্ট্যাটাস", "অবস্থা",
            "పరిస్థితి", "స్థితి",
            "நிலை",
            "तपासणी",
            "સ્થિતિ",
            "ಸ್ಥಿತಿ",
            "നില",
            "ਸਥਿਤੀ",
            "ସ୍ଥିତି",
            "স্থিতি"
        ])

        is_docs_query = any(w in q_lower for w in [
            "document", "documents", "paper", "papers", "certificate", "दस्तावेज", "कागजात", "प्रमाण पत्र", "নথিপত্র", "పత్రాలు", "ஆவணங்கள்", "ದಾಖಲೆಗಳು"
        ])

        is_apply_query = any(w in q_lower for w in [
            "apply", "application", "how to apply", "register", "enroll", "आवेदन", "फॉर्म", "পঞ্জীকরণ", "దరఖాస్తు", "விண்ணப்பம்", "ಅರ್ಜಿ"
        ])

        # Comprehensive multilingual scheme alias mapping across all 12 languages
        scheme_intent_boosts = [
            # PM-KISAN
            ([
                "pm-kisan", "pmkisan", "pm kisan", "kisan", "किसान", "पीएम किसान",
                "কিষাণ", "কিসান", "কৃষক", "రైతు", "కిసాన్", "ಶेतકરી", "ಕಿಸಾನ್",
                "കർഷക", "ਕਿਸਾਨ", "କିଷାନ", "কৃষক"
            ], "pm-kisan"),
            # Ayushman Bharat
            ([
                "ayushman", "pmjay", "jan arogya", "आयुष्मान", "स्वास्थ्य", "इलाज",
                "আয়ুষ্মান", "ஆயுஷ்மான்", "ఆయుష్మాన్", "આયુષ્માન", "ಆಯುಷ್ಮಾನ್",
                "ആയുഷ്മാൻ", "ਆਯੁਸ਼ਮਾਨ", "ସ୍ୱାସ୍ଥ୍ୟ", "স্বাস্থ্য", "వైద్య"
            ], "ayushman"),
            # PMAY Housing
            ([
                "pmay", "awas", "housing", "आवास", "घर", "मकान", "pucca",
                "আবাস", "வீடு", "గృహ", "આવાસ", "ಮನೆ", "ഭവന", "ਮਕਾਨ", "ହାଉସିଂ", "ঘর"
            ], "pmay"),
            # PM Ujjwala
            ([
                "ujjwala", "gas", "lpg", "cylinder", "उज्ज्वला", "गैस", "सिलेंडर",
                "উজ্জ্বলা", "உஜ்வாலா", "ఉజ్వల", "ઉજ્જ્વલા", "ಉಜ್ವಲ", "ഉജ്ജ്വല", "ਉੱਜਵਲਾ", "ଉଜ୍ଜ୍ୱଳା"
            ], "ujjwala"),
            # Sukanya Samriddhi
            ([
                "sukanya", "ssy", "सुकन्या", "सुकन्या समृद्धि", "बेटी",
                "সুকন্যা", "சுகன்யா", "సుకన్య", "સુકન્યા", "ಸುಕನ್ಯಾ", "സുകന്യ", "ਸੁਕੰਨਿਆ", "ସୁକନ୍ୟା"
            ], "sukanya"),
            # Mudra Loan
            ([
                "mudra", "mudra loan", "shishu", "kishore", "tarun", "मुद्रा", "कर्ज", "ऋण",
                "মুদ্রা", "முத்ரா", "ముద్ర", "મુદ્રા", "ಮುದ್ರಾ", "മുദ്ര", "ਮੁਦਰਾ", "ମୁଦ୍ରା"
            ], "mudra"),
            # PM Vishwakarma
            ([
                "vishwakarma", "artisan", "craftsman", "विश्वकर्मा", "कारीगर", "टूलकिट",
                "বিশ্বকর্মা", "விஸ்வகர்மா", "విశ్వకర్మ", "વિશ્વકર્મા", "ವಿಶ್ವಕರ್ಮ", "വിശ്വകർമ്മ"
            ], "vishwakarma"),
            # PM SVANidhi
            ([
                "svanidhi", "street vendor", "vendor", "स्वनिधि", "रेहड़ी", "पटरी", "ठेला",
                "স্বনিধি", "ஸ்வநிதி", "స్వనిధి", "સ્વનિધિ", "ಸ್ವನಿಧಿ", "സ്വനിധി"
            ], "svanidhi"),
            # PM Surya Ghar
            ([
                "surya ghar", "solar", "rooftop solar", "सूर्य घर", "सौर ऊर्जा", "सोलर", "बिजली",
                "সৌর", "சூரிய", "సౌర", "સોલાર", "ಸೌರ", "സൗരോർജ്ജം"
            ], "surya ghar"),
            # PMFBY Crop Insurance
            ([
                "fasal bima", "crop insurance", "pmfby", "फसल बीमा", "फसल नुकसान",
                "শস্য বীমা", "பயிர் காப்பீடு", "పంట బీమా", "પાક વીમો", "ಬೆಳೆ ವಿಮೆ"
            ], "pmfby"),
            # Uttarakhand Swarojgar
            ([
                "uttarakhand swarojgar", "uk swarojgar", "msy", "उत्तराखंड स्वरोजगार", "मुख्यमंत्री स्वरोजगार"
            ], "swarojgar"),
            # Uttarakhand Gaura Devi
            ([
                "gaura devi", "kanya dhan", "गौरा देवी", "कन्या धन", "गौरा देवी कन्या धन"
            ], "gaura devi"),
            # Uttarakhand Solar
            ([
                "uttarakhand solar", "ureda", "उत्तराखंड सोलर", "सोलर स्वरोजगार"
            ], "solar swarojgar"),
            # MGNREGA
            ([
                "mgnrega", "nrega", "100 days", "मनरेगा", "नरेगा", "100 दिन", "జాబ్ కార్డు"
            ], "mgnrega"),
            # Atal Pension / NSAP
            ([
                "atal pension", "apy", "अटल पेंशन", "वृद्धावस्था पेंशन", "vidhwa pension", "विधवा पेंशन", "दिव्यांग पेंशन"
            ], "pension")
        ]

        for chunk in self.chunks:
            chunk_tokens = chunk.tokens
            c_freq: Dict[str, int] = {}
            for t in chunk_tokens:
                c_freq[t] = c_freq.get(t, 0) + 1

            score = 0.0
            for token, count in q_freq.items():
                if token in c_freq:
                    scheme_boost = 3.5 if token in chunk.scheme_name.lower() else 1.0
                    tf = c_freq[token] / max(len(chunk_tokens), 1)
                    score += (tf * scheme_boost * count)

            c_name_lower = chunk.scheme_name.lower()
            c_sec_lower = chunk.section_title.lower()

            # Boost specific category matching
            if is_women_query and any(wk in c_name_lower for wk in ["women", "sukanya", "ujjwala", "pragati", "lakhpati", "gaura devi", "matru"]):
                score += 10.0
            if is_student_query and any(sk in c_name_lower for sk in ["scholarship", "student", "matric", "pragati", "ecss", "vidyasaarathi"]):
                score += 10.0
            if is_farmer_query and any(fk in c_name_lower for fk in ["kisan", "farmer", "agriculture", "fasal", "smam", "machinery"]):
                score += 10.0
            if is_pension_query and any(pk in c_name_lower for pk in ["pension", "atal", "nsap", "vridhavastha"]):
                score += 10.0
            if is_uk_query and ("uttarakhand" in c_name_lower or "uttarakhand" in chunk.state.lower()):
                score += 12.0
            if is_status_query and "status" in c_name_lower:
                score += 15.0
            if is_docs_query and "document" in c_sec_lower:
                score += 5.0
            if is_apply_query and ("application" in c_sec_lower or "apply" in c_sec_lower or "portal" in c_sec_lower):
                score += 5.0

            # Scheme Keyword Intent Mapping across all 12 languages
            for aliases, target in scheme_intent_boosts:
                if any(al in q_lower for al in aliases) and target in c_name_lower:
                    score += 8.0

            if score > 0:
                scored_chunks.append((chunk, score))

        scored_chunks.sort(key=lambda x: x[1], reverse=True)
        return scored_chunks[:top_k]

# Global vector retriever instance
retriever = VectorRetriever()

# ==============================================================================
# 4. MULTILINGUAL RESPONSES & STRUCTURED SYNTHESIS
# ==============================================================================

MULTILINGUAL_GREETINGS = {
    "en": "Hello! I am your AI Yojana Sahayak. 🇮🇳\n\nYou can ask me about any Central or State Government welfare scheme (such as PM-KISAN, Ayushman Bharat, PMAY Housing, National Scholarships, Mudra Business Loans, or Sukanya Samriddhi) to check eligibility, benefits, required documents, and official application portals.\n\n💡 *Speak or type in any of the 12 Indian languages.*",
    "hi": "नमस्ते! मैं आपका योजना सहायक हूँ। 🇮🇳\n\nआप मुझसे भारत सरकार और राज्य सरकारों की किसी भी प्रमुख योजना (जैसे पीएम-किसान, आयुष्मान भारत, पीएम आवास, राष्ट्रीय छात्रवृत्ति, मुद्रा लोन, सुकन्या समृद्धि या उज्ज्वला योजना) की पात्रता, लाभ, आवेदन प्रक्रिया और आवश्यक दस्तावेजों के बारे में पूछ सकते हैं।\n\n💡 *आप किसी भी भाषा में बोलकर या लिखकर प्रश्न पूछ सकते हैं।*",
    "bn": "নমস্কার! আমি আপনার এআই যোজনা সহায়ক। 🇮🇳\n\nআপনি কেন্দ্রীয় ও রাজ্য সরকারের যেকোনো কল্যাণমূলক প্রকল্প (যেমন পিএম-কিষাণ, আয়ুষ্মান ভারত, পিএম আবাস, জাতীয় স্কলারশিপ, মুদ্রা ঋণ ইত্যাদি) সম্পর্কে যোগ্যতা, সুবিধা এবং আবেদন প্রক্রিয়া জানতে পারেন।\n\n💡 *যেকোনো ভাষায় প্রশ্ন জিজ্ঞাসা করুন।*",
    "te": "నమస్కారం! నేను మీ యోజన సహాయక్. 🇮🇳\n\nకేంద్ర, రాష్ట్ర ప్రభుత్వాల సంక్షేమ పథకాలు (పీఎం-కిసాన్, ఆయుష్మాన్ భారత్, పీఎం ఆవాస్, ముద్ర లోన్లు, సుకన్య సమృద్ధి) అర్హతలు, ప్రయోజనాలు, దరఖాస్తు విధానం గురించి నన్ను అడగవచ్చు.\n\n💡 *ఏదైనా భాషలో మాట్లాడండి లేదా టైప్ చేయండి.*",
    "ta": "வணக்கம்! நான் உங்கள் யோஜனா சகாயக். 🇮🇳\n\nமத்திய மற்றும் மாநில அரசு நலத்திட்டங்கள் (பிஎம்-கிசான், ஆயுஷ்மான் பாரத், பிஎம் ஆவாஸ், முத்ரா கடன், சுகன்யா சம்ரித்தி) பற்றிய தகுதி, பலன்கள், விண்ணப்பிக்கும் நடைமுறைகளை நீங்கள் என்னிடம் கேட்கலாம்.\n\n💡 *எந்த மொழியிலும் பேசலாம் அல்லது தட்டச்சு செய்யலாம்.*",
    "mr": "नमस्कार! मी आपला योजना सहायक आहे. 🇮🇳\n\nतुम्ही केंद्र आणि राज्य सरकारच्या कोणत्याही कल्याणकारी योजनेबद्दल (जसे की पीएम-किसान, आयुष्मान भारत, पीएम आवास, मुद्रा कर्ज, सुकन्या समृद्धी) पात्रता, लाभ आणि अर्जाची माहिती विचारू शकता.\n\n💡 *कोणत्याही भाषेत बोला किंवा लिहा.*",
    "gu": "નમસ્તે! હું તમારો યોજના સહાયક છું. 🇮🇳\n\nતમે કેન્દ્ર અને રાજ્ય સરકારની કોઈપણ કલ્યાણકારી યોજનાઓ (જેમ કે પીએમ-કિસાન, આયુષ્માન ભારત, પીએમ આવાસ, મુદ્રા લોન) ની પાત્રતા, લાભો અને અરજી પ્રક્રિયા વિશે પૂછી શકો છો.\n\n💡 *કોઈપણ ભાષામાં બોલો અથવા ટાઈપ કરો.*",
    "kn": "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಯೋಜನಾ ಸಹಾಯಕ. 🇮🇳\n\nಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಸರ್ಕಾರದ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳಾದ (ಪಿಎಂ-ಕಿಸಾನ್, ಆಯುಷ್ಮಾನ್ ಭಾರತ್, ಪಿಎಂ ಆವಾಸ್, ಮುದ್ರಾ ಸಾಲ) ಅರ್ಹತೆ, ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಅರ್ಜಿ ವಿಧಾನದ ಬಗ್ಗೆ ನೀವು ನನ್ನನ್ನು ಕೇಳಬಹುದು.\n\n💡 *ಯಾವುದೇ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ.*",
    "ml": "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ യോജന സഹായക്. 🇮🇳\n\nകേന്ദ്ര-സംസ്ഥാന സർക്കാരുകളുടെ ക്ഷേമപദ്ധതികളെക്കുറിച്ച് (പിഎം-കിസാൻ, ആയുഷ്മാൻ ഭാരത്, പിഎം ആവാസ്, മുദ്ര വായ്പ) യോഗ്യതയും ആനുകൂല്യങ്ങളും അപേക്ഷാരീതിയും നിങ്ങൾക്ക് എന്നോട് ചോദിക്കാം.\n\n💡 *ഏതു ഭാഷയിലും സംസാരിക്കാം.*",
    "pa": "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਯੋਜਨਾ ਸਹਾਇਕ ਹਾਂ। 🇮🇳\n\nਤੁਸੀਂ ਕੇਂਦਰ ਅਤੇ ਰਾਜ ਸਰਕਾਰ ਦੀਆਂ ਭਲਾਈ ਸਕੀਮਾਂ (ਜਿਵੇਂ ਪੀਐਮ-ਕਿਸਾਨ, ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ, ਪੀਐਮ ਆਵਾਸ, ਮੁਦਰਾ ਲੋਨ) ਦੀ ਯੋਗਤਾ, ਲਾਭ ਅਤੇ ਅਰਜ਼ੀ ਦੇ ਤਰੀਕੇ ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ।\n\n💡 *ਕਿਸੇ ਵੀ ਭਾਸ਼ਾ ਵਿੱਚ ਬੋਲੋ ਜਾਂ ਲਿਖੋ।*",
    "or": "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କ ଯୋଜନା ସହାୟକ। 🇮🇳\n\nଆପଣ କେନ୍ଦ୍ର ଓ ରାଜ୍ୟ ସରକାରଙ୍କ ବିଭିନ୍ନ କଲ୍ୟାଣକାରୀ ଯୋଜନା (ଯେପରିକି ପିଏମ୍-କିଷାନ, ଆୟୁଷ୍ମାନ ଭାରତ, ପିଏମ୍ ଆବାସ, ମୁଦ୍ରା ଋଣ) ବିଷୟରେ ଯୋଗ୍ୟତା, ଲାଭ ଓ ଆବେଦନ ପ୍ରକ୍ରିୟା ପଚାରିପାରିବେ।\n\n💡 *ଯେକୌଣସି ଭାଷାରେ କୁହନ୍ତୁ ବା ଲେଖନ୍ତୁ।*",
    "as": "নমস্কাৰ! মই আপোনাৰ যোজনা সহায়ক। 🇮🇳\n\nআপুনি কেন্দ্ৰীয় আৰু ৰাজ্য চৰকাৰৰ আঁচনিসমূহ (যেনে পিএম-কিষাণ, আয়ুষ্মান ভাৰত, পিএম আৱাস, মুদ্ৰা ঋণ) সম্পৰ্কে যোগ্যতা, লাভালাভ আৰু আবেদন প্ৰক্ৰিয়া সুধিব পাৰে।\n\n💡 *যিকোনো ভাষাত কথা পাতক বা লিখক।*"
}

MULTILINGUAL_FALLBACKS = {
    "en": "I could not find a verified government scheme matching your query. Yojana Sahayak grounds answers exclusively in verified central and state welfare notifications. Please ask about a specific government scheme (such as PM-KISAN, Ayushman Bharat, PMAY Housing, National Scholarships, or Uttarakhand Schemes) or check https://www.myscheme.gov.in.",
    "hi": "सत्यापित सरकारी योजना दस्तावेजों में इसके लिए कोई आधिकारिक जानकारी उपलब्ध नहीं है। योजना सहायक केवल प्रामाणिक सरकारी परिपत्रों के आधार पर सटीक जानकारी देता है। कृपया किसी विशिष्ट योजना (जैसे पीएम-किसान, आयुष्मान भारत, सुकन्या समृद्धि, पीएम आवास, या उत्तराखंड योजनाएं) के बारे में पूछें।",
    "bn": "যাচাইকৃত সরকারি প্রকল্পে এর কোনো নির্দিষ্ট তথ্য পাওয়া যায়নি। অনুগ্রহ করে কোনো নির্দিষ্ট প্রকল্প (যেমন পিএম-কিষাণ, আয়ুষ্মান ভারত, পিএম আবাস) সম্পর্কে অনুসন্ধান করুন।",
    "te": "ధృవీకరించబడిన ప్రభుత్వ పథకాల పత్రాలలో దీనికి సంబంధించిన సమాచారం కనుగొనబడలేదు. దయచేసి నిర్దిష్ట పథకం (పీఎం-కిసాన్, ఆయుష్మాన్ భారత్ మొదలైనవి) గురించి అడగండి.",
    "ta": "சரிபார்க்கப்பட்ட அரசு திட்ட ஆவணங்களில் இதற்கான தகவல் கிடைக்கவில்லை. தயவுசெய்து குறிப்பிட்ட திட்டம் (பிஎம்-கிசான், ஆயுஷ்மான் பாரத் போன்றவை) பற்றி கேட்கவும்.",
    "mr": "पडताळणी केलेल्या सरकारी योजना दस्तऐवजांमध्ये याबद्दल कोणतीही अधिकृत माहिती आढळली नाही. कृपया विशिष्ट सरकारी योजनेबद्दल (जसे की पीएम-किसान, आयुष्मान भारत, पीएम आवास) विचारा.",
    "gu": "ચકાસાયેલ સરકારી યોજનાઓના દસ્તાવેજોમાં આ વિશે કોઈ માહિતી મળી નથી. કૃપા કરીને કોઈ ચોક્કસ યોજના (જેમ કે પીએમ-કિસાન, આયુષ્માન ભારત) વિશે પૂછો.",
    "kn": "ಪರಿಶೀಲಿಸಿದ ಸರ್ಕಾರಿ ಯೋಜನಾ ದಾಖಲೆಗಳಲ್ಲಿ ಇದಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಯಾವುದೇ ಅಧಿಕೃತ ಮಾಹಿತಿ ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿರ್ದಿಷ್ಟ ಯೋಜನೆಯ ಬಗ್ಗೆ ಕೇಳಿ.",
    "ml": "പരിശോധിച്ച സർക്കാർ രേഖകളിൽ ഇതിനെക്കുറിച്ച് വിവരങ്ങൾ ലഭ്യമല്ല. ദയവായി നിർദ്ദിഷ്ട സർക്കാർ പദ്ധതികളെക്കുറിച്ച് ചോദിക്കുക.",
    "pa": "ਪ੍ਰਮਾਣਿਤ ਸਰਕਾਰੀ ਦਸਤਾਵੇਜ਼ਾਂ ਵਿੱਚ ਇਸ ਬਾਰੇ ਕੋਈ ਜਾਣਕਾਰੀ ਨਹੀਂ ਮਿਲੀ। ਕਿਰਪਾ ਕਰਕੇ ਕਿਸੇ ਖਾਸ ਸਕੀਮ (ਜਿਵੇਂ ਪੀਐਮ-ਕਿਸਾਨ, ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ) ਬਾਰੇ ਪੁੱਛੋ।",
    "or": "ପ୍ରମାଣିତ ସରକାରୀ ଯୋଜନା ନଥିପତ୍ରରେ ଏହାର କୌଣସି ତଥ୍ୟ ମିଳିଲା ନାହିଁ। ଦୟାକରି କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ଯୋଜନା ବିଷୟରେ ପଚାରନ୍ତୁ।",
    "as": "প্ৰমাণিত চৰকাৰী নথিপত্ৰত এই সন্দৰ্ভত কোনো তথ্য পোৱা নগ'ল। অনুগ্ৰহ কৰি কোনো নিৰ্দিষ্ট চৰকাৰী আঁচনি সম্পৰ্কে সোধক।"
}

# ==============================================================================
# 5. VOICE SANITIZER (AUDIO-FRIENDLY TEXT)
# ==============================================================================

def clean_text_for_voice(text: str, lang: str = "en") -> str:
    """
    Strips markdown formatting, headers, links, and code blocks to generate natural,
    fluent text suitable for speech synthesis engines across all 12 Indian languages.
    """
    clean = text
    # Convert markdown links [Label](url) -> Label
    clean = re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", clean)
    # Remove raw URLs
    clean = re.sub(r"https?://\S+", "", clean)
    # Remove markdown headers, bold, italics, code
    clean = re.sub(r"[#*_`~>|]", " ", clean)
    # Remove bullet symbols
    clean = re.sub(r"^[\s]*[-•*][\s]+", "", clean, flags=re.MULTILINE)
    # Normalize multiple whitespace and newlines
    clean = re.sub(r"\n+", ". ", clean)
    clean = re.sub(r"\s+", " ", clean).strip()
    return clean

# ==============================================================================
# 6. STRUCTURED DETERMINISTIC RAG SYNTHESIZER
# ==============================================================================

def synthesize_structured_response(top_chunks: List[DocumentChunk], lang: str, query: str) -> str:
    """
    Creates a comprehensive structured answer matching the exact schema requirements:
    - Scheme Name
    - Scheme Overview
    - Main Benefits
    - Eligibility Criteria
    - Required Documents
    - Application Process
    - Official Website / Application Link
    - Important Conditions
    """
    primary = top_chunks[0]

    # Extract sections if available in chunks
    overview_text = ""
    benefits_text = ""
    eligibility_text = ""
    documents_text = ""
    process_text = ""
    conditions_text = ""

    for c in top_chunks:
        st_lower = c.section_title.lower()
        if "overview" in st_lower or "purpose" in st_lower or "objective" in st_lower or "guide" in st_lower:
            overview_text += f"{c.content}\n"
        if "benefit" in st_lower or "financial" in st_lower or "assistance" in st_lower or "subsidy" in st_lower:
            benefits_text += f"{c.content}\n"
        if "eligib" in st_lower or "criteria" in st_lower or "selection" in st_lower:
            eligibility_text += f"{c.content}\n"
        if "document" in st_lower or "identification" in st_lower:
            documents_text += f"{c.content}\n"
        if "apply" in st_lower or "application" in st_lower or "step" in st_lower or "procedure" in st_lower or "portal" in st_lower:
            process_text += f"{c.content}\n"
        if "exclusion" in st_lower or "condition" in st_lower or "verification" in st_lower:
            conditions_text += f"{c.content}\n"

    # Default fallbacks from primary content if individual buckets empty
    if not overview_text:
        overview_text = primary.content
    if not process_text:
        process_text = f"Apply directly online on the verified government portal [{primary.source_url}]({primary.source_url}) or visit your nearest Common Service Centre (CSC / Jan Seva Kendra) with physical documents."

    if lang == "hi":
        resp = f"### 🇮🇳 {primary.scheme_name}\n\n"
        resp += f"**📋 योजना विवरण (Overview):**\n{overview_text.strip()}\n\n"
        if benefits_text:
            resp += f"**🎁 मुख्य लाभ (Main Benefits):**\n{benefits_text.strip()}\n\n"
        if eligibility_text:
            resp += f"**✅ पात्रता मानदंड (Eligibility Criteria):**\n{eligibility_text.strip()}\n\n"
        if documents_text:
            resp += f"**📄 आवश्यक दस्तावेज (Required Documents):**\n{documents_text.strip()}\n\n"
        resp += f"**📝 आवेदन प्रक्रिया (Application Process):**\n{process_text.strip()}\n\n"
        resp += f"**🌐 आधिकारिक पोर्टल (Official Portal):** [{primary.source_url}]({primary.source_url})\n\n"
        if conditions_text:
            resp += f"**⚠️ महत्वपूर्ण शर्तें एवं सत्यापन:**\n{conditions_text.strip()}\n\n"
        resp += f"💡 *सलाह: किसी भी शुल्क या अनधिकृत बिचौलिये से बचें। सभी सरकारी कल्याणकारी योजनाओं में आवेदन और डीबीटी सत्यापन पूर्णतः निःशुल्क अथवा निर्धारित न्यूनतम सरकारी दर पर होता है।*"
        return resp

    elif lang == "bn":
        resp = f"### 🇮🇳 {primary.scheme_name}\n\n"
        resp += f"**📋 প্রকল্পের বিবরণ (Overview):**\n{overview_text.strip()}\n\n"
        if benefits_text:
            resp += f"**🎁 মূল সুবিধাসমূহ (Main Benefits):**\n{benefits_text.strip()}\n\n"
        if eligibility_text:
            resp += f"**✅ যোগ্যতার মাপকাঠি (Eligibility Criteria):**\n{eligibility_text.strip()}\n\n"
        if documents_text:
            resp += f"**📄 প্রয়োজনীয় নথিপত্র (Required Documents):**\n{documents_text.strip()}\n\n"
        resp += f"**📝 আবেদন প্রক্রিয়া (Application Process):**\n{process_text.strip()}\n\n"
        resp += f"**🌐 অফিসিয়াল পোর্টাল (Official Portal):** [{primary.source_url}]({primary.source_url})\n\n"
        resp += f"💡 *সহায়তার জন্য নিকটস্থ কমন সার্ভিস সেন্টার (CSC) অথবা অফিসিয়াল ওয়েবসাইটে যোগাযোগ করুন।*"
        return resp

    elif lang == "te":
        resp = f"### 🇮🇳 {primary.scheme_name}\n\n"
        resp += f"**📋 పథకం వివరాలు (Overview):**\n{overview_text.strip()}\n\n"
        if benefits_text:
            resp += f"**🎁 ప్రధాన ప్రయోజనాలు (Main Benefits):**\n{benefits_text.strip()}\n\n"
        if eligibility_text:
            resp += f"**✅ అర్హత ప్రమాణాలు (Eligibility Criteria):**\n{eligibility_text.strip()}\n\n"
        if documents_text:
            resp += f"**📄 అవసరమైన పత్రాలు (Required Documents):**\n{documents_text.strip()}\n\n"
        resp += f"**📝 దరఖాస్తు విధానం (Application Process):**\n{process_text.strip()}\n\n"
        resp += f"**🌐 అధికారిక పోర్టల్ (Official Portal):** [{primary.source_url}]({primary.source_url})\n\n"
        resp += f"💡 *సహాయం కొరకు సమీపంలోని CSC కేంద్రం లేదా అధికారిక పోర్టల్‌ను సంప్రదించండి.*"
        return resp

    elif lang == "ta":
        resp = f"### 🇮🇳 {primary.scheme_name}\n\n"
        resp += f"**📋 திட்ட விளக்கம் (Overview):**\n{overview_text.strip()}\n\n"
        if benefits_text:
            resp += f"**🎁 முக்கிய பலன்கள் (Main Benefits):**\n{benefits_text.strip()}\n\n"
        if eligibility_text:
            resp += f"**✅ தகுதி வரம்புகள் (Eligibility Criteria):**\n{eligibility_text.strip()}\n\n"
        if documents_text:
            resp += f"**📄 தேவையான ஆவணங்கள் (Required Documents):**\n{documents_text.strip()}\n\n"
        resp += f"**📝 விண்ணப்பிக்கும் முறை (Application Process):**\n{process_text.strip()}\n\n"
        resp += f"**🌐 அதிகாரப்பூர்வ இணையதளம்:** [{primary.source_url}]({primary.source_url})\n\n"
        resp += f"💡 *விண்ணப்பிக்க அதிகாரப்பூர்வ போர்ட்டல் அல்லது அருகிலுள்ள CSC மையத்தை அணுகவும்.*"
        return resp

    elif lang == "mr":
        resp = f"### 🇮🇳 {primary.scheme_name}\n\n"
        resp += f"**📋 योजनेचा तपशील (Overview):**\n{overview_text.strip()}\n\n"
        if benefits_text:
            resp += f"**🎁 मुख्य लाभ (Main Benefits):**\n{benefits_text.strip()}\n\n"
        if eligibility_text:
            resp += f"**✅ पात्रता निकष (Eligibility Criteria):**\n{eligibility_text.strip()}\n\n"
        if documents_text:
            resp += f"**📄 आवश्यक कागदपत्रे (Required Documents):**\n{documents_text.strip()}\n\n"
        resp += f"**📝 अर्ज प्रक्रिया (Application Process):**\n{process_text.strip()}\n\n"
        resp += f"**🌐 अधिकृत पोर्टल:** [{primary.source_url}]({primary.source_url})\n\n"
        resp += f"💡 *अर्ज करण्यासाठी अधिकृत पोर्टल किंवा जवळच्या सीएससी केंद्राला भेट द्या.*"
        return resp

    elif lang == "gu":
        resp = f"### 🇮🇳 {primary.scheme_name}\n\n"
        resp += f"**📋 યોજના પરિચય (Overview):**\n{overview_text.strip()}\n\n"
        if benefits_text:
            resp += f"**🎁 મુખ્ય લાભો (Main Benefits):**\n{benefits_text.strip()}\n\n"
        if eligibility_text:
            resp += f"**✅ પાત્રતાના માપદંડ (Eligibility Criteria):**\n{eligibility_text.strip()}\n\n"
        if documents_text:
            resp += f"**📄 જરૂરી દસ્તાવેજો (Required Documents):**\n{documents_text.strip()}\n\n"
        resp += f"**📝 અરજી કરવાની પ્રક્રિયા (Application Process):**\n{process_text.strip()}\n\n"
        resp += f"**🌐 સત્તાવાર પોર્ટલ:** [{primary.source_url}]({primary.source_url})\n\n"
        resp += f"💡 *અરજી કરવા માટે સત્તાવાર પોર્ટલ અથવા નજીકના સીએસસી કેન્દ્રની મુલાકાત લો.*"
        return resp

    elif lang == "kn":
        resp = f"### 🇮🇳 {primary.scheme_name}\n\n"
        resp += f"**📋 ಯೋಜನೆಯ ವಿವರ (Overview):**\n{overview_text.strip()}\n\n"
        if benefits_text:
            resp += f"**🎁 ಪ್ರಮುಖ ಪ್ರಯೋಜನಗಳು (Main Benefits):**\n{benefits_text.strip()}\n\n"
        if eligibility_text:
            resp += f"**✅ ಅರ್ಹತಾ ಮಾನದಂಡಗಳು (Eligibility Criteria):**\n{eligibility_text.strip()}\n\n"
        if documents_text:
            resp += f"**📄 ಅಗತ್ಯ ದಾಖಲೆಗಳು (Required Documents):**\n{documents_text.strip()}\n\n"
        resp += f"**📝 ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವಿಧಾನ (Application Process):**\n{process_text.strip()}\n\n"
        resp += f"**🌐 ಅಧಿಕೃತ ಪೋರ್ಟಲ್:** [{primary.source_url}]({primary.source_url})\n\n"
        resp += f"💡 *ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ಅಥವಾ ಹತ್ತಿರದ CSC ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.*"
        return resp

    elif lang == "ml":
        resp = f"### 🇮🇳 {primary.scheme_name}\n\n"
        resp += f"**📋 പദ്ധതി വിവരണം (Overview):**\n{overview_text.strip()}\n\n"
        if benefits_text:
            resp += f"**🎁 പ്രധാന ആനുകൂല്യങ്ങൾ (Main Benefits):**\n{benefits_text.strip()}\n\n"
        if eligibility_text:
            resp += f"**✅ യോഗ്യതാ മാനദണ്ഡങ്ങൾ (Eligibility Criteria):**\n{eligibility_text.strip()}\n\n"
        if documents_text:
            resp += f"**📄 ആവശ്യമായ രേഖകൾ (Required Documents):**\n{documents_text.strip()}\n\n"
        resp += f"**📝 അപേക്ഷിക്കേണ്ട വിധം (Application Process):**\n{process_text.strip()}\n\n"
        resp += f"**🌐 ഔദ്യോഗിക പോർട്ടൽ:** [{primary.source_url}]({primary.source_url})\n\n"
        resp += f"💡 *അപേക്ഷിക്കുന്നതിനായി ഔദ്യോഗിക വെബ്സൈറ്റ് അല്ലെങ്കിൽ അടുത്തുള്ള സി.എസ്.സി സന്ദർശിക്കുക.*"
        return resp

    elif lang == "pa":
        resp = f"### 🇮🇳 {primary.scheme_name}\n\n"
        resp += f"**📋 ਸਕੀਮ ਦਾ ਵੇਰਵਾ (Overview):**\n{overview_text.strip()}\n\n"
        if benefits_text:
            resp += f"**🎁 ਮੁੱਖ ਲਾਭ (Main Benefits):**\n{benefits_text.strip()}\n\n"
        if eligibility_text:
            resp += f"**✅ ਯੋਗਤਾ ਸ਼ਰਤਾਂ (Eligibility Criteria):**\n{eligibility_text.strip()}\n\n"
        if documents_text:
            resp += f"**📄 ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼ (Required Documents):**\n{documents_text.strip()}\n\n"
        resp += f"**📝 ਅਰਜ਼ੀ ਦੇਣ ਦੀ ਪ੍ਰਕਿਰਿਆ (Application Process):**\n{process_text.strip()}\n\n"
        resp += f"**🌐 ਅਧਿਕਾਰਤ ਪੋਰਟਲ:** [{primary.source_url}]({primary.source_url})\n\n"
        resp += f"💡 *ਅਰਜ਼ੀ ਦੇਣ ਲਈ ਅਧਿਕਾਰਤ ਪੋਰਟਲ ਜਾਂ ਨਜ਼ਦੀਕੀ ਸੀਐਸਸੀ ਕੇਂਦਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।*"
        return resp

    elif lang == "or":
        resp = f"### 🇮🇳 {primary.scheme_name}\n\n"
        resp += f"**📋 ଯୋଜନା ବିବରଣୀ (Overview):**\n{overview_text.strip()}\n\n"
        if benefits_text:
            resp += f"**🎁 ମୁଖ୍ୟ ସୁବିଧା (Main Benefits):**\n{benefits_text.strip()}\n\n"
        if eligibility_text:
            resp += f"**✅ ଯୋଗ୍ୟତା ମାନଦଣ୍ଡ (Eligibility Criteria):**\n{eligibility_text.strip()}\n\n"
        if documents_text:
            resp += f"**📄 ଆବଶ୍ୟକୀୟ ଦସ୍ତାବିଜ (Required Documents):**\n{documents_text.strip()}\n\n"
        resp += f"**📝 ଆବେଦନ ପ୍ରକ୍ରିୟା (Application Process):**\n{process_text.strip()}\n\n"
        resp += f"**🌐 ଅଧିକାରିକ ପୋର୍ଟାଲ:** [{primary.source_url}]({primary.source_url})\n\n"
        resp += f"💡 *ଆବେଦନ କରିବା ପାଇଁ ଅଧିକାରିକ ପୋର୍ଟାଲ କିମ୍ବା ନିକଟସ୍ଥ CSC କେନ୍ଦ୍ରକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ।*"
        return resp

    elif lang == "as":
        resp = f"### 🇮🇳 {primary.scheme_name}\n\n"
        resp += f"**📋 আঁচনিৰ বিৱৰণ (Overview):**\n{overview_text.strip()}\n\n"
        if benefits_text:
            resp += f"**🎁 মূল সুবিধাসমূহ (Main Benefits):**\n{benefits_text.strip()}\n\n"
        if eligibility_text:
            resp += f"**✅ যোগ্যতাৰ মাপকাঠী (Eligibility Criteria):**\n{eligibility_text.strip()}\n\n"
        if documents_text:
            resp += f"**📄 প্ৰয়োজনীয় নথিপত্ৰ (Required Documents):**\n{documents_text.strip()}\n\n"
        resp += f"**📝 আবেদন প্ৰক্ৰিয়া (Application Process):**\n{process_text.strip()}\n\n"
        resp += f"**🌐 চৰকাৰী পৰ্টেল:** [{primary.source_url}]({primary.source_url})\n\n"
        resp += f"💡 *আবেদন কৰিবলৈ চৰকাৰী পৰ্টেল বা নিকটৱৰ্তী CSC কেন্দ্ৰত যোগাযোগ কৰক।*"
        return resp

    else:
        # English
        resp = f"### 🇮🇳 {primary.scheme_name}\n\n"
        resp += f"**📋 Scheme Overview:**\n{overview_text.strip()}\n\n"
        if benefits_text:
            resp += f"**🎁 Main Benefits:**\n{benefits_text.strip()}\n\n"
        if eligibility_text:
            resp += f"**✅ Eligibility Criteria:**\n{eligibility_text.strip()}\n\n"
        if documents_text:
            resp += f"**📄 Required Documents:**\n{documents_text.strip()}\n\n"
        resp += f"**📝 Application Process:**\n{process_text.strip()}\n\n"
        resp += f"**🌐 Official Website & Application Link:** [{primary.source_url}]({primary.source_url})\n\n"
        if conditions_text:
            resp += f"**⚠️ Important Conditions & Verification:**\n{conditions_text.strip()}\n\n"
        resp += f"💡 *Citizen Guidance: Avoid unauthorized middlemen or fees. Applications for all government welfare programs are free or charged at minimal official CSC rates.*"
        return resp

# ==============================================================================
# 7. MAIN RAG QUERY ENTRYPOINT
# ==============================================================================

def query_rag(request: ChatRequest) -> ChatResponse:
    raw_query = (request.message or request.query or "").strip()
    requested_lang = (request.language or "en").lower().split("-")[0]

    # Step 1: Carry forward conversation context for follow-up questions
    effective_query, active_scheme = resolve_contextual_query(raw_query, request.history)

    # Step 2: Automatic Language Detection
    detected_lang = detect_indian_language(raw_query)
    if detected_lang != "en":
        lang = detected_lang
    elif requested_lang and requested_lang not in ["auto", "en"]:
        lang = requested_lang
    else:
        lang = "en"

    # Step 3: Greetings & Conversational check
    greetings_words = [
        "hello", "hi", "hey", "help", "who are you", "what can you do",
        "नमस्ते", "नमस्कार", "प्रणाम", "मदद", "तुम कौन हो",
        "নমস্কার", "হ্যালো", "সাহায্য",
        "నమస్కారం", "హలో", "సహాయం",
        "வணக்கம்", "ஹலோ", "உதவி",
        "नमस्कार", "હલો", "નમસ્તે",
        "ನಮಸ್ಕಾರ", "നമസ്കാരം", "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",
        "ନମସ୍କାର", "নমস্কাৰ"
    ]
    q_words = raw_query.lower().split()
    if raw_query.lower() in greetings_words or (len(q_words) <= 2 and any(g in raw_query.lower() for g in greetings_words)):
        welcome_msg = MULTILINGUAL_GREETINGS.get(lang, MULTILINGUAL_GREETINGS["en"])
        return ChatResponse(
            answer=welcome_msg,
            citations=[],
            confidence_score=0.99,
            language=lang,
            is_fallback=False
        )

    # Step 4: Semantic Search in Dual-Source Vector Retriever
    search_results = retriever.search(effective_query, top_k=4)

    # Hallucination Guard
    if not search_results or search_results[0][1] < 0.05:
        fallback_msg = MULTILINGUAL_FALLBACKS.get(lang, MULTILINGUAL_FALLBACKS["en"])
        return ChatResponse(
            answer=fallback_msg,
            citations=[],
            confidence_score=0.1,
            language=lang,
            is_fallback=True
        )

    # Step 5: Build Citations
    citations: List[CitationItem] = []
    top_chunks: List[DocumentChunk] = []
    context_blocks = []
    top_score = search_results[0][1]

    for chunk, score in search_results:
        top_chunks.append(chunk)
        citations.append(CitationItem(
            scheme_name=chunk.scheme_name,
            source_url=chunk.source_url,
            section=chunk.section_title,
            excerpt=chunk.content[:240] + "..."
        ))
        context_blocks.append(f"[{chunk.scheme_name} - {chunk.section_title}]: {chunk.content}")

    combined_context = "\n\n".join(context_blocks)
    target_lang_str = LANGUAGE_NAMES.get(lang, "English")

    # Step 6: LLM Synthesis if credentials available
    gemini_key, openai_key = get_llm_keys()
    llm_answer = None

    if gemini_key:
        try:
            from google import genai
            client = genai.Client(api_key=gemini_key)
            system_instruction = (
                "You are Yojana Sahayak, an authoritative, helpful, multilingual Indian government welfare assistant. "
                "Answer the user's question accurately using ONLY the provided official scheme context blocks. "
                "Structure your response with clear sections: Scheme Name, Overview, Main Benefits, Eligibility Criteria, "
                "Required Documents, Application Process, Official Website Link, and Important Conditions. "
                "Only display sections relevant to the user's question. "
                f"You MUST respond fluently and completely in {target_lang_str}. Do not respond in English if the target language is different. "
                "Always provide official application links as clickable markdown [Link Name](URL)."
            )
            prompt = (
                f"User Question: {raw_query}\n\n"
                f"Verified Official Context:\n{combined_context}\n\n"
                f"Please provide an authoritative, empathetic, structured answer in {target_lang_str}:"
            )
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config={'system_instruction': system_instruction}
            )
            if response and response.text:
                llm_answer = response.text.strip()
        except Exception as e:
            print(f"[RAG Engine] Gemini API call exception: {e}")

    if not llm_answer and openai_key:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=openai_key)
            prompt = (
                f"Verified Scheme Context:\n{combined_context}\n\n"
                f"User Question: {raw_query}\n\n"
                f"Provide a structured answer in {target_lang_str} covering Scheme Name, Overview, Main Benefits, "
                f"Eligibility, Required Documents, and Official Application Link based strictly on the context."
            )
            res = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": f"You are Yojana Sahayak. You MUST respond ONLY in {target_lang_str}."},
                    {"role": "user", "content": prompt}
                ]
            )
            if res.choices and res.choices[0].message.content:
                llm_answer = res.choices[0].message.content.strip()
        except Exception as e:
            print(f"[RAG Engine] OpenAI API call exception: {e}")

    # Step 7: Native Grounded Structured Synthesizer for 100% Uptime across all 12 Languages
    if not llm_answer:
        llm_answer = synthesize_structured_response(top_chunks, lang, raw_query)

    return ChatResponse(
        answer=llm_answer,
        citations=citations,
        confidence_score=min(round(0.85 + (top_score * 0.02), 2), 0.99),
        language=lang,
        is_fallback=False
    )
