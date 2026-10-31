"""
Database and Persistence Layer for Yojana Sahayak.
Uses SQLite with SQLAlchemy for reliable, zero-config local storage.
"""

import os
import json
import uuid
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, Float, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

DB_DIR = "/tmp" if os.environ.get("VERCEL") or os.environ.get("AWS_LAMBDA_FUNCTION_NAME") else os.path.join(os.path.dirname(__file__), "..")
DB_FILE = os.path.join(DB_DIR, "yojana_sahayak.db")
DATABASE_URL = os.environ.get("DATABASE_URL") or f"sqlite:///{DB_FILE}"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    phone = Column(String(20), unique=True, index=True, nullable=True)
    phone_or_email = Column(String(100), nullable=True)
    name = Column(String(100), default="Citizen User")
    occupation_category = Column(String(50), default="Farmer")
    state = Column(String(100), default="All-India")
    caste_category = Column(String(50), default="General")
    annual_income = Column(Float, default=0.0)
    aadhaar_number = Column(String(20), nullable=True)
    pan_number = Column(String(20), nullable=True)
    documents_json = Column(Text, default="{}")
    auth_token = Column(String(64), index=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    family_members = relationship("FamilyMemberModel", back_populates="user", cascade="all, delete-orphan")
    evaluations = relationship("SavedEvaluationModel", back_populates="user", cascade="all, delete-orphan")

class OTPVerificationModel(Base):
    __tablename__ = "otp_verifications"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    phone = Column(String(20), index=True, nullable=False)
    otp_code = Column(String(10), nullable=False)
    purpose = Column(String(20), default="signup")
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=False)
    is_verified = Column(Boolean, default=False)

class FamilyMemberModel(Base):
    __tablename__ = "family_members"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    relation = Column(String(50), default="Self")
    age = Column(Integer, nullable=False)
    gender = Column(String(20), default="Any")
    annual_income = Column(Float, default=0.0)
    occupation = Column(String(100), default="Unemployed")
    caste_category = Column(String(50), default="General")
    state = Column(String(100), default="All-India")
    landholding_acres = Column(Float, default=0.0)
    is_disabled = Column(Boolean, default=False)
    is_student = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("UserModel", back_populates="family_members")

class SavedEvaluationModel(Base):
    __tablename__ = "saved_evaluations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    total_eligible = Column(Integer, default=0)
    total_benefit = Column(Float, default=0.0)
    evaluation_json = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("UserModel", back_populates="evaluations")

class ScamReportModel(Base):
    __tablename__ = "scam_reports"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    input_text = Column(Text, nullable=False)
    status = Column(String(50), nullable=False)
    confidence_score = Column(Integer, default=0)
    red_flags_json = Column(Text, default="[]")
    created_at = Column(DateTime, default=datetime.utcnow)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
