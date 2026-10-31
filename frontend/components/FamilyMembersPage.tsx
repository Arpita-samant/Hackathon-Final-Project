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
  ShieldCheck
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
  currentUser?: any;
  onOpenLogin?: () => void;
  onOpenSignup?: () => void;
}

export const FamilyMembersPage: React.FC<FamilyMembersPageProps> = ({ 
  lang,
  onExploreSchemes,
  currentUser,
  onOpenLogin,
  onOpenSignup
}) => {
  const t = translations[lang] || translations.en;

  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");

  // Sync and isolate family data strictly for authenticated currentUser
  useEffect(() => {
    if (!currentUser) {
      setMembers([]);
      setSelectedMemberId("");
      return;
    }

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

    // Default to only 1 member: the authenticated citizen themselves
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
      eligibleSchemes: currentUser.occupation_category === "Student"
        ? ["National Scholarship Portal", "PM e-VIDYA", "Skill India Mission"]
        : ["PM-KISAN", "Kisan Credit Card", "Ayushman Bharat PM-JAY"],
      nearMissSchemes: ["PMAY-Gramin (Housing Assistance)"],
      potentialBenefit: currentUser.occupation_category === "Student" ? 25000 : 12000,
    };

    setMembers([primaryMember]);
    setSelectedMemberId(primaryMember.id);
    localStorage.setItem(storageKey, JSON.stringify([primaryMember]));
  }, [currentUser]);

  const saveMembersList = (updated: FamilyMember[]) => {
    setMembers(updated);
    if (currentUser) {
      const storageKey = `yojana_family_members_${currentUser.id || "citizen"}`;
      localStorage.setItem(storageKey, JSON.stringify(updated));
    }
  };
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

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl overflow-hidden p-8 sm:p-12 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#104E8B] shadow-sm">
            <Users className="w-10 h-10 text-[#104E8B]" />
          </div>
          
          <div className="space-y-2 max-w-lg mx-auto">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === "hi" ? "नागरिक खाता अनिवार्य है" : "Citizen Account Required"}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {lang === "hi" ? "पारिवारिक विवरण एवं कल्याणकारी लाभ" : "Family Members & Household Welfare Benefits"}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {lang === "hi"
                ? "नागरिक गोपनीयता सुरक्षा के लिए, परिवार के सदस्यों का विवरण, आयु, संबंध और प्रत्यक्ष लाभ केवल आपके व्यक्तिगत नागरिक खाते में लॉग इन करने के बाद ही दिखाई देते हैं।"
                : "To protect citizen privacy, family member records, relationship structures, and personalized welfare benefits are private. Please log in or create an account to view and manage your family."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {onOpenLogin && (
              <button
                type="button"
                onClick={onOpenLogin}
                className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-[#104E8B] hover:bg-[#0A2540] text-white font-bold text-sm shadow-md hover:shadow-lg transform active:scale-95 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{lang === "hi" ? "लॉगिन करें (Log In)" : "Log In to View Family"}</span>
              </button>
            )}

            {onOpenSignup && (
              <button
                type="button"
                onClick={onOpenSignup}
                className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-[#1E7E34] hover:bg-[#2BB656] text-white font-bold text-sm shadow-md hover:shadow-lg transform active:scale-95 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{lang === "hi" ? "नया नागरिक खाता बनाएं (Sign Up)" : "Create New Account"}</span>
              </button>
            )}
          </div>

          {/* Security & Feature Badges */}
          <div className="pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <ShieldCheck className="w-5 h-5 text-[#1E7E34] mb-2" />
              <h4 className="text-xs font-bold text-gray-900">{lang === "hi" ? "पूर्ण डेटा गोपनीयता" : "Private & Isolated"}</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">{lang === "hi" ? "परिवार का डेटा केवल आपके खाते में सुरक्षित रहता है।" : "Family member records are strictly isolated to your verified account."}</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <Trophy className="w-5 h-5 text-[#104E8B] mb-2" />
              <h4 className="text-xs font-bold text-gray-900">{lang === "hi" ? "समग्र पात्रता गणना" : "Household Scheme Matching"}</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">{lang === "hi" ? "प्रत्येक सदस्य की आयु व आय अनुसार योजनाओं की जांच।" : "Matches schemes across spouse, children, and elders automatically."}</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <CheckCircle2 className="w-5 h-5 text-[#2BB656] mb-2" />
              <h4 className="text-xs font-bold text-gray-900">{lang === "hi" ? "डीबीटी प्रत्यक्ष लाभ" : "Direct Benefit Transfer"}</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">{lang === "hi" ? "बैंक खाते व आधार से जुड़े सरकारी लाभों की गणना।" : "Tracks eligible government subsidies credited per family member."}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const selectedMember = members.find((m) => m.id === selectedMemberId) || members[0];

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
      state: "Uttarakhand",
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
      alert("At least one primary account holder member must remain.");
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

    if (editingMember) {
      // Update
      const updated = members.map((m) =>
        m.id === editingMember.id
          ? {
              ...m,
              name: formData.name,
              relation: formData.relation,
              age: Number(formData.age),
              gender: formData.gender,
              occupation: formData.occupation,
              annual_income: Number(formData.annual_income),
              caste_category: formData.caste_category,
              state: formData.state,
            }
          : m
      );
      saveMembersList(updated);
    } else {
      // Create
      const newId = `mem_${Date.now()}`;
      const newMember: FamilyMember = {
        id: newId,
        name: formData.name,
        relation: formData.relation,
        age: Number(formData.age),
        gender: formData.gender,
        annual_income: Number(formData.annual_income),
        occupation: formData.occupation,
        caste_category: formData.caste_category,
        state: formData.state,
        isAccountHolder: false,
        avatarColor: "bg-teal-100 text-teal-700 border-teal-300",
        eligibleSchemes: ["Ayushman Bharat PM-JAY", "National Social Assistance"],
        nearMissSchemes: ["PM Kisan (Landholding Required)"],
        potentialBenefit: 500000,
      };
      const updated = [...members, newMember];
      saveMembersList(updated);
      setSelectedMemberId(newId);
    }
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 2-COLUMN LAYOUT MATCHING IMAGE 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Family Members Card List */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-200 space-y-5">
          {/* Header Bar */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-blue-50 text-[#104E8B] rounded-xl">
                <Home className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {t.familyTitle || "Family Members"}
              </h2>
            </div>

            {/* Add Family Member Button */}
            <button
              type="button"
              onClick={handleOpenAdd}
              className="bg-[#104E8B] hover:bg-[#0A2540] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-xs"
            >
              <span>{t.addMemberBtn || "Add Family Member"}</span>
            </button>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {members.map((member) => {
              const isSelected = selectedMemberId === member.id;
              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMemberId(member.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-blue-50/60 border-2 border-blue-400 shadow-sm"
                      : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-xs"
                  }`}
                >
                  {/* Left: Avatar + Details */}
                  <div className="flex items-center space-x-3.5 min-w-0">
                    {/* Illustrated Avatar / Icon */}
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-blue-200 bg-blue-50 flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>

                    <div className="min-w-0">
                      {/* Name + Account Holder Badge */}
                      <div className="flex items-center space-x-2 flex-wrap">
                        <span className="font-extrabold text-sm sm:text-base text-gray-900 truncate">
                          {member.name}
                        </span>
                        {member.isAccountHolder && (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-blue-100/80 text-blue-700 text-[10px] font-bold">
                            <Crown className="w-3 h-3 text-amber-500" />
                            <span>{t.accountHolderBadge || "Account Holder"}</span>
                          </span>
                        )}
                      </div>

                      {/* Subtitle details with Icons */}
                      <div className="flex items-center space-x-1.5 text-xs text-gray-500 mt-1">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span>{member.age} {t.yearsUnit || "years"}</span>
                        <span>•</span>
                        <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                        <span>{member.occupation}</span>
                      </div>

                      {/* Relationship */}
                      <div className="flex items-center space-x-1 text-xs text-gray-600 mt-0.5 font-medium">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        <span>{t.relationLabel || "Relationship"}: {member.relation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions (Edit, Delete, Select Arrow) */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleOpenEdit(member, e)}
                      className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition border border-blue-200/60"
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

        {/* RIGHT COLUMN: Member Detailed Overview (Matches Image 2 Right Panel) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-200 space-y-5">
          {/* Top Bar: Back button (on mobile) + Edit Profile + Delete */}
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.backToFamilyBtn || "Back to Family"}</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleOpenEdit(selectedMember)}
                className="px-3 py-1.5 rounded-xl border border-blue-200 text-blue-700 bg-blue-50/80 hover:bg-blue-100 text-xs font-bold flex items-center space-x-1.5 transition"
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
            <div className="w-16 h-16 rounded-full border-2 border-blue-200 bg-blue-50 flex items-center justify-center shrink-0">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-950">
                {selectedMember.name}
              </h3>
              {selectedMember.isAccountHolder && (
                <div className="mt-1">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-blue-100/90 text-blue-700 text-xs font-bold">
                    <Crown className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t.accountHolderBadge || "Account Holder"}</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 1: Personal Information (Matches Image 2) */}
          <div className="rounded-2xl bg-gray-50/80 border border-gray-200/90 overflow-hidden">
            <div className="px-4 py-2.5 bg-blue-50/80 border-b border-gray-200 text-xs font-bold text-gray-900 flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              <span>{t.personalInfoTitle || "Personal Information"}</span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500 block">{t.ageLabel || "Age"}</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{selectedMember.age} {t.yearsUnit || "Years"}</span>
              </div>
              <div>
                <span className="text-gray-500 block">{t.casteLabel || "Caste Category"}</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{selectedMember.caste_category}</span>
              </div>
              <div>
                <span className="text-gray-500 block">{t.genderLabel || "Gender"}</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{selectedMember.gender}</span>
              </div>
              <div>
                <span className="text-gray-500 block">{t.stateLabel || "State"}</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{selectedMember.state}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500 block">{t.occupationLabel || "Occupation"}</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{selectedMember.occupation}</span>
              </div>
            </div>
          </div>

          {/* SECTION 2: Family Details (Matches Image 2) */}
          <div className="rounded-2xl bg-gray-50/80 border border-gray-200/90 overflow-hidden">
            <div className="px-4 py-2.5 bg-blue-50/80 border-b border-gray-200 text-xs font-bold text-gray-900 flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{t.familyDetailsTitle || "Family Details"}</span>
            </div>
            <div className="p-4 space-y-3 text-xs">
              <div>
                <span className="text-gray-500 block">{t.relationLabel || "Relationship with Account Holder"}</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{selectedMember.relation}</span>
              </div>
              <div>
                <span className="text-gray-500 block">{t.annualIncomeLabel || "Annual Income"}</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">
                  ₹{selectedMember.annual_income.toLocaleString("en-IN")} / year
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 3: Eligible Schemes (Matches Image 2) */}
          <div className="rounded-2xl bg-indigo-50/50 border border-indigo-100 overflow-hidden">
            <div className="px-4 py-2.5 bg-indigo-100/60 border-b border-indigo-200/60 text-xs font-bold text-indigo-950 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <Trophy className="w-4 h-4 text-indigo-600" />
                <span>{t.eligibleSchemesTitle || "Eligible Schemes"}</span>
              </div>
              <button
                type="button"
                onClick={onExploreSchemes}
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition"
              >
                {t.viewAllBtn || "View All"}
              </button>
            </div>
            <div className="p-4 flex flex-wrap gap-2">
              {selectedMember.eligibleSchemes.map((s, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-indigo-900 shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>{s}</span>
                </span>
              ))}
            </div>
          </div>

          {/* SECTION 4: Near-Miss Schemes (Matches Image 2) */}
          <div className="rounded-2xl bg-emerald-50/50 border border-emerald-100 overflow-hidden">
            <div className="px-4 py-2.5 bg-emerald-100/60 border-b border-emerald-200/60 text-xs font-bold text-emerald-950 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.nearMissSchemesTitle || "Near-Miss Schemes"}</span>
              </div>
              <button
                type="button"
                onClick={onExploreSchemes}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 transition"
              >
                {t.viewAllBtn || "View All"}
              </button>
            </div>
            <div className="p-4 flex flex-wrap gap-2">
              {selectedMember.nearMissSchemes.map((nm, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-xs font-semibold text-emerald-900 shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{nm}</span>
                </span>
              ))}
            </div>
          </div>

          {/* SECTION 5: Potential Benefit Card (Matches Image 2) */}
          <div className="rounded-2xl bg-amber-50/90 border border-amber-200 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-amber-900 font-medium block">{t.potentialBenefitTitle || "Potential Benefit"}</span>
                <span className="text-lg font-black text-amber-950 block">
                  ₹{selectedMember.potentialBenefit.toLocaleString("en-IN")} / year
                </span>
              </div>
            </div>
            <span className="text-[11px] font-medium text-amber-800">
              Includes eligible & near-miss schemes
            </span>
          </div>
        </div>
      </div>

      {/* ADD / EDIT MEMBER MODAL */}
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
              {editingMember ? "Edit Family Member Profile" : "Add New Family Member"}
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              Provide accurate demographic details to calculate verified schemes and near-misses.
            </p>

            <form onSubmit={handleSaveMember} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar Sharma"
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Relationship</label>
                  <select
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Self / Father">Self / Father</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Son">Son</option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Other Dependent">Other Dependent</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Age (Years)</label>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Occupation</label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Farmer">Farmer</option>
                    <option value="Student">Student</option>
                    <option value="Homemaker">Homemaker</option>
                    <option value="Daily Wage/Laborer">Daily Wage/Laborer</option>
                    <option value="Street Vendor">Street Vendor</option>
                    <option value="Artisan/Craftsman">Artisan/Craftsman</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Salaried">Salaried Employee</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Annual Income (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    value={formData.annual_income}
                    onChange={(e) => setFormData({ ...formData, annual_income: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Caste Category</label>
                  <select
                    value={formData.caste_category}
                    onChange={(e) => setFormData({ ...formData, caste_category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                <label className="font-bold text-gray-700 block mb-1">State / UT</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="e.g. Uttarakhand, Uttar Pradesh..."
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#104E8B] hover:bg-[#0A2540] text-white font-bold shadow-sm"
                >
                  {editingMember ? "Save Changes" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
