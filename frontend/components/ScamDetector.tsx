"use client";

import React, { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  AlertOctagon, 
  PhoneCall, 
  Sparkles,
  Info
} from "lucide-react";

interface ScamDetectorProps {
  lang: Language;
  prefilledText?: string;
}

export const ScamDetector: React.FC<ScamDetectorProps> = ({
  lang,
  prefilledText = "",
}) => {
  const t = translations[lang];
  const [inputText, setInputText] = useState(prefilledText);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const sampleFake = 
    "URGENT ALERT! Prime Minister Free Laptop & Solar Scheme 2026: Under Digital India initiative, all students and women can receive a brand new HP Laptop and Solar Inverter for FREE! Offer valid only till tonight 12:00 AM. Hurry, only 400 slots left. Forward this message to 5 WhatsApp groups to generate approval code and pay Rs. 350 delivery charge via UPI on http://modi-free-laptop.xyz/claim";

  const sampleGenuine =
    "Official Notice from Ministry of Agriculture: Beneficiaries of PM-KISAN are informed that completion of e-KYC is mandatory to receive installment payments. You can update your e-KYC free of cost on the official portal https://pmkisan.gov.in using your Aadhaar number and OTP. Beware of fraudulent sites and never share your bank PIN.";

  const handleAnalyze = async (textToUse?: string) => {
    const text = (textToUse || inputText).trim();
    if (!text) return;

    setLoading(true);
    try {
      const response = await fetch("/api/scam-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text_to_verify: text }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Scam verification error:", err);
      alert("Failed to analyze text. Please verify backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-[#DC3545] font-bold text-sm uppercase tracking-wider mb-1">
          <ShieldAlert className="w-5 h-5" />
          <span>Anti-Fraud & Phishing Shield</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-[#0A2540]">
          {t.scamHeading}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {t.scamSubheading}
        </p>
      </div>

      {/* Quick Test Presets */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-red-50/60 rounded-xl border border-red-200">
        <span className="text-xs font-semibold text-red-900 flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === "hi" ? "नमूने जांचें:" : "Try Sample Scans:"}</span>
        </span>
        <button
          type="button"
          onClick={() => {
            setInputText(sampleFake);
            handleAnalyze(sampleFake);
          }}
          className="text-xs bg-red-100 hover:bg-red-200 text-red-900 px-3 py-1 rounded-lg font-medium transition"
        >
          🚨 {t.scamTrySample1}
        </button>
        <button
          type="button"
          onClick={() => {
            setInputText(sampleGenuine);
            handleAnalyze(sampleGenuine);
          }}
          className="text-xs bg-green-100 hover:bg-green-200 text-green-900 px-3 py-1 rounded-lg font-medium transition"
        >
          ✅ {t.scamTrySample2}
        </button>
      </div>

      {/* Input Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAnalyze();
        }}
        className="space-y-4"
      >
        <textarea
          rows={5}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.scamPlaceholder}
          className="w-full p-4 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading || !inputText.trim()}
          className="w-full py-3.5 rounded-xl bg-[#DC3545] hover:bg-[#b52a38] disabled:bg-gray-400 text-white font-bold text-sm sm:text-base shadow-lg transition flex items-center justify-center space-x-2"
        >
          <ShieldAlert className="w-5 h-5" />
          <span>{loading ? t.scamVerifyingBtn : t.scamVerifyBtn}</span>
        </button>
      </form>

      {/* Scan Results Card */}
      {result && (
        <div
          className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
            result.status === "FAKE"
              ? "bg-red-50/80 border-red-300 text-red-950"
              : result.status === "VERIFIED"
              ? "bg-green-50/80 border-green-300 text-green-950"
              : "bg-amber-50/80 border-amber-300 text-amber-950"
          }`}
        >
          {/* Status Verdict Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-black/10">
            <div className="flex items-center space-x-3">
              {result.status === "FAKE" ? (
                <AlertOctagon className="w-8 h-8 text-red-600 shrink-0" />
              ) : result.status === "VERIFIED" ? (
                <ShieldCheck className="w-8 h-8 text-green-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />
              )}
              <div>
                <div className="text-xs font-semibold tracking-wider uppercase opacity-75">
                  {t.scamThreatMeter}
                </div>
                <div className="text-xl sm:text-2xl font-black">
                  {result.status === "FAKE" && "🚨 FRAUDULENT SCHEME / FAKE FORWARD"}
                  {result.status === "VERIFIED" && "✅ VERIFIED OFFICIAL NOTIFICATION"}
                  {result.status === "SUSPICIOUS" && "⚠️ POTENTIALLY SUSPICIOUS / UNVERIFIED"}
                </div>
              </div>
            </div>

            {/* Confidence / Risk Pill */}
            <div className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-white shadow-xs border border-black/10">
              Risk Level: {result.risk_level} ({result.confidence_score}% Confidence)
            </div>
          </div>

          {/* Red Flag Tags */}
          {result.red_flags && result.red_flags.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                {lang === "hi" ? "पहचाने गए धोखाधड़ी के लक्षण:" : "Identified Phishing Red Flags:"}
              </div>
              <div className="flex flex-wrap gap-2">
                {result.red_flags.map((flag: string, fIdx: number) => (
                  <span
                    key={fIdx}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-red-200/80 text-red-900 border border-red-300"
                  >
                    ⚠️ {flag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Explanation */}
          <div className="bg-white/80 p-4 rounded-xl border border-black/10 text-sm leading-relaxed">
            <h4 className="font-bold mb-1">
              {lang === "hi" ? "विस्तृत विश्लेषण:" : "Detailed Threat Analysis:"}
            </h4>
            <p>{lang === "hi" ? result.explanation_hi : result.explanation}</p>
          </div>

          {/* Safe Guidance */}
          <div className="bg-white/80 p-4 rounded-xl border border-black/10 text-sm leading-relaxed">
            <h4 className="font-bold text-[#104E8B] mb-1">
              {lang === "hi" ? "नागरिक सुरक्षा दिशानिर्देश:" : "Citizen Safety Advisory:"}
            </h4>
            <p>{lang === "hi" ? result.safe_guidance_hi : result.safe_guidance}</p>
          </div>

          {/* Cybercrime Helpline / Action */}
          <div className="pt-2 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center space-x-2 text-xs font-semibold">
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>National Cyber Crime Helpline: <strong>1930</strong></span>
            </div>

            {result.official_verification_url && (
              <a
                href={result.official_verification_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-bold bg-[#0A2540] text-white px-4 py-2 rounded-lg hover:bg-black transition shadow-sm"
              >
                <span>Report / Verify at {result.official_verification_url.replace("https://", "")}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
