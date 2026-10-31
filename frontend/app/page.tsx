"use client";

import React, { useState, useEffect } from "react";
import { Language } from "@/lib/translations";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SchemeDirectory } from "@/components/SchemeDirectory";
import { SchemeDetailModal } from "@/components/SchemeDetailModal";
import { EligibilityWizard } from "@/components/EligibilityWizard";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { AIChatWidget } from "@/components/AIChatWidget";
import { VoiceAssistantView } from "@/components/VoiceAssistantView";
import { FamilyMembersPage } from "@/components/FamilyMembersPage";
import { ScamDetector } from "@/components/ScamDetector";
import { AuthModal } from "@/components/AuthModal";
import { UserProfilePage } from "@/components/UserProfilePage";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [lang, setLang] = useState<Language>("en");
  const [schemes, setSchemes] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Selected scheme for Detail Modal (Matches Image 3)
  const [selectedScheme, setSelectedScheme] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Authenticated User State & Data Isolation
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");

  // Compatibility profile for detail modal
  const userProfile = {
    name: currentUser?.name || "Rahul Sharma",
    familyCount: currentUser?.family_members_count || 4,
    landholding: currentUser?.occupation_category === "Farmer" ? "1.5 Hectare" : "0 Acre",
    bankAccountMasked: "XXXX1234",
    phone: currentUser?.phone ? `+91 ${currentUser.phone}` : "+91 98765 43210",
  };

  // Eligibility Evaluation State
  const [evaluationResults, setEvaluationResults] = useState<any | null>(null);
  const [initialFamilyMode, setInitialFamilyMode] = useState<"single" | "family">("single");

  // Fetch schemes from backend and check stored auth on mount
  useEffect(() => {
    fetch("/api/schemes")
      .then((res) => res.json())
      .then((data) => {
        if (data.schemes) {
          setSchemes(data.schemes);
        }
      })
      .catch((err) => console.error("Error fetching schemes:", err));

    // Load persisted language
    const savedLang = localStorage.getItem("ys_lang") as Language | null;
    if (savedLang) {
      setLang(savedLang);
    }

    // Load persisted user session
    const savedUser = localStorage.getItem("yojana_user_profile");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error loading user profile", e);
      }
    }
  }, []);

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("ys_lang", newLang);
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // When user searches from Home Hero -> Navigates to Schemes page with query
  const handleHeroSearch = (query: string, category: string = "All") => {
    setSearchQuery(query);
    setSelectedCategory(category || "All");
    setCurrentTab("schemes");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // When user clicks a specific scheme card -> Opens Scheme Detail Modal
  const handleOpenSchemeDetail = (schemeId: string) => {
    const found = schemes.find((s) => s.id === schemeId);
    if (found) {
      setSelectedScheme(found);
      setIsDetailModalOpen(true);
    } else {
      const pmKisan = schemes.find((s) => s.id === "pm_kisan") || schemes[0];
      setSelectedScheme(pmKisan);
      setIsDetailModalOpen(true);
    }
  };

  const handleEvaluationComplete = (results: any) => {
    setEvaluationResults(results);
    setCurrentTab("eligibility");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToDashboard = () => {
    setIsDetailModalOpen(false);
    setCurrentTab("eligibility");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuthSuccess = (userData: any, token: string) => {
    setCurrentUser(userData);
    localStorage.setItem("yojana_user_profile", JSON.stringify(userData));
    localStorage.setItem("yojana_auth_token", token);
    setCurrentTab("profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("yojana_auth_token");
    localStorage.removeItem("yojana_user_id");
    localStorage.removeItem("yojana_user_profile");
    setCurrentUser(null);
    if (currentTab === "profile") {
      setCurrentTab("home");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD]">
      {/* Navbar with 12 Indian Languages, Login & Signup */}
      <Navbar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        lang={lang}
        onLangChange={handleLangChange}
        userName={currentUser?.name || "Citizen"}
        userOccupation={currentUser?.occupation_category || "Farmer"}
        isLoggedIn={!!currentUser}
        onOpenLogin={() => {
          setAuthMode("login");
          setIsAuthModalOpen(true);
        }}
        onOpenSignup={() => {
          setAuthMode("signup");
          setIsAuthModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* VIEW 1: HOME LANDING PAGE */}
        {currentTab === "home" && (
          <HeroSection
            lang={lang}
            onSearch={handleHeroSearch}
            onSelectScheme={handleOpenSchemeDetail}
            onViewAllSchemes={() => {
              setSelectedCategory("All");
              setSearchQuery("");
              setCurrentTab("schemes");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {/* VIEW 2: SCHEMES BROWSE & SEARCH PAGE */}
        {currentTab === "schemes" && (
          <SchemeDirectory
            lang={lang}
            onSelectScheme={handleOpenSchemeDetail}
            initialQuery={searchQuery}
            initialCategory={selectedCategory}
          />
        )}

        {/* VIEW 3: ELIGIBILITY & FAMILY DASHBOARD */}
        {currentTab === "eligibility" && (
          <>
            {evaluationResults ? (
              <ResultsDashboard
                lang={lang}
                data={evaluationResults}
                onBack={() => setEvaluationResults(null)}
              />
            ) : (
              <EligibilityWizard
                lang={lang}
                onEvaluationComplete={handleEvaluationComplete}
                initialMode={initialFamilyMode}
              />
            )}
          </>
        )}

        {/* VIEW 4: AI ASSISTANT CHAT */}
        {currentTab === "chat" && (
          <AIChatWidget lang={lang} onNavigateTab={handleTabChange} />
        )}

        {/* VIEW 5: VOICE ASSISTANT */}
        {currentTab === "voice" && (
          <VoiceAssistantView lang={lang} />
        )}

        {/* VIEW 6: FAMILY MEMBERS */}
        {currentTab === "family" && (
          <FamilyMembersPage 
            lang={lang} 
            onExploreSchemes={() => handleTabChange("schemes")} 
            currentUser={currentUser}
          />
        )}

        {/* VIEW 7: MY PROFILE & DOCUMENT LOCKER */}
        {currentTab === "profile" && (
          <UserProfilePage
            lang={lang}
            currentUser={currentUser}
            onOpenLogin={() => {
              setAuthMode("login");
              setIsAuthModalOpen(true);
            }}
            onOpenSignup={() => {
              setAuthMode("signup");
              setIsAuthModalOpen(true);
            }}
            onUpdateUser={(updated) => {
              setCurrentUser(updated);
              localStorage.setItem("yojana_user_profile", JSON.stringify(updated));
            }}
          />
        )}

        {/* VIEW 8: SCAM SHIELD */}
        {currentTab === "scam" && <ScamDetector lang={lang} />}
      </main>

      {/* FOOTER */}
      <Footer lang={lang} onTabChange={handleTabChange} />

      {/* SCHEME DETAIL MODAL (No Go to Dashboard button, Real Scheme Image) */}
      <SchemeDetailModal
        scheme={selectedScheme}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        lang={lang}
        onGoToDashboard={handleGoToDashboard}
        userProfile={userProfile}
      />

      {/* CITIZEN AUTHENTICATION MODAL WITH SMS OTP VERIFICATION */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        lang={lang}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
