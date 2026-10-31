# 🇮🇳 योजना सहायक (Yojana Sahayak)
### *Digital India Citizen Welfare Intelligence & Anti-Scam Shield*

> **Winner-Grade Hackathon Solution**: Democratizing access to Indian Government Welfare schemes through **100% Deterministic Mathematical Eligibility**, **Grounded Multilingual RAG Q&A with Explicit Gazetted Citations**, **Family-Level Household Benefit Maximization**, and a **WhatsApp Fake Forward Scam Shield**.

---

## 📌 1. Problem Statement
Every year, millions of Indian citizens—particularly rural farmers, low-income families, daily-wage laborers, and students—miss out on life-changing government financial assistance because:
1. **Information Asymmetry**: Complex eligibility criteria and exclusionary clauses are buried in dense, 20+ page official gazette PDFs in formal language.
2. **AI Math Hallucinations**: Standard LLM-only tools hallucinate eligibility numbers, age cutoffs, and benefit sums.
3. **No Explanation of Rejection**: Existing government portals tell applicants they are rejected without stating *why* or what near-miss delta caused it.
4. **Lack of Family Aggregation**: Schemes are evaluated on an individual basis, ignoring which family member should apply to maximize overall household benefits without running into mutual exclusions.
5. **Rampant WhatsApp Scams**: Fake messages promising "PM Free Laptop Scheme" or "₹1,00,000 Direct Cash" dupe vulnerable citizens into paying fraudulent registration fees.

---

## 🌟 2. Proposed Solution & Innovations

| Feature | Problem Solved | Technical Implementation |
| :--- | :--- | :--- |
| **Deterministic Rules Engine** | Eliminates AI math hallucination in eligibility calculations | Pure Python if/else rule tree & JSON schema boundaries, completely independent of the LLM. |
| **Near-Miss & Future Projection Engine** | Explains *why* an applicant missed out and *when* they will qualify | Computes exact numeric deltas (e.g. *₹18,000 over income ceiling*, *qualifies in 7 months at age 18*). |
| **Family Household Mode & Conflict Checker** | Aggregates benefits for the whole family and avoids illegal double-claiming | Enforces household quotas (e.g. max 1 PM-KISAN per family) and resolves mutual exclusions across central schemes. |
| **Grounded Multilingual RAG Chatbot** | Eliminates conversational misinformation | Vector-indexed official documents with strict similarity thresholds, explicit source citations, and automatic fallback guard. |
| **WhatsApp Fake Forward Scam Shield** | Protects citizens from phishing & advance-fee fraud | Heuristic pattern analysis, unofficial domain checking (`.xyz`, `.top`, shorteners), and cross-referencing with verified schemes. |
| **Vernacular Voice Accessibility** | Empowers low-literacy citizens | Web Speech API Speech-to-Text and Text-to-Speech audio readout in Hindi (हिन्दी) and English. |

---

## 🏛️ 3. Verified Scheme Catalog (16 Major Schemes)
1. **PM-KISAN**: ₹6,000/yr direct income support to landholding farmer families.
2. **Ayushman Bharat (PM-JAY)**: ₹5,00,000/yr cashless secondary & tertiary health cover.
3. **PMAY-G (Gramin Housing)**: ₹1,20,000 - ₹1,30,000 financial aid for pucca house construction.
4. **PM Ujjwala Yojana 2.0**: Free deposit-free LPG connection, stove, refill & ₹300 ongoing subsidy.
5. **Sukanya Samriddhi Yojana (SSY)**: 8.2% sovereign return for girl children under age 10 (EEE tax-free).
6. **Atal Pension Yojana (APY)**: Guaranteed monthly pension of ₹1,000 to ₹5,000 after age 60.
7. **PM Vishwakarma Scheme**: ₹15,000 modern toolkit incentive, ₹500/day stipend, and 5% enterprise loans.
8. **PM SVANidhi**: Collateral-free working capital micro-loans (₹10,000 to ₹50,000) for urban street vendors.
9. **Post-Matric Scholarship (SC/ST/OBC)**: 100% compulsory tuition waiver + ₹13,500/yr maintenance.
10. **PM Mudra Yojana (Shishu/Kishore)**: Collateral-free enterprise credit up to ₹5,00,000 for self-employed.
11. **PM Fasal Bima Yojana (PMFBY)**: Subsidized 1.5% - 2% premium crop loss insurance coverage.
12. **IGNOAPS (Old Age Pension)**: Monthly social security pension for BPL senior citizens aged 60+.
13. **IGNWPS (Widow Pension)**: Monthly financial assistance for widowed women aged 40-79.
14. **IGNDPS (Disability Pension)**: Direct pension for citizens with benchmark disability (>=80%).
15. **MGNREGA**: Statutory 100 days guaranteed wage employment per rural household.
16. **PM Surya Ghar (Muft Bijli Yojana)**: Up to ₹78,000 rooftop solar subsidy for 300 free monthly electricity units.

---

## 🏗️ 4. System Architecture

