# Yojana Sahayak (योजना सहायक): Multilingual AI Assistant for Government Schemes

> **Focus Area:** Generative AI (RAG) | Cloud | Multilingual Accessibility
>
> **Context:** INNOVISTA | 36-Hour Hackathon Problem Statement

---

## 📖 Background & Problem Statement

India has a vast array of welfare, scholarship, and agricultural schemes designed to uplift citizens, but many eligible individuals miss out. The primary hurdles include:

- **Complex Documentation:** Eligibility rules are buried in long, dense, formal legal documents.
- **Language Barriers:** Official circulars are often available in only one language, alienating rural and vernacular-speaking citizens.
- **Information Asymmetry:** Citizens struggle with basic questions like *"Am I eligible?"*, *"What documents do I need?"*, and *"When is the deadline?"*.

**Our Goal:** Transform long, complex government scheme documents into simple, trustworthy answers, empowering every citizen, farmer, and student to discover and apply for schemes matching their exact life situation.

---

## 👥 Who Will Use It?

- **Citizens & Families:** Looking for welfare, ration, and housing schemes they qualify for.
- **Farmers & Students:** Checking agricultural subsidies (e.g., PM-KISAN) and national/state scholarships.
- **Volunteers & Help-Desk Staff:** Guiding community members through profile tracking and applications.

---

## 🚀 Key Features

### 1. Landing Page & Scheme Search

- **Dynamic Search Bar:** Filter schemes instantly across categories like Welfare, Agriculture, Scholarship, and State-specific programs.
- **Popular Schemes Highlight:** Quick cards for trending initiatives (e.g., Ayushman Bharat, PM-KISAN).

### 2. Comprehensive Scheme Details Page

- **Eligibility Breakdown:** Detailed criteria (age, income, occupation, category).
- **Document Checklist:** Required certificates (Aadhaar, PAN, Income Certificate).
- **Application Tracking:** Direct links to original application forms and countdown timers for application deadlines.

### 3. AI Assistant (RAG Chatbot)

- **100% Cited Answers:** Every response explicitly names and cites the source government document.
- **Fake Scheme & Scam Detector:** Instantly analyzes forwarded messages, screenshots, and suspicious PDFs to flag fraudulent schemes.
- **Multilingual Support:** Seamless conversation in Hindi, English, and up to 12 regional Indian languages.

### 4. Voice Assistant

- **Voice-First Interface:** Speak questions naturally and listen to spoken answers.
- **Chat + Text Integration:** Dual-mode interaction powered by browser Web Speech APIs.

### 5. Family Member Profiles & Smart Matching

- **Household Management:** Store user profiles and family member details (age, gender, income, occupation).
- **Automated Matching:** Automatically evaluates family profiles against scheme rules and recommends tailored benefits.

### 6. Authentication & Secure Onboarding

- **Mobile Verification:** SMS-based OTP verification for secure login and profile creation.
- **Role Management:** Support for Guest Access, Registered Citizens, and Community Volunteers.

### 7. Proactive Notifications Engine

- **Future Eligibility Alerts:** Automated triggers when a user crosses a "near-miss" boundary (e.g., turning 18 or entering a new financial year).
- **Deadline Reminders:** Urgent countdown alerts for closing application dates.
- **Status Updates:** Real-time progress trackers (e.g., "Documents Verified" or "Pending Approval").

### 8. Accessibility & Security

- **Multilingual Vernacular UI:** Full accessibility across 12 Indian official languages.
- **Privacy & Security:** Strict data isolation and encryption safeguards for sensitive documents.

---

## 🛠️ Modern Tech Stack

### 1. Frontend (User Interface)

- **Framework:** Next.js (React) + Tailwind CSS (Fast, responsive, mobile-first WhatsApp-style UI layout).
- **Real-time UX:** Vercel AI SDK / Deep Chat for streaming responses, typing indicators, and skeleton loaders.
- **Voice Integration:** Browser Web Speech API for client-side Speech-to-Text (STT) and Text-to-Speech (TTS).

### 2. Backend & Core Logic

- **API Framework:** FastAPI (Python) for high-speed asynchronous REST endpoints (`/api/chat`, `/api/eligibility/evaluate`, `/api/scam-check`).
- **Rules Engine:** Custom Python deterministic logic engine for precise math calculations, near-miss projections, and conflict resolution without LLM drift.
- **Background Workers:** APScheduler / Celery for scheduled cron jobs (sending near-miss and deadline notifications).

### 3. AI & Language Infrastructure

- **LLM:** OpenAI GPT-4o-mini for cost-effective, rapid answer generation anchored strictly in retrieved context.
- **Orchestration:** LangChain / LlamaIndex for PDF document ingestion, text chunking, and vector retrieval.
- **Localization API:** Bhashini / Sarvam AI API for vernacular translation and advanced speech synthesis.

