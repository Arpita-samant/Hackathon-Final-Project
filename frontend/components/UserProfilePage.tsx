"use client";

import React, { useState, useEffect, useRef } from "react";
import { Language, translations } from "@/lib/translations";
import { 
  User, 
  Phone, 
  GraduationCap, 
  Sprout, 
  Briefcase, 
  Hammer, 
  ShoppingBag, 
  Home, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Edit3, 
  X, 
  Save, 
  Lock,
  AlertCircle
} from "lucide-react";

interface UserProfilePageProps {
  lang: Language;
  currentUser: any;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onUpdateUser: (updatedUser: any) => void;
}

const OCCUPATION_OPTIONS = [
  { id: "Student", label: "Student", labelHi: "छात्र / छात्रा", icon: GraduationCap },
  { id: "Farmer", label: "Farmer", labelHi: "किसान", icon: Sprout },
  { id: "Daily Wage Worker", label: "Daily Wage Worker", labelHi: "दैनिक वेतनभोगी श्रमिक", icon: Hammer },
  { id: "Small Business Owner", label: "Small Business / Vendor", labelHi: "लघु व्यापारी / दुकानदार", icon: ShoppingBag },
  { id: "Artisan / Craftsman", label: "Artisan / Craftsman", labelHi: "कारीगर / शिल्पकार", icon: Briefcase },
  { id: "Homemaker", label: "Homemaker", labelHi: "गृहिणी", icon: Home },
];

