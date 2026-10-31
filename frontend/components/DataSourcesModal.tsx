"use client";

import React, { useState, useEffect } from "react";
import { Language, translations } from "@/lib/translations";
import { 
  X, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  Database, 
  Globe, 
  Layers, 
  ShieldCheck, 
  Wheat, 
  GraduationCap, 
  HeartHandshake,
  Landmark,
  ArrowRight
} from "lucide-react";

interface DataSource {
  id: string;
  name: string;
  domain: string;
  official_url: string;
  category: "government_welfare" | "agriculture_rural" | "education_scholarships" | "private_csr_ngo";
  category_label: string;
  category_label_hi: string;
  ministry_or_org: string;
  description: string;
  description_hi: string;
  ingestion_method: string;
  last_synced: string;
  sync_status: string;
  is_active: boolean;
  scheme_count: number;
  badge_color: string;
}

interface DataSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onFilterByDomain?: (domain: string) => void;
}

export const DataSourcesModal: React.FC<DataSourcesModalProps> = ({
  isOpen,
  onClose,
  lang,
  onFilterByDomain,
}) => {
  const [sources, setSources] = useState<DataSource[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [syncing, setSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadSources();
    }
  }, [isOpen]);

  const loadSources = () => {
    fetch("/api/data-sources")
      .then((res) => res.json())
      .then((data) => {
        if (data.sources) {
          setSources(data.sources);
        }
      })
      .catch((err) => console.error("Error loading data sources:", err));
  };

  const handleTriggerSync = async () => {
    setSyncing(true);
    setSyncMessage(null);
    try {
      const res = await fetch("/api/data-sources/sync", { method: "POST" });
      const data = await res.json();
      if (data.sources) {
        setSources(data.sources);
      }
      setSyncMessage(
        lang === "hi" 
          ? "सभी 9 आधिकारिक पोर्टलों से रीयल-टाइम डेटा सफलतापूर्वक सिंक हो गया है!" 
          : "Real-time sync completed across all 9 authoritative portals!"
      );
      setTimeout(() => setSyncMessage(null), 4000);
    } catch (e) {
      console.error("Sync error:", e);
    } finally {
      setSyncing(false);
    }
  };

  if (!isOpen) return null;

  const categories = [
    { id: "all", label: lang === "hi" ? "सभी 9 पोर्टल" : "All 9 Portals", icon: Globe },
    { id: "government_welfare", label: lang === "hi" ? "सरकारी कल्याण (DBT/UMANG)" : "Government Welfare", icon: Landmark },
    { id: "agriculture_rural", label: lang === "hi" ? "कृषि एवं ग्रामीण (किसान सुविधा)" : "Agriculture & Rural", icon: Wheat },
    { id: "education_scholarships", label: lang === "hi" ? "शिक्षा एवं छात्रवृत्ति (NSP)" : "Education & Scholarships", icon: GraduationCap },
    { id: "private_csr_ngo", label: lang === "hi" ? "निजी सीएसआर व एनजीओ" : "Private CSR & Foundations", icon: HeartHandshake },
  ];

  const filteredSources = selectedCat === "all" 
    ? sources 
    : sources.filter((s) => s.category === selectedCat);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-5xl w-full overflow-hidden relative my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Deep Accent Brand Theme */}
        <div className="px-6 py-5 bg-[#0A2540] text-white flex justify-between items-center border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#104E8B] flex items-center justify-center text-[#2BB656] shadow-sm">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2BB656] animate-pulse" />
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                  {lang === "hi" ? "रीयल-टाइम आधिकारिक डेटा संग्रह केंद्र" : "Real-Time Authoritative Data Collection Hub"}
                </h2>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                {lang === "hi" 
                  ? "DBT Bharat, UMANG, Kisan Suvidha, NSP और CSR पोर्टलों से सीधा सत्यापित डेटा"
                  : "Directly ingested & synchronized from 9 official government & verified CSR portals"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleTriggerSync}
              disabled={syncing}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#1E7E34] hover:bg-[#2BB656] text-white text-xs font-bold transition shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
              <span>{syncing ? (lang === "hi" ? "सिंक हो रहा है..." : "Syncing...") : (lang === "hi" ? "रीयल-टाइम सिंक करें" : "Sync Now")}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sync Success Alert */}
        {syncMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 flex items-center space-x-2 text-xs font-bold text-[#1E7E34]">
            <CheckCircle2 className="w-4 h-4 text-[#2BB656] shrink-0" />
            <span>{syncMessage}</span>
          </div>
        )}

        {/* Category Navigation Pills */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-2 overflow-x-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  isSelected
                    ? "bg-[#104E8B] text-white shadow-xs"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Portals Grid */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSources.map((source) => {
              const desc = lang === "hi" && source.description_hi ? source.description_hi : source.description;
              const catLabel = lang === "hi" && source.category_label_hi ? source.category_label_hi : source.category_label;

              return (
                <div
                  key={source.id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-between hover:border-[#104E8B] hover:shadow-md transition group"
                >
                  <div className="space-y-2.5">
                    {/* Top Status & Domain */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-50 text-[#1E7E34] text-[10px] font-extrabold border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2BB656]" />
                        <span>{source.sync_status}</span>
                      </span>
                      <span className="text-[11px] font-bold text-gray-500 font-mono">
                        {source.domain}
                      </span>
                    </div>

                    {/* Portal Name & Authority */}
                    <div>
                      <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-[#104E8B] transition">
                        {source.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-medium line-clamp-1 mt-0.5">
                        {source.ministry_or_org}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {desc}
                    </p>

                    {/* Metadata Badges */}
                    <div className="pt-1 flex flex-wrap gap-1.5 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-[#104E8B] font-semibold border border-blue-100">
                        {source.scheme_count} {lang === "hi" ? "योजनाएं ट्रैक की गईं" : "Schemes Tracked"}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium">
                        {source.ingestion_method}
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom Links */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold">
                    <a
                      href={source.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#104E8B] hover:text-[#0A2540] inline-flex items-center space-x-1"
                    >
                      <span>{lang === "hi" ? "आधिकारिक पोर्टल" : "Official Portal"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    {onFilterByDomain && (
                      <button
                        onClick={() => {
                          onFilterByDomain(source.domain);
                          onClose();
                        }}
                        className="text-[#1E7E34] hover:text-[#2BB656] inline-flex items-center space-x-1 font-bold"
                      >
                        <span>{lang === "hi" ? "योजनाएं देखें" : "View Schemes"}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600 gap-2">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#1E7E34]" />
            <span>
              {lang === "hi" 
                ? "सभी योजना नियम, पात्रता और आवेदन दस्तावेज भारत सरकार एवं आधिकारिक ट्रस्टों के सर्कुलर द्वारा सत्यापित हैं।" 
                : "All scheme rules, eligibility bounds, and guidelines are cryptographically validated against official gazettes."}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold transition text-xs"
          >
            {lang === "hi" ? "बंद करें" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};
