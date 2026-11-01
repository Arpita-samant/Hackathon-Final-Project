"""
Notification Service for Yojana Sahayak.
Manages:
1. Future Eligibility Alerts (overcoming near-miss boundary like turning 18 or new financial year)
2. Deadline Reminders (urgent countdowns for closing application dates)
3. Application Status Updates (tracking stages like Documents Verified, Pending Approval, Active)
4. Email dispatch via Gmail SMTP with responsive HTML template.
"""

import os
import smtplib
import ssl
from datetime import datetime, timedelta
from typing import List, Dict, Any, Tuple, Optional
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pydantic import BaseModel

from app.email_service import get_smtp_credentials

class NotificationItem(BaseModel):
    id: str
    type: str  # "future_eligibility" | "deadline_reminder" | "status_update"
    title: str
    message: str
    scheme_name: str
    scheme_id: Optional[str] = None
    official_url: str
    urgency: str = "normal"  # "urgent" | "high" | "normal"
    days_remaining: Optional[int] = None
    status_stage: Optional[str] = None
    beneficiary_name: Optional[str] = None
    created_at: str
    is_read: bool = False

# In-memory store for notifications (simulated or per-session)
_NOTIFICATIONS_STORE: List[Dict[str, Any]] = [
    {
        "id": "notif_fe_01",
        "type": "future_eligibility",
        "title": "🎉 Near-Miss Boundary Cleared: Turned 18!",
        "message": "Your daughter Priya turned 18 this month! The previous age near-miss boundary for Uttarakhand Gaura Devi Kanya Dhan Yojana (₹51,000 grant) and Mukhyamantri Hunar Yojana has been cleared. She is now fully eligible to apply.",
        "scheme_name": "Gaura Devi Kanya Dhan Yojana",
        "scheme_id": "uk_gaura_devi",
        "official_url": "https://eservices.uk.gov.in/",
        "urgency": "high",
        "days_remaining": None,
        "status_stage": "Eligible to Apply",
        "beneficiary_name": "Priya Sharma (Daughter)",
        "created_at": "Today, 10:15 AM",
        "is_read": False
    },
    {
        "id": "notif_fe_02",
        "type": "future_eligibility",
        "title": "📊 New Financial Year Eligibility Reset",
        "message": "Entering Financial Year 2026-27: Income ceiling thresholds and annual quota for PMAY-G (Pradhan Mantri Awaas Yojana - Gramin) have been updated. Your family's reported annual income now qualifies for the ₹1,30,000 pucca house subsidy.",
        "scheme_name": "PMAY-G (Pradhan Mantri Awaas Yojana)",
        "scheme_id": "pmay_g",
        "official_url": "https://pmayg.nic.in/",
        "urgency": "high",
        "days_remaining": None,
        "status_stage": "Income Threshold Cleared",
        "beneficiary_name": "Household",
        "created_at": "Yesterday",
        "is_read": False
    },
    {
        "id": "notif_dl_01",
        "type": "deadline_reminder",
        "title": "⏳ Urgent Deadline: 4 Days Left to Apply",
        "message": "National Scholarship Portal (NSP 2026-27) application window closes on November 5, 2026. A student in your household is eligible for the Central Sector Post-Matric Scholarship (up to ₹20,000/yr). Submit documents immediately.",
        "scheme_name": "National Scholarship Portal (NSP)",
        "scheme_id": "nsp_scholarship",
        "official_url": "https://scholarships.gov.in/",
        "urgency": "urgent",
        "days_remaining": 4,
        "status_stage": "Window Closing",
        "beneficiary_name": "Rahul Sharma (Son)",
        "created_at": "Today, 08:30 AM",
        "is_read": False
    },
    {
        "id": "notif_dl_02",
        "type": "deadline_reminder",
        "title": "⏰ Subsidy Window Closing: 9 Days Remaining",
        "message": "PM Surya Ghar Muft Bijli Yojana Phase-2 state quota application deadline approaching. You are eligible for up to ₹78,000 direct subsidy and 300 units free monthly solar power.",
        "scheme_name": "PM Surya Ghar Muft Bijli Yojana",
        "scheme_id": "pm_surya_ghar",
        "official_url": "https://pmsuryaghar.gov.in/",
        "urgency": "urgent",
        "days_remaining": 9,
        "status_stage": "Quota Expiring",
        "beneficiary_name": "Household",
        "created_at": "2 days ago",
        "is_read": False
    },
    {
        "id": "notif_st_01",
        "type": "status_update",
        "title": "✅ Application Status: Documents Verified",
        "message": "PM Kisan Samman Nidhi (Application #UK-KISAN-98421): Stage 3 'Land Record & Aadhaar e-KYC' has been successfully verified by the District Agriculture Officer. Forwarded to State Nodal for 19th installment DBT disbursement.",
        "scheme_name": "PM Kisan Samman Nidhi",
        "scheme_id": "pm_kisan",
        "official_url": "https://pmkisan.gov.in/",
        "urgency": "normal",
        "days_remaining": None,
        "status_stage": "Documents Verified",
        "beneficiary_name": "Ramesh Sharma (Self)",
        "created_at": "Today, 09:45 AM",
        "is_read": False
    },
    {
        "id": "notif_st_02",
        "type": "status_update",
        "title": "📋 Application Status: Card Approved & Active",
        "message": "Ayushman Bharat PM-JAY (Ref #AB-PMJAY-44120): E-Card approved and generated! All family members can now access cashless hospitalization up to ₹5,00,000 at empanelled public and private hospitals.",
        "scheme_name": "Ayushman Bharat PM-JAY",
        "scheme_id": "ayushman_bharat",
        "official_url": "https://beneficiary.nha.gov.in/",
        "urgency": "normal",
        "days_remaining": None,
        "status_stage": "Card Generated",
        "beneficiary_name": "Entire Family",
        "created_at": "3 days ago",
        "is_read": True
    }
]

