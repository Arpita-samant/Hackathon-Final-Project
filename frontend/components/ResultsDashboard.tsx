"use client";

import React, { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ExternalLink, 
  Printer, 
  ArrowLeft, 
  CheckSquare, 
  Square,
  Award,
  Clock,
  Sparkles,
  Users
} from "lucide-react";

interface ResultsDashboardProps {
  lang: Language;
  data: any;
  onBack: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  lang,
  data,
  onBack,
}) => {
  const t = translations[lang];
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [selectedMemberFilter, setSelectedMemberFilter] = useState<string>("all");

  const toggleDoc = (docKey: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docKey]: !prev[docKey],
    }));
  };

  const eligibleSchemes = data?.eligible_schemes || [];
  const nearMisses = data?.near_misses || [];
  const appliedExclusions = data?.applied_mutual_exclusions || [];
  const memberBreakdown = data?.member_breakdown || {};
  const totalBenefit = data?.total_potential_benefit_amount || 0;

  // Filter schemes by member if requested
  const filteredEligible = selectedMemberFilter === "all"
    ? eligibleSchemes
    : eligibleSchemes.filter((s: any) => s.matched_member === selectedMemberFilter);

  const filteredNearMiss = selectedMemberFilter === "all"
    ? nearMisses
    : nearMisses.filter((nm: any) => nm.matched_member === selectedMemberFilter);

  const memberNames = Object.keys(memberBreakdown);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Top Bar with Back & Print */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-sm font-semibold text-[#104E8B] hover:text-[#0A2540] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === "hi" ? "वापस जाएं व विवरण बदलें" : "Modify Details / Recalculate"}</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          <Printer className="w-4 h-4 text-gray-600" />
          <span>{lang === "hi" ? "चेकलिस्ट प्रिंट / सेव करें" : "Print & Save Welfare Checklist"}</span>
        </button>
      </div>

      {/* Household Benefit Summary Hero Card */}
      <div className="rounded-2xl bg-gradient-to-r from-[#104E8B] to-[#0A2540] text-white p-6 sm:p-8 shadow-lg">
        <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Award className="w-4 h-4" />
          <span>{lang === "hi" ? "सत्यापित पात्रता गणना सारांश" : "Verified Welfare Evaluation Summary"}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h2 className="text-sm sm:text-base font-medium text-blue-100">
              {t.totalAnnualBenefit}
            </h2>
            <div className="text-3xl sm:text-5xl font-extrabold text-amber-300 mt-1 tracking-tight">
              ₹{totalBenefit.toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-blue-200 mt-2">
              {lang === "hi"
                ? "यह राशि आपके परिवार के सभी योग्य सदस्यों के प्रत्यक्ष लाभ, स्वास्थ्य बीमा व अनुदान को जोड़कर है।"
                : "Combined net potential direct transfers, healthcare cover, and subsidies across family members."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {eligibleSchemes.length}
              </div>
              <div className="text-xs text-blue-100">{t.eligibleSchemesCount}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-300">
                {nearMisses.length}
              </div>
              <div className="text-xs text-blue-100">{t.nearMissCount}</div>
            </div>
          </div>
        </div>

        {/* Member Filter Pills (if multiple members) */}
        {memberNames.length > 1 && (
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs text-blue-200 font-semibold flex items-center space-x-1">
              <Users className="w-3.5 h-3.5" />
              <span>{lang === "hi" ? "सदस्य अनुसार देखें:" : "Filter by Member:"}</span>
            </span>
            <button
              onClick={() => setSelectedMemberFilter("all")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                selectedMemberFilter === "all"
                  ? "bg-amber-400 text-gray-900"
                  : "bg-white/15 text-white hover:bg-white/25"
              }`}
            >
              All Household ({eligibleSchemes.length})
            </button>
            {memberNames.map((name) => (
              <button
                key={name}
                onClick={() => setSelectedMemberFilter(name)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  selectedMemberFilter === name
                    ? "bg-amber-400 text-gray-900"
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {name} ({memberBreakdown[name]?.eligible_schemes_count || 0})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 1: ELIGIBLE SCHEMES LIST */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-6 h-6 text-[#1E7E34]" />
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            {lang === "hi" ? "पात्र कल्याणकारी योजनाएं" : "Eligible Welfare Schemes"} ({filteredEligible.length})
          </h3>
        </div>

        {filteredEligible.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200 text-gray-500">
            {lang === "hi"
              ? "इस सदस्य के लिए कोई सीधी पात्र योजना नहीं मिली। कृपया नीचे निकटवर्ती (Near-Miss) सुझाव देखें।"
              : "No direct schemes match this filter. Please check Near-Miss opportunities below."}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {filteredEligible.map((scheme: any, idx: number) => (
              <div
                key={scheme.scheme_id + idx}
                className="bg-white rounded-2xl p-6 border border-gray-200 gov-card shadow-sm"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-gray-100">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-[#1E7E34] border border-green-200">
                        100% {lang === "hi" ? "पात्र" : "Eligible"}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-[#104E8B]">
                        {scheme.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {lang === "hi" ? "लाभार्थी:" : "Beneficiary:"} <strong>{scheme.matched_member}</strong>
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900">
                      {lang === "hi" ? scheme.scheme_name_hi : scheme.scheme_name}
                    </h4>
                    <p className="text-xs text-gray-500">{scheme.ministry}</p>
                  </div>

                  {/* Benefit Pill */}
                  <div className="text-left sm:text-right shrink-0 bg-blue-50/70 p-3 rounded-xl border border-blue-100">
                    <div className="text-xs text-gray-500 font-medium">
                      {lang === "hi" ? "अधिकतम लाभ राशि" : "Max Benefit"}
                    </div>
                    <div className="text-lg font-extrabold text-[#104E8B]">
                      ₹{scheme.max_benefit_amount.toLocaleString("en-IN")}
                      <span className="text-xs font-normal text-gray-600 ml-1">
                        / {scheme.benefit_frequency}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description & Why eligible */}
                <div className="py-4 space-y-2">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {lang === "hi" ? scheme.description_hi : scheme.description}
                  </p>
                  <div className="p-3 rounded-xl bg-green-50/70 border border-green-200 text-xs text-[#1E7E34]">
                    <strong>{t.whyEligible}:</strong> {lang === "hi" ? scheme.why_eligible_hi : scheme.why_eligible}
                  </div>
                </div>

                {/* Document Checklist with interactive checkboxes */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="text-xs font-bold text-gray-800 mb-2 flex items-center space-x-1">
                    <CheckSquare className="w-3.5 h-3.5 text-[#104E8B]" />
                    <span>{t.documentsChecklist}:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {scheme.required_documents.map((doc: string, dIdx: number) => {
                      const docKey = `${scheme.scheme_id}_${dIdx}`;
                      const isDone = !!checkedDocs[docKey];
                      return (
                        <div
                          key={dIdx}
                          onClick={() => toggleDoc(docKey)}
                          className={`flex items-center space-x-2 p-2 rounded-lg text-xs cursor-pointer transition border ${
                            isDone
                              ? "bg-green-50 border-green-300 text-green-900"
                              : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {isDone ? (
                            <CheckSquare className="w-4 h-4 text-green-600 shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400 shrink-0" />
                          )}
                          <span className={isDone ? "line-through opacity-75" : ""}>
                            {doc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="mt-4 pt-3 flex justify-end">
                  <a
                    href={scheme.direct_apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-[#104E8B] hover:bg-[#0A2540] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition"
                  >
                    <span>{t.officialApplyBtn}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: NEAR-MISS & FUTURE ELIGIBILITY PROJECTIONS */}
      {filteredNearMiss.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Clock className="w-6 h-6 text-[#E99A28]" />
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                {t.nearMissHeadline} ({filteredNearMiss.length})
              </h3>
              <p className="text-xs text-gray-500">
                {lang === "hi"
                  ? "वे योजनाएं जहां आप केवल थोड़े से अंतर से चूक गए हैं, एवं भविष्य में पात्र होने का समय।"
                  : "Schemes where criteria was narrowly missed, with exact calculated deltas & actionable bridging tips."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredNearMiss.map((nm: any, idx: number) => (
              <div
                key={nm.scheme_id + idx}
                className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-200 text-amber-900 border border-amber-300">
                      Near-Miss ({nm.failed_criteria})
                    </span>
                    <span className="text-xs text-gray-600">
                      {lang === "hi" ? "सदस्य:" : "Member:"} <strong>{nm.matched_member}</strong>
                    </span>
                  </div>
                  {nm.future_eligibility_timeline && (
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                      ⏳ {nm.future_eligibility_timeline}
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-gray-900">
                  {lang === "hi" ? nm.scheme_name_hi : nm.scheme_name}
                </h4>

                {/* Delta Explanation */}
                <div className="mt-2 text-xs font-semibold text-red-700 bg-white/80 p-2.5 rounded-lg border border-red-200">
                  <span className="font-bold">{t.nearMissExplanation}:</span> {lang === "hi" ? nm.delta_explanation_hi : nm.delta_explanation}
                </div>

                {/* Actionable Guidance */}
                <div className="mt-2 text-xs text-gray-800 bg-white/90 p-3 rounded-lg border border-amber-200">
                  <span className="font-bold text-[#104E8B]">{t.actionableTip}:</span> {lang === "hi" ? nm.actionable_tip_hi : nm.actionable_tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: APPLIED POLICY MUTUAL EXCLUSIONS */}
      {appliedExclusions.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-gray-700">
            <AlertTriangle className="w-5 h-5 text-gray-500" />
            <h4 className="text-sm font-bold">
              {t.mutualExclusionNotice} ({appliedExclusions.length})
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {appliedExclusions.map((ex: any, idx: number) => (
              <div
                key={idx}
                className="bg-gray-100 rounded-xl p-3 text-xs text-gray-700 border border-gray-300"
              >
                <div className="font-bold text-gray-900">{ex.scheme_name} ({ex.member})</div>
                <div className="text-gray-600 mt-1">{ex.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
