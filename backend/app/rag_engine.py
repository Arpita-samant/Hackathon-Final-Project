"""
RAG Engine for Multilingual Grounded Q&A with Strict Document Citations across all 12 Indian Languages.
Implements vector chunking, semantic similarity retrieval, hallucination guarding,
automated language detection, and LLM synthesis with offline multilingual templates.
"""

import os
import re
import math
from typing import List, Dict, Any, Tuple
from app.models import ChatRequest, ChatResponse, CitationItem
from knowledge.documents import SCHEME_DOCUMENTS

# Optional external LLM providers
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
OPENAI_KEY = os.getenv("OPENAI_API_KEY")

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
            if any(m in clean for m in ['आहे', 'नाही', 'काय', 'कसे', 'मिळेल', 'शेतकरी', 'करावे', 'च्या', 'बद्दल']):
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

class DocumentChunk:
    def __init__(self, chunk_id: str, scheme_name: str, section_title: str, content: str, source_url: str):
        self.chunk_id = chunk_id
        self.scheme_name = scheme_name
        self.section_title = section_title
        self.content = content
        self.source_url = source_url
        self.tokens = self._tokenize(content + " " + scheme_name + " " + section_title)

    @staticmethod
    def _tokenize(text: str) -> List[str]:
        clean = re.sub(r"[^\w\s]", " ", text.lower())
        words = clean.split()
        stopwords = {"the", "is", "at", "which", "on", "and", "a", "an", "in", "to", "for", "of", "with", "as", "by", "or", "from"}
        return [w for w in words if len(w) > 2 and w not in stopwords]

