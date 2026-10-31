"use client";

import React, { useState, useEffect, useRef } from "react";
import { Language, translations } from "@/lib/translations";
import { 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  Bot, 
  Activity, 
  ChevronDown, 
  Volume2, 
  Sparkles,
  ExternalLink,
  Send,
  Loader2,
  Globe2,
  CheckCircle2,
  Info
} from "lucide-react";

interface VoiceAssistantViewProps {
  lang: Language;
}

export interface VoiceLanguageOption {
  code: string;
  langKey: string;
  label: string;
  native: string;
  ttsCode: string;
}

export const VOICE_LANGUAGES: VoiceLanguageOption[] = [
  { code: "auto", langKey: "auto", label: "✨ Auto-Detect (स्वतः पहचान - All 12 Languages)", native: "Auto-Detect", ttsCode: "en-IN" },
  { code: "hi-IN", langKey: "hi", label: "हिन्दी (Hindi)", native: "हिन्दी", ttsCode: "hi-IN" },
  { code: "en-IN", langKey: "en", label: "English (India)", native: "English", ttsCode: "en-IN" },
  { code: "bn-IN", langKey: "bn", label: "বাংলা (Bengali)", native: "বাংলা", ttsCode: "bn-IN" },
  { code: "te-IN", langKey: "te", label: "తెలుగు (Telugu)", native: "తెలుగు", ttsCode: "te-IN" },
  { code: "ta-IN", langKey: "ta", label: "தமிழ் (Tamil)", native: "தமிழ்", ttsCode: "ta-IN" },
  { code: "mr-IN", langKey: "mr", label: "मराठी (Marathi)", native: "मराठी", ttsCode: "mr-IN" },
  { code: "gu-IN", langKey: "gu", label: "ગુજરાતી (Gujarati)", native: "ગુજરાતી", ttsCode: "gu-IN" },
  { code: "kn-IN", langKey: "kn", label: "ಕನ್ನಡ (Kannada)", native: "ಕನ್ನಡ", ttsCode: "kn-IN" },
  { code: "ml-IN", langKey: "ml", label: "മലയാളം (Malayalam)", native: "മലയാളം", ttsCode: "ml-IN" },
  { code: "pa-IN", langKey: "pa", label: "ਪੰਜਾਬੀ (Punjabi)", native: "ਪੰਜਾਬੀ", ttsCode: "pa-IN" },
  { code: "or-IN", langKey: "or", label: "ଓଡ଼ିଆ (Odia)", native: "ଓଡ଼ିଆ", ttsCode: "or-IN" },
  { code: "as-IN", langKey: "as", label: "অসমীয়া (Assamese)", native: "অসমীয়া", ttsCode: "as-IN" },
];

/**
 * Real-time script language detector across all 12 Indian languages.
 */
export function detectClientLanguage(text: string): string {
  const clean = text.trim();
  if (!clean) return "en";

  const counts: Record<string, number> = {
    hi: (clean.match(/[\u0900-\u097F]/g) || []).length,
    bn: (clean.match(/[\u0980-\u09FF]/g) || []).length,
    pa: (clean.match(/[\u0A00-\u0A7F]/g) || []).length,
    gu: (clean.match(/[\u0A80-\u0AFF]/g) || []).length,
    or: (clean.match(/[\u0B00-\u0B7F]/g) || []).length,
    ta: (clean.match(/[\u0B80-\u0BFF]/g) || []).length,
    te: (clean.match(/[\u0C00-\u0C7F]/g) || []).length,
    kn: (clean.match(/[\u0C80-\u0CFF]/g) || []).length,
    ml: (clean.match(/[\u0D00-\u0D7F]/g) || []).length,
  };

  // Differentiate Marathi from Hindi
  if (counts.hi > 0) {
    if (["आहे", "नाही", "काय", "कसे", "मिळेल", "शेतकरी", "करावे", "च्या", "बद्दल"].some((w) => clean.includes(w))) {
      return "mr";
    }
    return "hi";
  }

  // Differentiate Assamese from Bengali
  if (counts.bn > 0) {
    if (clean.includes("ৰ") || clean.includes("ৱ") || ["আঁচনি", "কেনেদৰে", "পাম", "চৰকাৰী"].some((w) => clean.includes(w))) {
      return "as";
    }
    return "bn";
  }

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (sorted[0] && sorted[0][1] > 0) {
    return sorted[0][0];
  }

  return "en";
}

