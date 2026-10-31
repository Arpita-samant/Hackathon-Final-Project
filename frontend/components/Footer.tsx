"use client";

import React, { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { ShieldCheck, Heart, Info, ArrowUpRight, X } from "lucide-react";

interface FooterProps {
  lang: Language;
  onTabChange?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onTabChange }) => {
  const t = translations[lang] || translations.en;
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const handleLinkClick = (tabKey: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onTabChange) {
      onTabChange(tabKey);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSupportClick = (type: string, e: React.MouseEvent) => {
    e.preventDefault();
    const infoMap: Record<string, { title: string; content: string }> = {
      about: {
        title: lang === "hi" ? "हमारे बारे में (About Us)" : "About Us",
        content: lang === "hi"
          ? "योजना सहायक भारत के प्रत्येक नागरिक को केंद्र और राज्य सरकारों की कल्याणकारी योजनाओं से पारदर्शी और बिना किसी बिचौलिए के जोड़ने के लिए बनाया गया एक आधुनिक, एआई-संचालित डिजिटल प्लेटफॉर्म है।"
          : "Yojana Sahayak is an independent, AI-powered public welfare navigation portal dedicated to helping every Indian citizen discover, understand, and claim eligible welfare schemes with zero middlemen and zero confusion.",
      },
      howItWorks: {
        title: lang === "hi" ? "यह कैसे काम करता है (How It Works)" : "How It Works",
        content: lang === "hi"
          ? "1. अपनी योग्यता जांचें: आयु, आय और व्यवसाय दर्ज करें।\n2. एआई सहायक से पूछें: किसी भी सरकारी योजना के नियम जानें।\n3. धोखाधड़ी से बचें: किसी भी संदिग्ध संदेश की सत्यता जांचें।\n4. सीधे आधिकारिक पोर्टल पर आवेदन करें।"
          : "1. Check Eligibility: Enter age, income, and occupation for instant deterministic rule matching.\n2. Ask AI Assistant: Get verified scheme citations in vernacular languages.\n3. Scam Shield: Verify WhatsApp forwards and unauthorized fees.\n4. Apply: Jump directly to official .gov.in portals.",
      },
      contact: {
        title: lang === "hi" ? "संपर्क करें (Contact Us)" : "Contact Us",
        content: lang === "hi"
          ? "नागरिक सहायता ईमेल: support@yojanasahayak.in\nराष्ट्रीय साइबर हेल्पलाइन: 1930\nराष्ट्रीय शिकायत निवारण: pgportal.gov.in"
          : "Citizen Support Helpline: support@yojanasahayak.in\nNational Cyber Crime Helpline: 1930\nPublic Grievance Redressal: pgportal.gov.in",
      },
      faqs: {
        title: lang === "hi" ? "अक्सर पूछे जाने वाले प्रश्न (FAQs)" : "FAQs",
        content: lang === "hi"
          ? "प्रश्न: क्या योजना सहायक पर कोई शुल्क देना पड़ता है?\nउत्तर: नहीं, यह सेवा सभी भारतीय नागरिकों के लिए 100% निःशुल्क है।\n\nप्रश्न: क्या मेरा डेटा सुरक्षित है?\nउत्तर: हाँ, योजना सहायक किसी भी संवेदनशील बैंक पिन या पासवर्ड की मांग नहीं करता।"
          : "Q: Is Yojana Sahayak free to use?\nA: Yes, it is 100% free for all Indian citizens.\n\nQ: Does Yojana Sahayak ask for sensitive credentials?\nA: Never. We never ask for bank PINs, passwords, or registration fees.",
      },
      privacy: {
        title: lang === "hi" ? "गोपनीयता नीति (Privacy Policy)" : "Privacy Policy",
        content: lang === "hi"
          ? "हम नागरिक गोपनीयता और डेटा सुरक्षा का पूर्ण सम्मान करते हैं। आपकी जानकारी का उपयोग केवल पात्रता गणना और योजनाओं के सुझाव के लिए किया जाता है।"
          : "We strictly respect citizen privacy and data sovereignty. Demographics entered during eligibility checks are evaluated transiently and never sold or shared with commercial entities.",
      },
    };

    setModalContent(infoMap[type] || null);
  };

  return (
    <footer className="bg-[#0A2540] text-gray-300 text-sm mt-16 border-t border-[#104E8B]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center space-x-5">
              {/* Standalone Logo directly on footer background - no white box, increased size */}
              <img 
                src="/logo.png" 
                alt="Yojana Sahayak Logo" 
                className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain shrink-0 filter drop-shadow-[0_4px_12px_rgba(255,255,255,0.12)] transition-transform hover:scale-105 duration-200"
              />
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  {t.portalTitle}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-[#2BB656] mt-1">
                  {t.portalSubtitle}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md pt-1">
              {t.footerDescription}
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-gray-700/80 pb-2">
              {t.footerQuickLinks || "Quick Links"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={(e) => handleLinkClick("home", e)}
                  className="hover:text-[#2BB656] hover:underline transition font-medium text-left"
                >
                  {t.navHome || "Home"}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick("schemes", e)}
                  className="hover:text-[#2BB656] hover:underline transition font-medium text-left"
                >
                  {t.navSchemes || "Explore Schemes"}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick("eligibility", e)}
                  className="hover:text-[#2BB656] hover:underline transition font-medium text-left"
                >
                  {t.navEligibility || "Eligibility Checker"}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick("chat", e)}
                  className="hover:text-[#2BB656] hover:underline transition font-medium text-left"
                >
                  {t.navChat || "AI Assistant"}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick("family", e)}
                  className="hover:text-[#2BB656] hover:underline transition font-medium text-left"
                >
                  {t.navFamily || "Family Members"}
                </button>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-gray-700/80 pb-2">
              {t.footerSupport || "Support"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={(e) => handleSupportClick("about", e)}
                  className="hover:text-[#2BB656] hover:underline transition font-medium text-left"
                >
                  {t.footerAbout || "About Us"}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleSupportClick("howItWorks", e)}
                  className="hover:text-[#2BB656] hover:underline transition font-medium text-left"
                >
                  {t.footerHowItWorks || "How It Works"}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleSupportClick("contact", e)}
                  className="hover:text-[#2BB656] hover:underline transition font-medium text-left"
                >
                  {t.footerContact || "Contact Us"}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleSupportClick("faqs", e)}
                  className="hover:text-[#2BB656] hover:underline transition font-medium text-left"
                >
                  {t.footerFaqs || "FAQs"}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleSupportClick("privacy", e)}
                  className="hover:text-[#2BB656] hover:underline transition font-medium text-left"
                >
                  {t.footerPrivacy || "Privacy Policy"}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <div>
            © 2026 Yojana Sahayak. All rights reserved.
          </div>
          <div className="text-gray-500 text-[11px]">
            National Citizen Welfare & Scheme Intelligence Portal
          </div>
        </div>
      </div>

      {/* Support Info Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white text-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {modalContent.title}
            </h3>
            <div className="text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {modalContent.content}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="px-4 py-2 bg-[#174EA6] text-white rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
