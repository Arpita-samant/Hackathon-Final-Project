"use client";

import React, { useState } from "react";
import { X, User, Phone, Users, Sprout, Landmark, Save } from "lucide-react";

interface AuthProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    name: string;
    familyCount: number;
    landholding: string;
    bankAccountMasked: string;
    phone?: string;
  };
  onSave: (updated: any) => void;
}

export const AuthProfileModal: React.FC<AuthProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: profile.name || "Amit Kumar Singh",
    familyCount: profile.familyCount || 4,
    landholding: profile.landholding || "1.5 Hectare",
    bankAccountMasked: profile.bankAccountMasked || "XXXX1234",
    phone: profile.phone || "+91 98765 43210",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-md w-full overflow-hidden p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-gray-900">
                Citizen Profile & Family Details
              </h3>
              <p className="text-xs text-gray-500">Live data used across eligibility checks</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Farmer / Applicant Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Mobile Number (Aadhaar linked)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Family Members Count
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={formData.familyCount}
                  onChange={(e) => setFormData({ ...formData, familyCount: parseInt(e.target.value) || 1 })}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Land Holding
              </label>
              <div className="relative">
                <Sprout className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={formData.landholding}
                  onChange={(e) => setFormData({ ...formData, landholding: e.target.value })}
                  placeholder="e.g. 1.5 Hectare"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Bank Account (Masked)
            </label>
            <div className="relative">
              <Landmark className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={formData.bankAccountMasked}
                onChange={(e) => setFormData({ ...formData, bankAccountMasked: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-sm shadow-md transition flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
