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
  Loader2
} from "lucide-react";

interface VoiceAssistantViewProps {
  lang: Language;
}

const VOICE_LANGUAGES = [
  { code: "en-IN", langKey: "en", label: "English (India)" },
  { code: "hi-IN", langKey: "hi", label: "हिन्दी (Hindi)" },
  { code: "bn-IN", langKey: "bn", label: "বাংলা (Bengali)" },
  { code: "te-IN", langKey: "te", label: "తెలుగు (Telugu)" },
  { code: "ta-IN", langKey: "ta", label: "தமிழ் (Tamil)" },
  { code: "mr-IN", langKey: "mr", label: "मराठी (Marathi)" },
  { code: "gu-IN", langKey: "gu", label: "ગુજરાતી (Gujarati)" },
  { code: "kn-IN", langKey: "kn", label: "ಕನ್ನಡ (Kannada)" },
  { code: "ml-IN", langKey: "ml", label: "മലയാളം (Malayalam)" },
  { code: "pa-IN", langKey: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "or-IN", langKey: "or", label: "ଓଡ଼ିଆ (Odia)" },
  { code: "as-IN", langKey: "as", label: "অসমীয়া (Assamese)" },
];

export const VoiceAssistantView: React.FC<VoiceAssistantViewProps> = ({ lang }) => {
  const t = translations[lang] || translations.en;
  const [selectedVoiceLang, setSelectedVoiceLang] = useState(
    VOICE_LANGUAGES.find((vl) => vl.langKey === lang)?.code || "en-IN"
  );
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcribedText, setTranscribedText] = useState(
    lang === "hi" 
      ? "मैं किसानों और लघु व्यापार हेतु सरकारी सहायता योजनाओं की जानकारी चाहता हूँ..." 
      : "I'm looking for financial support schemes for small businesses and farmers..."
  );
  const [assistantResponse, setAssistantResponse] = useState(
    "Hello! I am Yojana Sahayak.\nHow can I help you find government schemes today?"
  );
  const [citations, setCitations] = useState<any[]>([]);

  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef<string>("");

  // Sync with prop lang changes
  useEffect(() => {
    const match = VOICE_LANGUAGES.find((vl) => vl.langKey === lang);
    if (match) {
      setSelectedVoiceLang(match.code);
    }
  }, [lang]);

  // Multilingual Greetings
  const greetings: Record<string, string> = {
    "en-IN": "Hello! I am Yojana Sahayak.\nHow can I help you find government schemes today?",
    "hi-IN": "नमस्ते! मैं योजना सहायक हूँ।\nआज सरकारी योजनाएं खोजने में मैं आपकी क्या मदद कर सकता हूँ?",
    "bn-IN": "নমস্কার! আমি যোজনা সহায়ক।\nআজ সরকারি প্রকল্প খুঁজতে আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
    "te-IN": "నమస్కారం! నేను యోజన సహాయక్.\nప్రభుత్వ పథకాలను కనుగొనడంలో నేను మీకు ఎలా సహాయపడగలను?",
    "ta-IN": "வணக்கம்! நான் யோஜனா சகாயக்.\nஅரசு திட்டங்களை கண்டறிய நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
    "mr-IN": "नमस्कार! मी योजना सहायक आहे.\nआज सरकारी योजना शोधण्यात मी तुम्हाला कशी मदत करू शकतो?",
    "gu-IN": "નમસ્તે! હું યોજના સહાયક છું.\nઆજે સરકારી યોજનાઓ શોધવામાં હું તમને કેવી રીતે મદદ કરી શકું?",
    "kn-IN": "ನಮಸ್ಕಾರ! ನಾನು ಯೋಜನಾ ಸಹಾಯಕ.\nಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಲು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    "ml-IN": "നമസ്കാരം! ഞാൻ യോജന സഹായക്.\nസർക്കാർ പദ്ധതികൾ കണ്ടെത്താൻ ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കും?",
    "pa-IN": "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਯੋਜਨਾ ਸਹਾਇਕ ਹਾਂ।\nਸਰਕਾਰੀ ਸਕੀਮਾਂ ਲੱਭਣ ਵਿੱਚ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
    "or-IN": "ନମସ୍କାର! ମୁଁ ଯୋଜନା ସହାୟକ।\nଆଜି ସରକਾਰୀ ଯୋଜନା ଖୋଜିବାରେ ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?",
    "as-IN": "নমস্কাৰ! মই যোজনা সহায়ক।\nআজি চৰকাৰী আঁচনি বিচৰাত মই আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?",
  };

  useEffect(() => {
    setAssistantResponse(greetings[selectedVoiceLang] || greetings["en-IN"]);
  }, [selectedVoiceLang]);

  // Query Backend Assistant with Multilingual RAG
  const queryAssistant = async (queryText: string) => {
    const cleanQuery = queryText.trim();
    if (!cleanQuery) return;

    setIsThinking(true);
    setTranscribedText(cleanQuery);

    try {
      const langCode = selectedVoiceLang.split("-")[0];
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: cleanQuery,
          language: langCode
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAssistantResponse(data.answer);
        setCitations(data.citations || []);
        speakAloud(data.answer);
      }
    } catch (err) {
      console.error("Voice Assistant Query Error:", err);
      setAssistantResponse(
        selectedVoiceLang.startsWith("hi")
          ? "क्षमा करें, योजना सहायक सर्वर से उत्तर प्राप्त करने में असमर्थ रहा। कृपया पुनः बोलें।"
          : "Apologies, could not retrieve schemes from the AI server. Please try asking again."
      );
    } finally {
      setIsThinking(false);
    }
  };

  // Speech Recognition Setup
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition is supported in Google Chrome, Microsoft Edge, and modern browsers.");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = selectedVoiceLang;
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      transcriptRef.current = "";
      setTranscribedText(
        selectedVoiceLang.startsWith("hi") 
          ? "सुन रहा हूँ... कृपया अब अपने माइक्रोफ़ोन में बोलें" 
          : "Listening... Speak now into your microphone"
      );
    };

    recognition.onresult = (event: any) => {
      let currentTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      transcriptRef.current = currentTranscript;
      setTranscribedText(currentTranscript);
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

  // Text to Speech in the chosen Indian language
  const speakAloud = (textToSpeak: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const cleanText = textToSpeak.replace(/[*_#]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = selectedVoiceLang;

    // Pick voice if browser provides native accent
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = selectedVoiceLang.split("-")[0];
    const matchingVoice = voices.find(
      (v) => v.lang.toLowerCase() === selectedVoiceLang.toLowerCase() || v.lang.toLowerCase().startsWith(langPrefix)
    );
    if (matchingVoice) utterance.voice = matchingVoice;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayVoice = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      speakAloud(assistantResponse);
    }
  };

  // Quick prompt questions in selected language
  const samplePrompts: Record<string, string[]> = {
    "hi-IN": [
      "पीएम किसान सम्मान निधि की पात्रता क्या है?",
      "आयुष्मान भारत में ₹5 लाख का मुफ्त इलाज कैसे मिलता है?",
      "छात्रों के लिए छात्रवृत्ति योजनाएं बताएं",
      "मुद्रा लोन के तहत ₹50,000 का ऋण कैसे मिलेगा?"
    ],
    "en-IN": [
      "What is the eligibility for PM-KISAN scheme?",
      "How does Ayushman Bharat ₹5 Lakh health cover work?",
      "Show scholarship schemes for students",
      "How to apply for PM Mudra Shishu loan?"
    ],
  };

  const activePrompts = samplePrompts[selectedVoiceLang] || samplePrompts["en-IN"];

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-[#EBF3FC] via-[#F8FBFE] to-[#FFFFFF] p-6 sm:p-12 shadow-sm border border-blue-100 max-w-5xl mx-auto overflow-hidden min-h-[620px] flex flex-col justify-between">
      {/* Top Controls: Multilingual Indian Voice Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-6 border-b border-blue-100/80">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-gray-950 leading-tight">
              {t.voiceTitle || "Multilingual Voice Assistant"}
            </h2>
            <p className="text-[11px] text-gray-500">
              {t.voiceSubtitle || "Speak or listen in 12 Indian languages with grounded AI intelligence"}
            </p>
          </div>
        </div>

        {/* Language Picker Dropdown - No globe icon, clean dropdown chevron */}
        <div className="relative">
          <select
            value={selectedVoiceLang}
            onChange={(e) => {
              setSelectedVoiceLang(e.target.value);
              window.speechSynthesis?.cancel();
              setIsPlaying(false);
            }}
            className="appearance-none bg-white border border-gray-200 rounded-xl pl-3 pr-8 py-1.5 text-xs font-bold text-gray-800 shadow-2xs focus:ring-2 focus:ring-red-500 focus:outline-none cursor-pointer"
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

      {/* TOP SPEECH BUBBLE (Exact Match to Image 3) */}
      <div className="my-6 flex justify-start items-start">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-md border border-blue-100/80 max-w-2xl relative">
          <div className="flex items-start space-x-3.5">
            {/* Assistant Bot Icon Badge */}
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0 shadow-2xs">
              <Bot className="w-5 h-5" />
            </div>

            <div className="space-y-2 flex-1">
              {/* Soundwave Mini Indicator */}
              <div className="flex items-center space-x-1.5 text-xs text-red-600 font-bold">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span className="text-[11px] tracking-wide uppercase">Yojana Sahayak Voice</span>
              </div>

              {/* Response Text */}
              <div className="text-sm sm:text-base font-semibold text-gray-900 leading-relaxed whitespace-pre-line">
                {isThinking ? (
                  <div className="flex items-center space-x-2 text-gray-500 py-2">
                    <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                    <span>Searching official government scheme databases...</span>
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
                  <span>{t.voicePlayVoice || "Play/Voice"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Prompts Carousel */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        <span className="text-[11px] font-bold text-gray-500">{t.quickQuestionsLabel || "Quick Questions:"}</span>
        {activePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => queryAssistant(p)}
            className="px-3 py-1 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-red-600 border border-gray-200 text-xs font-medium shadow-2xs transition"
          >
            {p}
          </button>
        ))}
      </div>

      {/* CENTER VISUALIZER & SPEAK MIC BUTTON (Exact Match to Image 3) */}
      <div className="my-8 flex flex-col items-center justify-center relative">
        {/* Glowing Frequency Wave SVG Animation (Blue & Red overlapping waves) */}
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

            {/* Blue Soundwave Path (Deep Trust Blue) */}
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

            {/* Green Soundwave Path (Vibrant Foliage Green) */}
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

        {/* "Speak" Pill Button below Mic (Matching Image 3) */}
        <div className="mt-4">
          <button
            onClick={toggleListening}
            className={`px-6 py-2 rounded-full border text-xs font-bold transition shadow-xs ${
              isListening
                ? "bg-red-600 text-white border-red-600 ring-2 ring-red-400"
                : "bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
            }`}
          >
            {isListening ? (t.voiceListeningBtn || "Listening... (Tap to Send)") : (t.voiceSpeakBtn || "Speak")}
          </button>
        </div>
      </div>

      {/* BOTTOM TRANSCRIPTION & QUERY BAR (Matching Image 3) */}
      <div className="pt-4 border-t border-blue-100/80">
        <div className="flex flex-col sm:flex-row items-center gap-2 max-w-3xl mx-auto w-full">
          <div className="flex-1 w-full bg-white rounded-2xl border border-gray-200 px-4 py-2.5 shadow-xs flex items-center space-x-2 focus-within:ring-2 focus-within:ring-red-500">
            <Mic className="w-4 h-4 text-red-600 shrink-0" />
            <input
              type="text"
              value={transcribedText}
              onChange={(e) => setTranscribedText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  queryAssistant(transcribedText);
                }
              }}
              placeholder={t.voiceInputPlaceholder || "Spoken or typed question: Ask anything about schemes..."}
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