def get_all_notifications() -> List[Dict[str, Any]]:
    """Returns all current notifications with read/unread statuses."""
    return _NOTIFICATIONS_STORE

def mark_notification_as_read(notif_id: str) -> bool:
    """Marks a single notification as read or all if notif_id == 'all'."""
    if notif_id == "all":
        for n in _NOTIFICATIONS_STORE:
            n["is_read"] = True
        return True

    for n in _NOTIFICATIONS_STORE:
        if n["id"] == notif_id:
            n["is_read"] = True
            return True
    return False

def build_notification_email_html(notifications: List[Dict[str, Any]], recipient_name: str = "Citizen") -> str:
    """
    Constructs a responsive, accessible HTML email containing the user's
    Future Eligibility, Deadline, and Application Status notifications.
    """
    fe_items = [n for n in notifications if n["type"] == "future_eligibility"]
    dl_items = [n for n in notifications if n["type"] == "deadline_reminder"]
    st_items = [n for n in notifications if n["type"] == "status_update"]

    def render_card(n: Dict[str, Any]) -> str:
        color_map = {
            "future_eligibility": ("#7C3AED", "#EDE9FE", "🚀 FUTURE ELIGIBILITY ALERT"),
            "deadline_reminder": ("#DC2626", "#FEE2E2", f"⏳ DEADLINE COUNTDOWN ({n.get('days_remaining', 'Few')} DAYS LEFT)"),
            "status_update": ("#059669", "#D1FAE5", f"📋 STATUS: {n.get('status_stage', 'UPDATED')}")
        }
        theme_color, bg_tint, badge_text = color_map.get(n["type"], ("#104E8B", "#EBF3FC", "NOTIFICATION"))

        beneficiary_line = f"<div style='font-size: 11px; color: #64748B; margin-top: 4px;'><strong>Beneficiary:</strong> {n['beneficiary_name']}</div>" if n.get("beneficiary_name") else ""

        return f"""
        <div style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-left: 4px solid {theme_color}; border-radius: 12px; padding: 16px; margin-bottom: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
          <div style="display: inline-block; background-color: {bg_tint}; color: {theme_color}; font-size: 10px; font-weight: 800; padding: 3px 10px; border-radius: 9999px; letter-spacing: 0.5px; text-transform: uppercase;">
            {badge_text}
          </div>
          <h3 style="font-size: 15px; font-weight: 800; color: #0F172A; margin: 8px 0 4px 0;">{n['title']}</h3>
          <p style="font-size: 13px; line-height: 1.55; color: #334155; margin: 0 0 10px 0;">{n['message']}</p>
          {beneficiary_line}
          <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #F1F5F9; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 11px; color: #94A3B8;">Scheme: <strong>{n['scheme_name']}</strong></span>
            <a href="{n['official_url']}" target="_blank" style="display: inline-block; background-color: #104E8B; color: #FFFFFF; text-decoration: none; font-size: 11px; font-weight: 700; padding: 6px 14px; border-radius: 8px;">Official Portal →</a>
          </div>
        </div>
        """

    cards_html = "".join(render_card(n) for n in notifications)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yojana Sahayak Welfare & Eligibility Notifications</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 24px; color: #1E293B;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #E2E8F0;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #104E8B 0%, #1E7E34 100%); padding: 32px 24px; text-align: center; color: #FFFFFF;">
      <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 14px; border-radius: 9999px; font-size: 11px; font-weight: 800; letter-spacing: 0.5px;">
        Yojana Sahayak • National Citizen Welfare Intelligence 🇮🇳
      </div>
      <h1 style="font-size: 22px; font-weight: 900; margin: 12px 0 4px 0; color: #FFFFFF;">Welfare & Eligibility Alerts</h1>
      <p style="font-size: 13px; color: rgba(255,255,255,0.9); margin: 0;">Urgent updates, milestone triggers & approaching deadlines</p>
    </div>

    <!-- Content -->
    <div style="padding: 24px;">
      <p style="font-size: 14px; color: #334155; margin-top: 0; line-height: 1.5;">
        Namaste <strong>{recipient_name}</strong>,<br>
        Here is your personalized summary of government scheme updates, near-miss boundary milestones, and urgent deadlines for your household.
      </p>

      <!-- Summary Stat Pills -->
      <div style="background-color: #F1F5F9; border-radius: 12px; padding: 12px; margin-bottom: 20px; text-align: center;">
        <span style="font-size: 12px; font-weight: 700; color: #475569;">Active Alerts: </span>
        <span style="font-size: 12px; font-weight: 800; color: #7C3AED; margin-right: 12px;">🚀 {len(fe_items)} Future Eligibility</span>
        <span style="font-size: 12px; font-weight: 800; color: #DC2626; margin-right: 12px;">⏳ {len(dl_items)} Deadlines</span>
        <span style="font-size: 12px; font-weight: 800; color: #059669;">📋 {len(st_items)} Status Updates</span>
      </div>

      {cards_html}

      <!-- Security Advisory -->
      <div style="background-color: #FEF3C7; border: 1px solid #FDE68A; border-radius: 10px; padding: 12px 16px; margin-top: 20px; font-size: 12px; color: #92400E; line-height: 1.45;">
        <strong>🛡️ Official Government Advisory:</strong> Government schemes never charge processing fees for eligibility verification. Never share OTPs or send money to personal UPI IDs.
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #F8FAFC; padding: 20px 24px; text-align: center; font-size: 11px; color: #94A3B8; border-top: 1px solid #E2E8F0;">
      LinkPulse Yojana Sahayak • National Citizen Welfare Intelligence Platform<br>
      Automated notifications based on your verified household profile. You can manage alert preferences in the portal.
    </div>
  </div>