export const UserProfilePage: React.FC<UserProfilePageProps> = ({
  lang,
  currentUser,
  onOpenLogin,
  onOpenSignup,
  onUpdateUser,
}) => {
  const t = translations[lang] || translations.en;
  const [profile, setProfile] = useState<any>(currentUser || null);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [activeUploadDocType, setActiveUploadDocType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editOccupation, setEditOccupation] = useState("Farmer");
  const [editState, setEditState] = useState("Uttar Pradesh");
  const [editIncome, setEditIncome] = useState("180000");
  const [editAadhaar, setEditAadhaar] = useState("");
  const [editPan, setEditPan] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      setProfile(currentUser);
      setEditName(currentUser.name || "");
      setEditOccupation(currentUser.occupation_category || "Farmer");
      setEditState(currentUser.state || "Uttar Pradesh");
      setEditIncome(String(currentUser.annual_income || 180000));
      setEditAadhaar(currentUser.aadhaar_number || "");
      setEditPan(currentUser.pan_number || "");
    }
  }, [currentUser]);

  // Handle uploading documents anytime
  const handleUploadClick = (docType: string) => {
    setActiveUploadDocType(docType);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeUploadDocType) return;

    setLoading(true);
    const token = localStorage.getItem("yojana_auth_token") || currentUser?.auth_token;

    try {
      const res = await fetch("/api/auth/upload-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          doc_type: activeUploadDocType,
          file_name: file.name,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const updated = {
          ...profile,
          documents: data.documents,
        };
        setProfile(updated);
        onUpdateUser(updated);
        setSuccessToast(`${activeUploadDocType.toUpperCase()} document uploaded successfully!`);
        setTimeout(() => setSuccessToast(null), 4000);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  // Save edited profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    const token = localStorage.getItem("yojana_auth_token") || currentUser?.auth_token;

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: editName,
          occupation_category: editOccupation,
          state: editState,
          annual_income: parseFloat(editIncome) || 0,
          aadhaar_number: editAadhaar,
          pan_number: editPan,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
        onUpdateUser(updated);
        setEditModalOpen(false);
        setSuccessToast(lang === "hi" ? "प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!" : "Profile successfully updated!");
        setTimeout(() => setSuccessToast(null), 4000);
      }
    } catch (err) {
      console.error("Save profile error", err);
    } finally {
      setSaveLoading(false);
    }
  };

  // If user is not logged in, prompt to log in or sign up
  if (!profile) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              {t.profileTitle || "Citizen Profile & Document Locker"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              {t.profileSubtitle || "Please sign in or create an account with SMS verification to manage your personal schemes, family members, and document locker."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={onOpenLogin}
              className="px-6 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 text-gray-800 text-xs font-bold transition"
            >
              {t.navLogin || "Sign In with Mobile"}
            </button>
            <button
              onClick={onOpenSignup}
              className="px-6 py-2.5 rounded-xl bg-[#1E7E34] hover:bg-[#2BB656] text-white text-xs font-bold shadow-md shadow-green-900/15 transition"
            >
              {t.navSignup || "Create Account (Sign Up)"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const userDocs = profile.documents || {};

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-8 animate-in fade-in duration-200">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
      />

      {/* Success Toast */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center space-x-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* TOP CITIZEN IDENTITY CARD */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center space-x-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#104E8B] to-[#1E7E34] text-white flex items-center justify-center font-black text-2xl shadow-md">
            {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {profile.name || "Citizen User"}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-50 text-[#104E8B] border border-blue-200 flex items-center space-x-1">
                <span>{profile.occupation_category || "Farmer"}</span>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pt-0.5">
              <span className="flex items-center space-x-1">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-semibold text-gray-700">+91 {profile.phone}</span>
              </span>
              <span>•</span>
              <span className="text-[#1E7E34] font-bold flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2BB656]" />
                <span>{t.smsVerifiedBadge || "SMS Verified"}</span>
              </span>
              <span>•</span>
              <span>{profile.state || "All-India"}</span>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={() => setEditModalOpen(true)}
          className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold transition flex items-center space-x-2 shrink-0 shadow-2xs"
        >
          <Edit3 className="w-4 h-4 text-gray-600" />
          <span>{t.editProfileTitle || "Edit Profile"}</span>
        </button>
      </div>

      {/* DOCUMENT LOCKER SECTION */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h2 className="text-lg font-black text-gray-900 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-red-600" />
              <span>{t.docsLockerTitle || "Citizen Document Locker & Identity Proofs"}</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {t.docsLockerSubtitle || "Uploading documents is 100% optional. Students, farmers, or workers can upload or update Aadhaar & PAN anytime."}
            </p>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Aadhaar Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex justify-between items-center hover:border-gray-300 transition">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="font-extrabold text-sm text-gray-900">
                  {t.aadhaarCardLabel || "Aadhaar Card"}
                </h3>
              </div>
              <p className="text-xs text-gray-500">
                {userDocs.aadhaar?.uploaded
                  ? `Uploaded: ${userDocs.aadhaar.fileName}`
                  : (t.notUploadedYet || "Not uploaded yet (Optional)")}
              </p>
            </div>
            <button
              onClick={() => handleUploadClick("aadhaar")}
              disabled={loading}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                userDocs.aadhaar?.uploaded
                  ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  : "bg-red-50 hover:bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{userDocs.aadhaar?.uploaded ? (t.updateBtn || "Update") : (t.uploadBtn || "Upload")}</span>
            </button>
          </div>

          {/* Card 2: PAN Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex justify-between items-center hover:border-gray-300 transition">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <h3 className="font-extrabold text-sm text-gray-900">
                  {t.panCardLabel || "PAN Card"}
                </h3>
              </div>
              <p className="text-xs text-gray-500">
                {userDocs.pan?.uploaded
                  ? `Uploaded: ${userDocs.pan.fileName}`
                  : (t.notUploadedYet || "Not uploaded yet (Optional)")}
              </p>
            </div>
            <button
              onClick={() => handleUploadClick("pan")}
              disabled={loading}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                userDocs.pan?.uploaded
                  ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  : "bg-red-50 hover:bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{userDocs.pan?.uploaded ? (t.updateBtn || "Update") : (t.uploadBtn || "Upload")}</span>
            </button>
          </div>

          {/* Card 3: Student ID / Occupation Proof */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex justify-between items-center hover:border-gray-300 transition">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <h3 className="font-extrabold text-sm text-gray-900">
                  {t.studentIdLabel || "Student ID / Occupation Certificate"}
                </h3>
              </div>
              <p className="text-xs text-gray-500">
                {userDocs.student_id?.uploaded
                  ? `Uploaded: ${userDocs.student_id.fileName}`
                  : (t.notUploadedYet || "Useful for scholarships & grants")}
              </p>
            </div>
            <button
              onClick={() => handleUploadClick("student_id")}
              disabled={loading}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                userDocs.student_id?.uploaded
                  ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  : "bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{userDocs.student_id?.uploaded ? (t.updateBtn || "Update") : (t.uploadBtn || "Upload")}</span>
            </button>
          </div>

          {/* Card 4: Ration Card / Income Certificate */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex justify-between items-center hover:border-gray-300 transition">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h3 className="font-extrabold text-sm text-gray-900">
                  {t.rationCardLabel || "Ration Card / Income Certificate"}
                </h3>
              </div>
              <p className="text-xs text-gray-500">
                {userDocs.ration_card?.uploaded
                  ? `Uploaded: ${userDocs.ration_card.fileName}`
                  : (t.notUploadedYet || "Food security & PDS verification")}
              </p>
            </div>
            <button
              onClick={() => handleUploadClick("ration_card")}
              disabled={loading}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                userDocs.ration_card?.uploaded
                  ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  : "bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{userDocs.ration_card?.uploaded ? (t.updateBtn || "Update") : (t.uploadBtn || "Upload")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <Edit3 className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-gray-900">
                  {lang === "hi" ? "प्रोफ़ाइल संपादित करें" : "Edit Citizen Profile"}
                </h3>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
              {/* Category / Role Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {lang === "hi" ? "आपकी श्रेणी (Student, Farmer, आदि):" : "Your Role / Category:"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {OCCUPATION_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setEditOccupation(opt.id)}
                      className={`p-2 rounded-xl border text-xs font-bold text-left transition ${
                        editOccupation === opt.id
                          ? "bg-red-50 border-red-500 text-red-700"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {lang === "hi" ? opt.labelHi : opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === "hi" ? "पूरा नाम" : "Full Name"}
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* State & Income */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === "hi" ? "राज्य (State)" : "State"}
                  </label>
                  <input
                    type="text"
                    value={editState}
                    onChange={(e) => setEditState(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === "hi" ? "वार्षिक आय (₹)" : "Annual Income (₹)"}
                  </label>
                  <input
                    type="number"
                    value={editIncome}
                    onChange={(e) => setEditIncome(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Optional Aadhaar & PAN Number inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === "hi" ? "आधार नंबर (वैकल्पिक)" : "Aadhaar No. (Optional)"}
                  </label>
                  <input
                    type="text"
                    value={editAadhaar}
                    onChange={(e) => setEditAadhaar(e.target.value)}
                    placeholder="XXXX XXXX 1234"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === "hi" ? "पैन नंबर (वैकल्पिक)" : "PAN No. (Optional)"}
                  </label>
                  <input
                    type="text"
                    value={editPan}
                    onChange={(e) => setEditPan(e.target.value)}
                    placeholder="ABCDE1234F"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="w-full py-2.5 rounded-xl bg-[#104E8B] hover:bg-[#0A2540] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-900/15 transition flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{saveLoading ? (lang === "hi" ? "सहेजा जा रहा है..." : "Saving...") : (lang === "hi" ? "परिवर्तन सहेजें" : "Save Changes")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
