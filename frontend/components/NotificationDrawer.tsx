"use client";

import React, { useState, useEffect } from "react";
import { 
  Bell, 
  BellRing, 
  X, 
  Mail, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Sparkles, 
  ExternalLink, 
  AlertTriangle, 
  Loader2, 
  Check, 
  Send,
  User,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { Language } from "@/lib/translations";

export interface NotificationItem {
  id: string;
  type: "future_eligibility" | "deadline_reminder" | "status_update";
  title: string;
  message: string;
  scheme_name: string;
  scheme_id?: string;
  official_url: string;
  urgency: "urgent" | "high" | "normal";
  days_remaining?: number | null;
  status_stage?: string | null;
  beneficiary_name?: string | null;
  created_at: string;
  is_read: boolean;
}

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  userEmail?: string;
  userName?: string;
  onNavigateTab?: (tab: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  userEmail = "",
  userName = "Citizen",
  onNavigateTab,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [filter, setFilter] = useState<"all" | "future_eligibility" | "deadline_reminder" | "status_update">("all");
  const [emailInput, setEmailInput] = useState<string>(userEmail || "");
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Sync email when userEmail prop changes
  useEffect(() => {
    if (userEmail && !emailInput) {
      setEmailInput(userEmail);
    }
  }, [userEmail]);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unread_count || 0);
      }
    } catch (err) {
      console.warn("Could not load notifications from API:", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  // Initial fetch for unread badge count
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Mark single or all as read
  const handleMarkAsRead = async (notifId: string) => {
    try {
      const res = await fetch("/api/notifications/mark-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notification_id: notifId }),
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unread_count || 0);
      }
    } catch (err) {
      console.warn("Failed to mark notification read:", err);
    }
  };

  // Send notifications via Email
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = (emailInput || userEmail).trim();
    if (!targetEmail || !targetEmail.includes("@")) {
      setEmailError("Please enter a valid Gmail address.");
      return;
    }

    setIsSendingEmail(true);
    setEmailSuccess(null);
    setEmailError(null);

    try {
      const res = await fetch("/api/notifications/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: targetEmail,
          recipient_name: userName || "Citizen",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEmailSuccess(`✅ Alerts successfully sent to ${targetEmail}! Check your inbox.`);
      } else {
        setEmailError(data.detail || data.message || "Failed to dispatch email. Check SMTP settings.");
      }
    } catch (err) {
      setEmailError("Network error while dispatching notification email.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    return n.type === filter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-gray-200 relative animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP DRAWER HEADER */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#104E8B] to-[#1E7E34] text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <BellRing className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-black tracking-tight">Welfare & Eligibility Alerts</h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-500 text-white shadow-xs">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <p className="text-[11px] text-blue-100">
                Future milestones, countdowns & progress tracking
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
            title="Close alerts"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* EMAIL DISPATCH BAR */}
        <div className="bg-blue-50/80 border-b border-blue-100 p-3 sm:px-4">
          <form onSubmit={handleSendEmail} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#104E8B] flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5 text-[#104E8B]" />
                <span>Send These Alerts To Your Gmail:</span>
              </span>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead("all")}
                  className="text-[11px] font-bold text-gray-500 hover:text-gray-900 underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="flex items-center space-x-1.5">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter Gmail address (e.g. citizen@gmail.com)"
                className="flex-1 bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#104E8B]"
              />
              <button
                type="submit"
                disabled={isSendingEmail}
                className="px-3.5 py-1.5 rounded-xl bg-[#104E8B] hover:bg-[#0A2540] disabled:bg-gray-400 text-white text-xs font-bold transition flex items-center space-x-1 shrink-0 shadow-xs"
              >
                {isSendingEmail ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{isSendingEmail ? "Sending..." : "Email Me"}</span>
              </button>
            </div>

            {emailSuccess && (
              <div className="text-[11px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2.5 py-1 rounded-lg">
                {emailSuccess}
              </div>
            )}
            {emailError && (
              <div className="text-[11px] font-bold text-rose-800 bg-rose-100/90 border border-rose-300 px-2.5 py-1 rounded-lg">
                {emailError}
              </div>
            )}
          </form>
        </div>

        {/* CATEGORY FILTER CHIPS */}
        <div className="p-3 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-white">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition shrink-0 ${
              filter === "all"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Alerts ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("future_eligibility")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition shrink-0 ${
              filter === "future_eligibility"
                ? "bg-purple-600 text-white"
                : "bg-purple-50 text-purple-700 hover:bg-purple-100"
            }`}
          >
            🚀 Future Eligibility
          </button>
          <button
            onClick={() => setFilter("deadline_reminder")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition shrink-0 ${
              filter === "deadline_reminder"
                ? "bg-red-600 text-white"
                : "bg-red-50 text-red-700 hover:bg-red-100"
            }`}
          >
            ⏳ Deadlines
          </button>
          <button
            onClick={() => setFilter("status_update")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition shrink-0 ${
              filter === "status_update"
                ? "bg-emerald-600 text-white"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            📋 Status Updates
          </button>
        </div>

        {/* NOTIFICATIONS STREAM */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Bell className="w-10 h-10 mx-auto text-gray-300 mb-2 stroke-[1.5]" />
              <p className="text-xs font-bold text-gray-500">No alerts in this category</p>
              <p className="text-[11px] text-gray-400 mt-0.5">You're completely up to date.</p>
            </div>
          ) : (
            filteredNotifications.map((n) => {
              const isFuture = n.type === "future_eligibility";
              const isDeadline = n.type === "deadline_reminder";
              const isStatus = n.type === "status_update";

              const badgeColor = isFuture
                ? "bg-purple-100 text-purple-800 border-purple-200"
                : isDeadline
                ? "bg-red-100 text-red-800 border-red-200"
                : "bg-emerald-100 text-emerald-800 border-emerald-200";

              const borderAccent = isFuture
                ? "border-l-purple-500"
                : isDeadline
                ? "border-l-red-500"
                : "border-l-emerald-500";

              return (
                <div
                  key={n.id}
                  onClick={() => !n.is_read && handleMarkAsRead(n.id)}
                  className={`bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs hover:shadow-xs transition border-l-4 ${borderAccent} relative cursor-pointer`}
                >
                  {/* Category Badge & Timestamp */}
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-gray-100">
                    <div className="flex items-center space-x-1.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${badgeColor}`}>
                        {isFuture ? "🚀 Future Eligibility" : isDeadline ? "⏳ Deadline Alert" : "📋 Status Progress"}
                      </span>
                      {n.days_remaining !== null && n.days_remaining !== undefined && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-600 text-white animate-pulse">
                          {n.days_remaining} Days Left
                        </span>
                      )}
                      {!n.is_read && (
                        <span className="w-2 h-2 rounded-full bg-red-500" title="Unread" />
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">{n.created_at}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs sm:text-sm font-black text-gray-950 leading-snug">
                    {n.title}
                  </h3>

                  {/* Message */}
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {n.message}
                  </p>

                  {/* Beneficiary & Scheme Info */}
                  <div className="mt-2.5 pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="space-y-0.5">
                      {n.beneficiary_name && (
                        <div className="flex items-center space-x-1 text-gray-500 font-medium">
                          <User className="w-3 h-3 text-gray-400" />
                          <span>Beneficiary: <strong>{n.beneficiary_name}</strong></span>
                        </div>
                      )}
                      <div className="text-gray-500">
                        Scheme: <strong className="text-[#104E8B]">{n.scheme_name}</strong>
                      </div>
                    </div>

                    {/* Official Portal Link */}
                    <a
                      href={n.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#104E8B] hover:bg-[#0A2540] text-white text-xs font-bold transition shadow-2xs"
                    >
                      <span>{isDeadline ? "Apply Now" : isStatus ? "Track Portal" : "Apply Portal"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* BOTTOM ADVISORY FOOTER */}
        <div className="p-3 bg-white border-t border-gray-200 text-center text-[11px] text-gray-500 flex items-center justify-between">
          <span className="flex items-center space-x-1 text-amber-700">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>Official Government Portal Direct Links</span>
          </span>
          <button
            onClick={() => {
              onClose();
              onNavigateTab?.("schemes");
            }}
            className="text-[#104E8B] hover:underline font-bold flex items-center space-x-0.5"
          >
            <span>Explore All Schemes</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;
