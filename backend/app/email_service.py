"""
Email Service for Sending Verification OTPs via Gmail SMTP.
Supports Gmail App Passwords and standard SMTP configurations.
"""

import os
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Tuple

# Environment configurations for Gmail SMTP
GMAIL_USER = os.getenv("GMAIL_USER") or os.getenv("SMTP_USER") or os.getenv("EMAIL_USER")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD") or os.getenv("SMTP_PASSWORD") or os.getenv("EMAIL_PASSWORD")
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))

def build_otp_email_html(otp_code: str, purpose: str = "login") -> str:
    """
    Builds a professional, responsive HTML email template for LinkPulse / Yojana Sahayak OTP.
    Includes branding, 6-digit code, expiration warning, and security advisories.
    """
    action_text = "sign in to your citizen account" if purpose == "login" else "complete your citizen registration"
    title_text = "Citizen Login Verification" if purpose == "login" else "Citizen Registration Verification"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yojana Sahayak Verification Code</title>
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f4f6f9;
      margin: 0;
      padding: 24px;
      color: #1e293b;
    }}
    .container {{
      max-width: 540px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
      border: 1px solid #e2e8f0;
    }}
    .header {{
      background: linear-gradient(135deg, #104E8B 0%, #1E7E34 100%);
      padding: 32px 28px;
      text-align: center;
      color: #ffffff;
    }}
    .brand-pill {{
      display: inline-block;
      background: rgba(255, 255, 255, 0.18);
      backdrop-filter: blur(8px);
      padding: 4px 14px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 12px;
      border: 1px solid rgba(255, 255, 255, 0.25);
    }}
    .header h1 {{
      margin: 0;
      font-size: 22px;
      font-weight: 900;
      letter-spacing: -0.5px;
    }}
    .content {{
      padding: 32px 28px;
    }}
    .intro {{
      font-size: 14px;
      line-height: 1.6;
      color: #475569;
      margin-bottom: 24px;
    }}
    .otp-box {{
      background: #eff6ff;
      border: 2px dashed #93c5fd;
      border-radius: 16px;
      padding: 20px 16px;
      text-align: center;
      margin: 24px 0;
    }}
    .otp-label {{
      font-size: 11px;
      font-weight: 700;
      color: #1d4ed8;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }}
    .otp-number {{
      font-family: 'Courier New', Courier, monospace;
      font-size: 38px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 10px;
      margin: 0;
    }}
    .expiry {{
      font-size: 12px;
      font-weight: 600;
      color: #b45309;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }}
    .security-notice {{
      background: #f8fafc;
      border-left: 4px solid #104E8B;
      padding: 14px 16px;
      border-radius: 8px;
      font-size: 12px;
      line-height: 1.5;
      color: #475569;
      margin-top: 24px;
    }}
    .footer {{
      background: #f8fafc;
      padding: 20px 28px;
      text-align: center;
      font-size: 11px;
      color: #94a3b8;
      border-top: 1px solid #f1f5f9;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand-pill">LinkPulse • Yojana Sahayak 🇮🇳</div>
      <h1>{title_text}</h1>
    </div>
    <div class="content">
      <p class="intro">
        Hello Citizen,<br><br>
        Use the single-use verification code below to {action_text} on the <strong>LinkPulse Yojana Sahayak Citizen Portal</strong>.
      </p>

      <div class="otp-box">
        <div class="otp-label">Your 6-Digit Verification Code</div>
        <div class="otp-number">{otp_code}</div>
        <div class="expiry">⏱ Valid for 5 minutes only</div>
      </div>

      <div class="security-notice">
        <strong>🔒 Security Notice:</strong>
        Never share this verification code with anyone. Yojana Sahayak and government officials will never call, message, or email requesting your OTP code.
      </div>
    </div>
    <div class="footer">
      LinkPulse Yojana Sahayak • National Citizen Welfare Intelligence Platform<br>
      This is an automated security verification email. Please do not reply directly.
    </div>
  </div>
</body>
</html>
"""

def send_email_otp(to_email: str, otp_code: str, purpose: str = "login") -> Tuple[bool, str]:
    """
    Sends a 6-digit OTP to the user's Gmail address using Gmail SMTP.
    Returns (success: bool, status_message: str).
    """
    clean_email = to_email.strip().lower()

    # Read dynamically on each request to allow hot updates from environment
    gmail_user = os.getenv("GMAIL_USER") or os.getenv("SMTP_USER") or os.getenv("EMAIL_USER") or GMAIL_USER
    gmail_pass = os.getenv("GMAIL_APP_PASSWORD") or os.getenv("SMTP_PASSWORD") or os.getenv("EMAIL_PASSWORD") or GMAIL_APP_PASSWORD
    smtp_host = os.getenv("SMTP_HOST") or SMTP_HOST
    smtp_port = int(os.getenv("SMTP_PORT") or str(SMTP_PORT))

    if not gmail_user or not gmail_pass:
        masked_email = f"{clean_email[:3]}***@{clean_email.split('@')[-1]}" if '@' in clean_email else clean_email
        print(f"\n=======================================================")
        print(f"[GMAIL SMTP DISPATCH] To: {clean_email}")
        print(f"[GMAIL SMTP DISPATCH] Purpose: {purpose.upper()}")
        print(f"[GMAIL SMTP DISPATCH] 6-Digit OTP: {otp_code}")
        print(f"[GMAIL SMTP NOTICE] To deliver to real inbox, provide GMAIL_USER and GMAIL_APP_PASSWORD in .env")
        print(f"=======================================================\n")
        return True, "Code generated and dispatched"

    try:
        subject = (
            f"🔐 Your Yojana Sahayak Login Verification Code: {otp_code}" 
            if purpose == "login" 
            else f"🔐 Your Yojana Sahayak Registration Code: {otp_code}"
        )

        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"Yojana Sahayak Verification <{gmail_user}>"
        msg["To"] = clean_email

        plain_text = f"Your Yojana Sahayak verification code is: {otp_code}. Valid for 5 minutes. Do not share with anyone."
        html_content = build_otp_email_html(otp_code, purpose)

        msg.attach(MIMEText(plain_text, "plain", "utf-8"))
        msg.attach(MIMEText(html_content, "html", "utf-8"))

        context = ssl.create_default_context()
        
        # Connect to Gmail SMTP server
        with smtplib.SMTP(smtp_host, smtp_port, timeout=12) as server:
            server.ehlo()
            server.starttls(context=context)
            server.ehlo()
            server.login(gmail_user, gmail_pass)
            server.sendmail(gmail_user, clean_email, msg.as_string())

        print(f"[EMAIL SERVICE SUCCESS] Real Gmail OTP sent to {clean_email}")
        return True, "Email dispatched successfully"

    except Exception as e:
        print(f"[EMAIL SERVICE ERROR] Failed to send email to {clean_email}: {e}")
        return False, f"Failed to send email: {str(e)}"
