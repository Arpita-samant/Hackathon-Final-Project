"use client";

import React, { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { 
  Menu, 
  X,
  User,
  LogOut,
  ChevronDown
} from "lucide-react";

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
  userName?: string;
  userOccupation?: string;
  isLoggedIn?: boolean;
  onOpenLogin?: () => void;
  onOpenSignup?: () => void;
  onLogout?: () => void;
}

const INDIAN_LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "or", label: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "as", label: "Assamese", native: "অসমীয়া" },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  lang,
  onLangChange,
  userName = "Citizen User",
  userOccupation = "Farmer",
  isLoggedIn = false,
  onOpenLogin,
  onOpenSignup,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[lang] || translations.en;

  const currentLangObj = INDIAN_LANGUAGES.find((l) => l.code === lang) || INDIAN_LANGUAGES[0];

  const navItems = [
    { id: "home", label: t.navHome },
    { id: "schemes", label: t.navSchemes },
    { id: "chat", label: t.navChat },
    { id: "voice", label: t.navVoice },
    { id: "family", label: t.navFamily },
    ...(isLoggedIn ? [{ id: "profile", label: t.navProfile }] : []),
  ];

  const handleSelectTab = (tabId: string) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact, balanced Navbar Height h-14 sm:h-16 */}
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Brand Logo with Clean Proportion */}
          <div 
            onClick={() => handleSelectTab("home")}
            className="flex items-center space-x-2 cursor-pointer group select-none py-0.5"
          >
            {/* Logo Image */}
            <div className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center shrink-0">
              <img 
                src="/logo.png" 
                alt="Yojana Sahayak Logo" 
                className="h-8 sm:h-9 w-auto max-w-[36px] object-contain transform group-hover:scale-105 transition drop-shadow-xs"
              />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-[#104E8B] tracking-tight leading-none">
                <span>{t.portalTitle}</span>
              </div>
              <p className="text-[8px] sm:text-[9px] text-[#1E7E34] font-semibold mt-0.5 leading-none">
                {t.portalSubtitle}
              </p>
            </div>
          </div>

          {/* Center Navigation Links with Brand Palette Indicator */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`relative py-1 text-xs sm:text-sm font-bold transition ${
                    isActive
                      ? "text-[#104E8B]"
                      : "text-gray-700 hover:text-[#104E8B]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E7E34] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Multilingual Indian Language Switcher (No globe icon, clean dropdown icon), Login, Sign Up */}
          <div className="hidden sm:flex items-center space-x-2">
            {/* Language Selector Dropdown - Global icon removed, Dropdown chevron icon used */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition shadow-2xs"
              >
                <span>{currentLangObj.native} ({currentLangObj.label})</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-52 max-h-80 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50 divide-y divide-gray-100">
                  <div className="px-3 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    Select Language / भाषा चुनें
                  </div>
                  <div className="py-1">
                    {INDIAN_LANGUAGES.map((langItem) => {
                      const isSelected = lang === langItem.code;
                      return (
                        <button
                          key={langItem.code}
                          onClick={() => {
                            onLangChange(langItem.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between transition ${
                            isSelected
                              ? "bg-blue-50 text-[#104E8B] font-extrabold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span>{langItem.native}</span>
                          <span className="text-[10px] text-gray-400 font-normal">{langItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Authentication Buttons: Login & Signup (or User Pill when Logged In) */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSelectTab("profile")}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-xs font-bold text-[#104E8B] transition"
                >
                  <User className="w-3.5 h-3.5 text-[#104E8B]" />
                  <span className="truncate max-w-[110px]">{userName}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#104E8B] text-white font-medium">
                    {userOccupation}
                  </span>
                </button>

                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-1.5 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition border border-gray-200"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                {/* Login button */}
                <button
                  onClick={onOpenLogin}
                  className="px-3.5 py-1.5 rounded-xl border border-gray-300 hover:border-gray-400 text-gray-800 text-xs font-bold transition hover:bg-gray-50"
                >
                  {t.navLogin}
                </button>

                {/* Sign Up button (Secondary Vibrant Foliage Green with Emerald Leaf hover) */}
                <button
                  onClick={onOpenSignup}
                  className="px-4 py-1.5 rounded-xl bg-[#1E7E34] hover:bg-[#2BB656] text-white text-xs font-bold shadow-md shadow-green-900/15 transition transform hover:-translate-y-0.5"
                >
                  {t.navSignup}
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                  isActive
                    ? "bg-blue-50 text-[#104E8B]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-gray-100 space-y-2">
            {/* Mobile Language Switcher */}
            <div className="grid grid-cols-3 gap-1 py-1">
              {INDIAN_LANGUAGES.map((langItem) => (
                <button
                  key={langItem.code}
                  onClick={() => onLangChange(langItem.code)}
                  className={`text-center py-1.5 px-2 rounded-lg text-[11px] font-bold ${
                    lang === langItem.code ? "bg-[#104E8B] text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {langItem.native}
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-[#104E8B]">{userName} ({userOccupation})</span>
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin?.();
                  }}
                  className="w-full py-2 rounded-xl border border-gray-300 text-gray-800 text-xs font-bold"
                >
                  {t.navLogin}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSignup?.();
                  }}
                  className="w-full py-2 rounded-xl bg-[#1E7E34] hover:bg-[#2BB656] text-white text-xs font-bold shadow-md shadow-green-900/15"
                >
                  {t.navSignup}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
