"use client";

import React, { useState, useEffect } from "react";
import { Language, translations } from "@/lib/translations";
import { 
  Users, 
  User, 
  Crown, 
  Pencil, 
  Trash2, 
  Calendar, 
  Trophy, 
  Lightbulb, 
  Briefcase, 
  MapPin, 
  Home, 
  ArrowLeft,
  X,
  CheckCircle2,
  AlertCircle,
  Lock,
  LogIn,
  UserPlus,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Loader2
} from "lucide-react";

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  gender: string;
  annual_income: number;
  occupation: string;
  caste_category: string;
  state: string;
  isAccountHolder?: boolean;
  avatarColor: string;
  eligibleSchemes: string[];
  nearMissSchemes: string[];
  potentialBenefit: number;
}

interface FamilyMembersPageProps {
  lang: Language;
  onExploreSchemes?: () => void;
  onEvaluateHousehold?: (results: any) => void;
  currentUser?: any;
  onOpenLogin?: () => void;
  onOpenSignup?: () => void;
}

/**
 * Calculates tailored government schemes and near-misses based on
 * dynamic demographic parameters (age, gender, occupation, income, caste).
 */
export function calculateMemberSchemes(member: {
  age: number;
  gender: string;
  occupation: string;
  annual_income: number;
  caste_category: string;
  state: string;
  relation: string;
}) {
  const eligible: string[] = [];
  const nearMiss: string[] = [];
  let potentialBenefit = 0;

  const age = Number(member.age) || 0;
  const income = Number(member.annual_income) || 0;
  const occ = (member.occupation || "").toLowerCase();
  const gender = (member.gender || "").toLowerCase();
  const caste = (member.caste_category || "").toUpperCase();

  // 1. Healthcare - Ayushman Bharat PM-JAY
  if (income <= 300000 || age >= 60) {
    eligible.push("Ayushman Bharat PM-JAY (₹5L Healthcare Cover)");
    potentialBenefit += 500000;
  } else {
    nearMiss.push("Ayushman Bharat PM-JAY (Income limit ₹3,00,000 exceeded)");
  }

  // 2. Student & Education Schemes
  if (occ.includes("student") || (age >= 5 && age <= 25 && income <= 250000)) {
    eligible.push("National Scholarship Portal (Pre/Post-Matric)");
    eligible.push("PM e-VIDYA & Digital Education Support");
    eligible.push("Skill India Free Vocational Training");
    potentialBenefit += 30000;
    if (caste === "SC" || caste === "ST" || caste === "OBC") {
      eligible.push("Special Social Justice Higher Education Grant");
      potentialBenefit += 15000;
    }
    nearMiss.push("PM-YASASVI Merit Scholarship (Requires 60%+ in previous standard)");
  }

  // 3. Farmer & Agriculture Schemes
  if (occ.includes("farmer") || occ.includes("agri")) {
    eligible.push("PM-KISAN (₹6,000 Direct Annual DBT)");
    eligible.push("Kisan Credit Card (4% Subsidized Crop Loan)");
    eligible.push("PM Fasal Bima Yojana (Crop Damage Cover)");
    potentialBenefit += 45000;
    nearMiss.push("PM Krishi Sinchayee (Requires landholding deed)");
  }

  // 4. Senior Citizen Pension & Support
  if (age >= 60) {
    eligible.push("Indira Gandhi National Old Age Pension (IGNOAPS)");
    eligible.push("Rashtriya Vayoshri Yojana (Assisted Living Devices)");
    potentialBenefit += 18000;
    nearMiss.push("Senior Citizen Health Card (Local district verification pending)");
  }

  // 5. Female / Homemaker / Girl Child
  if (gender === "female") {
    if (age < 18) {
      eligible.push("Sukanya Samriddhi Yojana (High-Interest Govt Deposit)");
      eligible.push("Beti Bachao Beti Padhao Education Grant");
      potentialBenefit += 75000;
    } else {
      eligible.push("PM Ujjwala Yojana (Free LPG Cylinder & Refill Subsidy)");
      eligible.push("Lakhpati Didi (SHG Interest-Free Credit)");
      potentialBenefit += 25000;
      if (age >= 19 && age <= 35) {
        nearMiss.push("Pradhan Mantri Matru Vandana Yojana (Maternity Benefits)");
      }
    }
  }

  // 6. Laborer / Vendor / Informal Workers
  if (occ.includes("wage") || occ.includes("labor") || occ.includes("vendor") || occ.includes("artisan") || occ.includes("street")) {
    eligible.push("PM SVANidhi (Collateral-Free Micro Credit)");
    eligible.push("e-Shram Social Security Accident Cover (₹2,00,000)");
    potentialBenefit += 30000;
    nearMiss.push("PM Shram Yogi Maan-dhan (Pension scheme for age 18-40)");
  }

  // Baseline fallback
  if (eligible.length === 0) {
    eligible.push("PM Jan Dhan Yojana (Zero Balance Banking)");
    eligible.push("PM Jeevan Jyoti Bima Yojana (Life Insurance Cover)");
    potentialBenefit += 200000;
  }

  return { eligible, nearMiss, potentialBenefit };
}