// Multilingual Initial Greetings for all 12 Languages
const MULTILINGUAL_GREETINGS: Record<string, string> = {
  "auto": "Hello! I am Yojana Sahayak. 🇮🇳\nSpeak or type in ANY of the 12 Indian languages, and I will understand and respond in your language!",
  "en": "Hello! I am Yojana Sahayak. 🇮🇳\nHow can I help you find government schemes today?",
  "hi": "नमस्ते! मैं योजना सहायक हूँ। 🇮🇳\nआज सरकारी योजनाएं खोजने में मैं आपकी क्या मदद कर सकता हूँ?",
  "bn": "নমস্কার! আমি যোজনা সহায়ক। 🇮🇳\nআজ সরকারি প্রকল্প খুঁজতে আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
  "te": "నమస్కారం! నేను యోజన సహాయక్. 🇮🇳\nప్రభుత్వ పథకాలను కనుగొనడంలో నేను మీకు ఎలా సహాయపడగలను?",
  "ta": "வணக்கம்! நான் யோஜனா சகாயக். 🇮🇳\nஅரசு திட்டங்களை கண்டறிய நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
  "mr": "नमस्कार! मी योजना सहायक आहे. 🇮🇳\nआज सरकारी योजना शोधण्यात मी तुम्हाला कशी मदत करू शकतो?",
  "gu": "નમસ્તે! હું યોજના સહાયક છું. 🇮🇳\nઆજે સરકારી યોજનાઓ શોધવામાં હું તમને કેવી રીતે મદદ કરી શકું?",
  "kn": "ನಮಸ್ಕಾರ! ನಾನು ಯೋಜನಾ ಸಹಾಯಕ. 🇮🇳\nಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಲು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
  "ml": "നമസ്കാരം! ഞാൻ യോജന സഹായക്. 🇮🇳\nസർക്കാർ പദ്ധതികൾ കണ്ടെത്താൻ ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കും?",
  "pa": "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਯੋਜਨਾ ਸਹਾਇਕ ਹਾਂ। 🇮🇳\nਸਰਕਾਰੀ ਸਕੀਮਾਂ ਲੱਭਣ ਵਿੱਚ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
  "or": "ନମସ୍କାର! ମୁଁ ଯୋଜନା ସହାୟକ। 🇮🇳\nଆଜି ସରକାରୀ ଯୋଜନା ଖୋଜିବାରେ ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?",
  "as": "নমস্কাৰ! মই যোজনা সহায়ক। 🇮🇳\nআজি চৰকাৰী আঁচনি বিচৰাত মই আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?",
};

// Listening indicators in each native language
const LISTENING_TEXTS: Record<string, string> = {
  "en": "Listening... Speak now in English",
  "hi": "सुन रहा हूँ... कृपया अब हिन्दी में बोलें",
  "bn": "শুনছি... অনুগ্রহ করে বাংলায় বলুন",
  "te": "వింటున్నాను... దయచేసి తెలుగులో మాట్లాడండి",
  "ta": "கேட்கிறேன்... தயவுசெய்து தமிழில் பேசுங்கள்",
  "mr": "ऐकत आहे... कृपया मराठीत बोला",
  "gu": "સાંભળી રહ્યો છું... કૃપા કરીને ગુજરાતીમાં બોલો",
  "kn": "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ... ದಯವಿಟ್ಟು ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ",
  "ml": "കേൾക്കുന്നു... ദയവായി മലയാളത്തിൽ സംസാരിക്കുക",
  "pa": "ਸੁਣ ਰਿਹਾ ਹਾਂ... ਕਿਰਪਾ ਕਰਕੇ ਪੰਜਾਬੀ ਵਿੱਚ ਬੋਲੋ",
  "or": "ଶୁଣୁଛି... ଦୟାକରି ଓଡ଼ିଆରେ କୁହନ୍ତୁ",
  "as": "শুনি আছোঁ... অনুগ্ৰহ কৰি অসমীয়াত কওক",
  "auto": "Listening... Speak in any of the 12 Indian languages ✨"
};

