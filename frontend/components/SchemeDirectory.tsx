"use client";

import React, { useState, useEffect } from "react";
import { Language, translations } from "@/lib/translations";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Sparkles
} from "lucide-react";

interface SchemeDirectoryProps {
  lang: Language;
  onSelectScheme: (schemeId: string) => void;
  initialQuery?: string;
  initialCategory?: string;
}

export const SchemeDirectory: React.FC<SchemeDirectoryProps> = ({
  lang,
  onSelectScheme,
  initialQuery = "",
  initialCategory = "All",
}) => {
  const t = translations[lang] || translations.en;
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "All");
  const [currentPage, setCurrentPage] = useState(0);

  const categories = ["All", "Welfare", "Agriculture", "Scholarship", "Housing", "Health", "Employment"];

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
  }, [initialQuery, initialCategory]);

  // Filter schemes
  const filteredSchemes = schemes.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      s.name.toLowerCase().includes(q) ||
      (s.name_hi && s.name_hi.toLowerCase().includes(q)) ||
      (s.description && s.description.toLowerCase().includes(q)) ||
      (s.ministry && s.ministry.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === "All" ||
      s.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (s.tags && s.tags.some((t: string) => t.toLowerCase() === selectedCategory.toLowerCase()));

    return matchesQuery && matchesCategory;
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
        return "bg-gradient-to-r from-[#1E7E34] to-[#2BB656] hover:from-[#19692c] hover:to-[#249c49]";
      case "blue":
        return "bg-gradient-to-r from-[#104E8B] to-[#1e6bb8] hover:from-[#0c3c6b] hover:to-[#165696]";
      case "orange":
        return "bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#c2410c] hover:to-[#ea580c]";
      case "purple":
        return "bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:from-[#6d28d9] hover:to-[#7e22ce]";
      case "teal":
        return "bg-gradient-to-r from-[#0F766E] to-[#14B8A6] hover:from-[#115e59] hover:to-[#0d9488]";
      case "pink":
        return "bg-gradient-to-r from-[#DB2777] to-[#EC4899] hover:from-[#be185d] hover:to-[#db2777]";
      default:
        return "bg-gradient-to-r from-[#104E8B] to-[#1E7E34] hover:from-[#0c3c6b] hover:to-[#19692c]";
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "agriculture":
        return "bg-emerald-50 text-[#1E7E34] border border-emerald-200";
      case "scholarship":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      case "housing":
        return "bg-amber-50 text-amber-800 border border-amber-200";
      case "health":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      case "employment":
        return "bg-teal-50 text-teal-700 border border-teal-200";
      case "welfare":
      default:
        return "bg-blue-50 text-[#104E8B] border border-blue-200";
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4">
      {/* Top Centered Search Bar & Category Filter Pills */}
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentPage(0);
          }}
          className="flex items-center bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-200 p-1.5 focus-within:ring-2 focus-within:ring-[#104E8B] focus-within:border-transparent transition-all duration-200"
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
            className="bg-[#1E7E34] hover:bg-[#2BB656] text-white px-7 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transform active:scale-95 hover:-translate-y-0.5 transition-all duration-200 shrink-0"
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
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 transform active:scale-95 hover:-translate-y-0.5 ${
                  isSelected
                    ? "bg-[#0A2540] text-white shadow-md ring-2 ring-[#0A2540]/20"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200/60 hover:shadow-xs"
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area with Carousel Controls */}
      <div className="relative px-2 sm:px-6">
        {/* Left Arrow Button with Hover Effect */}
        <button
          onClick={handlePrev}
          className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md hover:shadow-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#104E8B] hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow Button with Hover Effect */}
        <button
          onClick={handleNext}
          className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md hover:shadow-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#104E8B] hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Next Page"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Schemes Grid Cards - Attractive, Simple & Clean */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-3xl border border-gray-200 h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredSchemes.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center text-gray-500 max-w-lg mx-auto shadow-sm">
            <p className="font-semibold text-base text-gray-800">{t.noSchemesFound}</p>
            <p className="text-xs text-gray-500 mt-1">
              {lang === "hi" 
                ? "फ़िल्टर साफ़ करें या 'सभी' श्रेणी चुनें।" 
                : "Try clearing your search query or selecting 'All'."}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-5 py-2.5 bg-[#104E8B] hover:bg-[#0A2540] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transform active:scale-95 hover:-translate-y-0.5 transition-all duration-200"
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

              return (
                <div
                  key={scheme.id}
                  onClick={() => onSelectScheme(scheme.id)}
                  className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1.5 hover:border-gray-300"
                >
                  <div>
                    {/* Photographic Cover Image */}
                    <div className="h-48 sm:h-52 w-full overflow-hidden bg-gray-100 relative">
                      <img
                        src={scheme.image_url}
                        alt={schemeName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80";
                        }}
                      />

                      {/* Subtle Bottom Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Category Badge Top Left */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold text-white shadow-xs backdrop-blur-md bg-[#0A2540]/80">
                        {categoryLabels[scheme.category] || scheme.category || "Welfare"}
                      </div>
                      
                      {/* Benefit Pill Top Right */}
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black text-gray-900 shadow-sm border border-gray-100">
                        ₹{scheme.max_benefit_amount.toLocaleString("en-IN")} / {benefitFreq}
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5 space-y-3">
                      <div>
                        <p className="text-[11px] font-semibold text-gray-400 tracking-wide uppercase line-clamp-1 mb-1">
                          {scheme.ministry || "Government of India"}
                        </p>
                        <h3 className="font-black text-lg text-gray-900 group-hover:text-[#104E8B] transition-colors leading-snug line-clamp-1">
                          {schemeName}
                        </h3>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                        {schemeDesc}
                      </p>

                      {/* Clean Tag Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(scheme.tags || ["Welfare"]).map((tag: string, tIdx: number) => (
                          <span
                            key={tIdx}
                            className={`px-3 py-1 rounded-full text-[11px] font-semibold ${getTagColor(tag)}`}
                          >
                            {categoryLabels[tag] || tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Big Color-Coded CTA Button with Interactive Animation */}
                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectScheme(scheme.id);
                      }}
                      className={`w-full py-3.5 px-4 rounded-2xl text-white font-bold text-sm shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 transform active:scale-95 hover:-translate-y-0.5 group-hover:brightness-105 ${btnClass}`}
                    >
                      <span>{t.checkEligibilityArrow}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Dots at Bottom with Animated Width */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentPage === i 
                    ? "bg-[#104E8B] w-8 shadow-xs" 
                    : "bg-gray-300 hover:bg-gray-400 w-2.5"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
