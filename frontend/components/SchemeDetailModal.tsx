"use client";

import React, { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { 
  X, 
  ShieldCheck, 
  User, 
  Users, 
  Sprout, 
  Landmark, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  Home as HomeIcon, 
  Info,
  Calendar,
  Sparkles
} from "lucide-react";

interface SchemeDetailModalProps {
  scheme: any;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onGoToDashboard: () => void;
  userProfile?: {
    name: string;
    familyCount: number;
    landholding: string;
    bankAccountMasked: string;
  };
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  isOpen,
  onClose,
  lang,
  onGoToDashboard,
  userProfile = {
    name: "Amit Kumar Singh",
    familyCount: 4,
    landholding: "1.5 Hectare",
    bankAccountMasked: "XXXX1234",
  },
}) => {
  if (!isOpen || !scheme) return null;

  const t = translations[lang] || translations.en;
  const schemeName = lang === "hi" && scheme.name_hi ? scheme.name_hi : scheme.name;
  const schemeDesc = lang === "hi" && scheme.description_hi ? scheme.description_hi : scheme.description;

  const defaultKeyBenefitsEn = [
    "Direct financial support credited directly to Aadhaar-seeded bank account",
    "Benefits to small and marginal landholders across all states & UTs",
    "Zero intermediary deduction with Direct Benefit Transfer (DBT)",
  ];

  const defaultKeyBenefitsHi = [
    "आधार से जुड़े बैंक खाते में सीधे वित्तीय सहायता जमा",
    "सभी राज्यों और केंद्रशासित प्रदेशों में छोटे व सीमांत किसानों को लाभ",
    "प्रत्यक्ष लाभ अंतरण (DBT) के माध्यम से बिना किसी बिचौलिए के 100% भुगतान",
  ];

  const defaultCriteriaEn = [
    "Landholding farmers with cultivable land records",
    "Small & marginal landholders categorized in revenue titles",
    "Status check active on national beneficiary portal",
  ];

  const defaultCriteriaHi = [
    "खेती योग्य भूमि रिकॉर्ड वाले भूमिधारक किसान",
    "राजस्व अभिलेखों में पंजीकृत छोटे और सीमांत किसान",
    "राष्ट्रीय लाभार्थी पोर्टल पर आधार सक्रियता सत्यापित",
  ];

  const defaultDocumentsEn = [
    "Aadhaar Card",
    "Land ownership papers",
    "Bank account passbook",
    "Passport photos",
    "Mobile number linked to Aadhaar",
  ];

  const defaultDocumentsHi = [
    "आधार कार्ड",
    "भूमि स्वामित्व दस्तावेज / खतौनी",
    "बैंक खाता पासबुक",
    "पासपोर्ट साइज फोटो",
    "आधार से जुड़ा मोबाइल नंबर",
  ];

  const keyBenefits = lang === "hi"
    ? (scheme.key_benefits_hi || defaultKeyBenefitsHi)
    : (scheme.key_benefits || defaultKeyBenefitsEn);

  const criteriaList = lang === "hi"
    ? (scheme.eligibility_criteria_bullets_hi || defaultCriteriaHi)
    : (scheme.eligibility_criteria_bullets || defaultCriteriaEn);

  const documentList = lang === "hi"
    ? (scheme.required_documents_hi || defaultDocumentsHi)
    : (scheme.required_documents || defaultDocumentsEn);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-5xl w-full overflow-hidden relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar with Close Button */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/70">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#104E8B] inline-block" />
            <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate max-w-xl">
              {schemeName} - {t.detailedInfoTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          {/* TOP SECTION: Left Overview + Right Family Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Top-Left Overview Box (Matching Image 3) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {/* Real Scheme Photographic Image (Replaced hardcoded vector) */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gray-100 border border-gray-200 shrink-0 overflow-hidden shadow-sm relative">
                  <img
                    src={scheme.image_url || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"}
                    alt={schemeName}
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[9px] font-bold tracking-wider uppercase">
                    {scheme.category || "Welfare"}
                  </div>
                </div>

                {/* Scheme Name & Quick Details */}
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-extrabold text-gray-900 leading-tight">
                    {schemeName}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {schemeDesc}
                  </p>

                  {/* Yellow Last Date Badge (Matching Image 3) */}
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-100 text-amber-950 font-extrabold text-xs border border-amber-300">
                    <span>{t.lastDateApply}</span>
                    <span className="text-gray-950 font-black">{scheme.last_date_to_apply || (lang === "hi" ? "31 दिसंबर 2026" : "31st December 2026")}</span>
                  </div>
                </div>
              </div>

              {/* Benefits Include Bullets */}
              <div className="space-y-1.5 pt-1">
                <div className="text-xs font-bold text-gray-900">
                  {t.benefitsInclude}
                </div>
                <ul className="space-y-1 text-xs text-gray-700">
                  {keyBenefits.map((b: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Top-Right: Am I Eligible & Family Summary (Matching Image 3) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Blue Header Card: Am I Eligible? */}
              <div className="bg-gradient-to-r from-[#104E8B] to-[#0A2540] text-white p-4 rounded-2xl flex items-center space-x-3.5 shadow-md shadow-blue-900/20">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/30 text-[#2BB656]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-extrabold leading-tight">
                    {t.amIEligibleTitle}
                  </h4>
                  <p className="text-xs text-blue-200 mt-0.5">
                    {t.amIEligibleSubtitle}
                  </p>
                </div>
              </div>

              {/* Your Family Summary Container (Matching Image 3) */}
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-200">
                <div className="text-xs font-bold text-gray-900 mb-3 flex items-center space-x-1.5">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span>{t.familySummaryTitle}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  {/* Farmer Name */}
                  <div className="flex items-start space-x-2.5">
                    <User className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-gray-500 text-[11px]">{t.labelFarmerName}</div>
                      <div className="font-bold text-gray-900 text-sm mt-0.5">
                        {userProfile.name}
                      </div>
                    </div>
                  </div>

                  {/* Family Members */}
                  <div className="flex items-start space-x-2.5">
                    <Users className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-gray-500 text-[11px]">{t.labelFamilyMembers}</div>
                      <div className="font-bold text-gray-900 text-sm mt-0.5">
                        {userProfile.familyCount} {t.membersUnit}
                      </div>
                    </div>
                  </div>

                  {/* Land Holding */}
                  <div className="flex items-start space-x-2.5">
                    <Sprout className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-gray-500 text-[11px]">{t.labelLandHolding}</div>
                      <div className="font-bold text-gray-900 text-sm mt-0.5">
                        {userProfile.landholding}
                      </div>
                    </div>
                  </div>

                  {/* Bank Account */}
                  <div className="flex items-start space-x-2.5">
                    <Landmark className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-gray-500 text-[11px]">{t.labelBankAccount}</div>
                      <div className="font-bold text-gray-900 text-sm mt-0.5 font-mono">
                        {userProfile.bankAccountMasked}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: 3 Structured Left Boxes + Right Eligibility Success Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 border-t border-gray-100">
            {/* Bottom-Left 3 Boxes (Matching Image 3) */}
            <div className="lg:col-span-6 space-y-3">
              {/* Box 1: Eligible Criteria */}
              <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200">
                <div className="font-bold text-xs text-gray-900 mb-2">
                  {t.criteriaTitle}
                </div>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {criteriaList.map((crit: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 2: Documents Required */}
              <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                <div className="font-bold text-xs text-gray-900 mb-2">
                  {t.documentsTitle}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-700">
                  {documentList.map((doc: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 3: Application Process */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                <div className="font-bold text-xs text-gray-900">
                  {t.applicationProcessTitle}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <a
                    href={scheme.direct_apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#104E8B] hover:text-[#0A2540] flex items-center space-x-1 hover:underline"
                  >
                    <span>{t.applicationLinkText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {scheme.guideline_pdf_url && (
                    <a
                      href={scheme.guideline_pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#1E7E34] hover:text-[#2BB656] flex items-center space-x-1 hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{lang === "hi" ? "आधिकारिक दिशा-निर्देश (PDF)" : "Official Guidelines (PDF)"}</span>
                    </a>
                  )}
                </div>
              </div>
                        </div>

            {/* Bottom-Right: You are Eligible Card & Actions (Matching Image 3) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              {/* Big Green Success Container */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center space-x-3.5">
                  {/* Big Green Check Circle */}
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/30">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-gray-950">
                      {t.youAreEligibleTitle} {schemeName}
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {lang === "hi"
                        ? `आपको ${schemeName} के अंतर्गत ₹${scheme.max_benefit_amount.toLocaleString("en-IN")} प्रति वर्ष का लाभ प्राप्त होगा।`
                        : `You will receive ₹${scheme.max_benefit_amount.toLocaleString("en-IN")} per year under ${schemeName}.`}
                    </p>
                  </div>
                </div>

                {/* Next Installment Calendar Pill */}
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white border border-emerald-200 text-xs font-semibold text-gray-800 shadow-2xs">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>{t.nextInstallmentLabel}</span>
                  <span className="font-bold text-gray-900">{scheme.next_installment_date || (lang === "hi" ? "दिसंबर 2026" : "December 2026")}</span>
                </div>
              </div>

              {/* Action Buttons Row - Removed Go to Dashboard button as requested */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={scheme.direct_apply_url || "https://www.india.gov.in"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#104E8B] to-[#1E7E34] hover:from-[#0A2540] hover:to-[#166534] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-xl transform active:scale-95 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{lang === "hi" ? "आधिकारिक पोर्टल पर आवेदन करें" : "Apply on Official Portal"}</span>
                </a>
              </div>

              {/* Information Note at Bottom (Matching Image 3) */}
              <div className="flex items-start space-x-2 text-[11px] text-gray-500 pt-1">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  {t.cscAdvisoryNote}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
