import os
import json
import uuid
import threading
from pathlib import Path
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, List

import bcrypt
import jwt

JWT_SECRET = os.getenv("JWT_SECRET", "yojana-sahayak-super-secret-jwt-key-2026-hackathon")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_DAYS = 30

# Thread lock for file operations
_file_lock = threading.Lock()

# Primary and fallback file paths
BASE_DIR = Path(__file__).resolve().parent.parent
PRIMARY_DATA_DIR = BASE_DIR / "data"
PRIMARY_USERS_FILE = PRIMARY_DATA_DIR / "users.json"
FALLBACK_USERS_FILE = Path("/tmp") / "yojana_users.json"

# In-memory storage cache to ensure zero loss across requests
_in_memory_users: List[Dict[str, Any]] = []

def _get_active_file_path() -> Path:
    try:
        PRIMARY_DATA_DIR.mkdir(parents=True, exist_ok=True)
        # Test write capability
        test_file = PRIMARY_DATA_DIR / ".write_test"
        test_file.touch(exist_ok=True)
        test_file.unlink(missing_ok=True)
        return PRIMARY_USERS_FILE
    except Exception:
        # Fallback to /tmp for serverless environments
        return FALLBACK_USERS_FILE

def hash_password(password: str) -> str:
    """Hashes a plain-text password using bcrypt with a salt."""
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plain-text password against a bcrypt hash."""
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except Exception:
        return False

def create_jwt_token(user_id: str, email: str) -> str:
    """Creates a signed JSON Web Token (JWT) valid for 30 days."""
    now = datetime.utcnow()
    payload = {
        "sub": user_id,
        "email": email.strip().lower(),
        "iat": now,
        "exp": now + timedelta(days=JWT_EXPIRATION_DAYS),
        "iss": "yojana-sahayak-auth"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_jwt_token(token: str) -> Optional[Dict[str, Any]]:
    """Decodes and validates a JWT token."""
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM], issuer="yojana-sahayak-auth")
    except Exception:
        return None

def load_users_from_json() -> List[Dict[str, Any]]:
    """Loads all registered users from the JSON file into memory."""
    global _in_memory_users
    active_path = _get_active_file_path()

    with _file_lock:
        if active_path.exists():
            try:
                with open(active_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, list):
                        _in_memory_users = data
                        return _in_memory_users
            except Exception as e:
                print(f"[USER STORE WARNING] Could not read from {active_path}: {e}")
        
        # If file doesn't exist yet, seed with a default demo account
        if not _in_memory_users:
            demo_user = {
                "id": "usr_demo_citizen",
                "email": "citizen@gmail.com",
                "password_hash": hash_password("123456"),
                "name": "Ramesh Kumar",
                "occupation_category": "Farmer",
                "state": "All-India",
                "caste_category": "General",
                "annual_income": 180000.0,
                "aadhaar_number": None,
                "pan_number": None,
                "documents": {
                    "aadhaar": {"uploaded": False, "status": "Not Uploaded"},
                    "pan": {"uploaded": False, "status": "Not Uploaded"},
                    "ration_card": {"uploaded": False, "status": "Not Uploaded"},
                    "income_certificate": {"uploaded": False, "status": "Not Uploaded"}
                },
                "family_members": [
                    {
                        "id": "fam_ramesh_self",
                        "name": "Ramesh Kumar",
                        "relation": "Self",
                        "age": 38,
                        "gender": "Male",
                        "annual_income": 180000.0,
                        "occupation": "Farmer",
                        "caste_category": "General",
                        "state": "All-India",
                        "is_student": False
                    }
                ],
                "created_at": datetime.utcnow().isoformat()
            }
            _in_memory_users = [demo_user]
            _save_users_to_disk_locked(active_path, _in_memory_users)

        return _in_memory_users

def _save_users_to_disk_locked(path: Path, users: List[Dict[str, Any]]) -> bool:
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            json.dump(users, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"[USER STORE ERROR] Failed to write users to {path}: {e}")
        return False

def save_users_to_json(users: List[Dict[str, Any]]) -> bool:
    """Saves the user list to the JSON file on disk."""
    global _in_memory_users
    active_path = _get_active_file_path()
    with _file_lock:
        _in_memory_users = users
        return _save_users_to_disk_locked(active_path, users)

def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    """Looks up a user by email (case-insensitive)."""
    users = load_users_from_json()
    clean_email = email.strip().lower()
    for user in users:
        if user.get("email", "").strip().lower() == clean_email:
            return user
    return None

def get_user_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    """Looks up a user by user_id."""
    users = load_users_from_json()
    for user in users:
        if user.get("id") == user_id:
            return user
    return None

def create_verified_user(
    email: str,
    name: str = "Citizen",
    occupation_category: str = "Farmer",
    state: str = "All-India",
    caste_category: str = "General",
    annual_income: float = 0.0
) -> Dict[str, Any]:
    """
    Creates a new citizen account verified via Gmail OTP.
    Persists citizen to users.json and returns user dictionary and signed JWT token.
    """
    clean_email = email.strip().lower()
    if not clean_email or "@" not in clean_email:
        raise ValueError("Please provide a valid Gmail address.")

    existing = get_user_by_email(clean_email)
    if existing:
        token = create_jwt_token(existing["id"], clean_email)
        return {"user": existing, "token": token}

    user_id = f"usr_{uuid.uuid4().hex[:12]}"

    new_user = {
        "id": user_id,
        "email": clean_email,
        "name": name.strip() or "Citizen",
        "occupation_category": occupation_category or "Farmer",
        "state": state or "All-India",
        "caste_category": caste_category or "General",
        "annual_income": float(annual_income or 0.0),
        "aadhaar_number": None,
        "pan_number": None,
        "documents": {
            "aadhaar": {"uploaded": False, "status": "Not Uploaded"},
            "pan": {"uploaded": False, "status": "Not Uploaded"},
            "ration_card": {"uploaded": False, "status": "Not Uploaded"},
            "income_certificate": {"uploaded": False, "status": "Not Uploaded"}
        },
        "family_members": [
            {
                "id": f"fam_{uuid.uuid4().hex[:8]}",
                "name": name.strip() or "Citizen",
                "relation": "Self",
                "age": 22 if occupation_category == "Student" else 35,
                "gender": "Male",
                "annual_income": float(annual_income or 0.0),
                "occupation": occupation_category or "Farmer",
                "caste_category": caste_category or "General",
                "state": state or "All-India",
                "is_student": (occupation_category == "Student")
            }
        ],
        "created_at": datetime.utcnow().isoformat()
    }

    users = load_users_from_json()
    users.append(new_user)
    save_users_to_json(users)

    token = create_jwt_token(user_id, clean_email)
    return {
        "user": new_user,
        "token": token
    }

def register_user(
    email: str,
    password: str,
    name: str = "Citizen",
    occupation_category: str = "Farmer",
    state: str = "All-India",
    caste_category: str = "General",
    annual_income: float = 0.0
) -> Dict[str, Any]:
    """
    Registers a new citizen in the JSON file.
    Hashes password using bcrypt and generates signed JWT token.
    """
    clean_email = email.strip().lower()
    if not clean_email or "@" not in clean_email:
        raise ValueError("Please provide a valid email address.")
    
    if len(password) < 6:
        raise ValueError("Password must be at least 6 characters long.")

    existing = get_user_by_email(clean_email)
    if existing:
        raise ValueError("An account with this email already exists. Please log in.")

    user_id = f"usr_{uuid.uuid4().hex[:12]}"
    pwd_hash = hash_password(password)

    new_user = {
        "id": user_id,
        "email": clean_email,
        "password_hash": pwd_hash,
        "name": name.strip() or "Citizen",
        "occupation_category": occupation_category or "Farmer",
        "state": state or "All-India",
        "caste_category": caste_category or "General",
        "annual_income": float(annual_income or 0.0),
        "aadhaar_number": None,
        "pan_number": None,
        "documents": {
            "aadhaar": {"uploaded": False, "status": "Not Uploaded"},
            "pan": {"uploaded": False, "status": "Not Uploaded"},
            "ration_card": {"uploaded": False, "status": "Not Uploaded"},
            "income_certificate": {"uploaded": False, "status": "Not Uploaded"}
        },
        "family_members": [
            {
                "id": f"fam_{uuid.uuid4().hex[:8]}",
                "name": name.strip() or "Citizen",
                "relation": "Self",
                "age": 22 if occupation_category == "Student" else 35,
                "gender": "Male",
                "annual_income": float(annual_income or 0.0),
                "occupation": occupation_category or "Farmer",
                "caste_category": caste_category or "General",
                "state": state or "All-India",
                "is_student": (occupation_category == "Student")
            }
        ],
        "created_at": datetime.utcnow().isoformat()
    }

    users = load_users_from_json()
    users.append(new_user)
    save_users_to_json(users)

    token = create_jwt_token(user_id, clean_email)
    return {
        "user": new_user,
        "token": token
    }

def authenticate_user(email: str, password: str) -> Dict[str, Any]:
    """
    Validates user credentials against the JSON file using bcrypt.
    Returns user profile and a fresh JWT token.
    """
    clean_email = email.strip().lower()
    user = get_user_by_email(clean_email)
    if not user:
        raise ValueError("No account found with this email address. Please sign up.")

    stored_hash = user.get("password_hash", "")
    if not verify_password(password, stored_hash):
        raise ValueError("Incorrect password. Please verify and try again.")

    token = create_jwt_token(user["id"], clean_email)
    return {
        "user": user,
        "token": token
    }

def update_user_profile(user_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Updates fields of an existing user in the JSON file."""
    users = load_users_from_json()
    for idx, user in enumerate(users):
        if user.get("id") == user_id:
            for k, v in updates.items():
                if k not in ["id", "email", "password_hash", "created_at"]:
                    user[k] = v
            users[idx] = user
            save_users_to_json(users)
            return user
    return None
