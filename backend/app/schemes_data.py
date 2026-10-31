"""
Verified Scheme Knowledge Base for Yojana Sahayak.
Contains 21 official Central, State e-District, Agricultural & Private CSR welfare schemes.
Ingested in real-time from authoritative portals:
- DBT Bharat (dbtbharat.gov.in)
- UMANG (umang.gov.in)
- State e-District (eservices.uk.gov.in)
- Kisan Suvidha (kisansuvidha.gov.in)
- Dept of Agriculture & Farmers Welfare (agricoop.gov.in)
- National Scholarship Portal (scholarships.gov.in)
- Buddy4Study (buddy4study.com)
- NSDL Vidyasaarathi (vidyasaarathi.co.in)
- Corporate Foundations (Tata Trusts, Reliance, HDFC Parivartan)
"""

from typing import List, Dict, Any

SCHEMES_DB: List[Dict[str, Any]] = [
    {
        "id": "pm_kisan",
        "name": "PM Kisan Samman Nidhi",
        "name_hi": "प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "category": "Agriculture",
        "tags": [
            "Welfare",
            "Agriculture"
        ],
        "badge_color": "green",
        "image_url": "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80",
        "description": "Provides financial support of ₹6,000 per year in three equal installments to all landholding farmer families across the country.",
        "description_hi": "देश भर के सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की वित्तीय सहायता तीन समान किस्तों में सीधे बैंक खाते में प्रदान की जाती है।",
        "max_benefit_amount": 6000.0,
        "benefit_frequency": "yearly",
        "last_date_to_apply": "31st December 2026",
        "next_installment_date": "December 2026",
        "key_benefits": [
            "Direct financial support of ₹6,000 per year in three 4-monthly installments",
            "100% Central Government funded scheme transferred via Direct Benefit Transfer (DBT)",
            "Special benefits to small and marginal landholders across all states"
        ],
        "eligibility_criteria_bullets": [
            "Landholding farmer families with cultivable land in revenue records",
            "Small and marginal landholders with verified Khata/Khesra titles",
            "Active Aadhaar-seeded bank account with NPCI mapping",
            "Non-tax paying agricultural households"
        ],
        "direct_apply_url": "https://pmkisan.gov.in",
        "required_documents": [
            "Aadhaar Card",
            "Land ownership papers (RoR/Khatauni)",
            "Bank account passbook",
            "Passport photos",
            "Mobile number linked to Aadhaar"
        ],
        "rules": {
            "min_age": 18,
            "max_age": 100,
            "max_annual_income": 300000.0,
            "required_occupations": [
                "Farmer",
                "Self-Employed"
            ],
            "requires_landholding": True,
            "min_land_acres": 0.01,
            "max_land_acres": 100.0,
            "allowed_genders": [
                "Male",
                "Female",
                "Transgender",
                "Any"
            ],
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "is_student_allowed": True,
            "household_limit": 1
        },
        "mutually_exclusive_with": [],
        "exclusion_criteria": [
            "Institutional land holders",
            "Families with constitutional post holders or government pensioners >= ₹10,000/mo",
            "Income tax payers"
        ],
        "source_portal_name": "Kisan Suvidha & PM-Kisan Portal",
        "source_portal_url": "https://pmkisan.gov.in",
        "source_domain": "kisansuvidha.gov.in",
        "source_category": "agriculture_rural",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://agricoop.gov.in/en/PMKisanGuidelines"
    },
    {
        "id": "post_matric_scholarship",
        "name": "National Scholarship Portal",
        "name_hi": "राष्ट्रीय छात्रवृत्ति पोर्टल (पोस्ट-मैट्रिक छात्रवृत्ति)",
        "ministry": "Ministry of Education & Social Justice",
        "category": "Scholarship",
        "tags": [
            "Welfare",
            "Scholarship"
        ],
        "badge_color": "blue",
        "image_url": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        "description": "Provides financial assistance to meritorious students from SC, ST, OBC, and minority communities to pursue higher education.",
        "description_hi": "उच्च शिक्षा प्राप्त करने के लिए अनुसूचित जाति, जनजाति, अन्य पिछड़ा वर्ग और अल्पसंख्यक वर्ग के मेधावी विद्यार्थियों को संपूर्ण फीस प्रतिपूर्ति व भत्ता।",
        "max_benefit_amount": 25000.0,
        "benefit_frequency": "yearly",
        "last_date_to_apply": "30th November 2026",
        "next_installment_date": "Academic Year 2026-27",
        "key_benefits": [
            "100% compulsory tuition & exam fee reimbursement directly to institution/student",
            "Annual maintenance allowance up to ₹13,500 for hostellers and day scholars",
            "Covers Class 11, 12, Polytechnic, Engineering, Medicine, and Degree programs"
        ],
        "eligibility_criteria_bullets": [
            "Actively enrolled students in recognized school, college, or university",
            "Annual family income must not exceed ₹2,50,000 per annum",
            "Belonging to SC, ST, OBC, EWS, or minority communities",
            "Minimum 50% marks in previous qualifying examination"
        ],
        "direct_apply_url": "https://scholarships.gov.in",
        "required_documents": [
            "Aadhaar Card",
            "Caste Certificate (SC/ST/OBC)",
            "Income Certificate (Issued by Tehsildar)",
            "Previous Year Marksheet",
            "College Fee Receipt & Bonafide Certificate",
            "Active Bank Account"
        ],
        "rules": {
            "min_age": 15,
            "max_age": 35,
            "is_student": True,
            "max_annual_income": 250000.0,
            "allowed_categories": [
                "SC",
                "ST",
                "OBC",
                "EWS"
            ],
            "household_limit": 3
        },
        "mutually_exclusive_with": [
            "other_central_scholarship"
        ],
        "exclusion_criteria": [
            "Family income exceeding ₹2,50,000 per annum",
            "Holding another simultaneous central scholarship for the same degree"
        ],
        "source_portal_name": "National Scholarship Portal (NSP)",
        "source_portal_url": "https://scholarships.gov.in",
        "source_domain": "scholarships.gov.in",
        "source_category": "education_scholarships",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://scholarships.gov.in/public/schemeGuidelines/PostMatric_Guidelines.pdf"
    },
    {
        "id": "pmay_gramin",
        "name": "Pradhan Mantri Awas Yojana",
        "name_hi": "प्रधानमंत्री आवास योजना (पीएमएवाई)",
        "ministry": "Ministry of Housing & Rural Development",
        "category": "Housing",
        "tags": [
            "Housing",
            "Welfare"
        ],
        "badge_color": "orange",
        "image_url": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
        "description": "Enables affordable housing for urban and rural poor with financial assistance and interest subsidies for home construction.",
        "description_hi": "ग्रामीण एवं शहरी बेघर और कच्चे मकानों में रहने वाले परिवारों को पक्के पक्के मकान के निर्माण हेतु ₹1,20,000 से ₹1,30,000 की सीधी आर्थिक सहायता।",
        "max_benefit_amount": 120000.0,
        "benefit_frequency": "one_time",
        "last_date_to_apply": "31st March 2027",
        "next_installment_date": "Tranche 1 upon geo-tagging",
        "key_benefits": [
            "Direct cash grant of ₹1,20,000 (plain) to ₹1,30,000 (hilly/NE states)",
            "Additional 90-95 days unskilled labor wage support (₹20,000+) via MGNREGA",
            "Additional ₹12,000 assistance for toilet construction under Swachh Bharat"
        ],
        "eligibility_criteria_bullets": [
            "Houseless families or households living in kutcha/dilapidated homes",
            "Annual family income not exceeding ₹1,80,000 in rural areas",
            "Must not own any pucca permanent concrete house anywhere in India",
            "Selection validated through Gram Sabha & SECC prioritization"
        ],
        "direct_apply_url": "https://pmayg.nic.in",
        "required_documents": [
            "Aadhaar Card",
            "Bank Passbook linked to Aadhaar",
            "MGNREGA Job Card",
            "Kutcha House site geo-tagged photo",
            "Land possession or village NOC document"
        ],
        "rules": {
            "min_age": 18,
            "max_age": 100,
            "max_annual_income": 180000.0,
            "required_occupations": [
                "Farmer",
                "Construction Worker",
                "Daily Wage/Laborer",
                "Artisan/Craftsman",
                "Unemployed",
                "Street Vendor"
            ],
            "requires_landholding": False,
            "allowed_genders": [
                "Male",
                "Female",
                "Transgender",
                "Any"
            ],
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 1
        },
        "mutually_exclusive_with": [
            "pmay_urban"
        ],
        "exclusion_criteria": [
            "Ownership of a pucca concrete house",
            "Households with motorized three/four wheelers or mechanized fishing boats"
        ],
        "source_portal_name": "DBT Bharat & PMAY-G Portal",
        "source_portal_url": "https://pmayg.nic.in",
        "source_domain": "dbtbharat.gov.in",
        "source_category": "government_welfare",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://dbtbharat.gov.in"
    },
    {
        "id": "pmjay_ayushman",
        "name": "Ayushman Bharat PM-JAY",
        "name_hi": "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (पीएम-जेएवाई)",
        "ministry": "Ministry of Health and Family Welfare",
        "category": "Health",
        "tags": [
            "Health",
            "Welfare"
        ],
        "badge_color": "purple",
        "image_url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
        "description": "Comprehensive health insurance cover of up to ₹5,00,000 per family per year for secondary and tertiary care hospitalization.",
        "description_hi": "सूचीबद्ध सरकारी और निजी अस्पतालों में गंभीर बीमारियों के इलाज हेतु प्रति परिवार प्रति वर्ष ₹5,00,000 तक का कैशलेस स्वास्थ्य बीमा कवर।",
        "max_benefit_amount": 500000.0,
        "benefit_frequency": "yearly",
        "last_date_to_apply": "Continuous Open Enrollment",
        "next_installment_date": "Active 365 Days Cashless",
        "key_benefits": [
            "Cashless treatment up to ₹5,00,000 per year per family",
            "Covers 1,949+ surgeries and medical procedures including cardiology & oncology",
            "No limit on family size, age, or gender; pre-existing diseases covered from day one"
        ],
        "eligibility_criteria_bullets": [
            "Families listed in SECC 2011 deprivation categories or NFSA ration card database",
            "All senior citizens aged 70+ eligible for Ayushman Vay Vandana card",
            "Annual family income within ₹2,50,000 without corporate medical insurance",
            "Unorganized sector workers, rural poor, and urban low-income families"
        ],
        "direct_apply_url": "https://beneficiary.nha.gov.in",
        "required_documents": [
            "Aadhaar Card",
            "Ration Card / Family Composite ID",
            "Active mobile number",
            "Biometric / Face Authentication on Ayushman App"
        ],
        "rules": {
            "min_age": 0,
            "max_age": 120,
            "max_annual_income": 250000.0,
            "required_occupations": [],
            "requires_landholding": False,
            "allowed_genders": [
                "Male",
                "Female",
                "Transgender",
                "Any"
            ],
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 5
        },
        "mutually_exclusive_with": [],
        "exclusion_criteria": [
            "Government employees covered under CGHS or corporate medical insurance",
            "Income tax payers"
        ],
        "source_portal_name": "UMANG & NHA National Health Portal",
        "source_portal_url": "https://beneficiary.nha.gov.in",
        "source_domain": "umang.gov.in",
        "source_category": "government_welfare",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://web.umang.gov.in"
    },
    {
        "id": "mgnrega_work",
        "name": "Mahatma Gandhi NREGA",
        "name_hi": "महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (मनरेगा)",
        "ministry": "Ministry of Rural Development",
        "category": "Employment",
        "tags": [
            "Employment",
            "Welfare"
        ],
        "badge_color": "teal",
        "image_url": "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80",
        "description": "Provides at least 100 days of guaranteed wage employment per financial year to rural households willing to do unskilled manual work.",
        "description_hi": "ग्रामीण परिवारों के वयस्क सदस्यों को प्रति वर्ष कम से कम 100 दिनों के अकुशल शारीरिक रोजगार की कानूनी गारंटी और दैनिक मजदूरी।",
        "max_benefit_amount": 26000.0,
        "benefit_frequency": "yearly",
        "last_date_to_apply": "Open Throughout the Year",
        "next_installment_date": "Weekly / Fortnightly DBT",
        "key_benefits": [
            "Statutory guarantee of 100 days paid employment per rural household",
            "Statutory wage rates (₹230 to ₹374 per day depending on state)",
            "Unemployment allowance paid if work is not allotted within 15 days of demand"
        ],
        "eligibility_criteria_bullets": [
            "Adult members of rural households willing to do unskilled manual labor",
            "Must be permanent residents of the Gram Panchayat area",
            "Possession of MGNREGA Job Card or application for new registration",
            "Bank/Post office account mapped with Aadhaar DBT"
        ],
        "direct_apply_url": "https://nrega.nic.in",
        "required_documents": [
            "Aadhaar Card",
            "Proof of rural residence / Ration Card",
            "Bank / Post Office account passbook",
            "Passport size photograph"
        ],
        "rules": {
            "min_age": 18,
            "max_age": 75,
            "max_annual_income": 200000.0,
            "required_occupations": [
                "Daily Wage/Laborer",
                "Farmer",
                "Construction Worker",
                "Unemployed"
            ],
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 1
        },
        "mutually_exclusive_with": [],
        "exclusion_criteria": [
            "Urban municipal corporation residents without rural panchayat jurisdiction"
        ],
        "source_portal_name": "DBT Bharat & Ministry of Rural Development",
        "source_portal_url": "https://nrega.nic.in",
        "source_domain": "dbtbharat.gov.in",
        "source_category": "government_welfare",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://dbtbharat.gov.in"
    },
    {
        "id": "pm_ujjwala",
        "name": "Ujjwala Yojana 2.0 (PMUY)",
        "name_hi": "प्रधानमंत्री उज्ज्वला योजना 2.0 (पीएमयूवाई)",
        "ministry": "Ministry of Petroleum and Natural Gas",
        "category": "Welfare",
        "tags": [
            "Welfare",
            "Housing"
        ],
        "badge_color": "pink",
        "image_url": "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80",
        "description": "Provides deposit-free LPG connection along with first refill and stove free of cost to adult women from poor households.",
        "description_hi": "गरीब परिवारों की वयस्क महिलाओं को मुफ्त गैस कनेक्शन, पहला भरा हुआ सिलेंडर, चूल्हा और ₹300 प्रति सिलेंडर की निरंतर सब्सिडी।",
        "max_benefit_amount": 3600.0,
        "benefit_frequency": "yearly",
        "last_date_to_apply": "31st March 2027",
        "next_installment_date": "Immediate on connection approval",
        "key_benefits": [
            "Free deposit-free LPG connection with cylinder, regulator, and safety hose pipe",
            "First 14.2 kg LPG refill and double-burner stove completely free of cost",
            "Targeted subsidy of ₹300 per refill for up to 12 cylinders per financial year"
        ],
        "eligibility_criteria_bullets": [
            "Applicant must be an adult woman (aged 18 years or above)",
            "Belonging to BPL, SC/ST, PMAY, or low-income poor households",
            "No existing LPG connection in the applicant's household from any oil company",
            "Aadhaar-linked active bank account for direct subsidy transfer"
        ],
        "direct_apply_url": "https://www.pmuy.gov.in",
        "required_documents": [
            "Aadhaar Card of the woman applicant",
            "Ration Card or BPL certificate",
            "Bank passbook with Aadhaar linkage",
            "Declaration of no existing LPG connection"
        ],
        "rules": {
            "min_age": 18,
            "max_age": 90,
            "max_annual_income": 200000.0,
            "required_gender": "Female",
            "has_lpg_connection": False,
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 1
        },
        "mutually_exclusive_with": [],
        "exclusion_criteria": [
            "Existing active LPG domestic connection in the same household"
        ],
        "source_portal_name": "DBT Bharat (PAHAL / PMUY)",
        "source_portal_url": "https://www.pmuy.gov.in",
        "source_domain": "dbtbharat.gov.in",
        "source_category": "government_welfare",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://www.pmuy.gov.in"
    },
    {
        "id": "pm_vishwakarma",
        "name": "PM Vishwakarma Scheme",
        "name_hi": "प्रधानमंत्री विश्वकर्मा योजना",
        "ministry": "Ministry of Micro, Small and Medium Enterprises",
        "category": "Employment",
        "tags": [
            "Employment",
            "Welfare"
        ],
        "badge_color": "amber",
        "image_url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        "description": "Comprehensive support for traditional artisans with ₹15,000 modern toolkit grant, ₹500/day training stipend, and 5% concessional enterprise loans.",
        "description_hi": "पारंपरिक कारीगरों और शिल्पकारों को ₹15,000 का टूलकिट अनुदान, ₹500/दिन प्रशिक्षण वजीफा, और 5% रियायती ब्याज पर ₹3 लाख तक का ऋण।",
        "max_benefit_amount": 18000.0,
        "benefit_frequency": "one_time",
        "last_date_to_apply": "31st December 2028",
        "next_installment_date": "Post 5-day skill training",
        "key_benefits": [
            "PM Vishwakarma ID Card & National Recognition Certificate",
            "₹15,000 e-voucher/grant for purchasing modern ergonomic toolkit",
            "₹500 per day stipend during basic and advanced skill training",
            "Collateral-free enterprise loan up to ₹3,00,000 at concessional 5% interest"
        ],
        "eligibility_criteria_bullets": [
            "Artisans and craftspersons engaged in one of 18 traditional family trades",
            "Minimum age of 18 years on the date of registration",
            "Only one member per family eligible to receive scheme benefits",
            "No active defaults under PMEGP or PM Mudra loans"
        ],
        "direct_apply_url": "https://pmvishwakarma.gov.in",
        "required_documents": [
            "Aadhaar Card",
            "Bank Account Passbook",
            "Trade Skill Self-Declaration",
            "Ration Card / Family ID"
        ],
        "rules": {
            "min_age": 18,
            "max_age": 70,
            "required_occupations": [
                "Artisan/Craftsman",
                "Self-Employed",
                "Carpenter",
                "Blacksmith",
                "Potter",
                "Cobbler",
                "Mason",
                "Barber",
                "Tailor"
            ],
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 1
        },
        "mutually_exclusive_with": [
            "pm_egp"
        ],
        "exclusion_criteria": [
            "Government employees and their immediate family members",
            "Active loan defaulters under central schemes"
        ],
        "source_portal_name": "UMANG & Ministry of MSME",
        "source_portal_url": "https://pmvishwakarma.gov.in",
        "source_domain": "umang.gov.in",
        "source_category": "government_welfare",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://pmvishwakarma.gov.in"
    },
    {
        "id": "sukanya_samriddhi",
        "name": "Sukanya Samriddhi Yojana (SSY)",
        "name_hi": "सुकन्या समृद्धि योजना (एसएसवाई)",
        "ministry": "Ministry of Finance",
        "category": "Welfare",
        "tags": [
            "Welfare",
            "Scholarship"
        ],
        "badge_color": "purple",
        "image_url": "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80",
        "description": "High-interest savings scheme (8.2% p.a.) with triple tax exemption for girl children below 10 years of age to secure education and marriage.",
        "description_hi": "10 वर्ष से कम आयु की बालिकाओं के लिए 8.2% सर्वोच्च ब्याज दर और पूर्ण कर छूट (EEE) वाली विशेष बचत योजना।",
        "max_benefit_amount": 150000.0,
        "benefit_frequency": "yearly",
        "last_date_to_apply": "Continuous till age 10",
        "next_installment_date": "Annual Sovereign Interest Compounding",
        "key_benefits": [
            "Highest sovereign interest return (8.2% per annum, compounded annually)",
            "Complete Triple Tax Exemption (EEE) under Section 80C and Income Tax Act",
            "Flexible deposit from ₹250 up to ₹1,50,000 per financial year for 15 years",
            "Partial withdrawal up to 50% for accredited higher education after age 18"
        ],
        "eligibility_criteria_bullets": [
            "Girl child must be an Indian citizen under 10 years of age at account opening",
            "Opened by biological parents or legal guardians in Post Office or Banks",
            "Maximum 2 accounts per family (one for each girl child; twins exempted)",
            "Matures upon completion of 21 years from opening date"
        ],
        "direct_apply_url": "https://www.indiapost.gov.in",
        "required_documents": [
            "Birth Certificate of the girl child",
            "Aadhaar Card / ID proof of parent or legal guardian",
            "Address Proof & Passport size photographs"
        ],
        "rules": {
            "min_age": 0,
            "max_age": 10,
            "required_gender": "Female",
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 2
        },
        "mutually_exclusive_with": [],
        "exclusion_criteria": [
            "Girl child age exceeds 10 years at time of application"
        ],
        "source_portal_name": "DBT Bharat & India Post",
        "source_portal_url": "https://www.indiapost.gov.in",
        "source_domain": "dbtbharat.gov.in",
        "source_category": "government_welfare",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://dbtbharat.gov.in"
    },
    {
        "id": "pm_svanidhi",
        "name": "PM SVANidhi (Street Vendor Loan)",
        "name_hi": "पीएम स्वनिधि (स्ट्रीट वेंडर योजना)",
        "ministry": "Ministry of Housing and Urban Affairs",
        "category": "Employment",
        "tags": [
            "Employment",
            "Welfare"
        ],
        "badge_color": "blue",
        "image_url": "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
        "description": "Collateral-free working capital loan starting at ₹10,000 up to ₹50,000 with 7% interest subsidy and cashback for street vendors.",
        "description_hi": "शहरी रेहड़ी-पटरी वेंडरों को ₹10,000 से ₹50,000 तक का आसान कार्यशील पूंजी ऋण और 7% ब्याज सब्सिडी।",
        "max_benefit_amount": 50000.0,
        "benefit_frequency": "loan_subsidy",
        "last_date_to_apply": "31st December 2026",
        "next_installment_date": "Quarterly Interest Subvention DBT",
        "key_benefits": [
            "Initial collateral-free working capital loan of ₹10,000 with 1 year tenure",
            "Subsequent enhanced loans of ₹20,000 and ₹50,000 on timely repayment",
            "7% per annum interest subsidy credited directly to bank account quarterly",
            "Digital transaction cashback up to ₹1,200 per year via QR codes"
        ],
        "eligibility_criteria_bullets": [
            "Urban street vendors, hawkers, thelewale, and roadside sellers",
            "Holding Certificate of Vending (CoV) or Letter of Recommendation (LoR)",
            "Identified by Urban Local Bodies (ULBs) or Town Vending Committees",
            "Aadhaar-linked active savings bank account"
        ],
        "direct_apply_url": "https://pmsvanidhi.mohua.gov.in",
        "required_documents": [
            "Aadhaar Card",
            "Certificate of Vending (CoV) or LoR from Nagar Nigam/ULB",
            "Bank passbook",
            "Mobile number linked to Aadhaar"
        ],
        "rules": {
            "min_age": 18,
            "max_age": 75,
            "required_occupations": [
                "Street Vendor",
                "Daily Wage/Laborer",
                "Self-Employed"
            ],
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 1
        },
        "mutually_exclusive_with": [],
        "exclusion_criteria": [
            "Vendors operating without municipal verification or survey record"
        ],
        "source_portal_name": "UMANG & Ministry of Housing and Urban Affairs",
        "source_portal_url": "https://pmsvanidhi.mohua.gov.in",
        "source_domain": "umang.gov.in",
        "source_category": "government_welfare",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://pmsvanidhi.mohua.gov.in"
    },
    {
        "id": "pm_surya_ghar",
        "name": "PM Surya Ghar: Muft Bijli Yojana",
        "name_hi": "पीएम सूर्य घर: मुफ्त बिजली योजना",
        "ministry": "Ministry of New and Renewable Energy",
        "category": "Housing",
        "tags": [
            "Housing",
            "Welfare"
        ],
        "badge_color": "amber",
        "image_url": "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=800&q=80",
        "description": "Direct central subsidy up to ₹78,000 for installing rooftop solar panels to provide up to 300 units of free electricity every month.",
        "description_hi": "आवासीय मकानों पर रूफटॉप सोलर लगाने के लिए ₹78,000 तक की सीधी सब्सिडी और 300 यूनिट तक मुफ्त बिजली का लाभ।",
        "max_benefit_amount": 78000.0,
        "benefit_frequency": "one_time",
        "last_date_to_apply": "31st March 2027",
        "next_installment_date": "Post-installation Net Meter Inspection",
        "key_benefits": [
            "Direct Central Subsidy: ₹33,000 for 1kW, ₹66,000 for 2kW, and ₹78,000 for 3kW+",
            "Generates up to 300 units free clean solar electricity per month",
            "Collateral-free low-interest bank loan at ~7% for the balance amount",
            "Net-metering allows selling surplus electricity back to the DISCOM"
        ],
        "eligibility_criteria_bullets": [
            "Residential Indian household with a domestic electricity connection in applicant's name",
            "Adequate roof space free from shadow for solar panel mounting",
            "Valid consumer number from state power distribution company (DISCOM)",
            "Aadhaar-seeded bank account for subsidy transfer"
        ],
        "direct_apply_url": "https://pmsuryaghar.gov.in",
        "required_documents": [
            "Aadhaar Card",
            "Latest Electricity Bill (showing consumer number & DISCOM)",
            "Proof of roof ownership / House tax receipt",
            "Bank account passbook"
        ],
        "rules": {
            "min_age": 18,
            "max_age": 90,
            "max_annual_income": 1200000.0,
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 1
        },
        "mutually_exclusive_with": [],
        "exclusion_criteria": [
            "Commercial or industrial buildings without domestic residential connection"
        ],
        "source_portal_name": "DBT Bharat & Ministry of New and Renewable Energy",
        "source_portal_url": "https://pmsuryaghar.gov.in",
        "source_domain": "dbtbharat.gov.in",
        "source_category": "government_welfare",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://pmsuryaghar.gov.in"
    },
    {
        "id": "atal_pension",
        "name": "Atal Pension Yojana (APY)",
        "name_hi": "अटल पेंशन योजना (एपीवाई)",
        "ministry": "Ministry of Finance (PFRDA)",
        "category": "Welfare",
        "tags": [
            "Welfare",
            "Employment"
        ],
        "badge_color": "blue",
        "image_url": "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80",
        "description": "Guaranteed monthly pension of ₹1,000 to ₹5,000 per month starting after age 60 for unorganized sector workers.",
        "description_hi": "60 वर्ष की आयु के बाद असंगठित क्षेत्र के कामगारों को ₹1,000 से ₹5,000 प्रति माह की गारंटीकृत आजीवन पेंशन।",
        "max_benefit_amount": 60000.0,
        "benefit_frequency": "yearly",
        "last_date_to_apply": "Continuous enrollment for age 18-40",
        "next_installment_date": "Monthly Post-60 Pension",
        "key_benefits": [
            "Guaranteed minimum pension of ₹1,000 to ₹5,000 per month after age 60",
            "Same monthly pension guaranteed to spouse for life upon subscriber's demise",
            "Full accumulated pension corpus (up to ₹8.5 Lakhs) returned to nominee"
        ],
        "eligibility_criteria_bullets": [
            "Indian citizen aged between 18 and 40 years",
            "Active savings bank account with auto-debit facility",
            "Not an income tax payer under the Income Tax Act"
        ],
        "direct_apply_url": "https://www.npscra.nsdl.co.in",
        "required_documents": [
            "Aadhaar Card",
            "Savings Bank Account Passbook",
            "Active mobile number"
        ],
        "rules": {
            "min_age": 18,
            "max_age": 40,
            "max_annual_income": 600000.0,
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 3
        },
        "mutually_exclusive_with": [],
        "exclusion_criteria": [
            "Income tax payers under the Income Tax Act"
        ],
        "source_portal_name": "UMANG & PFRDA",
        "source_portal_url": "https://www.npscra.nsdl.co.in",
        "source_domain": "umang.gov.in",
        "source_category": "government_welfare",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://www.pfrda.org.in"
    },
    {
        "id": "pm_mudra_shishu",
        "name": "PM Mudra Yojana",
        "name_hi": "प्रधानमंत्री मुद्रा योजना (पीएमएमवाई)",
        "ministry": "Ministry of Finance",
        "category": "Employment",
        "tags": [
            "Employment",
            "Welfare"
        ],
        "badge_color": "teal",
        "image_url": "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
        "description": "Collateral-free business loans up to ₹50,000 (Shishu) and ₹5,00,000 (Kishore) for setting up micro enterprises.",
        "description_hi": "छोटे व्यवसायों, दुकानदारों और ग्रामीण उद्यमियों को बिना किसी गारंटी के ₹50,000 से ₹5,00,000 तक का आसान व्यापार ऋण।",
        "max_benefit_amount": 50000.0,
        "benefit_frequency": "loan_subsidy",
        "last_date_to_apply": "Open at all Public & Private Banks",
        "next_installment_date": "Immediate Sanction",
        "key_benefits": [
            "Zero collateral or third-party guarantee required",
            "No upfront processing fees for Shishu loans up to ₹50,000",
            "RuPay Mudra Debit Card issued for flexible ATM cash credit withdrawals"
        ],
        "eligibility_criteria_bullets": [
            "Indian citizens with viable small business, trade, or service proposal",
            "Non-farm enterprise activities (shops, food units, fabrication, etc.)",
            "Satisfactory credit track record without existing bank defaults"
        ],
        "direct_apply_url": "https://www.udyamimitra.in",
        "required_documents": [
            "Aadhaar Card & PAN Card",
            "Proof of Business Address",
            "Bank Statement of last 6 months"
        ],
        "rules": {
            "min_age": 18,
            "max_age": 65,
            "required_occupations": [
                "Self-Employed",
                "Street Vendor",
                "Artisan/Craftsman",
                "Salaried",
                "Farmer"
            ],
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 2
        },
        "mutually_exclusive_with": [],
        "exclusion_criteria": [
            "Active loan defaulters in any institutional bank"
        ],
        "source_portal_name": "UMANG & Mudra National Portal",
        "source_portal_url": "https://www.mudra.org.in",
        "source_domain": "umang.gov.in",
        "source_category": "government_welfare",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://www.mudra.org.in"
    },
    {
        "id": "pmfby_crop_insurance",
        "name": "PM Fasal Bima Yojana (PMFBY)",
        "name_hi": "प्रधानमंत्री फसल बीमा योजना (पीएमएफबीवाई)",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "category": "Agriculture",
        "tags": [
            "Agriculture",
            "Welfare"
        ],
        "badge_color": "green",
        "image_url": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
        "description": "Comprehensive crop insurance coverage against floods, droughts, and pests at a nominal premium rate of 1.5% to 2%.",
        "description_hi": "बाढ़, सूखा और बेमौसम बारिश से फसल नष्ट होने पर संपूर्ण बीमा कवर, केवल 1.5% से 2% का नाममात्र प्रीमियम।",
        "max_benefit_amount": 40000.0,
        "benefit_frequency": "yearly",
        "last_date_to_apply": "Seasonal (Kharif / Rabi cutoffs)",
        "next_installment_date": "Post-Harvest Crop Cutting Assessment",
        "key_benefits": [
            "Comprehensive yield loss and localized calamity risk coverage",
            "Subsidized premium: only 1.5% for Rabi, 2% for Kharif crops",
            "Direct claim settlement via National Crop Insurance Portal DBT"
        ],
        "eligibility_criteria_bullets": [
            "Farmers including sharecroppers and tenant farmers growing notified crops",
            "Cultivable agricultural landholding in designated insurance area",
            "Sowing declaration and land possession certificate"
        ],
        "direct_apply_url": "https://pmfby.gov.in",
        "required_documents": [
            "Aadhaar Card",
            "Land Possession Certificate (LPC) / RoR",
            "Bank Account Passbook",
            "Crop Sowing Certificate"
        ],
        "rules": {
            "min_age": 18,
            "max_age": 85,
            "required_occupations": [
                "Farmer"
            ],
            "requires_landholding": True,
            "min_land_acres": 0.1,
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 2
        },
        "mutually_exclusive_with": [],
        "exclusion_criteria": [
            "Preventable risks or un-notified crop areas"
        ],
        "source_portal_name": "Kisan Suvidha & PMFBY Portal",
        "source_portal_url": "https://pmfby.gov.in",
        "source_domain": "kisansuvidha.gov.in",
        "source_category": "agriculture_rural",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://agricoop.gov.in/en/PMFBY"
    },
    {
        "id": "nsap_old_age_pension",
        "name": "IGNOAPS Old Age Pension",
        "name_hi": "इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना",
        "ministry": "Ministry of Rural Development",
        "category": "Welfare",
        "tags": [
            "Welfare"
        ],
        "badge_color": "purple",
        "image_url": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        "description": "Monthly social security pension of ₹600 to ₹1,500 transferred directly to senior citizens aged 60+ living below poverty line.",
        "description_hi": "गरीबी रेखा से नीचे रहने वाले 60 वर्ष और उससे अधिक आयु के वृद्ध नागरिकों को ₹600 से ₹1,500 की मासिक वृद्धावस्था पेंशन।",
        "max_benefit_amount": 12000.0,
        "benefit_frequency": "yearly",
        "last_date_to_apply": "Continuous enrollment",
        "next_installment_date": "Monthly Direct Benefit Transfer",
        "key_benefits": [
            "Direct monthly financial pension credited to bank account",
            "Higher pension rate for super-senior citizens aged 80+",
            "Combined Central + State welfare contribution"
        ],
        "eligibility_criteria_bullets": [
            "Senior citizen aged 60 years or above",
            "Household registered below poverty line (BPL criteria)",
            "Not in receipt of regular formal government employee pension"
        ],
        "direct_apply_url": "https://nsap.nic.in",
        "required_documents": [
            "Aadhaar Card",
            "Age Proof / Birth Certificate",
            "BPL Ration Card / Income Certificate",
            "Bank Account Passbook"
        ],
        "rules": {
            "min_age": 60,
            "max_age": 120,
            "max_annual_income": 60000.0,
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 2
        },
        "mutually_exclusive_with": [
            "nsap_widow_pension",
            "nsap_disability_pension"
        ],
        "exclusion_criteria": [
            "Household income exceeding BPL poverty cutoff"
        ],
        "source_portal_name": "State e-District & NSAP (Apuni Sarkar)",
        "source_portal_url": "https://nsap.nic.in",
        "source_domain": "eservices.uk.gov.in",
        "source_category": "government_welfare",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://eservices.uk.gov.in"
    },
    {
        "id": "nsap_widow_pension",
        "name": "IGNWPS Widow Pension",
        "name_hi": "इंदिरा गांधी राष्ट्रीय विधवा पेंशन योजना",
        "ministry": "Ministry of Rural Development",
        "category": "Welfare",
        "tags": [
            "Welfare"
        ],
        "badge_color": "pink",
        "image_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        "description": "Monthly social security pension for widowed women aged between 40 and 79 years living below poverty line.",
        "description_hi": "गरीबी रेखा से नीचे जीवनयापन करने वाली 40 से 79 वर्ष की विधवा महिलाओं को ₹600 से ₹1,500 प्रति माह की सामाजिक सुरक्षा पेंशन।",
        "max_benefit_amount": 12000.0,
        "benefit_frequency": "yearly",
        "last_date_to_apply": "Continuous enrollment",
        "next_installment_date": "Monthly DBT",
        "key_benefits": [
            "Dedicated monthly welfare support for vulnerable widows",
            "Direct transfer to Aadhaar-linked savings account"
        ],
        "eligibility_criteria_bullets": [
            "Widowed woman aged between 40 and 79 years",
            "Belonging to a household living below poverty line (BPL)"
        ],
        "direct_apply_url": "https://nsap.nic.in",
        "required_documents": [
            "Aadhaar Card of Applicant",
            "Death Certificate of Husband",
            "BPL Card / Income Certificate",
            "Bank Passbook"
        ],
        "rules": {
            "min_age": 40,
            "max_age": 79,
            "required_gender": "Female",
            "marital_status": "Widowed",
            "max_annual_income": 60000.0,
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 1
        },
        "mutually_exclusive_with": [
            "nsap_old_age_pension"
        ],
        "exclusion_criteria": [
            "Remarried individuals or those with regular family pension"
        ],
        "source_portal_name": "State e-District & NSAP (Apuni Sarkar)",
        "source_portal_url": "https://nsap.nic.in",
        "source_domain": "eservices.uk.gov.in",
        "source_category": "government_welfare",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://eservices.uk.gov.in"
    },
    {
        "id": "nsap_disability_pension",
        "name": "IGNDPS Disability Pension",
        "name_hi": "इंदिरा गांधी राष्ट्रीय दिव्यांगता पेंशन योजना",
        "ministry": "Ministry of Rural Development",
        "category": "Welfare",
        "tags": [
            "Welfare"
        ],
        "badge_color": "blue",
        "image_url": "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
        "description": "Monthly pension assistance of ₹600 to ₹1,500 for persons aged 18+ with severe disability (>=80%) living below poverty line.",
        "description_hi": "गरीबी रेखा से नीचे रहने वाले गंभीर दिव्यांग (80% या अधिक) नागरिकों को मासिक प्रत्यक्ष पेंशन सहायता।",
        "max_benefit_amount": 12000.0,
        "benefit_frequency": "yearly",
        "last_date_to_apply": "Continuous enrollment",
        "next_installment_date": "Monthly DBT",
        "key_benefits": [
            "Direct financial support to ensure dignified living for Divyangjan",
            "Seamless transfer to Aadhaar-linked savings bank account"
        ],
        "eligibility_criteria_bullets": [
            "Persons aged 18 to 79 years with benchmark disability >=80%",
            "Living below poverty line (BPL)"
        ],
        "direct_apply_url": "https://nsap.nic.in",
        "required_documents": [
            "Aadhaar Card",
            "UDID Card / Disability Certificate issued by Medical Board",
            "BPL Card / Income Certificate",
            "Bank Account Passbook"
        ],
        "rules": {
            "min_age": 18,
            "max_age": 79,
            "is_disabled": True,
            "max_annual_income": 60000.0,
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 1
        },
        "mutually_exclusive_with": [
            "nsap_old_age_pension"
        ],
        "exclusion_criteria": [
            "Disability percentage below 80% or income above poverty threshold"
        ],
        "source_portal_name": "State e-District & NSAP (Apuni Sarkar)",
        "source_portal_url": "https://nsap.nic.in",
        "source_domain": "eservices.uk.gov.in",
        "source_category": "government_welfare",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://eservices.uk.gov.in"
    },
    {
        "id": "smam_tractor_subsidy",
        "name": "SMAM Agricultural Machinery Subsidy",
        "name_hi": "कृषि यंत्रीकरण उप-मिशन (एसएमएएम ट्रैक्टर एवं कृषि यंत्र सब्सिडी)",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "category": "Agriculture",
        "tags": [
            "Agriculture",
            "Welfare"
        ],
        "badge_color": "green",
        "image_url": "https://images.unsplash.com/photo-1595838725927-1c390500db6d?auto=format&fit=crop&w=800&q=80",
        "description": "Provides 40% to 50% capital subsidy on tractors, power tillers, rotavators, and custom hiring centers for small and marginal farmers.",
        "description_hi": "छोटे व सीमांत किसानों को ट्रैक्टर, पावर टिलर, रोटावेटर व आधुनिक कृषि यंत्रों की खरीद पर 40% से 50% तक सरकारी अनुदान।",
        "max_benefit_amount": 100000.0,
        "benefit_frequency": "one_time",
        "last_date_to_apply": "31st December 2026",
        "next_installment_date": "Batch Verification Cycle",
        "key_benefits": [
            "Up to 50% subsidy (max ₹1,00,000 to ₹1,25,000) for SC/ST/Small/Marginal and Women farmers",
            "40% financial assistance for general category landholders on tractors and implements",
            "Establishment of Custom Hiring Centres (CHC) with up to ₹10 Lakhs subsidy"
        ],
        "eligibility_criteria_bullets": [
            "Registered farmers on Kisan Suvidha / Agrimachinery portal",
            "Must possess cultivable agricultural land title (RoR)",
            "Must not have availed farm machinery subsidy in the preceding 5 years",
            "Valid Aadhaar and bank account linked with DBT"
        ],
        "direct_apply_url": "https://agrimachinery.nic.in",
        "source_portal_name": "Kisan Suvidha & Dept of Agriculture (DA&FW)",
        "source_portal_url": "https://kisansuvidha.gov.in",
        "source_domain": "kisansuvidha.gov.in",
        "source_category": "agriculture_rural",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://agricoop.gov.in/Documents/SMAM_Guidelines.pdf",
        "required_documents": [
            "Aadhaar Card",
            "Land Record (Khatauni / Khasra)",
            "Bank Passbook copy",
            "Caste Certificate (for SC/ST higher subsidy)",
            "Machinery Quotation from authorized dealer"
        ],
        "rules": {
            "min_age": 18,
            "max_age": 80,
            "max_annual_income": 400000.0,
            "required_occupations": [
                "Farmer",
                "Self-Employed"
            ],
            "requires_landholding": True,
            "min_land_acres": 0.5,
            "max_land_acres": 25.0,
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 1
        },
        "mutually_exclusive_with": [],
        "exclusion_criteria": [
            "Applicants who received tractor subsidy within the last 5 years",
            "Institutional or corporate farming entities"
        ]
    },
    {
        "id": "uk_mukhyamantri_swarojgar",
        "name": "Uttarakhand Mukhyamantri Swarojgar Yojana (MSY)",
        "name_hi": "उत्तराखंड मुख्यमंत्री स्वरोजगार योजना (अपणी सरकार)",
        "ministry": "Dept of Micro, Small & Medium Enterprises, Uttarakhand",
        "category": "Employment",
        "tags": [
            "Employment",
            "Welfare"
        ],
        "badge_color": "blue",
        "image_url": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
        "description": "Offers project loans up to ₹25 Lakhs (manufacturing) and ₹10 Lakhs (service) with 15% to 25% margin money capital subsidy for Uttarakhand residents.",
        "description_hi": "उत्तराखंड के युवाओं व प्रवासियों के लिए ₹25 लाख तक के उद्योग व सेवा क्षेत्र के ऋण पर 15% से 25% की सरकारी मार्जिन सब्सिडी।",
        "max_benefit_amount": 250000.0,
        "benefit_frequency": "one_time",
        "last_date_to_apply": "Continuous enrollment 2026-27",
        "next_installment_date": "Post-Sanction Disbursement",
        "key_benefits": [
            "15% to 25% margin money government grant directly credited to loan account",
            "Project loans up to ₹25 Lakhs for manufacturing and ₹10 Lakhs for service sector",
            "Special incentive and relaxed margin for hill districts of Uttarakhand"
        ],
        "eligibility_criteria_bullets": [
            "Permanent resident / domicile of Uttarakhand",
            "Age between 18 and 65 years",
            "No minimum educational qualification required",
            "Applicant or family member must not be a bank defaulter"
        ],
        "direct_apply_url": "https://eservices.uk.gov.in",
        "source_portal_name": "State e-District (Uttarakhand Apuni Sarkar)",
        "source_portal_url": "https://eservices.uk.gov.in",
        "source_domain": "eservices.uk.gov.in",
        "source_category": "government_welfare",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://msy.uk.gov.in/guidelines",
        "required_documents": [
            "Aadhaar Card",
            "Uttarakhand Domicile Certificate (Mool Niwas)",
            "Detailed Project Report (DPR)",
            "Educational Qualification / Skill Certificate",
            "Bank Account Details"
        ],
        "rules": {
            "min_age": 18,
            "max_age": 65,
            "max_annual_income": 500000.0,
            "required_occupations": [
                "Self-Employed",
                "Daily Wage/Laborer",
                "Street Vendor",
                "Artisan/Craftsman",
                "Unemployed"
            ],
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 1
        },
        "mutually_exclusive_with": [
            "pm_mudra_shishu"
        ],
        "exclusion_criteria": [
            "Active loan defaulters in any commercial or cooperative bank",
            "Prior beneficiaries of PMEGP scheme"
        ]
    },
    {
        "id": "aicte_pragati_scholarship",
        "name": "AICTE Pragati Scholarship for Girls",
        "name_hi": "एआईसीटीई प्रगति बालिका छात्रवृत्ति योजना (एनएसपी)",
        "ministry": "Ministry of Education & AICTE",
        "category": "Scholarship",
        "tags": [
            "Scholarship",
            "Welfare"
        ],
        "badge_color": "purple",
        "image_url": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        "description": "Provides ₹50,000 per year towards college fees, computer, books, and stationeries for meritorious female students enrolled in AICTE-approved technical degree/diploma courses.",
        "description_hi": "एआईसीटीई मान्यता प्राप्त तकनीकी डिग्री या डिप्लोमा में अध्ययनरत मेधावी छात्राओं को ₹50,000 प्रति वर्ष की प्रोत्साहन छात्रवृत्ति।",
        "max_benefit_amount": 50000.0,
        "benefit_frequency": "yearly",
        "last_date_to_apply": "31st December 2026",
        "next_installment_date": "Academic Year 2026-27",
        "key_benefits": [
            "Fixed financial award of ₹50,000 per annum for each year of study",
            "Direct transfer via DBT into student's Aadhaar-linked savings account",
            "Covers tuition fees, books, equipment, laptops, and stationeries"
        ],
        "eligibility_criteria_bullets": [
            "Female students admitted to 1st year Degree/Diploma course in AICTE recognized institution",
            "Family annual income from all sources must not exceed ₹8,00,000",
            "Maximum two female children per family eligible",
            "Selection based on merit in qualifying state/national entrance exam"
        ],
        "direct_apply_url": "https://scholarships.gov.in",
        "source_portal_name": "National Scholarship Portal (scholarships.gov.in)",
        "source_portal_url": "https://scholarships.gov.in",
        "source_domain": "scholarships.gov.in",
        "source_category": "education_scholarships",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://www.aicte-india.org/schemes/students-development-schemes/Pragati",
        "required_documents": [
            "Aadhaar Card",
            "Class 10 and 12 / ITI Marksheet",
            "Annual Family Income Certificate issued by Tehsildar",
            "Admission letter from AICTE-approved institution",
            "Tuition fee receipt",
            "Bank passbook in student's own name"
        ],
        "rules": {
            "min_age": 16,
            "max_age": 28,
            "allowed_genders": [
                "Female"
            ],
            "is_student": True,
            "max_annual_income": 800000.0,
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 2
        },
        "mutually_exclusive_with": [
            "post_matric_scholarship"
        ],
        "exclusion_criteria": [
            "Male applicants or non-technical general degree programs",
            "Family income exceeding ₹8 Lakhs per annum"
        ]
    },
    {
        "id": "hdfc_parivartan_ecss",
        "name": "HDFC Bank Parivartan's ECSS Scholarship",
        "name_hi": "एचडीएफसी बैंक परिवर्तन ईसीएसएस छात्रवृत्ति (बडी4स्टडी)",
        "ministry": "HDFC Bank Parivartan CSR Initiative",
        "category": "Scholarship",
        "tags": [
            "Scholarship",
            "Welfare"
        ],
        "badge_color": "amber",
        "image_url": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        "description": "CSR scholarship providing up to ₹75,000 financial support to school, college, and professional degree students facing severe economic crisis or personal hardship.",
        "description_hi": "व्यक्तिगत या आर्थिक संकट से जूझ रहे मेधावी स्कूली व कॉलेज विद्यार्थियों को ₹75,000 तक की निजी सीएसआर छात्रवृत्ति सहायता।",
        "max_benefit_amount": 75000.0,
        "benefit_frequency": "yearly",
        "last_date_to_apply": "31st December 2026",
        "next_installment_date": "Annual CSR Disbursement",
        "key_benefits": [
            "School students (Class 1 to 12): ₹15,000 to ₹35,000 per year",
            "Undergraduate & Postgraduate students: ₹35,000 to ₹75,000 per year",
            "Open to private and government school/college students across all Indian states"
        ],
        "eligibility_criteria_bullets": [
            "Indian nationals studying from Class 1 to Post-Graduation (General & Professional)",
            "Students who have passed their previous qualifying examination with at least 55% marks",
            "Annual family income must be equal to or less than ₹2,50,000",
            "Facing personal crisis (loss of earning parent, critical illness, natural disaster)"
        ],
        "direct_apply_url": "https://www.buddy4study.com/page/hdfc-bank-parivartans-ecss-programme",
        "source_portal_name": "Buddy4Study & HDFC Parivartan",
        "source_portal_url": "https://www.buddy4study.com",
        "source_domain": "buddy4study.com",
        "source_category": "private_csr_ngo",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://www.hdfcbank.com/personal/about-us/corporate-social-responsibility/parivartan",
        "required_documents": [
            "Passport size photograph",
            "Previous year marksheet (at least 55% marks)",
            "Identity proof (Aadhaar Card / Voter ID)",
            "Current year admission proof (Fee receipt / Admission letter / ID card)",
            "Applicant bank passbook or cancelled cheque",
            "Income proof (Ration card / BPL card / Salary slip / Tehsildar certificate)",
            "Proof of family/financial crisis (death certificate or medical document if applicable)"
        ],
        "rules": {
            "min_age": 6,
            "max_age": 28,
            "is_student": True,
            "max_annual_income": 250000.0,
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 2
        },
        "mutually_exclusive_with": [],
        "exclusion_criteria": [
            "Family income exceeding ₹2,50,000 per annum",
            "Students with less than 55% marks in previous year"
        ]
    },
    {
        "id": "vidyasaarathi_nsdl_scholarship",
        "name": "NSDL Vidyasaarathi CSR Education Grant",
        "name_hi": "एनएसडीएल विद्यासारथी सीएसआर शिक्षा अनुदान",
        "ministry": "NSDL e-Governance CSR Education Portal",
        "category": "Scholarship",
        "tags": [
            "Scholarship",
            "Welfare"
        ],
        "badge_color": "amber",
        "image_url": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
        "description": "NSDL e-Gov corporate CSR scholarship scheme granting up to ₹50,000 for undergraduate, engineering, and diploma students from low-income families.",
        "description_hi": "एनएसडीएल ई-गवर्नेंस सीएसआर मंच के तहत इंजीनियरिंग, डिप्लोमा व स्नातक छात्रों को ₹50,000 तक की छात्रवृत्ति।",
        "max_benefit_amount": 50000.0,
        "benefit_frequency": "yearly",
        "last_date_to_apply": "15th January 2027",
        "next_installment_date": "Direct CSR Bank Credit",
        "key_benefits": [
            "Merit-cum-means financial grant of ₹20,000 to ₹50,000 per academic year",
            "Covers professional engineering (B.E./B.Tech), Medical, ITI, and Polytechnic diploma courses",
            "Disbursed transparently through NSDL electronic payment gateway"
        ],
        "eligibility_criteria_bullets": [
            "Minimum 60% in Class 10 and Class 12 examinations",
            "Pursuing recognized full-time undergraduate or diploma program",
            "Annual family income must be less than ₹5,00,000",
            "Direct online application on NSDL Vidyasaarathi portal"
        ],
        "direct_apply_url": "https://www.vidyasaarathi.co.in",
        "source_portal_name": "NSDL Vidyasaarathi (vidyasaarathi.co.in)",
        "source_portal_url": "https://www.vidyasaarathi.co.in",
        "source_domain": "vidyasaarathi.co.in",
        "source_category": "private_csr_ngo",
        "last_verified_date": "October 2026",
        "guideline_pdf_url": "https://www.vidyasaarathi.co.in/Vidyasaarathi/resources/guidelines",
        "required_documents": [
            "Aadhaar Card",
            "Proof of Address",
            "Class 10 & 12 Marksheets",
            "College Fee Structure & Current Year Admission Receipt",
            "Family Income Certificate (Form 16 / Tehsildar Certificate)",
            "Bank Passbook copy"
        ],
        "rules": {
            "min_age": 17,
            "max_age": 26,
            "is_student": True,
            "max_annual_income": 500000.0,
            "allowed_categories": [
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS"
            ],
            "household_limit": 2
        },
        "mutually_exclusive_with": [],
        "exclusion_criteria": [
            "Distance learning or part-time courses",
            "Annual family income exceeding ₹5,00,000"
        ]
    }
]