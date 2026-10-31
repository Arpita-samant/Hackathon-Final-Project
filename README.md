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

- **High Contrast Mode:** Built specifically for low vision and color-blind users.
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

## 📋 Minimum Working Version (MVV) Scope

1. **Document Collection:** 10 to 20 foundational public scheme documents (PM-KISAN, Ayushman Bharat, major scholarships).
2. **RAG QA Chatbot:** Retrieval pipeline that fetches passages, forbids hallucinations, answers in Hindi/English, and cites sources.
3. **Eligibility Questionnaire:** Interactive questionnaire capturing age, income, occupation, and state to recommend matching benefits.
