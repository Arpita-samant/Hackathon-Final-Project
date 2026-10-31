"use client";

import React, { useState } from "react";
import { 
  X, 
  Phone, 
  User, 
  GraduationCap, 
  Sprout, 
  Briefcase, 
  Hammer, 
  ShoppingBag, 
  Home, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare,
  KeyRound,
  AlertCircle
} from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: "signup" | "login";
  onClose: () => void;
  lang: Language;
  onAuthSuccess: (user: any, token: string) => void;
}

const OCCUPATION_ROLES = [
  { id: "Student", label: "Student", labelHi: "छात्र / छात्रा", icon: GraduationCap, color: "text-purple-600 bg-purple-50 border-purple-200" },
  { id: "Farmer", label: "Farmer", labelHi: "किसान", icon: Sprout, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { id: "Daily Wage Worker", label: "Daily Wage Worker", labelHi: "दैनिक वेतनभोगी", icon: Hammer, color: "text-amber-600 bg-amber-50 border-amber-200" },
  { id: "Small Business Owner", label: "Small Business / Vendor", labelHi: "लघु व्यापारी / दुकानदार", icon: ShoppingBag, color: "text-blue-600 bg-blue-50 border-blue-200" },
  { id: "Artisan / Craftsman", label: "Artisan / Craftsman", labelHi: "कारीगर / शिल्पकार", icon: Briefcase, color: "text-rose-600 bg-rose-50 border-rose-200" },
  { id: "Homemaker", label: "Homemaker", labelHi: "गृहिणी", icon: Home, color: "text-teal-600 bg-teal-50 border-teal-200" },
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = "signup",
  onClose,
  lang,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<"signup" | "login">(initialMode);
  const [step, setStep] = useState<"details" | "otp">("details");

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("Farmer");
  const [stateName, setStateName] = useState("Uttar Pradesh");
  const [annualIncome, setAnnualIncome] = useState("180000");
  const [otp, setOtp] = useState("");
  
  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [smsSimulationBanner, setSmsSimulationBanner] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const cleanPhone = phone.trim().replace("+91", "").replace(/\s/g, "");
    if (cleanPhone.length !== 10 || !/^\d+$/.test(cleanPhone)) {
      setErrorMsg(lang === "hi" ? "कृपया 10 अंकों का वैध भारतीय मोबाइल नंबर दर्ज करें।" : "Please enter a valid 10-digit Indian mobile number.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, purpose: mode }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Failed to send SMS OTP.");
      }

      setSmsSimulationBanner(`📩 SMS Gateway: "Your Yojana Sahayak verification code is ${data.demo_otp}. Valid for 10 minutes."`);
      setOtp(data.demo_otp || "123456");
      setStep("otp");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send SMS OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const cleanPhone = phone.trim().replace("+91", "").replace(/\s/g, "");

    try {
      const endpoint = mode === "signup" ? "/api/auth/verify-and-register" : "/api/auth/login";
      const bodyPayload = mode === "signup" ? {
        phone: cleanPhone,
        otp: otp.trim(),
        name: name.trim() || "Citizen User",
        occupation_category: occupation,
        state: stateName,
        caste_category: "General",
        annual_income: parseFloat(annualIncome) || 0,
      } : {
        phone: cleanPhone,
        otp: otp.trim(),
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      const userData = await res.json();
      if (!res.ok) {
        throw new Error(userData.detail || "Verification failed.");
      }

      // Save to localStorage for data isolation
      localStorage.setItem("yojana_auth_token", userData.auth_token);
      localStorage.setItem("yojana_user_id", userData.id);
      localStorage.setItem("yojana_user_profile", JSON.stringify(userData));

      onAuthSuccess(userData, userData.auth_token);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-lg w-full overflow-hidden relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/70">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-gray-900 leading-tight">
                {mode === "signup"
                  ? (lang === "hi" ? "नागरिक खाता बनाएं" : "Create Citizen Account")
                  : (lang === "hi" ? "नागरिक लॉगिन" : "Citizen Login")}
              </h3>
              <p className="text-[11px] text-gray-500">
                {mode === "signup"
                  ? (lang === "hi" ? "एसएमएस सत्यापन द्वारा सुरक्षित खाता निर्माण" : "Mobile SMS OTP Verified Registration")
                  : (lang === "hi" ? "अपने पंजीकृत मोबाइल नंबर से लॉगिन करें" : "Access your saved welfare schemes & profile")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher: Sign Up vs Login */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setStep("details");
                setErrorMsg("");
                setSmsSimulationBanner(null);
              }}
              className={`py-2 text-xs font-bold rounded-xl transition ${
                mode === "signup" ? "bg-white text-red-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {lang === "hi" ? "नया खाता (Sign Up)" : "Sign Up"}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setStep("details");
                setErrorMsg("");
                setSmsSimulationBanner(null);
              }}
              className={`py-2 text-xs font-bold rounded-xl transition ${
                mode === "login" ? "bg-white text-red-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {lang === "hi" ? "लॉगिन (Login)" : "Login"}
            </button>
          </div>
        </div>

        {/* SMS Simulator Alert Banner */}
        {smsSimulationBanner && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-start space-x-2 shadow-xs">
            <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{smsSimulationBanner}</div>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Body Form */}
        <div className="p-6">
          {step === "details" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {mode === "signup" && (
                <>
                  {/* Category / Role Selection (Student, Farmer, etc.) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      {lang === "hi" ? "आपकी मुख्य श्रेणी / पेशा (चुनें):" : "Your Category / Occupation (Select):"}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {OCCUPATION_ROLES.map((role) => {
                        const Icon = role.icon;
                        const isSelected = occupation === role.id;
                        return (
                          <button
                            key={role.id}
                            type="button"
                            onClick={() => setOccupation(role.id)}
                            className={`p-2.5 rounded-xl border text-left transition flex flex-col items-start ${
                              isSelected
                                ? "bg-red-50 border-red-500 ring-2 ring-red-500/20"
                                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? "text-red-600" : "text-gray-500"}`} />
                            <span className="text-xs font-bold text-gray-900 leading-tight">
                              {lang === "hi" ? role.labelHi : role.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {lang === "hi" ? "पूरा नाम" : "Full Name"}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={lang === "hi" ? "उदा. राहुल शर्मा" : "e.g., Rahul Sharma"}
                        className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === "hi" ? "10 अंकों का मोबाइल नंबर (एसएमएस हेतु)" : "10-Digit Mobile Number (For SMS Verification)"}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 flex items-center space-x-1 text-xs font-bold text-gray-600">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full pl-16 pr-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Informative Note: Documents are NOT compulsory at registration */}
              {mode === "signup" && (
                <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-[11px] text-blue-900 leading-relaxed">
                  💡 <strong>{lang === "hi" ? "दस्तावेज़ अनिवार्य नहीं हैं:" : "Documents are not mandatory right now:"}</strong>{" "}
                  {lang === "hi"
                    ? "आधार कार्ड, पैन कार्ड या अन्य प्रमाण आप खाता बनाने के बाद कभी भी 'मेरी प्रोफ़ाइल' में अपलोड कर सकते हैं।"
                    : "Aadhaar card, PAN card, or income certificates can be uploaded anytime later from My Profile. It is not compulsory at signup."}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#104E8B] hover:bg-[#0A2540] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-900/15 transition flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>{lang === "hi" ? "एसएमएस भेजा जा रहा है..." : "Sending SMS OTP..."}</span>
                ) : (
                  <span>{lang === "hi" ? "एसएमएस ओटीपी प्राप्त करें" : "Send OTP via SMS"}</span>
                )}
              </button>
            </form>
          ) : (
            /* OTP Verification Step */
            <form onSubmit={handleVerifyOtpAndSubmit} className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-extrabold text-gray-900">
                  {lang === "hi" ? "एसएमएस ओटीपी दर्ज करें" : "Enter SMS Verification Code"}
                </h4>
                <p className="text-xs text-gray-500">
                  {lang === "hi" ? `कोड +91 ${phone} पर भेजा गया है` : `6-digit code sent to +91 ${phone}`}
                </p>
              </div>

              <div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full text-center tracking-widest text-xl font-bold py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#1E7E34] hover:bg-[#2BB656] text-white text-xs sm:text-sm font-bold shadow-md shadow-green-900/15 transition flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>{lang === "hi" ? "सत्यापन जारी है..." : "Verifying & Authenticating..."}</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{mode === "signup" ? (lang === "hi" ? "सत्यापित करें और खाता बनाएं" : "Verify & Create Account") : (lang === "hi" ? "सत्यापित करें और लॉगिन करें" : "Verify & Login")}</span>
                  </>
                )}
              </button>

              <div className="flex justify-between items-center text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="text-gray-500 hover:text-gray-800 underline"
                >
                  {lang === "hi" ? "नंबर बदलें" : "Change Mobile Number"}
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-[#104E8B] hover:text-[#1E7E34] font-bold"
                >
                  {lang === "hi" ? "ओटीपी पुनः भेजें" : "Resend OTP"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
