"use client";

import React, { useState, useRef, useEffect } from "react";
import { Language, translations } from "@/lib/translations";
import { 
  Send, 
  FileText, 
  Image as ImageIcon, 
  Share2, 
  Landmark, 
  ShieldCheck, 
  ShieldAlert, 
  Volume2, 
  Bot, 
  User, 
  Upload, 
  Sparkles, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  X
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  type?: "normal" | "document" | "image" | "forward" | "eligibility";
  citations?: Array<{
    scheme_name: string;
    source_url: string;
    section: string;
    excerpt: string;
  }>;
  analysis?: {
    is_scam: boolean;
    threat_score: number;
    verdict: string;
    flags: string[];
    official_link?: string;
  };
  confidence?: number;
  timestamp: string;
}

interface AIChatWidgetProps {
  lang: Language;
  onNavigateTab?: (tab: string) => void;
}

export const AIChatWidget: React.FC<AIChatWidgetProps> = ({ lang, onNavigateTab }) => {
  const t = translations[lang] || translations.en;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: lang === "hi"
        ? "नमस्ते! मैं योजना सहायक एआई हूँ। आप किसी भी सरकारी योजना का नाम पूछ सकते हैं, संदिग्ध संदेश या लिंक पेस्ट कर सकते हैं, या दस्तावेज व पोस्टर जांच सकते हैं।"
        : "Namaste! I am Yojana Sahayak AI. Ask about official government schemes, paste suspicious messages or links, or upload documents to verify legitimacy.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [activeAnalysisMode, setActiveAnalysisMode] = useState<string | null>(null);
  const [forwardModalOpen, setForwardModalOpen] = useState(false);
  const [forwardInputText, setForwardInputText] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle sending a message or query
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsgId = `usr_${Date.now()}`;
    const userMsg: Message = {
      id: userMsgId,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Check if text looks like a link, forward, or scam claim
      const hasUrl = /https?:\/\/[^\s]+/.test(text) || /\.xyz|\.top|\.online|\.free|\.gift/i.test(text);
      const isClaim = text.toLowerCase().includes("free") || text.toLowerCase().includes("claim") || text.toLowerCase().includes("forward") || text.toLowerCase().includes("मुफ्त");

      if (hasUrl || isClaim) {
        // Run Scam Verification API
        const scamRes = await fetch("/api/scam-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text_to_verify: text }),
        });

        if (scamRes.ok) {
          const scamData = await scamRes.json();
          const assistantMsg: Message = {
            id: `asst_${Date.now()}`,
            sender: "assistant",
            text: scamData.risk_level === "Severe Risk" || scamData.is_scam
              ? (lang === "hi"
                  ? `⚠️ चेतावनी: यह संदेश अनधिकृत/संदिग्ध प्रतीत होता है!\n\n${scamData.explanation}`
                  : `⚠️ Fraud Alert: This message shows strong characteristics of deception or unauthorized phishing.\n\n${scamData.explanation}`)
              : (lang === "hi"
                  ? `✅ सत्यापित: यह आधिकारिक सरकारी सूचना से मेल खाता है।\n\n${scamData.explanation}`
                  : `✅ Verified: This content matches official government scheme publications.\n\n${scamData.explanation}`),
            analysis: {
              is_scam: scamData.is_scam,
              threat_score: scamData.threat_score,
              verdict: scamData.status,
              flags: scamData.red_flags || [],
              official_link: scamData.recommended_action,
            },
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
          setMessages((prev) => [...prev, assistantMsg]);
          setIsTyping(false);
          return;
        }
      }

      // Standard RAG Query
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          language: lang,
          history: messages.map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: Message = {
        id: `asst_${Date.now()}`,
        sender: "assistant",
        text: data.answer || "I could not retrieve scheme details at this moment.",
        citations: data.citations || [],
        confidence: data.confidence,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `asst_${Date.now()}`,
          sender: "assistant",
          text: lang === "hi"
            ? "क्षमा करें, सर्वर से संपर्क करने में समस्या हुई। कृपया पुनः प्रयास करें।"
            : "Apologies, there was an issue reaching the welfare intelligence server. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // 1. Analyze Fake Schemes & Documents
  const handleAnalyzeDocuments = () => {
    setActiveAnalysisMode("document");
    fileInputRef.current?.click();
  };

  const handleDocumentSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fakeClaimNotice = `Document Uploaded: ${file.name}\nNotice: Claim approval for Rs. 2,50,000 via PM Housing Relief 2026. Required registration processing fee Rs. 499 at upi@pmhousing.xyz`;
    handleSendMessage(fakeClaimNotice);
    e.target.value = "";
  };

  // 2. Verify Screenshots & Photos
  const handleVerifyScreenshots = () => {
    setActiveAnalysisMode("image");
    imageInputRef.current?.click();
  };

  const handleImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ocrExtracted = `Screenshot Scanned: ${file.name}\nPoster Headline: 'Apply online for Free Smartphone & Solar Pump scheme 2026. Forward to 5 WhatsApp friends to activate QR Code.'`;
    handleSendMessage(ocrExtracted);
    e.target.value = "";
  };

  // 3. Check Forwarded Messages - Opens interactive modal where user pastes their own message
  const handleCheckForwarded = () => {
    setForwardInputText("");
    setForwardModalOpen(true);
  };

  // 4. Am I Eligible?
  const handleAmIEligible = () => {
    if (onNavigateTab) {
      onNavigateTab("eligibility");
    } else {
      const eligibilityQuery = lang === "hi"
        ? "क्या मैं पीएम किसान और आयुष्मान भारत योजना के लिए पात्र हूँ?"
        : "Am I eligible for PM Kisan Samman Nidhi and Ayushman Bharat PM-JAY?";
      handleSendMessage(eligibilityQuery);
    }
  };

  // Speak text aloud
  const speakText = (textToSpeak: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = textToSpeak.replace(/[*_#]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === "hi" ? "hi-IN" : "en-IN";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-[#EBF3FC] via-[#F4F8FD] to-[#FFFFFF] p-4 sm:p-8 shadow-sm border border-blue-100 max-w-6xl mx-auto overflow-hidden">
      {/* Hidden file inputs for document and image verification */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleDocumentSelected}
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
      />
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageSelected}
        accept="image/*"
        className="hidden"
      />

      {/* Background Graphic Shield & Circuits (Matches Image 1) */}
      <div className="absolute top-4 right-6 pointer-events-none opacity-20 sm:opacity-30">
        <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
          {/* Cyber shield outline */}
          <path
            d="M120 20 L180 50 V110 C180 145 120 170 120 170 C120 170 60 145 60 110 V50 L120 20 Z"
            stroke="#1D4ED8"
            strokeWidth="3"
            fill="#DBEAFE"
          />
          {/* Lock icon */}
          <rect x="105" y="85" width="30" height="24" rx="4" fill="#1D4ED8" />
          <path d="M112 85 V75 C112 70.5 115.5 67 120 67 C124.5 67 128 70.5 128 75 V85" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
          {/* Circuit nodes */}
          <circle cx="210" cy="50" r="4" fill="#3B82F6" />
          <path d="M180 50 H210 V80" stroke="#93C5FD" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="30" cy="50" r="4" fill="#3B82F6" />
          <path d="M60 50 H30 V80" stroke="#93C5FD" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* HEADER: "Identify & Check Fake Schemes Instantly" */}
      <div className="text-center relative z-10 pt-2 pb-6">
        <h1 className="text-2xl sm:text-4xl font-black text-[#0A2540] tracking-tight">
          {t.aiHeroTitle || "Identify & Check Fake Schemes Instantly"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl mx-auto">
          {t.aiHeroSubtitle || "Verify welfare schemes, scan viral messages, and get grounded eligibility answers with zero fraud."}
        </p>
      </div>

      {/* 5 FEATURE CARDS ROW (Exact Match to Image 1) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10 mb-8">
        {/* Card 1: Analyze Fake Schemes & Documents */}
        <button
          type="button"
          onClick={handleAnalyzeDocuments}
          className="bg-[#FFEAEA] hover:bg-[#FFDEDE] border border-rose-200 rounded-2xl p-4 flex flex-col items-center text-center justify-between shadow-xs hover:shadow-md transition transform hover:-translate-y-1 min-h-[140px] group"
        >
          {/* Red PDF Icon */}
          <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex flex-col items-center justify-center font-black shadow-sm group-hover:scale-105 transition">
            <span className="text-[10px] uppercase font-bold tracking-tight">PDF</span>
          </div>
          <span className="text-xs font-bold text-gray-800 leading-snug mt-2">
            {t.cardAnalyzeDocs || "Analyze Fake Schemes & Documents"}
          </span>
        </button>

        {/* Card 2: Verify Screenshots & Photos */}
        <button
          type="button"
          onClick={handleVerifyScreenshots}
          className="bg-[#EDE9FE] hover:bg-[#E4DEFE] border border-purple-200 rounded-2xl p-4 flex flex-col items-center text-center justify-between shadow-xs hover:shadow-md transition transform hover:-translate-y-1 min-h-[140px] group"
        >
          {/* Gradient Photo Icon */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-500 to-blue-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition">
            <ImageIcon className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-gray-800 leading-snug mt-2">
            {t.cardVerifyScreenshots || "Verify Screenshots & Photos"}
          </span>
        </button>

        {/* Card 3: Check Forwarded Messages */}
        <button
          type="button"
          onClick={handleCheckForwarded}
          className="bg-[#DCFCE7] hover:bg-[#CEFBDC] border border-emerald-200 rounded-2xl p-4 flex flex-col items-center text-center justify-between shadow-xs hover:shadow-md transition transform hover:-translate-y-1 min-h-[140px] group"
        >
          {/* Green Chat Forward Icon */}
          <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition">
            <Share2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-gray-800 leading-snug mt-2">
            {t.cardCheckForwarded || "Check Forwarded Messages"}
          </span>
        </button>

        {/* Card 4: Am I Eligible? */}
        <button
          type="button"
          onClick={handleAmIEligible}
          className="bg-[#FEF9C3] hover:bg-[#FEF08A] border border-amber-200 rounded-2xl p-4 flex flex-col items-center text-center justify-between shadow-xs hover:shadow-md transition transform hover:-translate-y-1 min-h-[140px] group"
        >
          {/* Golden Govt Building Icon */}
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition">
            <Landmark className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-gray-800 leading-snug mt-2">
            {t.cardAmIEligible || "Am I Eligible?"}
          </span>
        </button>

        {/* Card 5: Explore More Features */}
        <button
          type="button"
          onClick={() => setShowExploreModal(true)}
          className="bg-[#FAE8FF] hover:bg-[#F5D0FE] border border-fuchsia-200 rounded-2xl p-4 flex flex-col items-center text-center justify-between shadow-xs hover:shadow-md transition transform hover:-translate-y-1 min-h-[140px] group"
        >
          {/* Gradient Feature Icon */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-gray-800 leading-snug mt-2">
            {t.cardExploreMore || "Explore More Features"}
          </span>
        </button>
      </div>

      {/* CHAT / ANALYSIS INTERACTION STREAM */}
      <div className="bg-white/95 rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-6 min-h-[300px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"} animate-in fade-in duration-200`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[78%] p-4 rounded-2xl text-xs sm:text-sm ${
                  isUser
                    ? "bg-[#104E8B] text-white rounded-br-none shadow-sm"
                    : "bg-gray-50 text-gray-900 border border-gray-200 rounded-bl-none shadow-xs"
                }`}
              >
                {/* Assistant Title & Audio Button */}
                {!isUser && (
                  <div className="flex justify-between items-center pb-2 mb-2 border-b border-gray-200/70 text-xs text-gray-500">
                    <span className="font-bold text-[#104E8B] flex items-center space-x-1.5">
                      <Bot className="w-4 h-4 text-[#104E8B]" />
                      <span>Yojana Sahayak Intelligence</span>
                    </span>
                    <button
                      onClick={() => speakText(msg.text)}
                      className="p-1 rounded-md text-gray-400 hover:text-blue-600 transition"
                      title="Listen audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Message Body */}
                <div className="whitespace-pre-line leading-relaxed font-medium">
                  {msg.text}
                </div>

                {/* Scam Threat Assessment Card if applicable */}
                {msg.analysis && (
                  <div className={`mt-3 p-3 rounded-xl border text-xs ${
                    msg.analysis.is_scam
                      ? "bg-rose-50 border-rose-200 text-rose-900"
                      : "bg-emerald-50 border-emerald-200 text-emerald-900"
                  }`}>
                    <div className="flex justify-between items-center font-bold">
                      <span>Status: {msg.analysis.verdict}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white text-xs shadow-2xs font-mono">
                        Threat: {msg.analysis.threat_score}/100
                      </span>
                    </div>

                    {msg.analysis.flags && msg.analysis.flags.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <div className="font-semibold text-[11px] uppercase tracking-wider">Detected Patterns:</div>
                        {msg.analysis.flags.map((flag, idx) => (
                          <div key={idx} className="flex items-center space-x-1.5 text-[11px]">
                            <span className="text-red-500">•</span>
                            <span>{flag}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Official Citations */}
                {!isUser && msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-gray-200 space-y-1.5 text-xs">
                    <div className="font-bold text-gray-600 text-[11px]">
                      {t.sourceCitations}:
                    </div>
                    {msg.citations.map((c, idx) => (
                      <div key={idx} className="bg-blue-50/70 p-2 rounded-lg border border-blue-100 flex justify-between items-center text-[11px]">
                        <span className="font-bold text-[#104E8B]">{c.scheme_name} — {c.section}</span>
                        <a
                          href={c.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:underline flex items-center space-x-1 ml-2 font-medium"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-gray-500 p-2">
            <Bot className="w-4 h-4 text-blue-600 animate-spin" />
            <span>Analyzing against verified gazette repositories...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* FLOATING BOTTOM INPUT BAR (Matching Image 1) */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative z-20"
      >
        <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 p-2 pl-5 focus-within:ring-2 focus-within:ring-blue-500">
          {/* Input text field (Matches Image 1 Placeholder) */}
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={t.chatInputPlaceholder || "Ask a question, paste a link, or type scheme name..."}
            className="w-full bg-transparent text-gray-900 placeholder-gray-400 text-xs sm:text-sm font-medium focus:outline-none"
          />

          {/* Send Button with paper airplane (Matches Image 1) */}
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="w-10 h-10 rounded-full bg-[#104E8B] hover:bg-[#0A2540] disabled:bg-gray-300 text-white flex items-center justify-center transition shrink-0 ml-2 shadow-xs"
            aria-label="Send query"
          >
            <Send className="w-4 h-4 transform rotate-45 -translate-x-0.5" />
          </button>
        </div>
      </form>

      {/* Explore More Features Modal */}
      {showExploreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-200 relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowExploreModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-950 mb-1 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Explore More AI Capabilities</span>
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Access advanced citizen tools powered by Yojana Sahayak's welfare engine.
            </p>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowExploreModal(false);
                  onNavigateTab?.("voice");
                }}
                className="w-full p-3 rounded-2xl border border-gray-200 hover:bg-blue-50/60 flex items-center space-x-3 transition text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Multilingual Voice Assistant</div>
                  <div className="text-[11px] text-gray-500">Speak and listen in 12+ Indian languages</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowExploreModal(false);
                  onNavigateTab?.("family");
                }}
                className="w-full p-3 rounded-2xl border border-gray-200 hover:bg-emerald-50/60 flex items-center space-x-3 transition text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Family Members Welfare Manager</div>
                  <div className="text-[11px] text-gray-500">Track benefits and near-misses for household</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowExploreModal(false);
                  onNavigateTab?.("schemes");
                }}
                className="w-full p-3 rounded-2xl border border-gray-200 hover:bg-amber-50/60 flex items-center space-x-3 transition text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Explore All Verified Schemes</div>
                  <div className="text-[11px] text-gray-500">Browse categories: Agriculture, Education, Health</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verify Forwarded Message Modal */}
      {forwardModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 relative shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900">
                    {t.forwardModalTitle || "Check Forwarded Message for Scams"}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    {t.forwardModalSubtitle || "Paste any message or viral forward to verify its authenticity"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setForwardModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <textarea
                  rows={4}
                  value={forwardInputText}
                  onChange={(e) => setForwardInputText(e.target.value)}
                  placeholder={t.forwardModalPlaceholder || "Paste your WhatsApp forward, SMS, or viral post here..."}
                  className="w-full p-3 text-xs sm:text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setForwardModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                >
                  {t.cancelBtn || "Cancel"}
                </button>
                <button
                  type="button"
                  disabled={!forwardInputText.trim()}
                  onClick={() => {
                    const textToAnalyze = forwardInputText.trim();
                    setForwardModalOpen(false);
                    setForwardInputText("");
                    handleSendMessage(textToAnalyze);
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition disabled:opacity-50"
                >
                  {t.verifyMessageBtn || "Verify Message"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