```
                                  USER (Citizen / CSC Operator)
                                                │
                                    ┌───────────┴───────────┐
                                    ▼                       ▼
                           [English / हिन्दी]        [Voice STT / TTS]
                                    │                       │
         ┌──────────────────────────┴───────────────────────┴──────────────────────────┐
         │                  FRONTEND (Next.js 14 + Tailwind CSS)                       │
         │  - Indian GovTech Design System (Royal Blue #174EA6, Dark Navy, Ashok Motif)│
         │  - Single & Family Mode Assessment Wizard                                   │
         │  - Dynamic Results Dashboard with Near-Miss & Document Checklists           │
         │  - WhatsApp-Style Grounded Chat Widget                                      │
         │  - Threat-Meter WhatsApp Fake Forward Scam Shield                           │
         └──────────────────────────────────────┬──────────────────────────────────────┘
                                                │ REST APIs
         ┌──────────────────────────────────────┴──────────────────────────────────────┐
         │                           BACKEND (FastAPI / Python)                        │
         │  POST /api/eligibility/evaluate  │  POST /api/chat   │  POST /api/scam-check│
         │                                  │                   │                      │
         │  ┌────────────────────────┐      │  ┌─────────────┐  │  ┌────────────────┐  │
         │  │ Deterministic Rules    │      │  │ RAG Vector  │  │  │ Anti-Scam      │  │
         │  │ & Near-Miss Engine     │      │  │ Retriever   │  │  │ Heuristic &    │  │
         │  │ (Exact Deltas & Math)  │      │  │ & Citations │  │  │ Domain Scanner │  │
         │  └───────────┬────────────┘      │  └──────┬──────┘  │  └───────┬────────┘  │
         │              │                   │         │         │          │           │
         │  ┌───────────┴────────────┐      │  ┌──────┴──────┐  │          │           │
         │  │ Family Mutual Exclusion│      │  │ Hallucina-  │  │          │           │
         │  │ & Conflict Solver      │      │  │ tion Guard  │  │          │           │
         │  └───────────┬────────────┘      │  └─────────────┘  │          │           │
         └──────────────┼───────────────────┴───────────────────┴──────────┼───────────┘
                        ▼                                                  ▼
          [SQLite Persistent Database]                      [Vector Knowledge Store]
          - users, family_members, evaluations              - 16 Official Central Scheme Gazettes
```

---

## 🚀 5. Getting Started & Installation

### Prerequisites
- **Python**: 3.10+ (tested on Python 3.13)
- **Node.js**: v18+ (tested on v24.18)
- **npm**: v9+

### Step 1: Clone and Setup Workspace
```bash
git clone https://github.com/your-username/yojana-sahayak.git
cd yojana-sahayak
```

### Step 2: Backend Setup
```bash
# Windows
python -m venv backend/venv
.\backend\venv\Scripts\pip install -r backend/requirements.txt

# Linux / Mac
python3 -m venv backend/venv
source backend/venv/bin/activate
pip install -r backend/requirements.txt
```

### Step 3: Frontend Setup
```bash
cd frontend
npm install
cd ..
```

### Step 4: Run the Application
You can run both backend and frontend using either the PowerShell launcher or the Python launcher:

**Option A (PowerShell - Windows):**
```powershell
.\start_all.ps1
```

**Option B (Cross-Platform Python):**
```bash
python run_app.py
```

**Option C (Manual Dual Terminal):**
- Terminal 1 (Backend):
  ```bash
  cd backend
  .\venv\Scripts\uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
  ```
- Terminal 2 (Frontend):
  ```bash
  cd frontend
  npm run dev
  ```

Open your browser at:
- **Frontend Portal**: [http://localhost:3000](http://localhost:3000)
- **Interactive OpenAPI Documentation**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🧪 6. Testing & Quality Assurance

### Run Core Engine Test Suite
Tests deterministic rules, mathematical deltas, family conflict deduplication, RAG hallucination guard, and scam analyzer:
```bash
.\backend\venv\Scripts\python.exe backend/test_backend.py
```

### Run End-to-End API Integration Suite
Tests all 7 FastAPI endpoints and SQLite database persistence:
```bash
.\backend\venv\Scripts\python.exe test_e2e_api.py
```

---

## 🛡️ 7. Security, Privacy & Integrity Standards
1. **Zero PII Logging in Vector Engine**: Demographic inputs are processed strictly in memory by the deterministic rules engine and never sent to external vector indexes.
2. **Deterministic Fallback Reliability**: If an external LLM key is absent or rate-limited, the system falls back to a 100% reliable extractive RAG synthesizer with zero downtime.
3. **Open Government Citations**: Every conversational response includes direct links to official `.gov.in` portals and document sections.
4. **Anti-Phishing Shield**: Detects urgency triggers, upfront fee requests, and unofficial TLDs (`.xyz`, `.top`, `.online`).

---

## 👥 Contributors & Hackathon Mentorship
- **Project**: Yojana Sahayak (योजना सहायक)
- **Built for**: Advanced AI Hackathon 2026
- **Architecture**: Citizen-First Public Digital Infrastructure
#   H a c k a t h o n - F i n a l - P r o j e c t  
 