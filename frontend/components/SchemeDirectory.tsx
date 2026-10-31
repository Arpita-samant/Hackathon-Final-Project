"use client";

import React, { useState, useEffect } from "react";
import { Language, translations } from "@/lib/translations";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Filter,
  CheckCircle,
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
      s.name_hi.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.ministry.toLowerCase().includes(q);

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
        return "bg-emerald-600 text-white";
      case "scholarship":
        return "bg-purple-600 text-white";
      case "housing":
        return "bg-amber-600 text-white";
      case "health":
        return "bg-rose-600 text-white";
      case "employment":
        return "bg-teal-600 text-white";
      case "welfare":
      default:
        return "bg-blue-600 text-white";
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-2">
      {/* Top Centered Search Bar & Category Filter Pills (Matches Image 2) */}
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentPage(0);
          }}
          className="flex items-center bg-white rounded-2xl shadow-sm border border-gray-200 p-1.5 focus-within:ring-2 focus-within:ring-red-500"
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

        {/* Filter by Pills */}
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
      </div>

      {/* Main Content Area with Carousel Controls (Matches Image 2) */}
      <div className="relative px-2 sm:px-6">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-red-600 hover:scale-105 transition"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-red-600 hover:scale-105 transition"
          aria-label="Next Page"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Schemes Grid Cards (3 Cards per slide matching Image 2) */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl border border-gray-200 h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredSchemes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 max-w-lg mx-auto">
            <p className="font-semibold text-base text-gray-800">{t.noSchemesFound}</p>
            <p className="text-xs text-gray-500 mt-1">Try clearing your search query or selecting "All".</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold"
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
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Photographic Cover Image (Matching Image 2) */}
                    <div className="h-48 w-full overflow-hidden bg-gray-100 relative">
                      <img
                        src={scheme.image_url}
                        alt={schemeName}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold text-gray-800 shadow-xs">
                        ₹{scheme.max_benefit_amount.toLocaleString("en-IN")} / {benefitFreq}
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5 space-y-3">
                      <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-red-600 transition leading-snug">
                        {schemeName}
                      </h3>

                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {schemeDesc}
                      </p>

                      {/* Tag Badges (e.g. Welfare, Agriculture) */}
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

                  {/* Big Color-Coded CTA Button (Matches Image 2) */}
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

        {/* Pagination Dots at Bottom (Matching Image 2) */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentPage === i ? "bg-red-600 w-6" : "bg-gray-300 hover:bg-gray-400"
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