// Sample questions across ALL 12 Languages
const SAMPLE_PROMPTS: Record<string, string[]> = {
  "auto": [
    "What is PM-KISAN eligibility?",
    "पीएम किसान सम्मान निधि क्या है?",
    "প্রধানমন্ত্রী কিসান সম্মান নিধি যোজনা কি?",
    "பிஎம் கிசான் திட்டம் என்றால் என்ன?",
    "పీఎం కిసాన్ పథకం అర్హతలు ఏమిటి?",
    "પીએમ કિસાન યોજના શું છે?"
  ],
  "en": [
    "What is PM-KISAN scheme eligibility?",
    "How does Ayushman Bharat ₹5 Lakh health cover work?",
    "Show scholarship schemes for students",
    "How to apply for PM Mudra Shishu loan?"
  ],
  "hi": [
    "पीएम किसान सम्मान निधि की पात्रता क्या है?",
    "आयुष्मान भारत में ₹5 लाख का मुफ्त इलाज कैसे मिलता है?",
    "छात्रों के लिए छात्रवृत्ति योजनाएं बताएं",
    "मुद्रा लोन के तहत ₹50,000 का ऋण कैसे मिलेगा?"
  ],
  "bn": [
    "প্রধানমন্ত্রী কিসান সম্মান নিধি যোজনা কি?",
    "আয়ুষ্মান ভারত প্রকল্পে বিনামূল্যে চিকিৎসা কীভাবে পাব?",
    "ছাত্রছাত্রীদের জন্য স্কলারশিপের তালিকা দিন",
    "প্রধানমন্ত্রী মুদ্রা যোজনায় ঋণের নিয়মাবলী কি?"
  ],
  "te": [
    "పీఎం కిసాన్ పథకం అర్హతలు ఏమిటి?",
    "ఆయుష్మాన్ భారత్ హెల్త్ కార్డు ద్వారా ఉచిత వైద్యం ఎలా పొందాలి?",
    "విద్యార్థుల కోసం స్కాలర్‌షిప్ పథకాలు ఏమిటి?",
    "ముద్ర లోన్ కోసం ఎలా దరఖాస్తు చేసుకోవాలి?"
  ],
  "ta": [
    "பிஎம் கிசான் திட்டத்திற்கு யார் தகுதியானவர்கள்?",
    "ஆயுஷ்மான் பாரத் ₹5 லட்சம் மருத்துவ காப்பீடு பெறுவது எப்படி?",
    "மாணவர்களுக்கான கல்வி உதவித்தொகை திட்டங்கள் எவை?",
    "முத்ரா கடன் திட்டத்தில் கடன் பெறுவது எப்படி?"
  ],
  "mr": [
    "पीएम किसान योजनेची पात्रता काय आहे?",
    "आयुष्मान भारत योजनेअंतर्गत मोफत उपचार कसे मिळतात?",
    "विद्यार्थ्यांसाठी शिष्यवृत्ती योजना सांगा",
    "मुद्रा कर्जासाठी अर्ज कसा करावा?"
  ],
  "gu": [
    "પીએમ કિસાન યોજનાની પાત્રતા શું છે?",
    "આયુષ્માન ભારત યોજનામાં ₹5 લાખની મફત સારવાર કેવી રીતે મળે?",
    "વિદ્યાર્થીઓ માટે સ્કોલરશીપ યોજનાઓ બતાવો",
    "મુદ્રા લોન માટે કેવી રીતે અરજી કરવી?"
  ],
  "kn": [
    "ಪಿಎಂ ಕಿಸಾನ್ ಯೋಜನೆಯ ಅರ್ಹತೆಗಳು ಯಾವುವು?",
    "ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಉಚಿತ ಚಿಕಿತ್ಸೆ ಕಾರ್ಡ್ ಪಡೆಯುವುದು ಹೇಗೆ?",
    "ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆಗಳು ಯಾವುವು?",
    "ಮುದ್ರಾ ಸಾಲ ಪಡೆಯಲು ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು ಹೇಗೆ?"
  ],
  "ml": [
    "പിഎം കിസാൻ പദ്ധതിയുടെ യോഗ്യത എന്താണ്?",
    "ആയുഷ്മാൻ ഭാരത് സൗജന്യ ചികിത്സ എങ്ങനെ ലഭിക്കും?",
    "വിദ്യാർത്ഥികൾക്കുള്ള സ്കോളർഷിപ്പ് പദ്ധതികൾ ഏതൊക്കെയാണ്?",
    "മുദ്ര വായ്പയ്ക്ക് എങ്ങനെ അപേക്ഷിക്കാം?"
  ],
  "pa": [
    "ਪੀਐਮ ਕਿਸਾਨ ਸਕੀਮ ਦੀ ਯੋਗਤਾ ਕੀ ਹੈ?",
    "ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ ਯੋਜਨਾ ਤਹਿਤ ਮੁਫਤ ਇਲਾਜ ਕਿਵੇਂ ਮਿਲਦਾ ਹੈ?",
    "ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਵਜ਼ੀਫ਼ਾ ਸਕੀਮਾਂ ਕਿਹੜੀਆਂ ਹਨ?",
    "ਮੁਦਰਾ ਲੋਨ ਲਈ ਅਰਜ਼ੀ ਕਿਵੇਂ ਦੇਣੀ ਹੈ?"
  ],
  "or": [
    "ପିଏମ୍ କିଷାନ ଯୋଜନାର ଯୋଗ୍ୟତା କ'ଣ?",
    "ଆୟୁଷ୍ମାନ ଭାରତ ମାଗଣା ଚିକିତ୍ସା କିପରି ପାଇବେ?",
    "ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପାଇଁ ବୃତ୍ତି ଯୋଜନା ବିଷୟରେ କୁହନ୍ତୁ",
    "ମୁଦ୍ରା ଋଣ କିପରି ମିଳିବ?"
  ],
  "as": [
    "পিএম কিষাণ আঁচনিৰ যোগ্যতা কি?",
    "আয়ুষ্মান ভাৰত স্বাস্থ্য কাৰ্ড কেনেকৈ পাম?",
    "ছাত্ৰ-ছাত্ৰীৰ বাবে জলপানী আঁচনিৰ তথ্য দিয়ক",
    "মুদ্ৰা ঋণৰ বাবে কেনেকৈ আবেদন কৰিব পাৰি?"
  ],
};