### 4. Database & Storage

- **Vector Database:** ChromaDB (Local Vector Store) for storing ingested scheme documents, embeddings, and metadata.
- **Relational Database:** SQLite / PostgreSQL for structured user credentials, family member profiles, scheme criteria, and notification preferences.

### 5. Authentication & Security

- **Token Management:** JWT (JSON Web Tokens) + Passlib (bcrypt) for secure stateless session handling.

### 6. Notifications & Messaging

- **External APIs:** Twilio API / Gupshup API for WhatsApp and SMS broadcast delivery.
- **Browser Push:** Web Push API for real-time web alerts.

### 7. Deployment & Hosting

- **Frontend:** Vercel (Next.js optimization).
- **Backend:** Render / Railway (FastAPI Python backend and worker deployment).

---

Data collection Websites

**Government Welfare & Central Services**

* **DBT Bharat (`dbtbharat.gov.in`):** Contains master lists and operational guidelines for all Direct Benefit Transfer schemes across ministries.
* **UMANG (`umang.gov.in`):** Centralizes hundreds of central and state-level services; useful for extracting eligibility criteria for state-specific welfare.
* **State e-District Portals (e.g., Uttarakhand Apuni Sarkar):** Essential for localized state-level schemes, pensions, and regional financial aid.

**Agriculture & Rural Development**

* **Kisan Suvidha (`kisansuvidha.gov.in`):** Consolidates farmer-centric schemes, including PMFBY (crop insurance), PM-KISAN, and agricultural machinery subsidies.
* **Dept of Agriculture & Farmers Welfare (`agricoop.gov.in`):** The primary source for downloading detailed, official PDF scheme guidelines, budget allocations, and policy circulars for RAG ingestion.

**Education & Scholarships**

* **National Scholarship Portal (`scholarships.gov.in`):** The definitive federal database for central, state, AICTE, and UGC scholarship eligibility documents and deadlines.

**Non-Government (Private CSR & NGOs)**

* **Buddy4Study (`buddy4study.com`):** India’s largest aggregator for private, corporate, and NGO-funded scholarships (e.g., L'Oréal, HDFC, Keep India Smiling).
* **Vidyasaarathi (`vidyasaarathi.co.in`):** An NSDL e-Gov portal featuring education finance and CSR-backed private schemes for students.
* **Major Corporate Foundations:** Direct websites for Tata Trusts, Reliance Foundation, and HDFC Parivartan for extracting private vocational grants, women's empowerment initiatives, and rural livelihood programs.

## 📋 Minimum Working Version (MVV) Scope

1. **Document Collection:** 10 to 20 foundational public scheme documents (PM-KISAN, Ayushman Bharat, major scholarships).
2. **RAG QA Chatbot:** Retrieval pipeline that fetches passages, forbids hallucinations, answers in Hindi/English, and cites sources.
3. **Eligibility Questionnaire:** Interactive questionnaire capturing age, income, occupation, and state to recommend matching benefits.

## 🚀 Option C: Manual Startup (Two Terminals)

**Terminal 1 – Backend**
```bash
cd backend
.\venv\Scripts\uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload


Terminal 2 – Frontend
cd frontend
npm run dev


```

---

## 🌐 Production & Vercel Deployment

* **Backend Production API (Vercel):** [https://hackathon-final-project-beige.vercel.app](https://hackathon-final-project-beige.vercel.app)
* **Interactive API Docs (Swagger):** [https://hackathon-final-project-beige.vercel.app/docs](https://hackathon-final-project-beige.vercel.app/docs)
* **API Health Status:** [https://hackathon-final-project-beige.vercel.app/api/health](https://hackathon-final-project-beige.vercel.app/api/health)

### Environment Variables
Configure these in your Vercel Dashboard under **Project Settings > Environment Variables** or in your local `.env`:

| Variable | Recommended Production Value | Description |
| :--- | :--- | :--- |
| `BACKEND_URL` | `https://hackathon-final-project-beige.vercel.app` | Target FastAPI backend URL for Next.js API route proxies |
| `NEXT_PUBLIC_BASE_URL` | `https://hackathon-final-project-beige.vercel.app` | Public client base URL |
| `VITE_BASE_URL` | `https://hackathon-final-project-beige.vercel.app` | Frontend client fallback for API calls |
| `GEMINI_API_KEY` | *(Optional)* | Google Gemini API key for enhanced generative explanations |

---

## 🛡️ Security, Privacy & Data Isolation

* **Citizen Data Isolation:** Family member records, household incomes, and document uploads are strictly isolated per authenticated citizen account (`yojana_family_members_<userId>`).
* **Unauthenticated Visitor Shield:** Anonymous visitors cannot access or view private family members or household benefit figures.
* **Direct Form Switching:** Instant, dedicated navigation between Citizen Login and New Citizen Registration.
