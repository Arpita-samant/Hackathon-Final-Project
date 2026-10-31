from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class FamilyMemberProfile(BaseModel):
    id: Optional[str] = None
    name: str = Field(..., description="Full name of the family member")
    relation: str = Field("Self", description="Relation to household head: Self, Spouse, Child, Parent, Sibling, Other")
    age: int = Field(..., ge=0, le=120, description="Age in years")
    gender: str = Field("Any", description="Male, Female, Transgender, or Any")
    annual_income: float = Field(0.0, ge=0.0, description="Annual income in Indian Rupees (INR)")
    occupation: str = Field("Unemployed", description="Farmer, Street Vendor, Student, Artisan/Craftsman, Construction Worker, Salaried, Self-Employed, Senior Citizen, Unemployed, Other")
    caste_category: str = Field("General", description="General, OBC, SC, ST, EWS")
    state: str = Field("All-India", description="Indian State or Union Territory or All-India")
    landholding_acres: float = Field(0.0, ge=0.0, description="Agricultural land ownership in acres (0 if none)")
    is_disabled: bool = Field(False, description="Whether person has benchmark disability (>=40%)")
    is_student: bool = Field(False, description="Whether actively enrolled in school/college")
    marital_status: Optional[str] = Field("Married", description="Single, Married, Widowed, Divorced")
    has_lpg_connection: Optional[bool] = Field(False, description="Whether already possesses LPG connection")

class EligibilityRequest(BaseModel):
    family_members: List[FamilyMemberProfile]

class EligibleSchemeResult(BaseModel):
    scheme_id: str
    scheme_name: str
    scheme_name_hi: str
    ministry: str
    category: str
    description: str
    description_hi: str
    max_benefit_amount: float
    benefit_frequency: str  # yearly, one_time, monthly, insurance_cover, loan_subsidy
    direct_apply_url: str
    required_documents: List[str]
    matched_member: str
    why_eligible: str
    why_eligible_hi: str

class NearMissResult(BaseModel):
    scheme_id: str
    scheme_name: str
    scheme_name_hi: str
    failed_criteria: str
    delta_explanation: str
    delta_explanation_hi: str
    future_eligibility_timeline: Optional[str] = None
    actionable_tip: str
    actionable_tip_hi: str
    current_value: Any
    threshold_value: Any
    matched_member: str

class FamilyEvaluationResponse(BaseModel):
    total_eligible_count: int
    total_potential_benefit_amount: float
    eligible_schemes: List[EligibleSchemeResult]
    near_misses: List[NearMissResult]
    member_breakdown: Dict[str, Dict[str, Any]]
    applied_mutual_exclusions: List[Dict[str, str]]

class ChatHistoryMessage(BaseModel):
    role: str  # user, assistant, system
    content: str

class ChatRequest(BaseModel):
    message: Optional[str] = None
    query: Optional[str] = None
    language: str = "en"  # en, hi, bn, te, mr, ta, gu, kn, ml, pa, or, as
    history: Optional[List[ChatHistoryMessage]] = []

class CitationItem(BaseModel):
    scheme_name: str
    source_url: str
    section: str
    excerpt: str

class ChatResponse(BaseModel):
    answer: str
    citations: List[CitationItem]
    confidence_score: float
    language: str
    is_fallback: bool = False

class ScamCheckRequest(BaseModel):
    text_to_verify: str

class ScamCheckResponse(BaseModel):
    status: str  # VERIFIED, SUSPICIOUS, FAKE
    confidence_score: int  # 0 to 100 (scam likelihood or authenticity)
    risk_level: str  # Safe, Caution, Severe Risk
    matched_schemes: List[str]
    red_flags: List[str]
    explanation: str
    explanation_hi: str
    safe_guidance: str
    safe_guidance_hi: str
    official_verification_url: Optional[str] = None

class SendOTPRequest(BaseModel):
    phone: str = Field(..., description="10-digit Indian Mobile Number")
    purpose: str = Field("signup", description="signup or login")

class VerifyOTPRequest(BaseModel):
    phone: str
    otp: str
    name: Optional[str] = "Citizen"
    occupation_category: Optional[str] = "Farmer"
    state: Optional[str] = "All-India"
    caste_category: Optional[str] = "General"
    annual_income: Optional[float] = 0.0

class LoginRequest(BaseModel):
    phone: str
    otp: Optional[str] = None

class UserProfileResponse(BaseModel):
    id: str
    phone: str
    name: str
    occupation_category: str
    state: str
    caste_category: str
    annual_income: float
    aadhaar_number: Optional[str] = None
    pan_number: Optional[str] = None
    documents: Dict[str, Any] = {}
    auth_token: Optional[str] = None
    family_members_count: int = 0

class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    occupation_category: Optional[str] = None
    state: Optional[str] = None
    caste_category: Optional[str] = None
    annual_income: Optional[float] = None
    aadhaar_number: Optional[str] = None
    pan_number: Optional[str] = None

class DocumentUploadRequest(BaseModel):
    doc_type: str = Field(..., description="aadhaar, pan, ration_card, income_certificate, caste_certificate, or student_id")
    file_name: str
    file_base64: Optional[str] = None