class VectorRetriever:
    def __init__(self):
        self.chunks: List[DocumentChunk] = []
        self._build_index()

    def _build_index(self):
        chunk_idx = 0
        for doc in SCHEME_DOCUMENTS:
            scheme_name = doc["scheme_name"]
            source_url = doc["source_url"]
            for sec in doc["sections"]:
                chunk_id = f"{doc['doc_id']}_c{chunk_idx}"
                chunk = DocumentChunk(
                    chunk_id=chunk_id,
                    scheme_name=scheme_name,
                    section_title=sec["section_title"],
                    content=sec["content"],
                    source_url=source_url
                )
                self.chunks.append(chunk)
                chunk_idx += 1

    def search(self, query: str, top_k: int = 3) -> List[Tuple[DocumentChunk, float]]:
        q_tokens = DocumentChunk._tokenize(query)
        if not q_tokens:
            return []

        scored_chunks: List[Tuple[DocumentChunk, float]] = []
        q_freq: Dict[str, int] = {}
        for t in q_tokens:
            q_freq[t] = q_freq.get(t, 0) + 1

        for chunk in self.chunks:
            chunk_tokens = chunk.tokens
            c_freq: Dict[str, int] = {}
            for t in chunk_tokens:
                c_freq[t] = c_freq.get(t, 0) + 1

            score = 0.0
            for token, count in q_freq.items():
                if token in c_freq:
                    scheme_boost = 3.0 if token in chunk.scheme_name.lower() else 1.0
                    tf = c_freq[token] / max(len(chunk_tokens), 1)
                    score += (tf * scheme_boost * count)

            # Intent keywords for all 12 languages
            intent_keywords = [
                # PM-KISAN
                ("kisan", "pmkisan"), ("किसान", "kisan"), ("কিষাণ", "kisan"), ("কিসান", "kisan"), 
                ("கிசான்", "kisan"), ("రైతు", "kisan"), ("కిసాన్", "kisan"), ("शेतकरी", "kisan"), 
                ("ખેડૂત", "kisan"), ("ಕಿಸಾನ್", "kisan"), ("കർഷക", "kisan"), ("ਕਿਸਾਨ", "kisan"), 
                ("କିଷାନ", "kisan"), ("farmer", "kisan"), ("agriculture", "kisan"),
                # Ayushman Bharat
                ("ayushman", "ayushman"), ("pmjay", "ayushman"), ("आयुष्मान", "ayushman"), 
                ("আয়ুষ্মান", "ayushman"), ("ஆயுஷ்மான்", "ayushman"), ("ఆయుష్మాన్", "ayushman"), 
                ("આયુષ્માન", "ayushman"), ("ಆಯುಷ್ಮಾನ್", "ayushman"), ("ആയുഷ്മാൻ", "ayushman"), 
                ("ਆਯੁਸ਼ਮਾਨ", "ayushman"), ("ସ୍ୱାସ୍ଥ୍ୟ", "ayushman"), ("स्वास्थ्य", "ayushman"), 
                ("इलाज", "ayushman"), ("health", "ayushman"), ("hospital", "ayushman"),
                # Ujjwala
                ("ujjwala", "ujjwala"), ("उज्ज्वला", "ujjwala"), ("উজ্জ্বলা", "ujjwala"), 
                ("உஜ்வாலா", "ujjwala"), ("ఉజ్వల", "ujjwala"), ("ઉજ્જ્વલા", "ujjwala"), 
                ("ಉಜ್ವಲ", "ujjwala"), ("ഉജ്ജ്വല", "ujjwala"), ("ਉੱਜਵਲਾ", "ujjwala"), 
                ("ଉଜ୍ଜ୍ୱଳା", "ujjwala"), ("gas", "ujjwala"), ("lpg", "ujjwala"), ("cylinder", "ujjwala"),
                # Sukanya Samriddhi
                ("sukanya", "sukanya"), ("ssy", "sukanya"), ("सुकन्या", "sukanya"), 
                ("সুকন্যা", "sukanya"), ("சுகன்யா", "sukanya"), ("సుకన్య", "sukanya"), 
                ("સુકન્યા", "sukanya"), ("ಸುಕನ್ಯಾ", "sukanya"), ("സുകന്യ", "sukanya"), 
                ("ਸੁਕੰਨਿਆ", "sukanya"), ("ସୁକନ୍ୟା", "sukanya"), ("girl", "sukanya"), ("beti", "sukanya"),
                # Mudra Loan
                ("mudra", "mudra"), ("मुद्रा", "mudra"), ("মুদ্রা", "mudra"), 
                ("முத்ரா", "mudra"), ("ముద్ర", "mudra"), ("મુદ્રા", "mudra"), 
                ("ಮುದ್ರಾ", "mudra"), ("മുദ്ര", "mudra"), ("ਮੁਦਰਾ", "mudra"), 
                ("ମୁଦ୍ରା", "mudra"), ("loan", "mudra"), ("ऋण", "mudra"), ("கடன்", "mudra"), 
                ("రుణం", "mudra"), ("कर्ज", "mudra"), ("ધિરાણ", "mudra"),
                # PMAY Housing
                ("pmay", "pmay"), ("awas", "pmay"), ("housing", "pmay"), ("आवास", "pmay"), 
                ("আবাস", "pmay"), ("வீடு", "pmay"), ("గృహ", "pmay"), ("ঘর", "pmay"), 
                ("આવાસ", "pmay"), ("ಮನೆ", "pmay"), ("ഭവന", "pmay"), ("ਮਕਾਨ", "pmay"), 
                ("ହାଉସିଂ", "pmay"), ("house", "pmay"),
                # SVANidhi
                ("svanidhi", "svanidhi"), ("स्वनिधि", "svanidhi"), ("স্বনিধি", "svanidhi"), 
                ("ஸ்வநிதி", "svanidhi"), ("స్వనిధి", "svanidhi"), ("સ્વનિધિ", "svanidhi"), 
                ("vendor", "svanidhi"), ("street", "svanidhi"), ("রেহड़ी", "svanidhi"),
                # Vishwakarma
                ("vishwakarma", "vishwakarma"), ("विश्वकर्मा", "vishwakarma"), ("বিশ্বকর্মা", "vishwakarma"), 
                ("விஸ்வகர்மா", "vishwakarma"), ("విశ్వకర్మ", "vishwakarma"), ("વિશ્વકર્મા", "vishwakarma"), 
                ("artisan", "vishwakarma"), ("craftsman", "vishwakarma"), ("कारीगर", "vishwakarma"),
                # Atal Pension
                ("atal", "atal"), ("apy", "atal"), ("pension", "pension"), ("पेंशन", "pension"), 
                ("পেনশন", "pension"), ("ஓய்வூதியம்", "pension"), ("పెన్షన్", "pension"), 
                ("પેન્શન", "pension"), ("ಪಿಂಚಣಿ", "pension"), ("പെൻഷൻ", "pension"), 
                ("ਪੈਨਸ਼ਨ", "pension"), ("ପେନସନ", "pension")
            ]

            q_lower = query.lower()
            for kw, target_scheme in intent_keywords:
                if kw in q_lower and target_scheme in chunk.scheme_name.lower():
                    score += 6.0

            if score > 0:
                scored_chunks.append((chunk, score))

        scored_chunks.sort(key=lambda x: x[1], reverse=True)
        return scored_chunks[:top_k]