const DEFAULT_DEMO_MEMBERS: FamilyMember[] = [
  {
    id: "mem_demo_1",
    name: "Ramesh Sharma",
    relation: "Self (Head)",
    age: 46,
    gender: "Male",
    annual_income: 140000,
    occupation: "Farmer",
    caste_category: "OBC",
    state: "Uttarakhand",
    isAccountHolder: true,
    avatarColor: "bg-blue-100 text-blue-700 border-blue-300",
    eligibleSchemes: [
      "PM-KISAN (₹6,000/yr Direct DBT)",
      "Kisan Credit Card (4% Subsidized Loan)",
      "Ayushman Bharat PM-JAY (₹5L Healthcare)",
      "PM Fasal Bima Yojana",
    ],
    nearMissSchemes: ["PMAY-Gramin (Housing Assistance)", "PM Krishi Sinchayee Yojana"],
    potentialBenefit: 556000,
  },
  {
    id: "mem_demo_2",
    name: "Sunita Sharma",
    relation: "Spouse",
    age: 42,
    gender: "Female",
    annual_income: 0,
    occupation: "Homemaker",
    caste_category: "OBC",
    state: "Uttarakhand",
    isAccountHolder: false,
    avatarColor: "bg-rose-100 text-rose-700 border-rose-300",
    eligibleSchemes: [
      "PM Ujjwala Yojana (Free LPG & Refill Subsidy)",
      "Lakhpati Didi (SHG Micro-Enterprise)",
      "Ayushman Bharat PM-JAY",
    ],
    nearMissSchemes: ["Pradhan Mantri Matru Vandana Yojana (Maternity)"],
    potentialBenefit: 525000,
  },
  {
    id: "mem_demo_3",
    name: "Rahul Sharma",
    relation: "Son",
    age: 19,
    gender: "Male",
    annual_income: 0,
    occupation: "Student",
    caste_category: "OBC",
    state: "Uttarakhand",
    isAccountHolder: false,
    avatarColor: "bg-purple-100 text-purple-700 border-purple-300",
    eligibleSchemes: [
      "National Scholarship Portal (Post-Matric)",
      "PM e-VIDYA & Digital Education Support",
      "Skill India Free Vocational Training",
    ],
    nearMissSchemes: ["PM-YASASVI Merit Scholarship (Requires 60%+ in previous standard)"],
    potentialBenefit: 45000,
  },
  {
    id: "mem_demo_4",
    name: "Kamla Devi",
    relation: "Mother",
    age: 68,
    gender: "Female",
    annual_income: 0,
    occupation: "Senior Citizen",
    caste_category: "OBC",
    state: "Uttarakhand",
    isAccountHolder: false,
    avatarColor: "bg-amber-100 text-amber-700 border-amber-300",
    eligibleSchemes: [
      "Indira Gandhi National Old Age Pension (IGNOAPS)",
      "Ayushman Bharat Senior Citizen (₹5L Free Cover)",
      "Rashtriya Vayoshri Yojana (Assisted Living Devices)",
    ],
    nearMissSchemes: ["Atal Pension Yojana (Age threshold exceeded)"],
    potentialBenefit: 518000,
  },
];

