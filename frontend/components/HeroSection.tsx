"use client";

import React, { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { 
  Search, 
  Heart, 
  Sprout, 
  GraduationCap, 
  Home as HomeIcon, 
  Activity, 
  Briefcase,
  ChevronDown,
  FileText,
  Clock,
  Languages,
  Flame
} from "lucide-react";

interface HeroSectionProps {
  lang: Language;
  onSearch: (query: string, category?: string) => void;
  onSelectScheme: (schemeId: string) => void;
  onViewAllSchemes: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onSearch,
  onSelectScheme,
  onViewAllSchemes,
}) => {
  const t = translations[lang] || translations.en;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { id: "All", label: t.catAll, icon: null },
    { id: "Welfare", label: t.catWelfare, icon: Heart },
    { id: "Agriculture", label: t.catAgriculture, icon: Sprout },
    { id: "Scholarship", label: t.catScholarship, icon: GraduationCap },
    { id: "Housing", label: t.catHousing, icon: HomeIcon },
    { id: "Health", label: t.catHealth, icon: Activity },
    { id: "Employment", label: t.catEmployment, icon: Briefcase },
  ];

  const popularSchemes = [
    {
      id: "pm_kisan",
      name: lang === "hi" ? "प्रधानमंत्री किसान सम्मान निधि" : "PM Kisan Samman Nidhi",
      desc: lang === "hi" ? "किसानों को प्रति वर्ष ₹6,000 की वित्तीय सहायता" : "Financial support to farmers",
      icon: Sprout,
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      iconBg: "bg-emerald-100 text-emerald-700",
      btnText: "text-emerald-700 hover:text-emerald-800",
    },
    {
      id: "post_matric_scholarship",
      name: lang === "hi" ? "राष्ट्रीय छात्रवृत्ति पोर्टल" : "National Scholarship Portal",
      desc: lang === "hi" ? "विद्यार्थियों के लिए उच्च शिक्षा छात्रवृत्ति" : "Scholarships for students",
      icon: GraduationCap,
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconBg: "bg-blue-100 text-blue-700",
      btnText: "text-blue-700 hover:text-blue-800",
    },
    {
      id: "pmay_gramin",
      name: lang === "hi" ? "प्रधानमंत्री आवास योजना" : "Pradhan Mantri Awas Yojana",
      desc: lang === "hi" ? "सभी के लिए पक्का व किफायती आवास" : "Affordable housing for all",
      icon: HomeIcon,
      bg: "bg-amber-50",
      border: "border-amber-200",
      iconBg: "bg-amber-100 text-amber-700",
      btnText: "text-amber-700 hover:text-amber-800",
    },
    {
      id: "pmjay_ayushman",
      name: lang === "hi" ? "आयुष्मान भारत" : "Ayushman Bharat",
      desc: lang === "hi" ? "परिवारों के लिए ₹5 लाख का कैशलेस स्वास्थ्य बीमा" : "Health insurance for families",
      icon: Activity,
      bg: "bg-purple-50",
      border: "border-purple-200",
      iconBg: "bg-purple-100 text-purple-700",
      btnText: "text-purple-700 hover:text-purple-800",
    },
    {
      id: "mgnrega_work",
      name: lang === "hi" ? "महात्मा गांधी नरेगा" : "Mahatma Gandhi NREGA",
      desc: lang === "hi" ? "100 दिन का कानूनी गारंटीकृत रोजगार" : "Employment and livelihood",
      icon: Briefcase,
      bg: "bg-teal-50",
      border: "border-teal-200",
      iconBg: "bg-teal-100 text-teal-700",
      btnText: "text-teal-700 hover:text-teal-800",
    },
    {
      id: "pm_ujjwala",
      name: lang === "hi" ? "उज्ज्वला योजना" : "Ujjwala Yojana",
      desc: lang === "hi" ? "महिलाओं के लिए स्वच्छ रसोई गैस कनेक्शन" : "Clean cooking fuel for women",
      icon: Flame,
      bg: "bg-rose-50",
      border: "border-rose-200",
      iconBg: "bg-rose-100 text-rose-700",
      btnText: "text-rose-700 hover:text-rose-800",
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCategory === "All" ? "" : selectedCategory);
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    onSearch(searchQuery, catId === "All" ? "" : catId);
  };

  return (
    <div className="space-y-12">
      {/* HERO BANNER WITH USER'S SECOND ATTACHED IMAGE */}
      <div 
        className="relative rounded-3xl bg-[#0A2540] text-white overflow-hidden shadow-2xl min-h-[500px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(10, 37, 64, 0.98) 0%, rgba(10, 37, 64, 0.92) 45%, rgba(10, 37, 64, 0.35) 75%, rgba(10, 37, 64, 0.1) 100%), url('/hero-illustration.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="relative z-10 w-full p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headlines & Search */}
            <div className="lg:col-span-7 space-y-6">
              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {t.heroHeadlineMain}
                <span className="text-[#2BB656]">{t.heroHeadlineHighlight}</span>
              </h1>

              {/* Subhead */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                {t.heroSubheadline}
              </p>

              {/* Main Search Input Form */}
              <form onSubmit={handleSearchSubmit} className="max-w-2xl">
                <div className="flex items-center bg-white rounded-full p-1.5 shadow-xl border border-gray-200">
                  <div className="pl-4 pr-2 text-gray-400">
                    <Search className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-transparent text-gray-900 placeholder-gray-400 text-sm font-medium focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#1E7E34] hover:bg-[#2BB656] text-white px-7 py-3 rounded-full text-sm font-bold transition shadow-md shadow-green-950/30 shrink-0"
                  >
                    <span>{t.searchButton}</span>
                  </button>
                </div>
              </form>

              {/* Filter by Pills Row */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-gray-400 font-semibold mr-1 flex items-center space-x-1">
                  <span>{t.filterByLabel}</span>
                </span>
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full font-medium transition ${
                        isSelected
                          ? "bg-[#1E7E34] text-white font-bold shadow-md shadow-green-950/30"
                          : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10 backdrop-blur-xs"
                      }`}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={onViewAllSchemes}
                  className="flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 text-xs border border-white/10"
                >
                  <span>{t.catMore}</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Right Column: Beautifully showcase the artwork */}
            <div className="lg:col-span-5 relative flex flex-col justify-center items-end space-y-3.5">
              {/* Speech Bubble pointing to the illustrated citizen */}
              <div className="bg-white text-gray-900 px-4 py-2 rounded-2xl rounded-br-none shadow-2xl border border-gray-100 font-bold text-xs sm:text-sm transform -rotate-2 animate-bounce">
                <span>{t.speechBubble}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* POPULAR SCHEMES SECTION (Bilingual Support) */}
      <div className="space-y-4">
        {/* Section Header with Brand Vertical Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-6 bg-[#1E7E34] rounded-full inline-block" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#0A2540]">
                {t.popularSchemesTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 ml-3.5">
              {t.popularSchemesSubtitle}
            </p>
          </div>

          <button
            onClick={onViewAllSchemes}
            className="text-xs sm:text-sm font-bold text-[#104E8B] hover:text-[#1E7E34] transition"
          >
            <span>{t.viewAllSchemes}</span>
          </button>
        </div>

        {/* 6 Horizontal Pastel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularSchemes.map((scheme) => {
            const Icon = scheme.icon;
            return (
              <div
                key={scheme.id}
                onClick={() => onSelectScheme(scheme.id)}
                className={`p-5 rounded-2xl border ${scheme.border} ${scheme.bg} shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  {/* Icon Circle */}
                  <div className={`w-10 h-10 rounded-full ${scheme.iconBg} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                    {scheme.name}
                  </h3>

                  <p className="text-xs text-gray-600 mt-1">
                    {scheme.desc}
                  </p>
                </div>

                {/* Check Eligibility Button link */}
                <div className="mt-4 pt-2">
                  <span className={`inline-block text-xs font-bold ${scheme.btnText}`}>
                    <span>{t.checkEligibilityBtn}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
