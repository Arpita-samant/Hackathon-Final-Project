"use client";

import React, { useState, useEffect } from "react";
import { Language, translations } from "@/lib/translations";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Filter,
  CheckCircle,
  Sparkles,
  Database,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Layers
} from "lucide-react";
import { DataSourcesModal } from "@/components/DataSourcesModal";

interface SchemeDirectoryProps {
  lang: Language;
  onSelectScheme: (schemeId: string) => void;
  initialQuery?: string;
  initialCategory?: string;
  initialDomain?: string;
}

export const SchemeDirectory: React.FC<SchemeDirectoryProps> = ({
  lang,
  onSelectScheme,
  initialQuery = "",
  initialCategory = "All",
  initialDomain = "All",
}) => {
  const t = translations[lang] || translations.en;
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "All");
  const [selectedDomain, setSelectedDomain] = useState(initialDomain || "All");
  const [currentPage, setCurrentPage] = useState(0);
  const [isDataSourcesModalOpen, setIsDataSourcesModalOpen] = useState(false);

  const categories = ["All", "Welfare", "Agriculture", "Scholarship", "Housing", "Health", "Employment"];

  const domainOptions = [
    { id: "All", label: lang === "hi" ? "सभी 9 पोर्टल" : "All 9 Portals" },
    { id: "dbtbharat.gov.in", label: "DBT Bharat" },
    { id: "kisansuvidha.gov.in", label: "Kisan Suvidha" },
    { id: "scholarships.gov.in", label: "National Scholarships (NSP)" },
    { id: "eservices.uk.gov.in", label: "State e-District (Uttarakhand)" },
    { id: "buddy4study.com", label: "Buddy4Study & CSR" },
    { id: "vidyasaarathi.co.in", label: "NSDL Vidyasaarathi" },
  ];

  const categoryLabels: Record<string, string> = {
    All: t.catAll,
    Welfare: t.catWelfare,
    Agriculture: t.catAgriculture,
    Scholarship: t.catScholarship,
    Housing: t.catHousing,
    Health: t.catHealth,
    Employment: t.catEmployment,
  };

  useEffect(() => {
    fetch("/api/schemes")
      .then((res) => res.json())
      .then((data) => {
        if (data.schemes) {
          setSchemes(data.schemes);
        }
      })
      .catch((err) => console.error("Error loading schemes:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (initialQuery) setSearchQuery(initialQuery);
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialDomain) setSelectedDomain(initialDomain);
  }, [initialQuery, initialCategory, initialDomain]);

  // Filter schemes
  const filteredSchemes = schemes.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      s.name.toLowerCase().includes(q) ||
      (s.name_hi && s.name_hi.toLowerCase().includes(q)) ||
      (s.description && s.description.toLowerCase().includes(q)) ||
      (s.ministry && s.ministry.toLowerCase().includes(q)) ||
      (s.source_portal_name && s.source_portal_name.toLowerCase().includes(q)) ||
      (s.source_domain && s.source_domain.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === "All" ||
      s.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (s.tags && s.tags.some((t: string) => t.toLowerCase() === selectedCategory.toLowerCase()));

    const matchesDomain =
      selectedDomain === "All" ||
      (s.source_domain && s.source_domain.toLowerCase().includes(selectedDomain.toLowerCase()));

    return matchesQuery && matchesCategory && matchesDomain;
  });

  const pageSize = 3;
  const totalPages = Math.ceil(filteredSchemes.length / pageSize) || 1;

  const currentSchemes = filteredSchemes.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const getButtonBg = (color: string) => {
    switch (color) {
      case "green":
        return "bg-[#1E7E34] hover:bg-[#2BB656]";
      case "blue":
        return "bg-[#104E8B] hover:bg-[#0A2540]";
      case "orange":
        return "bg-[#EA580C] hover:bg-[#C2410C]";
      case "purple":
        return "bg-[#7C3AED] hover:bg-[#6D28D9]";
      case "teal":
        return "bg-[#0F766E] hover:bg-[#115E59]";
      case "pink":
        return "bg-[#DB2777] hover:bg-[#BE185D]";
      default:
        return "bg-[#104E8B] hover:bg-[#0A2540]";
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "agriculture":
        return "bg-[#1E7E34] text-white";
      case "scholarship":
        return "bg-[#7C3AED] text-white";
      case "housing":
        return "bg-[#EA580C] text-white";
      case "health":
        return "bg-[#E11D48] text-white";
      case "employment":
        return "bg-[#0F766E] text-white";
      case "welfare":
      default:
        return "bg-[#104E8B] text-white";
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-2">
      {/* Real-Time Live Portals Banner & Modal Trigger */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-[#0A2540] to-[#104E8B] text-white p-3.5 sm:p-4 rounded-2xl shadow-md border border-blue-900">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 text-[#2BB656]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2BB656] animate-pulse" />
              <span className="text-xs sm:text-sm font-extrabold tracking-tight">
                {lang === "hi" 
                  ? "रीयल-टाइम 9 आधिकारिक डेटा स्रोत सक्रिय" 
                  : "9 Authoritative Portals Ingested in Real-Time"}
              </span>
            </div>
            <p className="text-[11px] text-blue-200 mt-0.5">
              {lang === "hi"
                ? "DBT Bharat • UMANG • Kisan Suvidha • NSP • Apuni Sarkar • Buddy4Study • Vidyasaarathi"
                : "DBT Bharat • UMANG • Kisan Suvidha • NSP • Apuni Sarkar • Buddy4Study • Vidyasaarathi"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsDataSourcesModalOpen(true)}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#1E7E34] hover:bg-[#2BB656] text-white text-xs font-bold transition shadow-sm flex items-center justify-center space-x-1.5 shrink-0"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{lang === "hi" ? "डेटा स्रोत मॉनिटर देखें" : "View Data Sources"}</span>
        </button>
      </div>

      {/* Top Centered Search Bar & Category Filter Pills */}
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentPage(0);
          }}
          className="flex items-center bg-white rounded-2xl shadow-sm border border-gray-200 p-1.5 focus-within:ring-2 focus-within:ring-[#104E8B] focus-within:border-transparent"
        >
          <div className="pl-4 pr-2 text-gray-400">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(0);
            }}
            placeholder={t.directorySearchPlaceholder}
            className="w-full bg-transparent text-gray-900 placeholder-gray-400 text-sm font-medium focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#1E7E34] hover:bg-[#2BB656] text-white px-7 py-2.5 rounded-xl text-sm font-bold transition shadow-sm shrink-0"
          >
            {t.searchButton}
          </button>
        </form>

        {/* Filter by Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-gray-500 font-medium mr-1">{t.directoryFilterBy}</span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(0);
                }}
                className={`px-4 py-1.5 rounded-full font-semibold transition ${
                  isSelected
                    ? "bg-[#0A2540] text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200/60"
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            );
          })}
        </div>

        {/* Filter by Authoritative Portal Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] pt-1">
          <span className="text-gray-400 font-semibold mr-1 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E7E34]" />
            <span>{lang === "hi" ? "पोर्टल द्वारा फ़िल्टर करें:" : "Portal Source:"}</span>
          </span>
          {domainOptions.map((d) => {
            const isDomainSelected = selectedDomain === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setSelectedDomain(d.id);
                  setCurrentPage(0);
                }}
                className={`px-3 py-1 rounded-lg font-bold transition ${
                  isDomainSelected
                    ? "bg-[#104E8B] text-white shadow-xs"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area with Carousel Controls */}
      <div className="relative px-2 sm:px-6">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#104E8B] hover:scale-105 transition"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#104E8B] hover:scale-105 transition"
          aria-label="Next Page"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Schemes Grid Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl border border-gray-200 h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredSchemes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 max-w-lg mx-auto">
            <p className="font-semibold text-base text-gray-800">{t.noSchemesFound}</p>
            <p className="text-xs text-gray-500 mt-1">
              {lang === "hi" 
                ? "फ़िल्टर साफ़ करें या 'सभी पोर्टल' चुनें।" 
                : "Try clearing your search query or selecting 'All Portals'."}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedDomain("All");
              }}
              className="mt-4 px-4 py-2 bg-[#104E8B] hover:bg-[#0A2540] text-white rounded-xl text-xs font-bold transition"
            >
              {t.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentSchemes.map((scheme) => {
              const btnClass = getButtonBg(scheme.badge_color || "green");
              const schemeName = lang === "hi" && scheme.name_hi ? scheme.name_hi : scheme.name;
              const schemeDesc = lang === "hi" && scheme.description_hi ? scheme.description_hi : scheme.description;
              const benefitFreq = lang === "hi" ? t.perYear : scheme.benefit_frequency;
              const sourceDomain = scheme.source_domain || "gov.in";

              return (
                <div
                  key={scheme.id}
                  onClick={() => onSelectScheme(scheme.id)}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Photographic Cover Image */}
                    <div className="h-48 w-full overflow-hidden bg-gray-100 relative">
                      <img
                        src={scheme.image_url}
                        alt={schemeName}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      
                      {/* Benefit Pill */}
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold text-gray-900 shadow-sm border border-gray-200">
                        ₹{scheme.max_benefit_amount.toLocaleString("en-IN")} / {benefitFreq}
                      </div>

                      {/* Verified Source Portal Badge */}
                      <div className="absolute bottom-2.5 left-2.5 inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-[#0A2540]/90 backdrop-blur-md text-white text-[10px] font-bold shadow-xs">
                        <ShieldCheck className="w-3 h-3 text-[#2BB656]" />
                        <span className="font-mono">{sourceDomain}</span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5 space-y-3">
                      <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-[#104E8B] transition leading-snug">
                        {schemeName}
                      </h3>

                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {schemeDesc}
                      </p>

                      {/* Tag Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(scheme.tags || ["Welfare"]).map((tag: string, tIdx: number) => (
                          <span
                            key={tIdx}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold ${getTagColor(tag)}`}
                          >
                            {categoryLabels[tag] || tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Big Color-Coded CTA Button */}
                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectScheme(scheme.id);
                      }}
                      className={`w-full py-3 rounded-xl text-white font-bold text-sm shadow-md transition flex items-center justify-center space-x-1.5 ${btnClass}`}
                    >
                      <span>{t.checkEligibilityArrow}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Dots at Bottom */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentPage === i ? "bg-[#104E8B] w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Data Sources Modal */}
      <DataSourcesModal
        isOpen={isDataSourcesModalOpen}
        onClose={() => setIsDataSourcesModalOpen(false)}
        lang={lang}
        onFilterByDomain={(dom) => {
          setSelectedDomain(dom);
          setCurrentPage(0);
        }}
      />
    </div>
  );
};