export const FamilyMembersPage: React.FC<FamilyMembersPageProps> = ({ 
  lang,
  onExploreSchemes,
  onEvaluateHousehold,
  currentUser,
  onOpenLogin,
  onOpenSignup
}) => {
  const t = translations[lang] || translations.en;

  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: "",
    relation: "Child",
    age: 20,
    gender: "Male",
    occupation: "Student",
    annual_income: 0,
    caste_category: "OBC",
    state: "Uttarakhand",
  });

  // Load family members: from authenticated citizen profile or guest demo household
  useEffect(() => {
    if (currentUser) {
      const storageKey = `yojana_family_members_${currentUser.id || "citizen"}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMembers(parsed);
            setSelectedMemberId(parsed[0].id);
            return;
          }
        } catch (e) {
          console.error("Failed to load saved family members", e);
        }
      }

      // Default to the authenticated citizen themselves as the primary head
      const { eligible, nearMiss, potentialBenefit } = calculateMemberSchemes({
        age: currentUser.age || (currentUser.occupation_category === "Student" ? 21 : 35),
        gender: currentUser.gender || "Male",
        occupation: currentUser.occupation_category || "Farmer",
        annual_income: currentUser.annual_income || 180000,
        caste_category: currentUser.caste_category || "General",
        state: currentUser.state || "Uttarakhand",
        relation: "Self (Head)",
      });

      const primaryMember: FamilyMember = {
        id: `mem_${currentUser.id || Date.now()}_self`,
        name: currentUser.name || "Primary Account Holder",
        relation: "Self (Head)",
        age: currentUser.age || (currentUser.occupation_category === "Student" ? 21 : 35),
        gender: currentUser.gender || "Male",
        annual_income: currentUser.annual_income || 180000,
        occupation: currentUser.occupation_category || "Farmer",
        caste_category: currentUser.caste_category || "General",
        state: currentUser.state || "Uttarakhand",
        isAccountHolder: true,
        avatarColor: "bg-blue-100 text-blue-700 border-blue-300",
        eligibleSchemes: eligible,
        nearMissSchemes: nearMiss,
        potentialBenefit: potentialBenefit,
      };

      setMembers([primaryMember]);
      setSelectedMemberId(primaryMember.id);
      localStorage.setItem(storageKey, JSON.stringify([primaryMember]));
    } else {
      // In Guest Mode: load from guest storage or default demo members
      const guestSaved = localStorage.getItem("yojana_family_members_guest");
      if (guestSaved) {
        try {
          const parsed = JSON.parse(guestSaved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMembers(parsed);
            setSelectedMemberId(parsed[0].id);
            return;
          }
        } catch (_) {}
      }

      setMembers(DEFAULT_DEMO_MEMBERS);
      setSelectedMemberId(DEFAULT_DEMO_MEMBERS[0].id);
    }
  }, [currentUser]);

  const saveMembersList = (updated: FamilyMember[]) => {
    setMembers(updated);
    const storageKey = currentUser
      ? `yojana_family_members_${currentUser.id || "citizen"}`
      : "yojana_family_members_guest";
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const selectedMember = members.find((m) => m.id === selectedMemberId) || members[0];

  // Total summary calculations
  const totalHouseholdBenefit = members.reduce((sum, m) => sum + (m.potentialBenefit || 0), 0);
  const allUniqueEligible = Array.from(new Set(members.flatMap((m) => m.eligibleSchemes || [])));

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      relation: "Child",
      age: 20,
      gender: "Male",
      occupation: "Student",
      annual_income: 0,
      caste_category: "OBC",
      state: currentUser?.state || "Uttarakhand",
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (member: FamilyMember, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingMember(member);
    setFormData({
      name: member.name,
      relation: member.relation,
      age: member.age,
      gender: member.gender,
      occupation: member.occupation,
      annual_income: member.annual_income,
      caste_category: member.caste_category,
      state: member.state,
    });
    setIsAddModalOpen(true);
  };

  const handleDelete = (memberId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (members.length <= 1) {
      alert(lang === "hi" ? "कम से कम एक पारिवारिक सदस्य प्रोफ़ाइल रहना आवश्यक है।" : "At least one family member profile must remain.");
      return;
    }
    const filtered = members.filter((m) => m.id !== memberId);
    saveMembersList(filtered);
    if (selectedMemberId === memberId && filtered.length > 0) {
      setSelectedMemberId(filtered[0].id);
    }
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const { eligible, nearMiss, potentialBenefit } = calculateMemberSchemes({
      age: Number(formData.age),
      gender: formData.gender,
      occupation: formData.occupation,
      annual_income: Number(formData.annual_income),
      caste_category: formData.caste_category,
      state: formData.state,
      relation: formData.relation,
    });

    if (editingMember) {
      // Update existing
      const updated = members.map((m) =>
        m.id === editingMember.id
          ? {
              ...m,
              name: formData.name.trim(),
              relation: formData.relation,
              age: Number(formData.age),
              gender: formData.gender,
              occupation: formData.occupation,
              annual_income: Number(formData.annual_income),
              caste_category: formData.caste_category,
              state: formData.state.trim() || "All-India",
              eligibleSchemes: eligible,
              nearMissSchemes: nearMiss,
              potentialBenefit: potentialBenefit,
            }
          : m
      );
      saveMembersList(updated);
    } else {
      // Create new member
      const newId = `mem_${Date.now()}`;
      const colorOptions = [
        "bg-teal-100 text-teal-700 border-teal-300",
        "bg-purple-100 text-purple-700 border-purple-300",
        "bg-rose-100 text-rose-700 border-rose-300",
        "bg-amber-100 text-amber-700 border-amber-300",
        "bg-emerald-100 text-emerald-700 border-emerald-300",
      ];
      const randomColor = colorOptions[members.length % colorOptions.length];

      const newMember: FamilyMember = {
        id: newId,
        name: formData.name.trim(),
        relation: formData.relation,
        age: Number(formData.age),
        gender: formData.gender,
        annual_income: Number(formData.annual_income),
        occupation: formData.occupation,
        caste_category: formData.caste_category,
        state: formData.state.trim() || "All-India",
        isAccountHolder: false,
        avatarColor: randomColor,
        eligibleSchemes: eligible,
        nearMissSchemes: nearMiss,
        potentialBenefit: potentialBenefit,
      };
      const updated = [...members, newMember];
      saveMembersList(updated);
      setSelectedMemberId(newId);
    }
    setIsAddModalOpen(false);
  };

  // Evaluate household welfare benefits through backend rules engine
  const handleEvaluateHouseholdBenefits = async () => {
    setIsEvaluating(true);
    try {
      const payloadMembers = members.map((m) => ({
        id: m.id,
        name: m.name,
        relation: m.relation,
        age: m.age,
        gender: m.gender,
        annual_income: m.annual_income,
        occupation: m.occupation,
        caste_category: m.caste_category,
        state: m.state,
        landholding_acres: m.occupation === "Farmer" ? 2.5 : 0.0,
        is_disabled: false,
        is_student: m.occupation === "Student" || (m.age >= 5 && m.age <= 22),
      }));

      const res = await fetch("/api/eligibility/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ family_members: payloadMembers }),
      });

      if (res.ok) {
        const data = await res.json();
        if (onEvaluateHousehold) {
          onEvaluateHousehold(data);
          return;
        }
      }
    } catch (err) {
      console.warn("Backend evaluation failed, falling back to client evaluation:", err);
    } finally {
      setIsEvaluating(false);
    }

    if (onExploreSchemes) {
      onExploreSchemes();
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 1. TOP HOUSEHOLD OVERVIEW BANNER */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#104E8B] to-[#1E7E34] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#2BB656]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {currentUser
                  ? (lang === "hi" ? "सत्यापित नागरिक परिवार" : "Verified Citizen Family Profile")
                  : (lang === "hi" ? "डेमो पारिवारिक मोड" : "Interactive Demo Household")}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              {lang === "hi" ? "पारिवारिक योजना एवं समग्र कल्याणकारी लाभ" : "Family Household Welfare & Scheme Benefits"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 max-w-2xl leading-relaxed">
              {lang === "hi"
                ? "परिवार के प्रत्येक सदस्य की आयु, पेशा एवं श्रेणी अनुसार योजनाओं की गणना करें। परस्पर विरोधी योजनाओं का समाधान कर अधिकतम प्रत्यक्ष लाभ प्राप्त करें।"
                : "Manage household members, solve mutual exclusion scheme conflicts, and aggregate Direct Benefit Transfers (DBT) across all family members."}
            </p>
          </div>

          {/* Quick Metrics & CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/20 flex items-center space-x-4">
              <div>
                <span className="text-[11px] text-gray-300 block font-medium">
                  {lang === "hi" ? "कुल परिवार सदस्य" : "Household Members"}
                </span>
                <span className="text-xl sm:text-2xl font-black text-white">{members.length}</span>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div>
                <span className="text-[11px] text-gray-300 block font-medium">
                  {lang === "hi" ? "कुल वार्षिक लाभ" : "Total Annual Benefit"}
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-300">
                  ₹{totalHouseholdBenefit.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={isEvaluating}
              onClick={handleEvaluateHouseholdBenefits}
              className="px-6 py-3.5 rounded-2xl bg-[#2BB656] hover:bg-[#1E7E34] text-white font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl transform active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2 shrink-0 disabled:bg-gray-400"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{lang === "hi" ? "गणना जारी है..." : "Evaluating..."}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>{lang === "hi" ? "समग्र पात्रता जांचें" : "Evaluate Household Schemes"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. AUTHENTICATION CONTEXT NOTICE */}
      {!currentUser ? (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-[#0A2540] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center space-x-3 text-xs leading-relaxed">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#104E8B] flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold">
                {lang === "hi" ? "डेमो मोड सक्रिय है: " : "Interactive Guest Mode: "}
              </span>
              <span>
                {lang === "hi"
                  ? "आप नीचे दिए गए सदस्यों में बदलाव कर सकते हैं। अपने परिवार का डेटा हमेशा के लिए सुरक्षित रखने हेतु लॉगिन करें।"
                  : "You are currently previewing and editing a demo household. Log in anytime to save family members to your verified citizen account."}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {onOpenLogin && (
              <button
                type="button"
                onClick={onOpenLogin}
                className="px-3.5 py-1.5 rounded-xl bg-[#104E8B] hover:bg-[#0A2540] text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{lang === "hi" ? "लॉगिन करें" : "Sign In to Save"}</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-[#0A2540] flex items-center justify-between text-xs font-medium">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#1E7E34] shrink-0" />
            <span>
              {lang === "hi"
                ? `नागरिक खाता: ${currentUser.name || "Citizen"} (${currentUser.phone || ""}) - पारिवारिक विवरण सुरक्षित रूप से संग्रहीत हैं।`
                : `Citizen Account: ${currentUser.name || "Citizen"} (${currentUser.phone || ""}) - Family records are securely saved to your private profile.`}
            </span>
          </div>
        </div>
      )}

      {/* 3. TWO-COLUMN INTERACTIVE LAYOUT */}
      {members.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-[#104E8B] mx-auto flex items-center justify-center">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-gray-900">
            {lang === "hi" ? "कोई पारिवारिक सदस्य उपलब्ध नहीं है" : "No Family Members Added Yet"}
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {lang === "hi"
              ? "परिवार का पहला सदस्य जोड़कर योजना पात्रता और लाभों की गणना प्रारंभ करें।"
              : "Add your first family member to calculate personalized central and state welfare benefits."}
          </p>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-6 py-2.5 rounded-xl bg-[#104E8B] hover:bg-[#0A2540] text-white font-bold text-xs shadow-sm transition"
          >
            {t.addMemberBtn || "Add Family Member"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Family Members Card List */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-200 space-y-5">
            {/* Header Bar */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-blue-50 text-[#104E8B] rounded-xl">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none">
                    {t.familyTitle || "Family Members"}
                  </h2>
                  <p className="text-[11px] text-gray-500 font-medium mt-1">
                    {members.length} {lang === "hi" ? "सदस्य दर्ज हैं" : "Members in household"}
                  </p>
                </div>
              </div>

              {/* Add Family Member Button */}
              <button
                type="button"
                onClick={handleOpenAdd}
                className="bg-[#104E8B] hover:bg-[#0A2540] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-xs flex items-center space-x-1.5"
              >
                <span>+</span>
                <span>{t.addMemberBtn || "Add Member"}</span>
              </button>
            </div>

            {/* Cards List */}
            <div className="space-y-3.5">
              {members.map((member) => {
                const isSelected = selectedMember?.id === member.id;
                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMemberId(member.id)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-blue-50/70 border-2 border-[#104E8B] shadow-md transform scale-[1.01]"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 hover:shadow-xs"
                    }`}
                  >
                    {/* Left: Avatar + Details */}
                    <div className="flex items-center space-x-3.5 min-w-0">
                      {/* Illustrated Avatar / Icon with custom badge */}
                      <div className={`w-12 h-12 rounded-2xl overflow-hidden shrink-0 border flex items-center justify-center font-bold text-sm shadow-2xs ${member.avatarColor}`}>
                        <User className="w-6 h-6" />
                      </div>

                      <div className="min-w-0">
                        {/* Name + Account Holder Badge */}
                        <div className="flex items-center space-x-2 flex-wrap">
                          <span className="font-extrabold text-sm sm:text-base text-gray-900 truncate">
                            {member.name}
                          </span>
                          {member.isAccountHolder && (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-blue-100 text-[#104E8B] text-[10px] font-bold">
                              <Crown className="w-3 h-3 text-amber-500" />
                              <span>{t.accountHolderBadge || "Account Holder"}</span>
                            </span>
                          )}
                        </div>

                        {/* Subtitle details */}
                        <div className="flex items-center space-x-1.5 text-xs text-gray-500 mt-1 flex-wrap">
                          <span>{member.age} {t.yearsUnit || "years"}</span>
                          <span>•</span>
                          <span className="font-medium">{member.occupation}</span>
                          <span>•</span>
                          <span className="text-[#104E8B] font-semibold">{member.relation}</span>
                        </div>

                        {/* Schemes quick badge */}
                        <div className="flex items-center space-x-2 mt-1.5 text-[11px] font-semibold text-emerald-700">
                          <Trophy className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{member.eligibleSchemes?.length || 0} {lang === "hi" ? "योजनाएं पात्र" : "Eligible Schemes"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions (Edit, Delete) */}
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleOpenEdit(member, e)}
                        className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#104E8B] flex items-center justify-center transition border border-blue-200/60"
                        title="Edit Profile"
                        aria-label="Edit member"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDelete(member.id, e)}
                        className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition border border-red-200/60"
                        title="Delete Member"
                        aria-label="Delete member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Member Detailed Overview */}
          {selectedMember && (
            <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-200 space-y-5">
              {/* Top Bar: Action Buttons */}
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {lang === "hi" ? "सदस्य विवरण" : "Member Profile Details"}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(selectedMember)}
                    className="px-3 py-1.5 rounded-xl border border-blue-200 text-[#104E8B] bg-blue-50/80 hover:bg-blue-100 text-xs font-bold flex items-center space-x-1.5 transition"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>{t.editProfileBtn || "Edit Profile"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(selectedMember.id)}
                    className="px-3 py-1.5 rounded-xl border border-red-200 text-red-700 bg-red-50/80 hover:bg-red-100 text-xs font-bold flex items-center space-x-1.5 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.deleteBtn || "Delete"}</span>
                  </button>
                </div>
              </div>

              {/* Member Profile Header */}
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center shrink-0 shadow-2xs ${selectedMember.avatarColor}`}>
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-950">
                    {selectedMember.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1 flex-wrap">
                    <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-md">
                      {selectedMember.relation}
                    </span>
                    {selectedMember.isAccountHolder && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-blue-100 text-[#104E8B] text-xs font-bold">
                        <Crown className="w-3.5 h-3.5 text-amber-500" />
                        <span>{t.accountHolderBadge || "Primary Account Holder"}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 1: Personal Information */}
              <div className="rounded-2xl bg-gray-50/80 border border-gray-200/90 overflow-hidden shadow-2xs">
                <div className="px-4 py-2.5 bg-blue-50/80 border-b border-gray-200 text-xs font-bold text-gray-900 flex items-center space-x-1.5">
                  <Users className="w-4 h-4 text-[#104E8B]" />
                  <span>{t.personalInfoTitle || "Personal Demographic Details"}</span>
                </div>
                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs">
                  <div>
                    <span className="text-gray-500 block">{t.ageLabel || "Age"}</span>
                    <span className="font-bold text-gray-900 text-sm mt-0.5 block">{selectedMember.age} {t.yearsUnit || "Years"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">{t.genderLabel || "Gender"}</span>
                    <span className="font-bold text-gray-900 text-sm mt-0.5 block">{selectedMember.gender}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">{t.casteLabel || "Category"}</span>
                    <span className="font-bold text-gray-900 text-sm mt-0.5 block">{selectedMember.caste_category}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">{t.occupationLabel || "Occupation"}</span>
                    <span className="font-bold text-gray-900 text-sm mt-0.5 block">{selectedMember.occupation}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">{t.stateLabel || "State / UT"}</span>
                    <span className="font-bold text-gray-900 text-sm mt-0.5 block">{selectedMember.state}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">{t.annualIncomeLabel || "Annual Income"}</span>
                    <span className="font-bold text-gray-900 text-sm mt-0.5 block">
                      ₹{selectedMember.annual_income.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Eligible Schemes */}
              <div className="rounded-2xl bg-indigo-50/40 border border-indigo-100 overflow-hidden shadow-2xs">
                <div className="px-4 py-2.5 bg-indigo-100/60 border-b border-indigo-200/60 text-xs font-bold text-indigo-950 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <Trophy className="w-4 h-4 text-indigo-600" />
                    <span>{t.eligibleSchemesTitle || "Eligible Welfare Schemes"}</span>
                    <span className="ml-1 px-2 py-0.2 rounded-full bg-indigo-200/80 text-indigo-900 text-[10px]">
                      {selectedMember.eligibleSchemes?.length || 0}
                    </span>
                  </div>
                  {onExploreSchemes && (
                    <button
                      type="button"
                      onClick={onExploreSchemes}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition"
                    >
                      {t.viewAllBtn || "View Directory"} &rarr;
                    </button>
                  )}
                </div>
                <div className="p-4 flex flex-wrap gap-2">
                  {selectedMember.eligibleSchemes && selectedMember.eligibleSchemes.length > 0 ? (
                    selectedMember.eligibleSchemes.map((s, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-indigo-950 shadow-2xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <span>{s}</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500 italic">No specific eligible schemes matched for current criteria.</span>
                  )}
                </div>
              </div>

              {/* SECTION 3: Near-Miss Schemes */}
              <div className="rounded-2xl bg-emerald-50/40 border border-emerald-100 overflow-hidden shadow-2xs">
                <div className="px-4 py-2.5 bg-emerald-100/60 border-b border-emerald-200/60 text-xs font-bold text-emerald-950 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t.nearMissSchemesTitle || "Near-Miss Opportunities"}</span>
                    <span className="ml-1 px-2 py-0.2 rounded-full bg-emerald-200/80 text-emerald-900 text-[10px]">
                      {selectedMember.nearMissSchemes?.length || 0}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-wrap gap-2">
                  {selectedMember.nearMissSchemes && selectedMember.nearMissSchemes.length > 0 ? (
                    selectedMember.nearMissSchemes.map((nm, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-xs font-semibold text-emerald-950 shadow-2xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                        <span>{nm}</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500 italic">No near-miss schemes currently flagged.</span>
                  )}
                </div>
              </div>

              {/* SECTION 4: Potential Benefit Card */}
              <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 shadow-2xs">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <span className="text-xs text-amber-900 font-bold block">{t.potentialBenefitTitle || "Estimated Annual Benefit Potential"}</span>
                    <span className="text-xl font-black text-amber-950 block">
                      ₹{selectedMember.potentialBenefit.toLocaleString("en-IN")} / year
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-lg">
                  Direct transfers & health cover
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. ADD / EDIT MEMBER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-200 relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-gray-900 mb-1">
              {editingMember
                ? (lang === "hi" ? "पारिवारिक सदस्य विवरण संपादित करें" : "Edit Family Member Profile")
                : (lang === "hi" ? "नया पारिवारिक सदस्य जोड़ें" : "Add New Family Member")}
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              {lang === "hi"
                ? "आयु, पेशा एवं आय की सटीक जानकारी प्रदान करें ताकि पात्रता नियमों की सही जांच हो सके।"
                : "Provide demographic parameters to calculate verified central and state schemes."}
            </p>

            <form onSubmit={handleSaveMember} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  {lang === "hi" ? "पूरा नाम *" : "Full Name *"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar Sharma"
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    {lang === "hi" ? "संबंध" : "Relationship"}
                  </label>
                  <select
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                  >
                    <option value="Self (Head)">Self (Head)</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Son">Son</option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Child">Child</option>
                    <option value="Other Dependent">Other Dependent</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    {lang === "hi" ? "आयु (वर्ष) *" : "Age (Years) *"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    {lang === "hi" ? "लिंग" : "Gender"}
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    {lang === "hi" ? "पेशा / मुख्य कार्य" : "Occupation"}
                  </label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                  >
                    <option value="Farmer">Farmer (किसान)</option>
                    <option value="Student">Student (छात्र)</option>
                    <option value="Homemaker">Homemaker (गृहिणी)</option>
                    <option value="Senior Citizen">Senior Citizen (वरिष्ठ नागरिक)</option>
                    <option value="Daily Wage Laborer">Daily Wage Laborer (दैनिक मजदूर)</option>
                    <option value="Street Vendor">Street Vendor (फेरीवाला / दुकानदार)</option>
                    <option value="Artisan/Craftsman">Artisan / Craftsman (कारीगर)</option>
                    <option value="Self-Employed">Self-Employed (स्वरोजगार)</option>
                    <option value="Salaried Employee">Salaried Employee (वेतनभोगी)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    {lang === "hi" ? "वार्षिक आय (₹)" : "Annual Income (₹)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    value={formData.annual_income}
                    onChange={(e) => setFormData({ ...formData, annual_income: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    {lang === "hi" ? "जाति श्रेणी" : "Caste Category"}
                  </label>
                  <select
                    value={formData.caste_category}
                    onChange={(e) => setFormData({ ...formData, caste_category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                  >
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  {lang === "hi" ? "राज्य / केंद्र शासित प्रदेश" : "State / UT"}
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="e.g. Uttarakhand, Uttar Pradesh..."
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#104E8B] focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold transition"
                >
                  {lang === "hi" ? "रद्द करें" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#104E8B] hover:bg-[#0A2540] text-white font-bold shadow-md transition"
                >
                  {editingMember
                    ? (lang === "hi" ? "परिवर्तन सहेजें" : "Save Changes")
                    : (lang === "hi" ? "सदस्य जोड़ें" : "Add Member")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
