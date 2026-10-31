"""
Comprehensive Official Scheme Document Repository for RAG Engine.
Includes 16 official Central Government Scheme guidelines with full documentation,
eligibility boundaries, step-by-step application instructions, and citation URLs.
"""

from typing import List, Dict, Any

SCHEME_DOCUMENTS: List[Dict[str, Any]] = [
    {
        "doc_id": "doc_pm_kisan",
        "scheme_name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        "source_url": "https://pmkisan.gov.in",
        "last_updated": "2026-08-15",
        "sections": [
            {
                "section_title": "Overview & Financial Benefit",
                "content": "PM-KISAN is a Central Sector scheme with 100% funding from Government of India. Under the scheme, an income support of Rs. 6,000/- per year in three equal installments of Rs. 2,000/- each every four months is provided to all landholding farmer families, subject to certain exclusion criteria relating to higher income brackets. Financial benefits are transferred directly to Aadhaar-seeded bank accounts through Direct Benefit Transfer (DBT)."
            },
            {
                "section_title": "Eligibility Criteria & Definition of Family",
                "content": "Eligible beneficiaries are landholding farmer families with cultivable landholding in their names. A 'farmer family' is defined as a family consisting of husband, wife, and minor children. Crucially, only one benefit of Rs. 6,000 per year is granted per farmer family; multiple adult members of the same household cannot draw separate PM-KISAN installments for the same family land holding."
            },
            {
                "section_title": "Exclusion Categories",
                "content": "The following categories of beneficiaries of higher economic status are ineligible: (a) All Institutional Landholders; (b) Farmer families in which one or more of its members belong to: Former and present holders of constitutional posts, Former and present Ministers, MPs, MLAs, MLCs, Mayors, and Zilla Panchayat Chairpersons; (c) All serving or retired officers and employees of Central/State Government Ministries and PSEs; (d) All superannuated/retired pensioners whose monthly pension is Rs. 10,000/- or more; (e) All persons who paid Income Tax in the last assessment year; (f) Professionals like Doctors, Engineers, Lawyers, Chartered Accountants, and Architects."
            },
            {
                "section_title": "Required Documents & e-KYC Process",
                "content": "Applicants must provide: 1. Aadhaar Card (mandatory); 2. Land ownership record documents (Khatauni, RoR, Jamabandi); 3. Active Bank Account with NPCI Aadhaar Seeding; 4. Aadhaar-linked active Mobile Number for OTP authentication. Completion of e-KYC (via OTP or facial recognition through PM-KISAN mobile app) is mandatory to receive installment payments."
            },
            {
                "section_title": "Application Procedure",
                "content": "Eligible farmers can enroll through: (1) Self-registration at Farmers Corner on https://pmkisan.gov.in; (2) Visiting the nearest Common Service Centre (CSC) with Aadhaar and land record papers; (3) Nodal Agricultural Officers appointed by the State Governments. Verification is conducted by local Patwari/Tehsildar before sanctioning."
            }
        ]
    },
    {
        "doc_id": "doc_pmjay",
        "scheme_name": "Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana)",
        "source_url": "https://beneficiary.nha.gov.in",
        "last_updated": "2026-09-01",
        "sections": [
            {
                "section_title": "Healthcare Entitlement & Coverage",
                "content": "Ayushman Bharat PM-JAY provides health assurance coverage of up to Rs. 5,00,000 per family per year for secondary and tertiary care hospitalization. Over 1,949 medical procedures including cardiac surgeries, oncology treatments, orthopedics, neurology, and critical care are covered completely cashless across more than 27,000 empanelled public and private hospitals across India."
            },
            {
                "section_title": "Eligibility & Beneficiary Identification",
                "content": "Entitlement is based on deprivation criteria under the Socio-Economic Caste Census (SECC 2011) and updated National Food Security Act (NFSA) ration card databases. There is no restriction on family size, age, or gender; pre-existing conditions are covered from day one of enrollment without waiting period. Recently, all senior citizens aged 70 years and above are also granted a distinct Ayushman Vay Vandana card with Rs. 5 Lakhs top-up coverage regardless of income."
            },
            {
                "section_title": "Documents & Card Generation (Ayushman Card)",
                "content": "Citizens can create and download their digital Ayushman PVC Card by presenting: 1. Aadhaar Card; 2. Ration Card / Family Composite ID; 3. Mobile Number. Verification can be performed directly on the Ayushman App, beneficiary.nha.gov.in portal, or at hospital Ayushman Mitra helpdesks."
            }
        ]
    },
    {
        "doc_id": "doc_pmay_g",
        "scheme_name": "PMAY-G (Pradhan Mantri Awaas Yojana - Gramin)",
        "source_url": "https://pmayg.nic.in",
        "last_updated": "2026-07-20",
        "sections": [
            {
                "section_title": "Housing Assistance Norms",
                "content": "PMAY-G aims to provide pucca houses with basic amenities to all houseless households and households living in kutcha and dilapidated houses in rural areas. Financial assistance is Rs. 1,20,000 in plain areas and Rs. 1,30,000 in hilly states (North-Eastern, Himachal Pradesh, Uttarakhand, Jammu & Kashmir). Additional assistance of 90 to 95 days of unskilled labor wages (approx. Rs. 20,000 to Rs. 25,000) is provided via MGNREGA."
            },
            {
                "section_title": "Mandatory Inclusions & Toilets",
                "content": "Beneficiaries receive an additional financial grant of Rs. 12,000 for toilet construction under the Swachh Bharat Mission (SBM-G). Houses must have minimum size of 25 square meters including dedicated cooking area, hygienic construction, and smokeless chulha/LPG connection under Ujjwala."
            },
            {
                "section_title": "Verification & Geo-Tagging",
                "content": "Selection is validated via Gram Sabha. Geo-tagged photographs of existing kutcha house, foundation stage, plinth level, lintel level, and roof completion are required through the AwaasApp mobile application before consecutive fund tranches are released."
            }
        ]
    },
    {
        "doc_id": "doc_pm_ujjwala",
        "scheme_name": "Pradhan Mantri Ujjwala Yojana 2.0 (PMUY)",
        "source_url": "https://www.pmuy.gov.in",
        "last_updated": "2026-06-10",
        "sections": [
            {
                "section_title": "Clean Cooking Fuel Grant",
                "content": "Ujjwala 2.0 provides deposit-free LPG connections to poor adult women who do not possess any LPG connection. The Central Government pays a financial subsidy of Rs. 1,600 per connection covering security deposit of cylinder, regulator, safety hose pipe, domestic gas consumer card, and installation charges. Beneficiaries receive their first 14.2 kg LPG cylinder refill and double-burner hotplate (stove) free of charge."
            },
            {
                "section_title": "Ongoing Target Refill Subsidy",
                "content": "Under targeted subsidy, Ujjwala beneficiaries receive Rs. 300 direct cash subsidy per 14.2 kg LPG cylinder refill for up to 12 refills per financial year transferred directly to their Aadhaar-linked bank accounts."
            },
            {
                "section_title": "Eligibility & Self-Declaration",
                "content": "Applicant must be an adult female (aged 18 or above) living in a low-income household (BPL, SC/ST, PMAY beneficiary, Antyodaya Anna Yojana, or 14-point poverty declaration for migrants). No other member of the household should own an active LPG connection."
            }
        ]
    },
    {
        "doc_id": "doc_sukanya",
        "scheme_name": "Sukanya Samriddhi Yojana (SSY)",
        "source_url": "https://www.indiapost.gov.in",
        "last_updated": "2026-09-10",
        "sections": [
            {
                "section_title": "Purpose & Sovereign Interest Return",
                "content": "Sukanya Samriddhi Account is a government-backed savings scheme launched under Beti Bachao Beti Padhao campaign to secure the future higher education and marriage expenses of girl children. It currently offers a sovereign interest rate of 8.2% per annum, compounded annually, which is among the highest returns available on debt instruments in India."
            },
            {
                "section_title": "Account Opening & Deposit Limits",
                "content": "An account can be opened in the name of a girl child from her birth up to the age of 10 years by her biological parents or legal guardian. A maximum of two accounts are permitted per family (one for each girl child, except in cases of twins/triplets). The minimum annual deposit is Rs. 250, and the maximum deposit is Rs. 1,50,000 per financial year. Deposits can be made for 15 years from account opening date."
            },
            {
                "section_title": "Tax Exemption & Maturity Rules",
                "content": "The scheme enjoys complete EEE (Exempt-Exempt-Exempt) tax status: deposits qualify for deduction under Section 80C, accrued interest is 100% tax-free, and final maturity withdrawal is completely exempt from income tax. Maturity occurs upon completion of 21 years from opening date or on marriage of the girl child after attaining age 18. Partial withdrawal up to 50% of the balance is permitted after the girl turns 18 for accredited higher education."
            }
        ]
    },
    {
        "doc_id": "doc_atal_pension",
        "scheme_name": "Atal Pension Yojana (APY)",
        "source_url": "https://www.npscra.nsdl.co.in",
        "last_updated": "2026-05-15",
        "sections": [
            {
                "section_title": "Guaranteed Retirement Security",
                "content": "Atal Pension Yojana is a defined-benefit pension scheme administered by Pension Fund Regulatory and Development Authority (PFRDA) for citizens working in the unorganized sector. Subscribers receive a guaranteed minimum monthly pension of Rs. 1,000, Rs. 2,000, Rs. 3,000, Rs. 4,000, or Rs. 5,000 per month from the age of 60 years until demise."
            },
            {
                "section_title": "Age Eligibility & Monthly Contribution",
                "content": "Open to all Indian citizens aged between 18 and 40 years holding a savings bank account. Contributions vary based on age of entry: an 18-year-old pays only Rs. 210 per month for a Rs. 5,000 monthly pension, whereas a 40-year-old pays Rs. 1,454 per month. Auto-debit facility on savings bank account is mandatory."
            },
            {
                "section_title": "Spouse Pension & Nominee Corpus Return",
                "content": "Upon demise of the subscriber, the same monthly pension amount is guaranteed to the surviving spouse for life. On the death of both subscriber and spouse, the entire accumulated pension wealth corpus (e.g., Rs. 8.5 Lakhs for a Rs. 5,000 pension) is returned to the designated nominee."
            }
        ]
    },
    {
        "doc_id": "doc_vishwakarma",
        "scheme_name": "PM Vishwakarma Scheme",
        "source_url": "https://pmvishwakarma.gov.in",
        "last_updated": "2026-08-01",
        "sections": [
            {
                "section_title": "Objective & 18 Eligible Traditional Trades",
                "content": "PM Vishwakarma provides comprehensive institutional support to traditional artisans and craftspersons who work with hands and tools across 18 family-based traditional trades: Carpenter (Suthar), Boat Maker, Armourer, Blacksmith (Lohar), Hammer & Tool Kit Maker, Locksmith, Sculptor (Moortikar/Stone Carver), Goldsmith (Sonar), Potter (Kumhaar), Cobbler (Charmakar), Mason (Rajmistri), Basket/Mat/Broom Maker, Doll & Toy Maker, Barber (Naai), Garland Maker (Malakaar), Washerman (Dhobi), Tailor (Darzi), and Fishing Net Maker."
            },
            {
                "section_title": "Four Pillars of Benefits",
                "content": "1. Recognition: PM Vishwakarma Certificate & Digital ID Card; 2. Skill Upgradation: 5-7 days basic skill training with Rs. 500 per day daily stipend; 3. Toolkit Incentive: Rs. 15,000 e-voucher/direct grant to purchase modern, ergonomic equipment; 4. Enterprise Credit Support: Collateral-free enterprise development loans of up to Rs. 1,00,000 (First Tranche with 18 months tenure) and Rs. 2,00,000 (Second Tranche with 30 months tenure) at a highly concessional interest rate of only 5% with government interest subvention of 8%."
            },
            {
                "section_title": "Eligibility & Three-Tier Verification",
                "content": "Applicant must be at least 18 years of age on date of registration and engaged in one of the 18 traditional trades. Only one member of a family can receive benefits. Government employees and active defaults under PMEGP or Mudra loans are excluded. Verification occurs via Gram Panchayat / Urban Local Body, District Implementation Committee, and National Screening Committee."
            }
        ]
    },
    {
        "doc_id": "doc_svanidhi",
        "scheme_name": "PM SVANidhi (Street Vendor's AtmaNirbhar Nidhi)",
        "source_url": "https://pmsvanidhi.mohua.gov.in",
        "last_updated": "2026-04-18",
        "sections": [
            {
                "section_title": "Micro-Credit Facility for Urban Vendors",
                "content": "PM SVANidhi is a Central Sector Scheme launched by Ministry of Housing and Urban Affairs to facilitate working capital loans to urban street vendors whose livelihoods were impacted. Vendors can access affordable collateral-free loans in three progressive tranches: Tranche 1: Rs. 10,000 (tenure 1 year); Tranche 2: Rs. 20,000 (tenure 1.5 years) upon timely repayment of first tranche; Tranche 3: Rs. 50,000 (tenure 3 years)."
            },
            {
                "section_title": "Interest Subsidy & Digital Cashback Incentives",
                "content": "On timely or early repayment of the loan, an interest subsidy of 7% per annum is credited directly to the vendor's bank account on a quarterly basis. Furthermore, vendors earn digital cashbacks ranging from Rs. 50 to Rs. 100 per month (up to Rs. 1,200 annually) for conducting digital sales and receipts using QR codes."
            },
            {
                "section_title": "Required Identification Documents",
                "content": "Vendors must hold a Certificate of Vending (CoV) or Identity Card issued by Urban Local Bodies (ULBs), or a Letter of Recommendation (LoR) issued by the Town Vending Committee (TVC), along with Aadhaar card and active bank account."
            }
        ]
    },
    {
        "doc_id": "doc_post_matric",
        "scheme_name": "Post-Matric Scholarship for SC/ST/OBC Students",
        "source_url": "https://scholarships.gov.in",
        "last_updated": "2026-07-12",
        "sections": [
            {
                "section_title": "Scope & Educational Levels Covered",
                "content": "Provides financial assistance to Scheduled Caste (SC), Scheduled Tribe (ST), and Other Backward Classes (OBC) students studying at post-matriculation or post-secondary stage (Classes 11 and 12, ITI, Polytechnic, Diploma, Undergraduate BA/BSc/BCom, Engineering, Medicine, Postgraduate MA/MSc, and PhD) in government or government-recognized educational institutions."
            },
            {
                "section_title": "Funding Components & Income Ceiling",
                "content": "The scholarship covers: 1. Compulsory non-refundable tuition and examination fees paid directly to the institution or via student DBT; 2. Monthly maintenance allowance (up to Rs. 13,500 per year for hostellers and Rs. 7,000 for day scholars in professional Group 1 courses). Eligibility requires that total annual family income from all sources does not exceed Rs. 2,50,000 per annum."
            },
            {
                "section_title": "Application Protocol via National Scholarship Portal",
                "content": "Applications must be submitted online on the National Scholarship Portal (scholarships.gov.in) with: 1. Aadhaar Card (linked to bank account for DBT); 2. Digitally verifiable Caste Certificate; 3. Current year Income Certificate issued by Revenue Authority; 4. Previous qualifying examination marksheet; 5. Fee receipt and Institution verification."
            }
        ]
    },
    {
        "doc_id": "doc_mudra",
        "scheme_name": "PM Mudra Yojana (PMMY)",
        "source_url": "https://www.udyamimitra.in",
        "last_updated": "2026-08-20",
        "sections": [
            {
                "section_title": "Three Tier Loan Categories",
                "content": "Pradhan Mantri Mudra Yojana provides institutional collateral-free micro enterprise credit up to Rs. 10 Lakhs through Commercial Banks, RRBs, Small Finance Banks, MFIs, and NBFCs. Loans are categorized into three segments: 1. Shishu: Covering loans up to Rs. 50,000 (ideal for starters, cart pullers, home enterprises); 2. Kishore: Loans above Rs. 50,000 and up to Rs. 5,00,000 (for business equipment purchase); 3. Tarun: Loans above Rs. 5,00,000 and up to Rs. 10,00,000 (expansion of established units)."
            },
            {
                "section_title": "Zero Collateral & Mudra Card",
                "content": "No collateral or third-party security is required. No processing fees are charged for Shishu loans. Borrowers are issued a RuPay Mudra Debit Card with a pre-approved cash credit limit, allowing flexible digital withdrawals and repayments at any ATM or POS device to reduce interest outgo."
            }
        ]
    },
    {
        "doc_id": "doc_surya_ghar",
        "scheme_name": "PM Surya Ghar: Muft Bijli Yojana",
        "source_url": "https://pmsuryaghar.gov.in",
        "last_updated": "2026-09-25",
        "sections": [
            {
                "section_title": "Rooftop Solar Subsidy Norms",
                "content": "PM Surya Ghar: Muft Bijli Yojana aims to illuminate 1 crore households with free clean solar energy. The Central Government provides direct financial subsidy: Rs. 33,000 for 1 kW systems, Rs. 66,000 for 2 kW systems, and Rs. 78,000 for 3 kW and higher systems. A 3 kW rooftop solar system generates approx. 300 units of electricity per month, saving Rs. 15,000 to Rs. 20,000 in annual electricity bills."
            },
            {
                "section_title": "Concessional Bank Financing",
                "content": "Beneficiaries can finance the remaining installation cost through collateral-free loans at repo rate + 0.5% (approx. 7% per annum) from public sector banks with minimal documentation. Net-metering enables selling surplus electricity back to the local power DISCOM."
            }
        ]
    },
    {
        "doc_id": "doc_smam",
        "scheme_name": "SMAM Agricultural Machinery Subsidy",
        "source_url": "https://kisansuvidha.gov.in",
        "last_updated": "2026-10-15",
        "sections": [
            {
                "section_title": "Farm Machinery & Tractor Capital Subsidy",
                "content": "Under Sub-Mission on Agricultural Mechanization (SMAM) monitored via Kisan Suvidha (kisansuvidha.gov.in) and DA&FW (agricoop.gov.in), farmers receive 40% to 50% capital subsidy on tractors, power tillers, rotavators, combine harvesters, and laser land levellers. Small, marginal, SC/ST, and women farmers are entitled to 50% financial assistance up to Rs. 1,00,000 for purchasing approved farm equipment."
            },
            {
                "section_title": "Custom Hiring Centers (CHC)",
                "content": "Rural entrepreneurs, farmer producer organizations (FPOs), and village cooperative societies can avail up to 40% capital subsidy (maximum Rs. 10 Lakhs) for establishing Custom Hiring Centers to rent farm machinery at affordable rates to neighboring marginal cultivators."
            }
        ]
    },
    {
        "doc_id": "doc_uk_swarojgar",
        "scheme_name": "Uttarakhand Mukhyamantri Swarojgar Yojana (MSY)",
        "source_url": "https://eservices.uk.gov.in",
        "last_updated": "2026-10-10",
        "sections": [
            {
                "section_title": "Project Loan & Margin Money Subsidy",
                "content": "Administered through Uttarakhand State e-District portal Apuni Sarkar (eservices.uk.gov.in), MSY promotes self-employment in manufacturing and service sectors. Maximum project cost is Rs. 25 Lakhs for manufacturing and Rs. 10 Lakhs for services. The Uttarakhand state government provides 15% to 25% margin money subsidy directly into the beneficiary's loan account."
            },
            {
                "section_title": "Domicile & Application Guidelines",
                "content": "Eligible applicants must be permanent residents / domiciles of Uttarakhand aged 18 to 65 years. No formal educational qualifications are mandated. Applications must be routed digitally through the Apuni Sarkar or MSY portal with Aadhaar, Mool Niwas domicile certificate, project summary (DPR), and bank account details."
            }
        ]
    },
    {
        "doc_id": "doc_aicte_pragati",
        "scheme_name": "AICTE Pragati Scholarship for Girls",
        "source_url": "https://scholarships.gov.in",
        "last_updated": "2026-10-01",
        "sections": [
            {
                "section_title": "Technical Education Financial Award",
                "content": "Verified on National Scholarship Portal (scholarships.gov.in), AICTE Pragati offers Rs. 50,000 per annum for female students admitted to 1st year Degree or Diploma engineering courses in AICTE-recognized institutions. The grant covers tuition reimbursement, laptops/desktops, stationery, books, and software licenses."
            },
            {
                "section_title": "Merit & Income Ceiling",
                "content": "Family income ceiling is Rs. 8,00,000 per annum. A maximum of two girls per family can be awarded. Candidates must possess Aadhaar-seeded active bank accounts with Direct Benefit Transfer (DBT) verification on the NSP portal."
            }
        ]
    },
    {
        "doc_id": "doc_hdfc_ecss",
        "scheme_name": "HDFC Bank Parivartan ECSS Scholarship",
        "source_url": "https://www.buddy4study.com",
        "last_updated": "2026-10-18",
        "sections": [
            {
                "section_title": "Corporate CSR Educational Crisis Support",
                "content": "Tracked via Buddy4Study (buddy4study.com) and HDFC Bank Parivartan, the Educational Crisis Support Scholarship (ECSS) provides up to Rs. 75,000 annual scholarship to meritorious school, college, and university students facing financial crises such as loss of earning parent, major medical emergency, or severe economic distress."
            },
            {
                "section_title": "Eligibility & Selection Criteria",
                "content": "Applicants must be enrolled from Class 1 to Post-Graduation in recognized institutions and have secured at least 55% marks in their previous annual exam. Annual family income must not exceed Rs. 2,50,000 per annum."
            }
        ]
    },
    {
        "doc_id": "doc_vidyasaarathi",
        "scheme_name": "NSDL Vidyasaarathi CSR Education Grant",
        "source_url": "https://www.vidyasaarathi.co.in",
        "last_updated": "2026-10-12",
        "sections": [
            {
                "section_title": "Corporate Scholarship Disbursement",
                "content": "Hosted by NSDL e-Governance on Vidyasaarathi (vidyasaarathi.co.in), this portal connects corporate CSR foundations (such as ACC, JSW, Tata Steel) with low-income students. Awards range from Rs. 20,000 to Rs. 50,000 per academic year for professional degree, diploma, and undergraduate students."
            },
            {
                "section_title": "Documentation & Portal Application",
                "content": "Students apply directly on vidyasaarathi.co.in by uploading Class 10/12 marksheets (minimum 60% marks), verified college fee structure, Tehsildar income certificate (under Rs. 5 Lakhs), and bank account passbook."
            }
        ]
    }
]