</body>
</html>
"""

def send_notification_email(
    to_email: str,
    notifications: Optional[List[Dict[str, Any]]] = None,
    recipient_name: str = "Citizen"
) -> Tuple[bool, str]:
    """
    Sends the user's active notifications to their Gmail address using Gmail SMTP.
    Returns (success: bool, status_message: str).
    """
    clean_email = to_email.strip().lower()
    if not clean_email or "@" not in clean_email:
        return False, "Invalid recipient email address."

    items_to_send = notifications or _NOTIFICATIONS_STORE
    gmail_user, gmail_pass, smtp_host, smtp_port = get_smtp_credentials()

    if not gmail_user or not gmail_pass:
        return False, "Gmail SMTP not configured: GMAIL_USER or GMAIL_APP_PASSWORD missing."

    urgent_count = sum(1 for n in items_to_send if n.get("urgency") == "urgent")
    subject = (
        f"🚨 Urgent Welfare Alerts: {urgent_count} Approaching Deadlines & Eligibility Milestones – Yojana Sahayak"
        if urgent_count > 0
        else "🔔 Your Yojana Sahayak Scheme & Eligibility Notification Digest"
    )

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"Yojana Sahayak Alerts <{gmail_user}>"
    msg["To"] = clean_email

    plain_lines = [
        f"Namaste {recipient_name},",
        "Here are your latest Yojana Sahayak notifications:\n"
    ]
    for n in items_to_send:
        plain_lines.append(f"[{n['type'].upper()}] {n['title']}")
        plain_lines.append(f"Scheme: {n['scheme_name']}")
        plain_lines.append(f"Details: {n['message']}")
        plain_lines.append(f"Official Portal: {n['official_url']}\n")

    plain_text = "\n".join(plain_lines)
    html_content = build_notification_email_html(items_to_send, recipient_name)

    msg.attach(MIMEText(plain_text, "plain", "utf-8"))
    msg.attach(MIMEText(html_content, "html", "utf-8"))

    context = ssl.create_default_context()

    # Port 587 STARTTLS
    try:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=12) as server:
            server.ehlo()
            server.starttls(context=context)
            server.ehlo()
            server.login(gmail_user, gmail_pass)
            server.sendmail(gmail_user, clean_email, msg.as_string())

        print(f"[NOTIFICATION SERVICE] Dispatched notification email via port {smtp_port} to {clean_email}")
        return True, f"Notification digest successfully sent to {clean_email}."
    except Exception as e:
        print(f"[NOTIFICATION SERVICE STARTTLS Exception] {e}. Retrying SSL port 465...")
        try:
            with smtplib.SMTP_SSL(smtp_host, 465, context=context, timeout=12) as server:
                server.login(gmail_user, gmail_pass)
                server.sendmail(gmail_user, clean_email, msg.as_string())
            print(f"[NOTIFICATION SERVICE] Dispatched notification email via SSL port 465 to {clean_email}")
            return True, f"Notification digest successfully sent to {clean_email}."
        except Exception as e2:
            print(f"[NOTIFICATION SERVICE SSL Exception] {e2}")
            return False, f"Failed to send email: {e2}"