# Global retriever singleton
retriever = VectorRetriever()

MULTILINGUAL_GREETINGS = {
    "en": "Hello! I am your AI Yojana Sahayak. 🇮🇳\n\nYou can ask me about any Central or State Government welfare scheme (such as PM-KISAN, Ayushman Bharat, PMAY Housing, National Scholarships, Mudra Business Loans, or Sukanya Samriddhi) to check eligibility, benefits, required documents, and official application portals.\n\n💡 *Speak or type in any of the 12 Indian languages.*",
    "hi": "नमस्ते! मैं आपका योजना सहायक हूँ। 🇮🇳\n\nआप मुझसे भारत सरकार की किसी भी प्रमुख योजना (जैसे पीएम-किसान, आयुष्मान भारत, पीएम आवास, राष्ट्रीय छात्रवृत्ति, मुद्रा लोन, सुकन्या समृद्धि या उज्ज्वला योजना) की पात्रता, लाभ, आवेदन प्रक्रिया और आवश्यक दस्तावेजों के बारे में पूछ सकते हैं।\n\n💡 *आप किसी भी भाषा में बोलकर या लिखकर प्रश्न पूछ सकते हैं।*",
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
    "en": "I cannot find official guidelines for this in the verified government scheme documentation. Yojana Sahayak strictly grounds responses in verified government notifications to prevent misinformation. Please query about a specific government scheme (such as PM-KISAN, Ayushman Bharat, PMAY, PM Ujjwala, Sukanya Samriddhi) or visit https://www.india.gov.in.",
    "hi": "सत्यापित सरकारी योजना दस्तावेजों में इसके लिए कोई आधिकारिक जानकारी उपलब्ध नहीं है। योजना सहायक केवल प्रामाणिक सरकारी परिपत्रों के आधार पर सटीक जानकारी देता है। कृपया किसी विशिष्ट योजना (जैसे पीएम-किसान, आयुष्मान भारत, सुकन्या समृद्धि, पीएम आवास) के बारे में पूछें।",
    "bn": "যাচাইকৃত সরকারি প্রকল্পে এর কোনো নির্দিষ্ট তথ্য পাওয়া যায়নি। যোজনা সহায়ক সঠিক তথ্যের নিশ্চয়তা দিতে শুধুমাত্র সরকারি বিজ্ঞপ্তি অনুসরণ করে। অনুগ্রহ করে কোনো নির্দিষ্ট প্রকল্প (যেমন পিএম-কিষাণ, আয়ুষ্মান ভারত, পিএম আবাস) সম্পর্কে অনুসন্ধান করুন।",
    "te": "ధృవీకరించబడిన ప్రభుత్వ పథకాల పత్రాలలో దీనికి సంబంధించిన సమాచారం కనుగొనబడలేదు. యోజన సహాయక్ ఖచ్చితమైన సమాచారాన్ని మాత్రమే అందిస్తుంది. దయచేసి నిర్దిష్ట పథకం (పీఎం-కిసాన్, ఆయుష్మాన్ భారత్ మొదలైనవి) గురించి అడగండి.",
    "ta": "சரிபார்க்கப்பட்ட அரசு திட்ட ஆவணங்களில் இதற்கான தகவல் கிடைக்கவில்லை. யோஜனா சகாயக் துல்லியமான தகவல்களை மட்டுமே வழங்குகிறது. தயவுசெய்து குறிப்பிட்ட திட்டம் (பிஎம்-கிசான், ஆயுஷ்மான் பாரத் போன்றவை) பற்றி கேட்கவும்.",
    "mr": "पडताळणी केलेल्या सरकारी योजना दस्तऐवजांमध्ये याबद्दल कोणतीही अधिकृत माहिती आढळली नाही. कृपया विशिष्ट सरकारी योजनेबद्दल (जसे की पीएम-किसान, आयुष्मान भारत, पीएम आवास) विचारा.",
    "gu": "ચકાસાયેલ સરકારી યોજનાઓના દસ્તાવેજોમાં આ વિશે કોઈ માહિતી મળી નથી. કૃપા કરીને કોઈ ચોક્કસ યોજના (જેમ કે પીએમ-કિસાન, આયુષ્માન ભારત, સુકન્યા સમૃદ્ધિ) વિશે પૂછો.",
    "kn": "ಪರಿಶೀಲಿಸಿದ ಸರ್ಕಾರಿ ಯೋಜನಾ ದಾಖಲೆಗಳಲ್ಲಿ ಇದಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಯಾವುದೇ ಅಧಿಕೃತ ಮಾಹಿತಿ ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿರ್ದಿಷ್ಟ ಯೋಜನೆಯ (ಪಿಎಂ-ಕಿಸಾನ್, ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಮುಂತಾದವು) ಬಗ್ಗೆ ಕೇಳಿ.",
    "ml": "പരിശോധിച്ച സർക്കാർ രേഖകളിൽ ഇതിനെക്കുറിച്ച് വിവരങ്ങൾ ലഭ്യമല്ല. ദയവായി നിർദ്ദിഷ്ട സർക്കാർ പദ്ധതികളെക്കുറിച്ച് (പിഎം-കിസാൻ, ആയുഷ്മാൻ ഭാരത് മുതലായവ) ചോദിക്കുക.",
    "pa": "ਪ੍ਰਮਾਣਿਤ ਸਰਕਾਰੀ ਦਸਤਾਵੇਜ਼ਾਂ ਵਿੱਚ ਇਸ ਬਾਰੇ ਕੋਈ ਜਾਣਕਾਰੀ ਨਹੀਂ ਮਿਲੀ। ਕਿਰਪਾ ਕਰਕੇ ਕਿਸੇ ਖਾਸ ਸਕੀਮ (ਜਿਵੇਂ ਪੀਐਮ-ਕਿਸਾਨ, ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ) ਬਾਰੇ ਪੁੱਛੋ।",
    "or": "ପ୍ରମାଣିତ ସରକାରୀ ଯୋଜନା ନଥିପତ୍ରରେ ଏହାର କୌଣସି ତଥ୍ୟ ମିଳିଲା ନାହିଁ। ଦୟାକରି କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ଯୋଜନା (ଯେପରିକି ପିଏମ୍-କିଷାନ, ଆୟୁଷ୍ମାନ ଭାରତ) ବିଷୟରେ ପଚାରନ୍ତୁ।",
    "as": "প্ৰমাণিত চৰকাৰী নথিপত্ৰত এই সন্দৰ্ভত কোনো তথ্য পোৱা নগ'ল। অনুগ্ৰহ কৰি কোনো নিৰ্দিষ্ট চৰকাৰী আঁচনি (যেনে পিএম-কিষাণ, আয়ুষ্মান ভাৰত) সম্পৰ্কে সোধক।"
}

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

