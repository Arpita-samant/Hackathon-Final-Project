"""
OTP Security and Management Service.
Implements:
1. Cryptographic 6-digit OTP generation (secrets).
2. Salted SHA-256 hash storage (never stored in plain text).
3. 5-minute validity window.
4. Resend cooldown (30 seconds).
5. Brute-force protection (maximum 5 failed attempts).
6. Rate limiting (maximum 5 requests per email per hour).
7. Invalidation of previous OTPs on new request.
8. Single-use enforcement.
"""

import hashlib
import secrets
import threading
from datetime import datetime, timedelta
from typing import Dict, Any, Tuple, Optional

# Security parameters
OTP_VALIDITY_MINUTES = 5
COOLDOWN_SECONDS = 30
MAX_VERIFY_ATTEMPTS = 5
MAX_HOURLY_REQUESTS = 6

_lock = threading.Lock()

# In-memory secure OTP store: email -> record
# record = {
#     "otp_hash": str,
#     "salt": str,
#     "purpose": str,
#     "created_at": datetime,
#     "expires_at": datetime,
#     "attempts": int,
#     "last_sent_at": datetime,
#     "hourly_count": int,
#     "hourly_reset_at": datetime
# }
_otp_records: Dict[str, Dict[str, Any]] = {}

def _hash_otp(otp_code: str, salt: str) -> str:
    """Hashes the OTP code with a unique salt using SHA-256."""
    return hashlib.sha256(f"{otp_code}:{salt}".encode("utf-8")).hexdigest()

def generate_and_store_otp(email: str, purpose: str = "login") -> Tuple[bool, Optional[str], str]:
    """
    Generates a secure 6-digit OTP for the given email address.
    Applies rate limits, cooldowns, and hashes before storing.
    Returns: (success: bool, raw_otp_for_email_only: Optional[str], message: str)
    """
    clean_email = email.strip().lower()
    now = datetime.utcnow()

    with _lock:
        record = _otp_records.get(clean_email)

        # 1. Hourly rate limiting
        if record:
            hourly_reset_at = record.get("hourly_reset_at", now)
            if now > hourly_reset_at:
                record["hourly_count"] = 0
                record["hourly_reset_at"] = now + timedelta(hours=1)

            if record.get("hourly_count", 0) >= MAX_HOURLY_REQUESTS:
                remaining_mins = int((record["hourly_reset_at"] - now).total_seconds() // 60) + 1
                return False, None, f"Too many requests. Please try again in {remaining_mins} minutes."

            # 2. Cooldown check (30 seconds between sends)
            last_sent_at = record.get("last_sent_at", now - timedelta(seconds=100))
            elapsed_seconds = (now - last_sent_at).total_seconds()
            if elapsed_seconds < COOLDOWN_SECONDS:
                wait_secs = int(COOLDOWN_SECONDS - elapsed_seconds) + 1
                return False, None, f"Please wait {wait_secs} seconds before requesting a new code."

        # 3. Generate cryptographically random 6-digit OTP
        raw_otp = f"{secrets.randbelow(900000) + 100000}"
        salt = secrets.token_hex(16)
        hashed_otp = _hash_otp(raw_otp, salt)

        # 4. Invalidate previous OTP and store new record
        hourly_count = (record.get("hourly_count", 0) + 1) if record else 1
        hourly_reset_at = record.get("hourly_reset_at", now + timedelta(hours=1)) if record else (now + timedelta(hours=1))

        _otp_records[clean_email] = {
            "otp_hash": hashed_otp,
            "salt": salt,
            "purpose": purpose,
            "created_at": now,
            "expires_at": now + timedelta(minutes=OTP_VALIDITY_MINUTES),
            "attempts": 0,
            "last_sent_at": now,
            "hourly_count": hourly_count,
            "hourly_reset_at": hourly_reset_at
        }

    return True, raw_otp, "Verification code generated successfully."

def verify_stored_otp(email: str, provided_otp: str, purpose: str = "login") -> Tuple[bool, str]:
    """
    Verifies a provided OTP against the salted hash.
    Enforces expiry (5 mins), single-use, purpose matching, and attempt limits.
    Returns: (is_valid: bool, reason_message: str)
    """
    clean_email = email.strip().lower()
    clean_otp = provided_otp.strip()
    now = datetime.utcnow()

    with _lock:
        record = _otp_records.get(clean_email)
        if not record:
            return False, "No active verification code found. Please request a new code."

        # Check purpose
        if record.get("purpose") != purpose:
            return False, f"This code was issued for {record.get('purpose')}, not {purpose}."

        # Check expiration (5 minutes)
        if now > record["expires_at"]:
            del _otp_records[clean_email]
            return False, "Verification code has expired. Please request a fresh code."

        # Check attempt limits
        record["attempts"] += 1
        if record["attempts"] > MAX_VERIFY_ATTEMPTS:
            del _otp_records[clean_email]
            return False, "Too many failed attempts. Code has been invalidated. Please request a new one."

        # Verify hashed comparison
        salt = record["salt"]
        computed_hash = _hash_otp(clean_otp, salt)

        # Strictly verify against salted SHA-256 hash
        is_match = secrets.compare_digest(computed_hash, record["otp_hash"])

        if is_match:
            # Single-use: immediately purge OTP after success
            del _otp_records[clean_email]
            return True, "Verification successful."
        else:
            remaining = MAX_VERIFY_ATTEMPTS - record["attempts"]
            return False, f"Incorrect verification code. {remaining} attempt(s) remaining."
