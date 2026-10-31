"""
Email Service for Sending Verification OTPs via Gmail SMTP.
Supports Google App Passwords, dual-port fallback (587 STARTTLS / 465 SSL),
and comprehensive diagnostics when credentials are missing or incorrect.
"""

import os
import smtplib
import ssl
from pathlib import Path
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Tuple
from dotenv import load_dotenv

# Ensure .env is read on module import
_base_dir = Path(__file__).resolve().parent.parent
if (_base_dir / ".env").exists():
    load_dotenv(_base_dir / ".env", override=False)
if (_base_dir.parent / ".env").exists():
    load_dotenv(_base_dir.parent / ".env", override=False)

def get_smtp_credentials():
    """Re-evaluates environment variables on demand so changes in .env are immediately active."""
    # Reload from disk if available
    if (_base_dir / ".env").exists():
        load_dotenv(_base_dir / ".env", override=True)
    if (_base_dir.parent / ".env").exists():
        load_dotenv(_base_dir.parent / ".env", override=False)

    gmail_user = (
        os.getenv("GMAIL_USER")
        or os.getenv("SMTP_USER")
        or os.getenv("EMAIL_USER")
        or "samantarpita70@gmail.com"
    ).strip()

    raw_password = (
        os.getenv("GMAIL_APP_PASSWORD")
        or os.getenv("SMTP_PASSWORD")
        or os.getenv("EMAIL_PASSWORD")
        or "itqzdqantnhcvpok"
    ).strip()

    # Google App Passwords are 16 lowercase characters often formatted with spaces (e.g. "abcd efgh ijkl mnop")
    gmail_pass = raw_password.replace(" ", "")

    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com").strip()
    try:
        smtp_port = int(os.getenv("SMTP_PORT", "587").strip())
    except Exception:
        smtp_port = 587

    return gmail_user, gmail_pass, smtp_host, smtp_port

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
    gmail_user, gmail_pass, smtp_host, smtp_port = get_smtp_credentials()

    # 1. Validation: Credentials MUST be configured
    if not gmail_user or not gmail_pass:
        error_msg = (
            "Gmail SMTP not configured: GMAIL_USER and GMAIL_APP_PASSWORD are missing from backend/.env. "
            "Please add your Gmail address and 16-character Google App Password (from https://myaccount.google.com/apppasswords) to backend/.env."
        )
        print(f"\n[EMAIL SERVICE WARNING] {error_msg}")
        return False, error_msg

    subject = (
        f"🔐 Your Yojana Sahayak Login Verification Code: {otp_code}" 
        if purpose == "login" 
        else f"🔐 Your Yojana Sahayak Registration Code: {otp_code}"
    )

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"Yojana Sahayak <{gmail_user}>"
    msg["To"] = clean_email

    plain_text = f"Your Yojana Sahayak verification code is: {otp_code}. Valid for 5 minutes. Do not share with anyone."
    html_content = build_otp_email_html(otp_code, purpose)

    msg.attach(MIMEText(plain_text, "plain", "utf-8"))
    msg.attach(MIMEText(html_content, "html", "utf-8"))

    context = ssl.create_default_context()

    # Attempt 1: Port 587 with STARTTLS
    try:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
            server.ehlo()
            server.starttls(context=context)
            server.ehlo()
            server.login(gmail_user, gmail_pass)
            server.sendmail(gmail_user, clean_email, msg.as_string())

        print(f"[EMAIL SERVICE SUCCESS] Real Gmail OTP sent via port {smtp_port} to {clean_email}")
        return True, "Verification email dispatched successfully to your Gmail inbox."

    except smtplib.SMTPAuthenticationError as auth_err:
        err_text = (
            "Gmail SMTP Authentication Failed: Invalid Google App Password. "
            "Please make sure GMAIL_USER is your full Gmail address and GMAIL_APP_PASSWORD is a valid 16-character Google App Password (generate at https://myaccount.google.com/apppasswords)."
        )
        print(f"[EMAIL SERVICE AUTH ERROR] {auth_err}")
        return False, err_text

    except Exception as port587_err:
        print(f"[EMAIL SERVICE] Port {smtp_port} attempt failed ({port587_err}), attempting SSL port 465 fallback...")

    # Attempt 2: Fallback to Port 465 SSL
    try:
        with smtplib.SMTP_SSL(smtp_host, 465, context=context, timeout=10) as server:
            server.login(gmail_user, gmail_pass)
            server.sendmail(gmail_user, clean_email, msg.as_string())

        print(f"[EMAIL SERVICE SUCCESS] Real Gmail OTP sent via SSL port 465 to {clean_email}")
        return True, "Verification email dispatched successfully to your Gmail inbox."

    except smtplib.SMTPAuthenticationError as auth_err:
        err_text = (
            "Gmail SMTP Authentication Failed: Invalid Google App Password. "
            "Please make sure GMAIL_USER is your full Gmail address and GMAIL_APP_PASSWORD is a valid 16-character Google App Password (generate at https://myaccount.google.com/apppasswords)."
        )
        print(f"[EMAIL SERVICE AUTH ERROR] {auth_err}")
        return False, err_text

    except Exception as fallback_err:
        final_err = f"Failed to send email to {clean_email} via Gmail SMTP: {str(fallback_err)}"
        print(f"[EMAIL SERVICE FATAL ERROR] {final_err}")
        return False, final_err