def query_rag(request: ChatRequest) -> ChatResponse:
    query = (request.message or request.query or "").strip()
    requested_lang = (request.language or "en").lower().split("-")[0]
    
    # 1. Automatic Language Detection from Query Text
    detected_lang = detect_indian_language(query)
    if detected_lang != "en":
        lang = detected_lang
    elif requested_lang and requested_lang not in ["auto", "en"]:
        lang = requested_lang
    else:
        lang = "en"

    # 2. Greetings Check
    greetings_words = [
        "hello", "hi", "hey", "help", 
        "नमस्ते", "नमस्कार", "प्रणाम", "मदद", 
        "নমস্কার", "হ্যালো", 
        "నమస్కారం", "హలో", 
        "வணக்கம்", "ஹலோ", 
        "नमस्कार", "હલો", "નમસ્તે", 
        "ನಮಸ್ಕಾರ", "നമസ്കാരം", "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", 
        "ନମସ୍କାର", "নমস্কাৰ"
    ]
    if query.lower() in greetings_words or (len(query.split()) <= 2 and any(g in query.lower() for g in greetings_words)):
        welcome_msg = MULTILINGUAL_GREETINGS.get(lang, MULTILINGUAL_GREETINGS["en"])
        return ChatResponse(
            answer=welcome_msg,
            citations=[],
            confidence_score=0.99,
            language=lang,
            is_fallback=False
        )

    # 3. Vector Search
    search_results = retriever.search(query, top_k=3)

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

    # Build Citations
    citations: List[CitationItem] = []
    context_blocks = []
    top_score = search_results[0][1]

    for chunk, score in search_results:
        citations.append(CitationItem(
            scheme_name=chunk.scheme_name,
            source_url=chunk.source_url,
            section=chunk.section_title,
            excerpt=chunk.content[:220] + "..."
        ))
        context_blocks.append(f"[{chunk.scheme_name} - {chunk.section_title}]: {chunk.content}")

    combined_context = "\n\n".join(context_blocks)
    target_lang_str = LANGUAGE_NAMES.get(lang, "English")

    # 4. LLM Synthesis
    llm_answer = None

    if GEMINI_KEY:
        try:
            from google import genai
            client = genai.Client(api_key=GEMINI_KEY)
            system_instruction = (
                "You are Yojana Sahayak, an authoritative, helpful, multilingual Indian government welfare assistant. "
                "Answer the user's question accurately using ONLY the provided official scheme context blocks. "
                f"You MUST respond fluently and completely in {target_lang_str}. Do not respond in English if the target language is different. "
                "Always mention key eligibility criteria, documents, and official application portals."
            )
            prompt = f"User Question: {query}\n\nOfficial Scheme Context:\n{combined_context}\n\nPlease provide a clear, empathetic, structured answer in {target_lang_str}:"
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config={'system_instruction': system_instruction}
            )
            if response and response.text:
                llm_answer = response.text.strip()
        except Exception as e:
            print(f"[RAG Engine] Gemini API call exception: {e}")

    if not llm_answer and OPENAI_KEY:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=OPENAI_KEY)
            prompt = (
                f"Official Context:\n{combined_context}\n\n"
                f"Question: {query}\n\n"
                f"Answer concisely and fluently strictly in {target_lang_str} based on the context above."
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

    # 5. Native Grounded Extractive Synthesizer for ALL 12 Languages
    if not llm_answer:
        top_chunk = search_results[0][0]
        if lang == "hi":
            llm_answer = (
                f"**{top_chunk.scheme_name} ({top_chunk.section_title}) के आधिकारिक दिशानिर्देश:**\n\n"
                f"{top_chunk.content}\n\n"
                f"📌 **सत्यापित आधिकारिक पोर्टल:** [{top_chunk.source_url}]({top_chunk.source_url})\n\n"
                f"💡 *आवेदन और अधिक जानकारी के लिए उपर्युक्त आधिकारिक पोर्टल अथवा नजदीकी सीएससी (CSC) केंद्र पर संपर्क करें।*"
            )
        elif lang == "bn":
            llm_answer = (
                f"**{top_chunk.scheme_name} ({top_chunk.section_title}) - অফিসিয়াল নির্দেশিকা:**\n\n"
                f"{top_chunk.content}\n\n"
                f"📌 **অফিসিয়াল পোর্টাল:** [{top_chunk.source_url}]({top_chunk.source_url})\n\n"
                f"💡 *আবেদন এবং সহায়তার জন্য নিকটস্থ কমন সার্ভিস সেন্টারে (CSC) যোগাযোগ করুন।*"
            )
        elif lang == "te":
            llm_answer = (
                f"**{top_chunk.scheme_name} ({top_chunk.section_title}) అధికారిక మార్గదర్శకాలు:**\n\n"
                f"{top_chunk.content}\n\n"
                f"📌 **అధికారిక వెబ్‌సైట్:** [{top_chunk.source_url}]({top_chunk.source_url})\n\n"
                f"💡 *దరఖాస్తు కొరకు అధికారిక పోర్టల్ లేదా సమీపంలోని CSC కేంద్రాన్ని సంప్రదించండి.*"
            )
        elif lang == "ta":
            llm_answer = (
                f"**{top_chunk.scheme_name} ({top_chunk.section_title}) அதிகாரப்பூர்வ வழிகாட்டுதல்கள்:**\n\n"
                f"{top_chunk.content}\n\n"
                f"📌 **அதிகாரப்பூர்வ இணையதளம்:** [{top_chunk.source_url}]({top_chunk.source_url})\n\n"
                f"💡 *விண்ணப்பிக்க மற்றும் கூடுதல் விவரங்களுக்கு அதிகாரப்பூர்வ போர்ட்டல் அல்லது அருகிலுள்ள CSC மையத்தை அணுகவும்.*"
            )
        elif lang == "mr":
            llm_answer = (
                f"**{top_chunk.scheme_name} ({top_chunk.section_title}) अधिकृत मार्गदर्शक तत्त्वे:**\n\n"
                f"{top_chunk.content}\n\n"
                f"📌 **अधिकृत पोर्टल:** [{top_chunk.source_url}]({top_chunk.source_url})\n\n"
                f"💡 *अर्ज करण्यासाठी आणि अधिक माहितीसाठी वरील अधिकृत पोर्टल किंवा जवळच्या सीएससी केंद्राशी संपर्क साधा.*"
            )
        elif lang == "gu":
            llm_answer = (
                f"**{top_chunk.scheme_name} ({top_chunk.section_title}) સત્તાવાર માર્ગદર્શિકા:**\n\n"
                f"{top_chunk.content}\n\n"
                f"📌 **સત્તાવાર પોર્ટલ:** [{top_chunk.source_url}]({top_chunk.source_url})\n\n"
                f"💡 *અરજી કરવા અને વધુ માહિતી માટે સત્તાવાર પોર્ટલ અથવા નજીકના સીએસસી કેન્દ્રનો સંપર્ક કરો.*"
            )
        elif lang == "kn":
            llm_answer = (
                f"**{top_chunk.scheme_name} ({top_chunk.section_title}) ಅಧಿಕೃತ ಮಾರ್ಗಸೂಚಿಗಳು:**\n\n"
                f"{top_chunk.content}\n\n"
                f"📌 **ಅಧಿಕೃತ ಪೋರ್ಟಲ್:** [{top_chunk.source_url}]({top_chunk.source_url})\n\n"
                f"💡 *ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಮತ್ತು ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಅಥವಾ ಹತ್ತಿರದ CSC ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ.*"
            )
        elif lang == "ml":
            llm_answer = (
                f"**{top_chunk.scheme_name} ({top_chunk.section_title}) ഔദ്യോഗിക വിവരങ്ങൾ:**\n\n"
                f"{top_chunk.content}\n\n"
                f"📌 **ഔദ്യോഗിക വെബ്സൈറ്റ്:** [{top_chunk.source_url}]({top_chunk.source_url})\n\n"
                f"💡 *അപേക്ഷിക്കുന്നതിനും കൂടുതൽ വിവരങ്ങൾക്കുമായി ഔദ്യോഗിക പോർട്ടൽ അല്ലെങ്കിൽ അടുത്തുള്ള സിഎസ്‌സി സന്ദർശിക്കുക.*"
            )
        elif lang == "pa":
            llm_answer = (
                f"**{top_chunk.scheme_name} ({top_chunk.section_title}) ਅਧਿਕਾਰਤ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼:**\n\n"
                f"{top_chunk.content}\n\n"
                f"📌 **ਅਧਿਕਾਰਤ ਪੋਰਟਲ:** [{top_chunk.source_url}]({top_chunk.source_url})\n\n"
                f"💡 *ਅਰਜ਼ੀ ਦੇਣ ਅਤੇ ਹੋਰ ਜਾਣਕਾਰੀ ਲਈ ਉਪਰੋਕਤ ਪੋਰਟਲ ਜਾਂ ਨਜ਼ਦੀਕੀ ਸੀਐਸਸੀ (CSC) ਕੇਂਦਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।*"
            )
        elif lang == "or":
            llm_answer = (
                f"**{top_chunk.scheme_name} ({top_chunk.section_title}) ସରକାରୀ ନିର୍ଦ୍ଦେଶାବଳୀ:**\n\n"
                f"{top_chunk.content}\n\n"
                f"📌 **ଅଧିକାରିକ ୱେବସାଇଟ:** [{top_chunk.source_url}]({top_chunk.source_url})\n\n"
                f"💡 *ଆବେଦନ କରିବା ଏବଂ ଅଧିକ ସୂଚନା ପାଇଁ ଉପରୋକ୍ତ ଅଧିକାରିକ ପୋର୍ଟାଲ ବା ନିକଟସ୍ଥ CSC କେନ୍ଦ୍ରକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ।*"
            )
        elif lang == "as":
            llm_answer = (
                f"**{top_chunk.scheme_name} ({top_chunk.section_title}) চৰকাৰী নিৰ্দেশাৱলী:**\n\n"
                f"{top_chunk.content}\n\n"
                f"📌 **চৰকাৰী পৰ্টেল:** [{top_chunk.source_url}]({top_chunk.source_url})\n\n"
                f"💡 *আবেদন কৰিবলৈ আৰু অধিক তথ্যৰ বাবে চৰকাৰী পৰ্টেল বা নিকটৱৰ্তী CSC কেন্দ্ৰত যোগাযোগ কৰক।*"
            )
        else:
            llm_answer = (
                f"**Official Information for {top_chunk.scheme_name} ({top_chunk.section_title}):**\n\n"
                f"{top_chunk.content}\n\n"
                f"📌 **Official Verification Portal:** [{top_chunk.source_url}]({top_chunk.source_url})\n\n"
                f"💡 *For assistance and verified enrollment, visit the official portal above or your local Common Service Centre (CSC).*"
            )

    return ChatResponse(
        answer=llm_answer,
        citations=citations,
        confidence_score=min(round(0.85 + (top_score * 0.02), 2), 0.99),
        language=lang,
        is_fallback=False
    )
