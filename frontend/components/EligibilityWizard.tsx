"use client";

import React, { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Calculator, 
  Sparkles, 
  HelpCircle,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export interface MemberFormState {
  id: string;
  name: string;
  relation: string;
  age: number;
  gender: string;
  annual_income: number;
  occupation: string;
  caste_category: string;
  state: string;
  landholding_acres: number;
  is_disabled: boolean;
  is_student: boolean;
  marital_status: string;
  has_lpg_connection: boolean;
}

interface EligibilityWizardProps {
  lang: Language;
  onEvaluationComplete: (results: any) => void;
  initialMode?: "single" | "family";
}

const INDIAN_STATES = [
  "All-India",
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi (NCT)",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const OCCUPATIONS = [
  { id: "Farmer", label_en: "Farmer (किसान)", label_hi: "किसान" },
  { id: "Street Vendor", label_en: "Street Vendor / Hawker (रेहड़ी पटरी)", label_hi: "रेहड़ी-पटरी / फेरीवाला" },
  { id: "Artisan/Craftsman", label_en: "Artisan / Craftsman (कारीगर/शिल्पकार)", label_hi: "कारीगर / पारंपरिक शिल्पकार" },
  { id: "Daily Wage/Laborer", label_en: "Daily Wage / Laborer (दैनिक मजदूर)", label_hi: "दैनिक मजदूर / निर्माण श्रमिक" },
  { id: "Student", label_en: "Student (विद्यार्थी)", label_hi: "विद्यार्थी / छात्र" },
  { id: "Self-Employed", label_en: "Small Shop / Self-Employed (दुकानदार/स्वरोजगार)", label_hi: "छोटा व्यवसायी / स्वरोजगार" },
  { id: "Salaried", label_en: "Private / Salaried Employee (वेतनभोगी)", label_hi: "वेतनभोगी कर्मचारी" },
  { id: "Unemployed", label_en: "Homemaker / Unemployed (गृहिणी/बेरोजगार)", label_hi: "गृहिणी / बेरोजगार" }
];

export const EligibilityWizard: React.FC<EligibilityWizardProps> = ({
  lang,
  onEvaluationComplete,
  initialMode = "single",
}) => {
  const t = translations[lang];
  const [isFamilyMode, setIsFamilyMode] = useState(initialMode === "family");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const defaultMember = (id: string, name: string = "Applicant", relation: string = "Self"): MemberFormState => ({
    id,
    name,
    relation,
    age: 35,
    gender: "Male",
    annual_income: 120000,
    occupation: "Farmer",
    caste_category: "OBC",
    state: "Uttar Pradesh",
    landholding_acres: 1.5,
    is_disabled: false,
    is_student: false,
    marital_status: "Married",
    has_lpg_connection: false,
  });

  const [members, setMembers] = useState<MemberFormState[]>([defaultMember("m1", "Ramesh Kumar", "Self")]);

  const handleAddMember = () => {
    const nextIdx = members.length + 1;
    const newMember = defaultMember(
      `m_${Date.now()}`,
      `Family Member ${nextIdx}`,
      nextIdx === 2 ? "Spouse" : "Child"
    );
    newMember.age = nextIdx === 2 ? 32 : 10;
    newMember.gender = nextIdx === 2 ? "Female" : "Male";
    newMember.annual_income = 0;
    newMember.landholding_acres = 0;
    newMember.occupation = nextIdx === 2 ? "Unemployed" : "Student";
    newMember.is_student = nextIdx > 2;

    setMembers([...members, newMember]);
  };

  const handleRemoveMember = (id: string) => {
    if (members.length <= 1) return;
    setMembers(members.filter((m) => m.id !== id));
  };

  const updateMember = (id: string, field: keyof MemberFormState, value: any) => {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  // Demo Loaders
  const loadDemoFarmerFamily = () => {
    setIsFamilyMode(true);
    setMembers([
      {
        id: "d1",
        name: "Rameshwar Singh",
        relation: "Self",
        age: 44,
        gender: "Male",
        annual_income: 140000,
        occupation: "Farmer",
        caste_category: "OBC",
        state: "Uttar Pradesh",
        landholding_acres: 2.2,
        is_disabled: false,
        is_student: false,
        marital_status: "Married",
        has_lpg_connection: false,
      },
      {
        id: "d2",
        name: "Kamla Devi",
        relation: "Spouse",
        age: 40,
        gender: "Female",
        annual_income: 45000,
        occupation: "Artisan/Craftsman",
        caste_category: "OBC",
        state: "Uttar Pradesh",
        landholding_acres: 0,
        is_disabled: false,
        is_student: false,
        marital_status: "Married",
        has_lpg_connection: false,
      },
      {
        id: "d3",
        name: "Anjali Singh",
        relation: "Child",
        age: 9,
        gender: "Female",
        annual_income: 0,
        occupation: "Student",
        caste_category: "OBC",
        state: "Uttar Pradesh",
        landholding_acres: 0,
        is_disabled: false,
        is_student: true,
        marital_status: "Single",
        has_lpg_connection: false,
      }
    ]);
  };

  const loadDemoStudentNearMiss = () => {
    setIsFamilyMode(false);
    setMembers([
      {
        id: "d_student",
        name: "Pooja Sharma",
        relation: "Self",
        age: 19,
        gender: "Female",
        annual_income: 268000, // 18,000 above 2.5L limit
        occupation: "Student",
        caste_category: "SC",
        state: "Rajasthan",
        landholding_acres: 0,
        is_disabled: false,
        is_student: true,
        marital_status: "Single",
        has_lpg_connection: false,
      }
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/eligibility/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          family_members: isFamilyMode ? members : [members[0]],
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      onEvaluationComplete(data);
    } catch (err: any) {
      console.error("Evaluation error:", err);
      setErrorMsg(
        lang === "hi"
          ? "गणना में त्रुटि हुई। कृपया सर्वर कनेक्शन जांचें।"
          : "Evaluation failed. Please verify the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-200 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A2540] flex items-center space-x-2">
            <Calculator className="w-6 h-6 text-[#104E8B]" />
            <span>{t.navEligibility}</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {lang === "hi"
              ? "सटीक पात्रता और नियर-मिस (Near-Miss) अंतर जानने के लिए विवरण दर्ज करें।"
              : "Enter demographic details for mathematically verified eligibility & near-miss deltas."}
          </p>
        </div>

        {/* Mode Toggle Button */}
        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
          <button
            type="button"
            onClick={() => {
              setIsFamilyMode(false);
              if (members.length > 1) setMembers([members[0]]);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
              !isFamilyMode ? "bg-white text-[#104E8B] shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {t.modeSingle}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsFamilyMode(true);
              if (members.length === 1) handleAddMember();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
              isFamilyMode ? "bg-white text-[#104E8B] shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {t.modeFamily}
          </button>
        </div>
      </div>

      {/* Preset Demo Buttons */}
      <div className="mt-4 p-3 bg-blue-50/70 rounded-xl border border-blue-200 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-[#104E8B] flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === "hi" ? "त्वरित परीक्षण नमूना भरें:" : "Quick Test Presets:"}</span>
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={loadDemoFarmerFamily}
            className="text-xs bg-white hover:bg-blue-100 text-[#104E8B] font-medium px-2.5 py-1 rounded-lg border border-blue-300 transition"
          >
            🌾 {lang === "hi" ? "किसान परिवार (3 सदस्य)" : "Farmer Family (3 Members)"}
          </button>
          <button
            type="button"
            onClick={loadDemoStudentNearMiss}
            className="text-xs bg-white hover:bg-blue-100 text-[#104E8B] font-medium px-2.5 py-1 rounded-lg border border-blue-300 transition"
          >
            🎓 {lang === "hi" ? "विद्यार्थी (Near-Miss आय अंतर)" : "Student (Near-Miss ₹18K Delta)"}
          </button>
        </div>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {members.map((member, idx) => (
          <div
            key={member.id}
            className="p-5 sm:p-6 rounded-xl border border-gray-200 bg-gray-50/60 relative"
          >
            {/* Member Title Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-7 h-7 rounded-full bg-[#104E8B] text-white flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </span>
                <span className="font-bold text-gray-900 text-sm sm:text-base">
                  {isFamilyMode ? `${member.name} (${member.relation})` : member.name}
                </span>
              </div>

              {isFamilyMode && members.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMember(member.id)}
                  className="text-red-600 hover:text-red-700 p-1 rounded-md hover:bg-red-50 text-xs font-medium flex items-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.removeMember}</span>
                </button>
              )}
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {lang === "hi" ? "पूरा नाम" : "Full Name"}
                </label>
                <input
                  type="text"
                  required
                  value={member.name}
                  onChange={(e) => updateMember(member.id, "name", e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                />
              </div>

              {/* Relationship (Only in family mode) */}
              {isFamilyMode && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === "hi" ? "मुखिया से संबंध" : "Relation to Head"}
                  </label>
                  <select
                    value={member.relation}
                    onChange={(e) => updateMember(member.id, "relation", e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                  >
                    <option value="Self">Self (स्वयं)</option>
                    <option value="Spouse">Spouse (पति / पत्नी)</option>
                    <option value="Child">Child (पुत्र / पुत्री)</option>
                    <option value="Parent">Parent (माता / पिता)</option>
                    <option value="Sibling">Sibling (भाई / बहन)</option>
                    <option value="Other">Other (अन्य)</option>
                  </select>
                </div>
              )}

              {/* Age */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {lang === "hi" ? "आयु (वर्ष)" : "Age (Years)"}
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  required
                  value={member.age}
                  onChange={(e) => updateMember(member.id, "age", parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {lang === "hi" ? "लिंग" : "Gender"}
                </label>
                <select
                  value={member.gender}
                  onChange={(e) => updateMember(member.id, "gender", e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                >
                  <option value="Male">Male (पुरुष)</option>
                  <option value="Female">Female (महिला)</option>
                  <option value="Transgender">Transgender (तृतीय लिंग)</option>
                </select>
              </div>

              {/* Annual Income */}
              <div className="sm:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    {lang === "hi" ? "व्यक्तिगत वार्षिक आय (₹)" : "Annual Income (INR ₹)"}
                  </label>
                  <span className="text-xs font-bold text-[#104E8B]">
                    ₹{member.annual_income.toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={member.annual_income}
                  onChange={(e) => updateMember(member.id, "annual_income", parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                />
                {/* Income presets */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {[0, 60000, 120000, 250000, 400000].map((inc) => (
                    <button
                      key={inc}
                      type="button"
                      onClick={() => updateMember(member.id, "annual_income", inc)}
                      className="px-2 py-0.5 rounded bg-gray-200 hover:bg-gray-300 text-[11px] text-gray-700 font-medium"
                    >
                      ₹{inc === 0 ? "0" : `${inc / 1000}k`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Occupation */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {lang === "hi" ? "मुख्य व्यवसाय" : "Primary Occupation"}
                </label>
                <select
                  value={member.occupation}
                  onChange={(e) => updateMember(member.id, "occupation", e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                >
                  {OCCUPATIONS.map((occ) => (
                    <option key={occ.id} value={occ.id}>
                      {lang === "hi" ? occ.label_hi : occ.label_en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Caste Category */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {lang === "hi" ? "सामाजिक वर्ग (जाति)" : "Caste Category"}
                </label>
                <select
                  value={member.caste_category}
                  onChange={(e) => updateMember(member.id, "caste_category", e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                >
                  <option value="General">General (सामान्य)</option>
                  <option value="OBC">OBC (अन्य पिछड़ा वर्ग)</option>
                  <option value="SC">SC (अनुसूचित जाति)</option>
                  <option value="ST">ST (अनुसूचित जनजाति)</option>
                  <option value="EWS">EWS (आर्थिक कमजोर वर्ग)</option>
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {lang === "hi" ? "राज्य / केंद्र शासित प्रदेश" : "State / UT"}
                </label>
                <select
                  value={member.state}
                  onChange={(e) => updateMember(member.id, "state", e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Landholding */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {lang === "hi" ? "कृषि भूमि (एकड़)" : "Agricultural Land (Acres)"}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={member.landholding_acres}
                  onChange={(e) => updateMember(member.id, "landholding_acres", parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                />
              </div>

              {/* Checkbox Attributes */}
              <div className="sm:col-span-2 flex flex-wrap gap-4 pt-2">
                <label className="flex items-center space-x-2 text-xs font-medium text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={member.is_student}
                    onChange={(e) => updateMember(member.id, "is_student", e.target.checked)}
                    className="w-4 h-4 text-[#104E8B] rounded border-gray-300 focus:ring-[#104E8B]"
                  />
                  <span>{lang === "hi" ? "सक्रिय विद्यार्थी / छात्र" : "Enrolled Student"}</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-medium text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={member.is_disabled}
                    onChange={(e) => updateMember(member.id, "is_disabled", e.target.checked)}
                    className="w-4 h-4 text-[#104E8B] rounded border-gray-300 focus:ring-[#104E8B]"
                  />
                  <span>{lang === "hi" ? "दिव्यांगजन (Disability >=40%)" : "Person with Disability (UDID)"}</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-medium text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={member.has_lpg_connection}
                    onChange={(e) => updateMember(member.id, "has_lpg_connection", e.target.checked)}
                    className="w-4 h-4 text-[#104E8B] rounded border-gray-300 focus:ring-[#104E8B]"
                  />
                  <span>{lang === "hi" ? "घरेलू गैस कनेक्शन उपलब्ध" : "Has Existing LPG"}</span>
                </label>
              </div>
            </div>
          </div>
        ))}

        {/* Add Family Member Button */}
        {isFamilyMode && (
          <button
            type="button"
            onClick={handleAddMember}
            className="w-full py-3 border-2 border-dashed border-blue-300 hover:border-[#104E8B] rounded-xl text-sm font-semibold text-[#104E8B] hover:bg-blue-50/50 transition flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>{t.addFamilyMember}</span>
          </button>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-[#104E8B] hover:bg-[#0A2540] disabled:bg-blue-400 text-white font-bold text-base shadow-lg transition flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>{loading ? t.evaluatingBtn : t.evaluateBtn}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