export const VoiceAssistantView: React.FC<VoiceAssistantViewProps> = ({ lang }) => {
  const t = translations[lang] || translations.en;
  
  // Selected option from dropdown ("auto", "hi-IN", "bn-IN", etc.)
  const [selectedVoiceLang, setSelectedVoiceLang] = useState<string>("auto");

  // Dynamic conversation language currently active ("hi", "bn", "ta", etc.)
  const [activeLangCode, setActiveLangCode] = useState<string>(lang || "hi");

  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [ttsNotice, setTtsNotice] = useState<string | null>(null);

  const [transcribedText, setTranscribedText] = useState(
    MULTILINGUAL_GREETINGS[activeLangCode] ? "..." : "I'm looking for financial support schemes for small businesses and farmers..."
  );
  const [assistantResponse, setAssistantResponse] = useState(
    MULTILINGUAL_GREETINGS["auto"]
  );
  const [citations, setCitations] = useState<any[]>([]);

  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef<string>("");

  // Sync greeting when active language changes
  useEffect(() => {
    if (selectedVoiceLang === "auto") {
      setAssistantResponse(MULTILINGUAL_GREETINGS["auto"]);
    } else {
      const langPrefix = selectedVoiceLang.split("-")[0];
      setAssistantResponse(MULTILINGUAL_GREETINGS[langPrefix] || MULTILINGUAL_GREETINGS["en"]);
      setActiveLangCode(langPrefix);
    }
  }, [selectedVoiceLang]);

  // Query Backend Assistant with Multilingual RAG
  const queryAssistant = async (queryText: string, forcedLang?: string) => {
    const cleanQuery = queryText.trim();
    if (!cleanQuery) return;

    setIsThinking(true);
    setTranscribedText(cleanQuery);
    setTtsNotice(null);

    // 1. Detect language from query script or forced parameter
    const detected = forcedLang || detectClientLanguage(cleanQuery);
    const targetLang = (detected && detected !== "en") 
      ? detected 
      : (selectedVoiceLang !== "auto" ? selectedVoiceLang.split("-")[0] : activeLangCode || "en");

    setActiveLangCode(targetLang);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: cleanQuery,
          language: targetLang
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const responseLang = data.language || targetLang;
        setActiveLangCode(responseLang);
        setAssistantResponse(data.answer);
        setCitations(data.citations || []);
        
        // Speak in the exact response language
        speakAloud(data.answer, responseLang);
      } else {
        throw new Error("Chat endpoint returned status " + res.status);
      }
    } catch (err) {
      console.error("Voice Assistant Query Error:", err);
      const fallbackMsgs: Record<string, string> = {
        hi: "क्षमा करें, योजना सहायक सर्वर से उत्तर प्राप्त करने में असमर्थ रहा। कृपया पुनः बोलें।",
        bn: "দুঃখিত, যোজনা সহায়ক সার্ভার থেকে উত্তর পাওয়া যায়নি। অনুগ্রহ করে আবার বলুন।",
        te: "క్షమించండి, సర్వర్ నుండి ప్రతిస్పందన రాలేదు. దయచేసి మళ్ళీ ప్రయత్నించండి.",
        ta: "மன்னிக்கவும், சேவையகத்திலிருந்து பதில் பெற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
        mr: "क्षमस्व, सर्व्हरवरून उत्तर मिळू शकले नाही. कृपया पुन्हा बोला.",
        gu: "માફ કરશો, સર્વર તરફથી પ્રતિસાદ મળી શક્યો નથી. કૃપા કરીને ફરીથી બોલો.",
        kn: "ಕ್ಷಮಿಸಿ, ಸರ್ವರ್‌ನಿಂದ ಉತ್ತರ ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಪುನಃ ಮಾತನಾಡಿ.",
        ml: "ക്ഷമിക്കണം, സെർവറിൽ നിന്ന് മറുപടി ലഭിച്ചില്ല. ദയവായി വീണ്ടും പറയുക.",
        pa: "ਮਾਫ਼ ਕਰਨਾ, ਸਰਵਰ ਤੋਂ ਜਵਾਬ ਪ੍ਰਾਪਤ ਨਹੀਂ ਹੋਇਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਬੋਲੋ।",
        or: "ଦୁଃଖିତ, ସର୍ଭରରୁ ଉତ୍ତର ମିଳିପାରିଲା ନାହିଁ। ଦୟାକରି ପୁନର୍ବାର କୁହନ୍ତୁ।",
        as: "ক্ষমা কৰিব, চাৰ্ভাৰৰ পৰা সঁহাৰি পোৱা নগ'ল। অনুগ্ৰহ কৰি পুনৰ কওক।",
        en: "Apologies, could not retrieve schemes from the AI server. Please try asking again."
      };
      setAssistantResponse(fallbackMsgs[targetLang] || fallbackMsgs["en"]);
    } finally {
      setIsThinking(false);
    }
  };

  // Speech Recognition Setup
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
      setIsListening(false);
      return;
    }

    if (typeof window === "undefined" || !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition is supported in Google Chrome, Microsoft Edge, Brave, and Android browsers.");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    // Determine speech recognition locale
    let speechLocale = selectedVoiceLang;
    if (speechLocale === "auto") {
      speechLocale = `${activeLangCode || "hi"}-IN`;
    }

    recognition.lang = speechLocale;
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      transcriptRef.current = "";
      setTranscribedText(
        LISTENING_TEXTS[selectedVoiceLang === "auto" ? "auto" : activeLangCode] || LISTENING_TEXTS["en"]
      );
    };

    recognition.onresult = (event: any) => {
      let currentTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      transcriptRef.current = currentTranscript;
      setTranscribedText(currentTranscript);

      // Auto-detect language in real-time from interim speech
      if (currentTranscript.trim().length > 3) {
        const detected = detectClientLanguage(currentTranscript);
        if (detected && detected !== "en") {
          setActiveLangCode(detected);
        }
      }
    };

    recognition.onerror = (err: any) => {
      console.warn("Speech recognition error:", err);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      const spoken = transcriptRef.current.trim();
      if (spoken && !spoken.includes("Listening...") && !spoken.includes("सुन रहा हूँ...")) {
        queryAssistant(spoken);
      }
    };

    recognition.start();
  };

  // Text to Speech in the chosen/detected Indian language
  const speakAloud = (textToSpeak: string, forcedLang?: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const langTarget = forcedLang || activeLangCode || "en";
    const cleanText = textToSpeak.replace(/[*_#`[\]()]/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const speechCode = `${langTarget}-IN`;
    utterance.lang = speechCode;

    // Pick best native voice matching language prefix
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(
      (v) => v.lang.toLowerCase() === speechCode.toLowerCase() || 
             v.lang.toLowerCase().startsWith(langTarget.toLowerCase())
    );

    if (matchingVoice) {
      utterance.voice = matchingVoice;
      setTtsNotice(null);
    } else {
      const activeOption = VOICE_LANGUAGES.find((vl) => vl.langKey === langTarget);
      setTtsNotice(
        `🔊 Audio synthesized in ${activeOption?.native || langTarget}. (Native local device voice for ${activeOption?.native || langTarget} not pre-installed on this browser; synthesized via WebSpeech engine).`
      );
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayVoice = () => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
    } else {
      speakAloud(assistantResponse, activeLangCode);
    }
  };

  // Sample prompt questions for the active language
  const activePrompts = SAMPLE_PROMPTS[selectedVoiceLang === "auto" ? "auto" : activeLangCode] 
    || SAMPLE_PROMPTS[activeLangCode] 
    || SAMPLE_PROMPTS["en"];

  const currentLangMeta = VOICE_LANGUAGES.find((vl) => vl.langKey === activeLangCode) || VOICE_LANGUAGES[1];

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-[#EBF3FC] via-[#F8FBFE] to-[#FFFFFF] p-6 sm:p-10 shadow-sm border border-blue-100 max-w-5xl mx-auto overflow-hidden min-h-[640px] flex flex-col justify-between">
      
      {/* Top Controls: Multilingual Indian Voice Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-5 border-b border-blue-100/80">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shadow-xs">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base sm:text-lg font-black text-gray-950 leading-tight">
                {t.voiceTitle || "Multilingual Voice Assistant"}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                12 Languages
              </span>
            </div>
            <p className="text-[11px] text-gray-500">
              {t.voiceSubtitle || "Speak or listen in 12 Indian languages with grounded AI intelligence"}
            </p>
          </div>
        </div>

        {/* Language Controls */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="relative">
            <select
              value={selectedVoiceLang}
              onChange={(e) => {
                const newCode = e.target.value;
                setSelectedVoiceLang(newCode);
                window.speechSynthesis?.cancel();
                setIsPlaying(false);
                if (newCode !== "auto") {
                  const prefix = newCode.split("-")[0];
                  setActiveLangCode(prefix);
                }
              }}
              className="appearance-none bg-white border border-gray-300 hover:border-red-400 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-gray-900 shadow-xs focus:ring-2 focus:ring-red-500 focus:outline-none cursor-pointer"
            >
              {VOICE_LANGUAGES.map((v) => (
                <option key={v.code} value={v.code}>
                  {v.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Language Quick Switcher Chips */}
      <div className="pt-3 pb-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        <span className="text-[11px] font-bold text-gray-500 shrink-0 flex items-center space-x-1">
          <Globe2 className="w-3 h-3 text-[#104E8B]" />
          <span>Language:</span>
        </span>
        {VOICE_LANGUAGES.map((v) => {
          const isSelected = selectedVoiceLang === v.code || (selectedVoiceLang === "auto" && activeLangCode === v.langKey);
          return (
            <button
              key={v.code}
              type="button"
              onClick={() => {
                setSelectedVoiceLang(v.code);
                if (v.code !== "auto") {
                  setActiveLangCode(v.langKey);
                }
                window.speechSynthesis?.cancel();
                setIsPlaying(false);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition shrink-0 border ${
                isSelected
                  ? "bg-red-600 text-white border-red-600 shadow-xs"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {v.native}
            </button>
          );
        })}
      </div>

      {/* Active Language Detection Badge */}
      <div className="pt-1 flex items-center justify-between">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#104E8B] text-xs font-bold shadow-2xs">
          <Activity className="w-3.5 h-3.5 text-[#104E8B]" />
          <span>
            Active Voice Language: <strong>{currentLangMeta.label}</strong>
          </span>
          {selectedVoiceLang === "auto" && (
            <span className="ml-1 text-[10px] bg-blue-200/80 px-1.5 py-0.2 rounded-md text-blue-900 font-extrabold">
              Auto-Detected
            </span>
          )}
        </div>
      </div>

      {/* TOP SPEECH BUBBLE */}
      <div className="my-5 flex justify-start items-start">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-md border border-blue-100/80 max-w-2xl relative w-full">
          <div className="flex items-start space-x-3.5">
            {/* Assistant Bot Icon Badge */}
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0 shadow-2xs">
              <Bot className="w-5 h-5" />
            </div>

            <div className="space-y-2 flex-1">
              {/* Soundwave Mini Indicator */}
              <div className="flex items-center space-x-1.5 text-xs text-red-600 font-bold">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span className="text-[11px] tracking-wide uppercase">Yojana Sahayak Voice ({currentLangMeta.native})</span>
              </div>

              {/* Response Text */}
              <div className="text-sm sm:text-base font-semibold text-gray-900 leading-relaxed whitespace-pre-line">
                {isThinking ? (
                  <div className="flex items-center space-x-2 text-gray-500 py-2">
                    <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                    <span>Searching official government scheme databases in {currentLangMeta.label}...</span>
                  </div>
                ) : (
                  assistantResponse
                )}
              </div>

              {/* Citations if available */}
              {citations.length > 0 && (
                <div className="pt-2 border-t border-gray-100 flex flex-wrap gap-2">
                  {citations.map((c, i) => (
                    <a
                      key={i}
                      href={c.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold hover:bg-blue-100"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="truncate max-w-[150px]">{c.scheme_name}</span>
                    </a>
                  ))}
                </div>
              )}

              {/* Audio synthesis status notice */}
              {ttsNotice && (
                <div className="pt-2 text-[11px] text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200 flex items-center space-x-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{ttsNotice}</span>
                </div>
              )}
            </div>

            {/* Play / Voice Button */}
            <button
              onClick={handlePlayVoice}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition flex items-center space-x-1.5 shrink-0 shadow-2xs ${
                isPlaying
                  ? "bg-red-600 text-white border-red-600 animate-pulse"
                  : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>{t.voiceStop || "Stop"}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t.voicePlayVoice || "Play Voice"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Prompts Carousel in Detected / Active Language */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        <span className="text-[11px] font-bold text-gray-500">
          {t.quickQuestionsLabel || "Try asking in"} {currentLangMeta.native}:
        </span>
        {activePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => queryAssistant(p)}
            className="px-3 py-1 rounded-full bg-white/90 hover:bg-white text-gray-800 hover:text-red-600 border border-gray-200 hover:border-red-300 text-xs font-semibold shadow-2xs transition"
          >
            {p}
          </button>
        ))}
      </div>

      {/* CENTER VISUALIZER & SPEAK MIC BUTTON */}
      <div className="my-6 flex flex-col items-center justify-center relative">
        {/* Glowing Frequency Wave SVG Animation */}
        <div className="relative w-full max-w-md h-24 flex items-center justify-center">
          <svg
            className={`w-full h-full transition-opacity duration-300 ${
              isListening || isPlaying ? "opacity-100 scale-105" : "opacity-60"
            }`}
            viewBox="0 0 400 100"
            fill="none"
          >
            <defs>
              <linearGradient id="waveGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2BB656" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#1E7E34" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#2BB656" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="waveBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#104E8B" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#104E8B" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#104E8B" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Blue Soundwave Path */}
            <path
              d={
                isListening || isPlaying
                  ? "M 10 50 Q 70 20 130 50 T 250 50 T 370 50"
                  : "M 10 50 Q 80 40 150 50 T 270 50 T 390 50"
              }
              stroke="url(#waveBlue)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className={isListening || isPlaying ? "animate-pulse" : ""}
            />

            {/* Green Soundwave Path */}
            <path
              d={
                isListening || isPlaying
                  ? "M 30 50 Q 110 80 180 50 T 300 50 T 390 50"
                  : "M 20 50 Q 100 60 180 50 T 290 50 T 380 50"
              }
              stroke="url(#waveGreen)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className={isListening || isPlaying ? "animate-pulse" : ""}
            />
          </svg>

          {/* Central Circular Mic Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={toggleListening}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-xl flex items-center justify-center transition transform hover:scale-105 active:scale-95 border-2 ${
                isListening
                  ? "border-red-500 ring-8 ring-red-500/20 animate-pulse text-red-600"
                  : "border-red-200 text-red-600 hover:border-red-400"
              }`}
              aria-label="Toggle Microphone"
            >
              {isListening ? (
                <MicOff className="w-8 h-8 text-red-600" />
              ) : (
                <Mic className="w-8 h-8 text-red-600" />
              )}
            </button>
          </div>
        </div>

        {/* "Speak" Pill Button below Mic */}
        <div className="mt-4 flex flex-col items-center gap-1.5">
          <button
            onClick={toggleListening}
            className={`px-6 py-2 rounded-full border text-xs font-bold transition shadow-xs flex items-center space-x-1.5 ${
              isListening
                ? "bg-red-600 text-white border-red-600 ring-2 ring-red-400"
                : "bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>
              {isListening 
                ? (t.voiceListeningBtn || "Listening... (Tap to Send)") 
                : `${t.voiceSpeakBtn || "Speak"} (${currentLangMeta.native})`}
            </span>
          </button>
          <span className="text-[11px] text-gray-500">
            {selectedVoiceLang === "auto" 
              ? "✨ Speak in any language — automatic detection active" 
              : `Selected language: ${currentLangMeta.label}`}
          </span>
        </div>
      </div>

      {/* BOTTOM TRANSCRIPTION & QUERY BAR */}
      <div className="pt-4 border-t border-blue-100/80">
        <div className="flex flex-col sm:flex-row items-center gap-2 max-w-3xl mx-auto w-full">
          <div className="flex-1 w-full bg-white rounded-2xl border border-gray-200 px-4 py-2.5 shadow-xs flex items-center space-x-2 focus-within:ring-2 focus-within:ring-red-500">
            <Mic className="w-4 h-4 text-red-600 shrink-0" />
            <input
              type="text"
              value={transcribedText}
              onChange={(e) => {
                const val = e.target.value;
                setTranscribedText(val);
                if (val.trim().length > 3) {
                  const det = detectClientLanguage(val);
                  if (det && det !== "en") {
                    setActiveLangCode(det);
                  }
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  queryAssistant(transcribedText);
                }
              }}
              placeholder={t.voiceInputPlaceholder || "Spoken or typed question: Ask anything in any of 12 languages..."}
              className="w-full text-xs sm:text-sm font-medium text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
            />
          </div>

          <button
            onClick={() => queryAssistant(transcribedText)}
            disabled={!transcribedText.trim() || isThinking}
            className="px-5 py-2.5 rounded-2xl bg-[#1E7E34] hover:bg-[#2BB656] text-white text-xs font-bold shadow-md transition flex items-center space-x-1.5 shrink-0 disabled:opacity-50"
          >
            {isThinking ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{t.voiceAskBtn || "Ask"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistantView;
