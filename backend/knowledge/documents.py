"""
Comprehensive Official Scheme Document Repository for RAG Engine.
Includes Central and State Government Scheme guidelines, Uttarakhand-specific welfare programs,
category directories (Women, Farmers, Students, Pensions), and application tracking guides.
"""

from typing import List, Dict, Any

SCHEME_DOCUMENTS: List[Dict[str, Any]] = [   {   'doc_id': 'doc_pm_kisan',
        'last_updated': '2026-08-15',
        'scheme_name': 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
        'sections': [   {   'content': 'PM-KISAN is a Central Sector scheme with 100% funding from Government of '
                                       'India. Under the scheme, an income support of Rs. 6,000/- per year in three '
                                       'equal installments of Rs. 2,000/- each every four months is provided to all '
                                       'landholding farmer families, subject to certain exclusion criteria relating to '
                                       'higher income brackets. Financial benefits are transferred directly to '
                                       'Aadhaar-seeded bank accounts through Direct Benefit Transfer (DBT).',
                            'section_title': 'Overview & Financial Benefit'},
                        {   'content': 'Eligible beneficiaries are landholding farmer families with cultivable '
                                       "landholding in their names. A 'farmer family' is defined as a family "
                                       'consisting of husband, wife, and minor children. Crucially, only one benefit '
                                       'of Rs. 6,000 per year is granted per farmer family; multiple adult members of '
                                       'the same household cannot draw separate PM-KISAN installments for the same '
                                       'family land holding.',
                            'section_title': 'Eligibility Criteria & Definition of Family'},
                        {   'content': 'The following categories of beneficiaries of higher economic status are '
                                       'ineligible: (a) All Institutional Landholders; (b) Farmer families in which '
                                       'one or more of its members belong to: Former and present holders of '
                                       'constitutional posts, Former and present Ministers, MPs, MLAs, MLCs, Mayors, '
                                       'and Zilla Panchayat Chairpersons; (c) All serving or retired officers and '
                                       'employees of Central/State Government Ministries and PSEs; (d) All '
                                       'superannuated/retired pensioners whose monthly pension is Rs. 10,000/- or '
                                       'more; (e) All persons who paid Income Tax in the last assessment year; (f) '
                                       'Professionals like Doctors, Engineers, Lawyers, Chartered Accountants, and '
                                       'Architects.',
                            'section_title': 'Exclusion Categories'},
                        {   'content': 'Applicants must provide: 1. Aadhaar Card (mandatory); 2. Land ownership record '
                                       'documents (Khatauni, RoR, Jamabandi); 3. Active Bank Account with NPCI Aadhaar '
                                       'Seeding; 4. Aadhaar-linked active Mobile Number for OTP authentication. '
                                       'Completion of e-KYC (via OTP or facial recognition through PM-KISAN mobile '
                                       'app) is mandatory to receive installment payments.',
                            'section_title': 'Required Documents & e-KYC Process'},
                        {   'content': 'Eligible farmers can enroll through: (1) Self-registration at Farmers Corner '
                                       'on https://pmkisan.gov.in; (2) Visiting the nearest Common Service Centre '
                                       '(CSC) with Aadhaar and land record papers; (3) Nodal Agricultural Officers '
                                       'appointed by the State Governments. Verification is conducted by local '
                                       'Patwari/Tehsildar before sanctioning.',
                            'section_title': 'Application Procedure'}],
        'source_url': 'https://pmkisan.gov.in'},
    {   'doc_id': 'doc_pmjay',
        'last_updated': '2026-09-01',
        'scheme_name': 'Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana)',
        'sections': [   {   'content': 'Ayushman Bharat PM-JAY provides health assurance coverage of up to Rs. '
                                       '5,00,000 per family per year for secondary and tertiary care hospitalization. '
                                       'Over 1,949 medical procedures including cardiac surgeries, oncology '
                                       'treatments, orthopedics, neurology, and critical care are covered completely '
                                       'cashless across more than 27,000 empanelled public and private hospitals '
                                       'across India.',
                            'section_title': 'Healthcare Entitlement & Coverage'},
                        {   'content': 'Entitlement is based on deprivation criteria under the Socio-Economic Caste '
                                       'Census (SECC 2011) and updated National Food Security Act (NFSA) ration card '
                                       'databases. There is no restriction on family size, age, or gender; '
                                       'pre-existing conditions are covered from day one of enrollment without waiting '
                                       'period. Recently, all senior citizens aged 70 years and above are also granted '
                                       'a distinct Ayushman Vay Vandana card with Rs. 5 Lakhs top-up coverage '
                                       'regardless of income.',
                            'section_title': 'Eligibility & Beneficiary Identification'},
                        {   'content': 'Citizens can create and download their digital Ayushman PVC Card by '
                                       'presenting: 1. Aadhaar Card; 2. Ration Card / Family Composite ID; 3. Mobile '
                                       'Number. Verification can be performed directly on the Ayushman App, '
                                       'beneficiary.nha.gov.in portal, or at hospital Ayushman Mitra helpdesks.',
                            'section_title': 'Documents & Card Generation (Ayushman Card)'}],
        'source_url': 'https://beneficiary.nha.gov.in'},
    {   'doc_id': 'doc_pmay_g',
        'last_updated': '2026-07-20',
        'scheme_name': 'PMAY-G (Pradhan Mantri Awaas Yojana - Gramin)',
        'sections': [   {   'content': 'PMAY-G aims to provide pucca houses with basic amenities to all houseless '
                                       'households and households living in kutcha and dilapidated houses in rural '
                                       'areas. Financial assistance is Rs. 1,20,000 in plain areas and Rs. 1,30,000 in '
                                       'hilly states (North-Eastern, Himachal Pradesh, Uttarakhand, Jammu & Kashmir). '
                                       'Additional assistance of 90 to 95 days of unskilled labor wages (approx. Rs. '
                                       '20,000 to Rs. 25,000) is provided via MGNREGA.',
                            'section_title': 'Housing Assistance Norms'},
                        {   'content': 'Beneficiaries receive an additional financial grant of Rs. 12,000 for toilet '
                                       'construction under the Swachh Bharat Mission (SBM-G). Houses must have minimum '
                                       'size of 25 square meters including dedicated cooking area, hygienic '
                                       'construction, and smokeless chulha/LPG connection under Ujjwala.',
                            'section_title': 'Mandatory Inclusions & Toilets'},
                        {   'content': 'Selection is validated via Gram Sabha. Geo-tagged photographs of existing '
                                       'kutcha house, foundation stage, plinth level, lintel level, and roof '
                                       'completion are required through the AwaasApp mobile application before '
                                       'consecutive fund tranches are released.',
                            'section_title': 'Verification & Geo-Tagging'}],
        'source_url': 'https://pmayg.nic.in'},
    {   'doc_id': 'doc_pm_ujjwala',
        'last_updated': '2026-06-10',
        'scheme_name': 'Pradhan Mantri Ujjwala Yojana 2.0 (PMUY)',
        'sections': [   {   'content': 'Ujjwala 2.0 provides deposit-free LPG connections to poor adult women who do '
                                       'not possess any LPG connection. The Central Government pays a financial '
                                       'subsidy of Rs. 1,600 per connection covering security deposit of cylinder, '
                                       'regulator, safety hose pipe, domestic gas consumer card, and installation '
                                       'charges. Beneficiaries receive their first 14.2 kg LPG cylinder refill and '
                                       'double-burner hotplate (stove) free of charge.',
                            'section_title': 'Clean Cooking Fuel Grant'},
                        {   'content': 'Under targeted subsidy, Ujjwala beneficiaries receive Rs. 300 direct cash '
                                       'subsidy per 14.2 kg LPG cylinder refill for up to 12 refills per financial '
                                       'year transferred directly to their Aadhaar-linked bank accounts.',
                            'section_title': 'Ongoing Target Refill Subsidy'},
                        {   'content': 'Applicant must be an adult female (aged 18 or above) living in a low-income '
                                       'household (BPL, SC/ST, PMAY beneficiary, Antyodaya Anna Yojana, or 14-point '
                                       'poverty declaration for migrants). No other member of the household should own '
                                       'an active LPG connection.',
                            'section_title': 'Eligibility & Self-Declaration'}],
        'source_url': 'https://www.pmuy.gov.in'},
    {   'doc_id': 'doc_sukanya',
        'last_updated': '2026-09-10',
        'scheme_name': 'Sukanya Samriddhi Yojana (SSY)',
        'sections': [   {   'content': 'Sukanya Samriddhi Account is a government-backed savings scheme launched under '
                                       'Beti Bachao Beti Padhao campaign to secure the future higher education and '
                                       'marriage expenses of girl children. It currently offers a sovereign interest '
                                       'rate of 8.2% per annum, compounded annually, which is among the highest '
                                       'returns available on debt instruments in India.',
                            'section_title': 'Purpose & Sovereign Interest Return'},
                        {   'content': 'An account can be opened in the name of a girl child from her birth up to the '
                                       'age of 10 years by her biological parents or legal guardian. A maximum of two '
                                       'accounts are permitted per family (one for each girl child, except in cases of '
                                       'twins/triplets). The minimum annual deposit is Rs. 250, and the maximum '
                                       'deposit is Rs. 1,50,000 per financial year. Deposits can be made for 15 years '
                                       'from account opening date.',
                            'section_title': 'Account Opening & Deposit Limits'},
                        {   'content': 'The scheme enjoys complete EEE (Exempt-Exempt-Exempt) tax status: deposits '
                                       'qualify for deduction under Section 80C, accrued interest is 100% tax-free, '
                                       'and final maturity withdrawal is completely exempt from income tax. Maturity '
                                       'occurs upon completion of 21 years from opening date or on marriage of the '
                                       'girl child after attaining age 18. Partial withdrawal up to 50% of the balance '
                                       'is permitted after the girl turns 18 for accredited higher education.',
                            'section_title': 'Tax Exemption & Maturity Rules'}],
        'source_url': 'https://www.indiapost.gov.in'},
    {   'doc_id': 'doc_atal_pension',
        'last_updated': '2026-05-15',
        'scheme_name': 'Atal Pension Yojana (APY)',
        'sections': [   {   'content': 'Atal Pension Yojana is a defined-benefit pension scheme administered by '
                                       'Pension Fund Regulatory and Development Authority (PFRDA) for citizens working '
                                       'in the unorganized sector. Subscribers receive a guaranteed minimum monthly '
                                       'pension of Rs. 1,000, Rs. 2,000, Rs. 3,000, Rs. 4,000, or Rs. 5,000 per month '
                                       'from the age of 60 years until demise.',
                            'section_title': 'Guaranteed Retirement Security'},
                        {   'content': 'Open to all Indian citizens aged between 18 and 40 years holding a savings '
                                       'bank account. Contributions vary based on age of entry: an 18-year-old pays '
                                       'only Rs. 210 per month for a Rs. 5,000 monthly pension, whereas a 40-year-old '
                                       'pays Rs. 1,454 per month. Auto-debit facility on savings bank account is '
                                       'mandatory.',
                            'section_title': 'Age Eligibility & Monthly Contribution'},
                        {   'content': 'Upon demise of the subscriber, the same monthly pension amount is guaranteed '
                                       'to the surviving spouse for life. On the death of both subscriber and spouse, '
                                       'the entire accumulated pension wealth corpus (e.g., Rs. 8.5 Lakhs for a Rs. '
                                       '5,000 pension) is returned to the designated nominee.',
                            'section_title': 'Spouse Pension & Nominee Corpus Return'}],
        'source_url': 'https://www.npscra.nsdl.co.in'},
    {   'doc_id': 'doc_vishwakarma',
        'last_updated': '2026-08-01',
        'scheme_name': 'PM Vishwakarma Scheme',
        'sections': [   {   'content': 'PM Vishwakarma provides comprehensive institutional support to traditional '
                                       'artisans and craftspersons who work with hands and tools across 18 '
                                       'family-based traditional trades: Carpenter (Suthar), Boat Maker, Armourer, '
                                       'Blacksmith (Lohar), Hammer & Tool Kit Maker, Locksmith, Sculptor '
                                       '(Moortikar/Stone Carver), Goldsmith (Sonar), Potter (Kumhaar), Cobbler '
                                       '(Charmakar), Mason (Rajmistri), Basket/Mat/Broom Maker, Doll & Toy Maker, '
                                       'Barber (Naai), Garland Maker (Malakaar), Washerman (Dhobi), Tailor (Darzi), '
                                       'and Fishing Net Maker.',
                            'section_title': 'Objective & 18 Eligible Traditional Trades'},
                        {   'content': '1. Recognition: PM Vishwakarma Certificate & Digital ID Card; 2. Skill '
                                       'Upgradation: 5-7 days basic skill training with Rs. 500 per day daily stipend; '
                                       '3. Toolkit Incentive: Rs. 15,000 e-voucher/direct grant to purchase modern, '
                                       'ergonomic equipment; 4. Enterprise Credit Support: Collateral-free enterprise '
                                       'development loans of up to Rs. 1,00,000 (First Tranche with 18 months tenure) '
                                       'and Rs. 2,00,000 (Second Tranche with 30 months tenure) at a highly '
                                       'concessional interest rate of only 5% with government interest subvention of '
                                       '8%.',
                            'section_title': 'Four Pillars of Benefits'},
                        {   'content': 'Applicant must be at least 18 years of age on date of registration and engaged '
                                       'in one of the 18 traditional trades. Only one member of a family can receive '
                                       'benefits. Government employees and active defaults under PMEGP or Mudra loans '
                                       'are excluded. Verification occurs via Gram Panchayat / Urban Local Body, '
                                       'District Implementation Committee, and National Screening Committee.',
                            'section_title': 'Eligibility & Three-Tier Verification'}],
        'source_url': 'https://pmvishwakarma.gov.in'},
    {   'doc_id': 'doc_svanidhi',
        'last_updated': '2026-04-18',
        'scheme_name': "PM SVANidhi (Street Vendor's AtmaNirbhar Nidhi)",
        'sections': [   {   'content': 'PM SVANidhi is a Central Sector Scheme launched by Ministry of Housing and '
                                       'Urban Affairs to facilitate working capital loans to urban street vendors '
                                       'whose livelihoods were impacted. Vendors can access affordable collateral-free '
                                       'loans in three progressive tranches: Tranche 1: Rs. 10,000 (tenure 1 year); '
                                       'Tranche 2: Rs. 20,000 (tenure 1.5 years) upon timely repayment of first '
                                       'tranche; Tranche 3: Rs. 50,000 (tenure 3 years).',
                            'section_title': 'Micro-Credit Facility for Urban Vendors'},
                        {   'content': 'On timely or early repayment of the loan, an interest subsidy of 7% per annum '
                                       "is credited directly to the vendor's bank account on a quarterly basis. "
                                       'Furthermore, vendors earn digital cashbacks ranging from Rs. 50 to Rs. 100 per '
                                       'month (up to Rs. 1,200 annually) for conducting digital sales and receipts '
                                       'using QR codes.',
                            'section_title': 'Interest Subsidy & Digital Cashback Incentives'},
                        {   'content': 'Vendors must hold a Certificate of Vending (CoV) or Identity Card issued by '
                                       'Urban Local Bodies (ULBs), or a Letter of Recommendation (LoR) issued by the '
                                       'Town Vending Committee (TVC), along with Aadhaar card and active bank account.',
                            'section_title': 'Required Identification Documents'}],
        'source_url': 'https://pmsvanidhi.mohua.gov.in'},
    {   'doc_id': 'doc_post_matric',
        'last_updated': '2026-07-12',
        'scheme_name': 'Post-Matric Scholarship for SC/ST/OBC Students',
        'sections': [   {   'content': 'Provides financial assistance to Scheduled Caste (SC), Scheduled Tribe (ST), '
                                       'and Other Backward Classes (OBC) students studying at post-matriculation or '
                                       'post-secondary stage (Classes 11 and 12, ITI, Polytechnic, Diploma, '
                                       'Undergraduate BA/BSc/BCom, Engineering, Medicine, Postgraduate MA/MSc, and '
                                       'PhD) in government or government-recognized educational institutions.',
                            'section_title': 'Scope & Educational Levels Covered'},
                        {   'content': 'The scholarship covers: 1. Compulsory non-refundable tuition and examination '
                                       'fees paid directly to the institution or via student DBT; 2. Monthly '
                                       'maintenance allowance (up to Rs. 13,500 per year for hostellers and Rs. 7,000 '
                                       'for day scholars in professional Group 1 courses). Eligibility requires that '
                                       'total annual family income from all sources does not exceed Rs. 2,50,000 per '
                                       'annum.',
                            'section_title': 'Funding Components & Income Ceiling'},
                        {   'content': 'Applications must be submitted online on the National Scholarship Portal '
                                       '(scholarships.gov.in) with: 1. Aadhaar Card (linked to bank account for DBT); '
                                       '2. Digitally verifiable Caste Certificate; 3. Current year Income Certificate '
                                       'issued by Revenue Authority; 4. Previous qualifying examination marksheet; 5. '
                                       'Fee receipt and Institution verification.',
                            'section_title': 'Application Protocol via National Scholarship Portal'}],
        'source_url': 'https://scholarships.gov.in'},
    {   'doc_id': 'doc_mudra',
        'last_updated': '2026-08-20',
        'scheme_name': 'PM Mudra Yojana (PMMY)',
        'sections': [   {   'content': 'Pradhan Mantri Mudra Yojana provides institutional collateral-free micro '
                                       'enterprise credit up to Rs. 10 Lakhs through Commercial Banks, RRBs, Small '
                                       'Finance Banks, MFIs, and NBFCs. Loans are categorized into three segments: 1. '
                                       'Shishu: Covering loans up to Rs. 50,000 (ideal for starters, cart pullers, '
                                       'home enterprises); 2. Kishore: Loans above Rs. 50,000 and up to Rs. 5,00,000 '
                                       '(for business equipment purchase); 3. Tarun: Loans above Rs. 5,00,000 and up '
                                       'to Rs. 10,00,000 (expansion of established units).',
                            'section_title': 'Three Tier Loan Categories'},
                        {   'content': 'No collateral or third-party security is required. No processing fees are '
                                       'charged for Shishu loans. Borrowers are issued a RuPay Mudra Debit Card with a '
                                       'pre-approved cash credit limit, allowing flexible digital withdrawals and '
                                       'repayments at any ATM or POS device to reduce interest outgo.',
                            'section_title': 'Zero Collateral & Mudra Card'}],
        'source_url': 'https://www.udyamimitra.in'},
    {   'doc_id': 'doc_surya_ghar',
        'last_updated': '2026-09-25',
        'scheme_name': 'PM Surya Ghar: Muft Bijli Yojana',
        'sections': [   {   'content': 'PM Surya Ghar: Muft Bijli Yojana aims to illuminate 1 crore households with '
                                       'free clean solar energy. The Central Government provides direct financial '
                                       'subsidy: Rs. 33,000 for 1 kW systems, Rs. 66,000 for 2 kW systems, and Rs. '
                                       '78,000 for 3 kW and higher systems. A 3 kW rooftop solar system generates '
                                       'approx. 300 units of electricity per month, saving Rs. 15,000 to Rs. 20,000 in '
                                       'annual electricity bills.',
                            'section_title': 'Rooftop Solar Subsidy Norms'},
                        {   'content': 'Beneficiaries can finance the remaining installation cost through '
                                       'collateral-free loans at repo rate + 0.5% (approx. 7% per annum) from public '
                                       'sector banks with minimal documentation. Net-metering enables selling surplus '
                                       'electricity back to the local power DISCOM.',
                            'section_title': 'Concessional Bank Financing'}],
        'source_url': 'https://pmsuryaghar.gov.in'},
    {   'doc_id': 'doc_smam',
        'last_updated': '2026-10-15',
        'scheme_name': 'SMAM Agricultural Machinery Subsidy',
        'sections': [   {   'content': 'Under Sub-Mission on Agricultural Mechanization (SMAM) monitored via Kisan '
                                       'Suvidha (kisansuvidha.gov.in) and DA&FW (agricoop.gov.in), farmers receive 40% '
                                       'to 50% capital subsidy on tractors, power tillers, rotavators, combine '
                                       'harvesters, and laser land levellers. Small, marginal, SC/ST, and women '
                                       'farmers are entitled to 50% financial assistance up to Rs. 1,00,000 for '
                                       'purchasing approved farm equipment.',
                            'section_title': 'Farm Machinery & Tractor Capital Subsidy'},
                        {   'content': 'Rural entrepreneurs, farmer producer organizations (FPOs), and village '
                                       'cooperative societies can avail up to 40% capital subsidy (maximum Rs. 10 '
                                       'Lakhs) for establishing Custom Hiring Centers to rent farm machinery at '
                                       'affordable rates to neighboring marginal cultivators.',
                            'section_title': 'Custom Hiring Centers (CHC)'}],
        'source_url': 'https://kisansuvidha.gov.in'},
    {   'doc_id': 'doc_uk_swarojgar',
        'last_updated': '2026-10-10',
        'scheme_name': 'Uttarakhand Mukhyamantri Swarojgar Yojana (MSY)',
        'sections': [   {   'content': 'Administered through Uttarakhand State e-District portal Apuni Sarkar '
                                       '(eservices.uk.gov.in), MSY promotes self-employment in manufacturing and '
                                       'service sectors. Maximum project cost is Rs. 25 Lakhs for manufacturing and '
                                       'Rs. 10 Lakhs for services. The Uttarakhand state government provides 15% to '
                                       "25% margin money subsidy directly into the beneficiary's loan account.",
                            'section_title': 'Project Loan & Margin Money Subsidy'},
                        {   'content': 'Eligible applicants must be permanent residents / domiciles of Uttarakhand '
                                       'aged 18 to 65 years. No formal educational qualifications are mandated. '
                                       'Applications must be routed digitally through the Apuni Sarkar or MSY portal '
                                       'with Aadhaar, Mool Niwas domicile certificate, project summary (DPR), and bank '
                                       'account details.',
                            'section_title': 'Domicile & Application Guidelines'}],
        'source_url': 'https://eservices.uk.gov.in'},
    {   'doc_id': 'doc_aicte_pragati',
        'last_updated': '2026-10-01',
        'scheme_name': 'AICTE Pragati Scholarship for Girls',
        'sections': [   {   'content': 'Verified on National Scholarship Portal (scholarships.gov.in), AICTE Pragati '
                                       'offers Rs. 50,000 per annum for female students admitted to 1st year Degree or '
                                       'Diploma engineering courses in AICTE-recognized institutions. The grant covers '
                                       'tuition reimbursement, laptops/desktops, stationery, books, and software '
                                       'licenses.',
                            'section_title': 'Technical Education Financial Award'},
                        {   'content': 'Family income ceiling is Rs. 8,00,000 per annum. A maximum of two girls per '
                                       'family can be awarded. Candidates must possess Aadhaar-seeded active bank '
                                       'accounts with Direct Benefit Transfer (DBT) verification on the NSP portal.',
                            'section_title': 'Merit & Income Ceiling'}],
        'source_url': 'https://scholarships.gov.in'},
    {   'doc_id': 'doc_hdfc_ecss',
        'last_updated': '2026-10-18',
        'scheme_name': 'HDFC Bank Parivartan ECSS Scholarship',
        'sections': [   {   'content': 'Tracked via Buddy4Study (buddy4study.com) and HDFC Bank Parivartan, the '
                                       'Educational Crisis Support Scholarship (ECSS) provides up to Rs. 75,000 annual '
                                       'scholarship to meritorious school, college, and university students facing '
                                       'financial crises such as loss of earning parent, major medical emergency, or '
                                       'severe economic distress.',
                            'section_title': 'Corporate CSR Educational Crisis Support'},
                        {   'content': 'Applicants must be enrolled from Class 1 to Post-Graduation in recognized '
                                       'institutions and have secured at least 55% marks in their previous annual '
                                       'exam. Annual family income must not exceed Rs. 2,50,000 per annum.',
                            'section_title': 'Eligibility & Selection Criteria'}],
        'source_url': 'https://www.buddy4study.com'},
    {   'doc_id': 'doc_vidyasaarathi',
        'last_updated': '2026-10-12',
        'scheme_name': 'NSDL Vidyasaarathi CSR Education Grant',
        'sections': [   {   'content': 'Hosted by NSDL e-Governance on Vidyasaarathi (vidyasaarathi.co.in), this '
                                       'portal connects corporate CSR foundations (such as ACC, JSW, Tata Steel) with '
                                       'low-income students. Awards range from Rs. 20,000 to Rs. 50,000 per academic '
                                       'year for professional degree, diploma, and undergraduate students.',
                            'section_title': 'Corporate Scholarship Disbursement'},
                        {   'content': 'Students apply directly on vidyasaarathi.co.in by uploading Class 10/12 '
                                       'marksheets (minimum 60% marks), verified college fee structure, Tehsildar '
                                       'income certificate (under Rs. 5 Lakhs), and bank account passbook.',
                            'section_title': 'Documentation & Portal Application'}],
        'source_url': 'https://www.vidyasaarathi.co.in'},
    {   'doc_id': 'doc_uk_gaura_devi',
        'last_updated': '2026-10-15',
        'scheme_name': 'Uttarakhand Gaura Devi Kanya Dhan Yojana',
        'sections': [   {   'content': 'Administered by Uttarakhand Department of Women Welfare & Child Development, '
                                       'Gaura Devi Kanya Dhan provides a one-time financial grant of Rs. 51,000 to '
                                       'eligible girl students upon passing Class 12. The funds are placed as a '
                                       "sovereign fixed deposit in the girl's name and can be used for higher college "
                                       'education, vocational training, or self-reliance.',
                            'section_title': 'Financial Award for Girl Education'},
                        {   'content': '1. Applicant must be a permanent resident (Mool Niwas) of Uttarakhand; 2. Must '
                                       'belong to SC, ST, OBC, or General category BPL/EWS household; 3. Must have '
                                       'passed Class 12 from a school recognized by Uttarakhand Board, CBSE, or ICSE '
                                       'located within Uttarakhand state; 4. Annual family income must not exceed the '
                                       'prescribed state BPL limit (under Rs. 72,000 per year or as per latest rural '
                                       'development norms).',
                            'section_title': 'Eligibility Criteria & Domicile'},
                        {   'content': 'Documents required: (1) Class 12 Marksheet & Passing Certificate; (2) '
                                       'Domicile/Mool Niwas Certificate; (3) Valid BPL Ration Card or Tehsildar Income '
                                       'Certificate; (4) Caste Certificate (for SC/ST/OBC); (5) Bank Passbook linked '
                                       "to the girl student's own Aadhaar card. Apply online on Uttarakhand Apuni "
                                       'Sarkar portal (eservices.uk.gov.in) or submit via District Social Welfare '
                                       'Office.',
                            'section_title': 'Required Documents & Application Steps'}],
        'source_url': 'https://eservices.uk.gov.in'},
    {   'doc_id': 'doc_uk_solar_swarojgar',
        'last_updated': '2026-09-20',
        'scheme_name': 'Uttarakhand Solar Swarojgar Yojana',
        'sections': [   {   'content': 'Uttarakhand Renewable Energy Development Agency (UREDA) facilitates the setup '
                                       'of 20 kW and 25 kW small-scale grid-connected solar power projects on barren, '
                                       'hilly, or unused lands. The Uttarakhand Power Corporation Limited (UPCL) '
                                       'guarantees purchase of 100% generated electricity through a 25-year Power '
                                       'Purchase Agreement (PPA) at a remunerative tariff, providing steady monthly '
                                       'income (Rs. 15,000 to Rs. 25,000/month) to rural youth.',
                            'section_title': 'Clean Energy Self-Employment Norms'},
                        {   'content': 'Beneficiary pays only 15% margin money. Cooperative/commercial banks provide '
                                       '70% loan, and the Uttarakhand Government provides up to 15% to 25% capital '
                                       'subsidy. Eligible applicants must be Uttarakhand permanent residents aged 18 '
                                       'or older with valid land documents.',
                            'section_title': 'Financing & Capital Subsidy'}],
        'source_url': 'https://ureda.uk.gov.in'},
    {   'doc_id': 'doc_uk_pensions',
        'last_updated': '2026-10-20',
        'scheme_name': 'Uttarakhand Social Welfare Pensions (Old Age, Widow, Disability)',
        'sections': [   {   'content': 'The Social Welfare Department of Uttarakhand provides a monthly financial '
                                       'pension of Rs. 1,500 directly transferred quarterly via DBT to eligible '
                                       'citizens across three core streams: 1. Vridhavastha (Old Age) Pension for '
                                       'citizens aged 60 and above belonging to BPL families or with annual income '
                                       'under Rs. 48,000; 2. Vidhwa (Widow) Pension for destitute widows aged 18 and '
                                       'above; 3. Divyang (Disability) Pension for persons having 40% or higher '
                                       'certified disability.',
                            'section_title': 'Monthly Pension Assistance Norms'},
                        {   'content': 'Required: Aadhaar Card, Age proof / Parivar Register copy, BPL Card or Income '
                                       'certificate, Disability Certificate (for Divyang), Death Certificate of '
                                       'husband (for Widow), and Aadhaar-seeded Bank Account. Apply online on Social '
                                       'Security Portal (ssp.uk.gov.in), Apuni Sarkar (eservices.uk.gov.in), or '
                                       'nearest CSC center.',
                            'section_title': 'Documents & Application via Apuni Sarkar'}],
        'source_url': 'https://ssp.uk.gov.in'},
    {   'doc_id': 'doc_pmfby',
        'last_updated': '2026-08-30',
        'scheme_name': 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
        'sections': [   {   'content': 'PMFBY provides comprehensive insurance protection for notified food crops, '
                                       'oilseeds, and annual commercial/horticultural crops against non-preventable '
                                       'natural risks: prevented sowing/planting, standing crop loss (drought, dry '
                                       'spells, flood, pest attack, natural fire), post-harvest losses, and localized '
                                       'calamities (hailstorm, landslide, cloudburst).',
                            'section_title': 'Comprehensive Crop Loss Insurance Coverage'},
                        {   'content': 'Farmers pay an extremely affordable uniform premium: only 2.0% of sum insured '
                                       'for all Kharif food & oilseed crops, only 1.5% for all Rabi crops, and only 5% '
                                       'for annual commercial/horticultural crops. The entire remainder of actuarial '
                                       'premium is subsidized equally by Central and State Governments. Claims are '
                                       "settled directly to the farmer's Aadhaar-linked bank account based on remote "
                                       'sensing, satellite data, and Crop Cutting Experiments (CCEs).',
                            'section_title': 'Low Farmer Premium & Claim Settlement'},
                        {   'content': '1. Land Revenue records (Khasra/Khatauni/RoR) or Tenancy agreement/Sowing '
                                       'certificate; 2. Aadhaar Card; 3. Bank Passbook copy. Farmers can enroll online '
                                       'on pmfby.gov.in, Crop Insurance App, nearest bank branch, or via Village CSC '
                                       'Jan Seva Kendra.',
                            'section_title': 'Required Documents & Enrollment Process'}],
        'source_url': 'https://pmfby.gov.in'},
    {   'doc_id': 'doc_mgnrega',
        'last_updated': '2026-07-25',
        'scheme_name': 'MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act)',
        'sections': [   {   'content': 'MGNREGA legally guarantees at least 100 days of unskilled wage employment in '
                                       'every financial year to every rural household whose adult members volunteer to '
                                       'do manual work. Works include water conservation, pond deepening, rural road '
                                       'construction, tree plantation, land leveling, and PMAY-G house construction.',
                            'section_title': 'Guaranteed 100 Days Rural Employment'},
                        {   'content': 'Wages are revised annually by Ministry of Rural Development and disbursed '
                                       'directly into Aadhaar-seeded bank/post office accounts via National Electronic '
                                       'Fund Management System (NeFMS). Every rural household is entitled to a free '
                                       'MGNREGA Job Card issued by the local Gram Panchayat within 15 days of '
                                       'application.',
                            'section_title': 'Daily Wages & Job Card Process'}],
        'source_url': 'https://nrega.nic.in'},
    {   'doc_id': 'doc_nsap_pensions',
        'last_updated': '2026-09-15',
        'scheme_name': 'National Social Assistance Programme (NSAP Central Pensions)',
        'sections': [   {   'content': 'NSAP provides central social security assistance to destitute and BPL '
                                       'households across India through three flagship DBT schemes: 1. Indira Gandhi '
                                       'National Old Age Pension Scheme (IGNOAPS): Monthly pension for citizens aged '
                                       '60 and above living below poverty line; 2. Indira Gandhi National Widow '
                                       'Pension Scheme (IGNWPS): Monthly pension for BPL widows aged 40 to 79 years; '
                                       '3. Indira Gandhi National Disability Pension Scheme (IGNDPS): Monthly pension '
                                       'for BPL individuals aged 18 to 79 with 80% severe or multiple disability.',
                            'section_title': 'National Social Assistance Coverage'},
                        {   'content': 'Most state governments (including Uttarakhand, UP, Maharashtra, Rajasthan) add '
                                       'substantial state top-ups (raising effective monthly pension to Rs. 1,000 - '
                                       'Rs. 1,500/month). Applications are verified by Block Development Officers '
                                       '(BDO) / Urban Local Bodies and can be tracked online on nsap.nic.in.',
                            'section_title': 'State Top-Ups & Direct Application'}],
        'source_url': 'https://nsap.nic.in'},
    {   'doc_id': 'doc_lakhpati_didi',
        'last_updated': '2026-09-05',
        'scheme_name': 'Lakhpati Didi Scheme & Women SHG Enterprise Assistance',
        'sections': [   {   'content': 'Lakhpati Didi is a flagship mission under Deendayal Antyodaya Yojana - '
                                       'National Rural Livelihoods Mission (DAY-NRLM) aimed at enabling 3 crore women '
                                       'belonging to Self Help Groups (SHGs) to earn a sustainable minimum income of '
                                       'Rs. 1,00,000 per year. Benefits include training in high-value skills (LED '
                                       'bulb making, solar panel repair, drone piloting via Drone Didi, organic '
                                       'farming, food processing), digital literacy, and bank linkages.',
                            'section_title': 'Empowering Rural Women to Earn Rs. 1 Lakh+ Annually'},
                        {   'content': 'SHG women receive access to Community Investment Funds, revolving funds, and '
                                       'collateral-free enterprise loans up to Rs. 10 Lakhs (and up to Rs. 20 Lakhs '
                                       'for eligible groups) at subsidized interest rates of 7% per annum under '
                                       'government interest subvention.',
                            'section_title': 'Financial Support & Zero-Collateral Loans'}],
        'source_url': 'https://nrlm.gov.in'},
    {   'doc_id': 'doc_application_status_guide',
        'last_updated': '2026-10-25',
        'scheme_name': 'How to Check Government Scheme Application Status & DBT Verification',
        'sections': [   {   'content': 'Citizens can track their application approval and installment disbursement '
                                       'status across official portals:\n'
                                       '\n'
                                       "1. PM-KISAN Status: Visit https://pmkisan.gov.in -> Click 'Know Your Status' "
                                       'on Farmers Corner -> Enter your Registration Number or Aadhaar Number -> View '
                                       'installment credit date, e-KYC status, and Land Seeding status.\n'
                                       '\n'
                                       '2. National Scholarship Portal (NSP) Status: Visit https://scholarships.gov.in '
                                       "-> Click 'Previous Year / Fresh Application Login' -> Enter Application ID & "
                                       'Password -> Track verification at Institute, District Nodal Officer, and State '
                                       'Nodal Officer levels.\n'
                                       '\n'
                                       '3. Ayushman Bharat Card Status: Open https://beneficiary.nha.gov.in or '
                                       'Ayushman App -> Enter Mobile Number and OTP -> Search by Aadhaar or Family ID '
                                       '-> Check if e-KYC is approved and download PVC card.\n'
                                       '\n'
                                       "4. PMAY Housing Status: Visit https://pmayg.nic.in -> Click 'Stakeholders' -> "
                                       "Select 'IAY/PMAYG Beneficiary' -> Enter Registration Number to track "
                                       'inspection stages, sanction order, and fund release.\n'
                                       '\n'
                                       "5. PFMS Central DBT Tracker: Visit https://pfms.nic.in -> Click 'Know Your "
                                       "Payments' -> Enter Bank Name and Account Number -> View all direct central and "
                                       'state welfare subsidies credited to your account.\n'
                                       '\n'
                                       '6. State Schemes (Uttarakhand Apuni Sarkar): Visit https://eservices.uk.gov.in '
                                       "-> Enter Application Reference Number in 'Track Application' to see Tehsildar "
                                       'or BDO approval status.',
                            'section_title': 'Step-by-Step Status Tracking for Major Schemes'},
                        {   'content': 'Top reasons for delayed or rejected scheme benefits:\n'
                                       '- NPCI Aadhaar Mapping Incomplete: Visit your bank branch and submit the '
                                       "'Aadhaar DBT Seeding Mandate' form so government funds can be received.\n"
                                       '- Name Mismatch: Ensure your name on Aadhaar matches your land record or '
                                       'marksheet precisely.\n'
                                       '- Pending e-KYC: Complete biometric or OTP-based e-KYC on the respective '
                                       'portal or at your local CSC center.\n'
                                       '- Helpline Assistance: Call toll-free national welfare helplines: PM-KISAN '
                                       '(155261 / 1800115526), Ayushman Bharat (14555), National Scholarship '
                                       '(0120-6619540), or Uttarakhand Citizen CM Helpline (1905).',
                            'section_title': 'Resolving Common Application Issues & Rejections'}],
        'source_url': 'https://dbtbharat.gov.in'},
    {   'doc_id': 'doc_women_schemes_guide',
        'last_updated': '2026-10-28',
        'scheme_name': 'Government Welfare Schemes for Women & Girls',
        'sections': [   {   'content': 'Government of India and State Governments provide targeted welfare schemes for '
                                       'women across every life stage:\n'
                                       '\n'
                                       '1. Childhood & Girl Child Savings: Sukanya Samriddhi Yojana (SSY) offers '
                                       'sovereign 8.2% annual tax-free interest for girls under 10 years.\n'
                                       '\n'
                                       '2. Higher Education & Scholarships: AICTE Pragati Scholarship provides Rs. '
                                       '50,000/year for girls in engineering/diploma; Uttarakhand Gaura Devi Kanya '
                                       'Dhan provides Rs. 51,000 for Class 12 pass girls.\n'
                                       '\n'
                                       '3. Maternity & Healthcare: Pradhan Mantri Matru Vandana Yojana (PMMVY) '
                                       'provides Rs. 5,000 cash incentive for first child and Rs. 6,000 for second '
                                       'girl child; Janani Suraksha Yojana provides institutional delivery cash '
                                       'grants; Ayushman Bharat gives Rs. 5 Lakhs cashless hospital coverage.\n'
                                       '\n'
                                       '4. Clean Fuel & Housing: PM Ujjwala 2.0 provides deposit-free LPG gas '
                                       'connections + free stove + Rs. 300 refill subsidy; PMAY houses are registered '
                                       'mandatorily in the name of the female head of the family.\n'
                                       '\n'
                                       '5. Livelihood & Entrepreneurship: Lakhpati Didi & NRLM provide collateral-free '
                                       'SHG loans up to Rs. 10 Lakhs; PM Mudra provides loans up to Rs. 10 Lakhs for '
                                       'women-owned enterprises; Stand-Up India provides bank loans from Rs. 10 Lakh '
                                       'to Rs. 1 Crore for women entrepreneurs.',
                            'section_title': 'Complete Directory of Welfare Benefits for Women'}],
        'source_url': 'https://www.myscheme.gov.in'},
    {   'doc_id': 'doc_student_scholarships_guide',
        'last_updated': '2026-10-28',
        'scheme_name': 'Government Schemes & Scholarships for Students',
        'sections': [   {   'content': 'Students across India can access extensive government and CSR financial aid:\n'
                                       '\n'
                                       '1. National Scholarship Portal (NSP - scholarships.gov.in): Central hub for '
                                       'Pre-Matric (Classes 9-10) and Post-Matric (Classes 11, 12, Degree, Diploma, '
                                       'Engineering, Medical, PG, PhD) scholarships for SC, ST, OBC, EWS, and Minority '
                                       'students, covering 100% tuition fees + maintenance stipend up to Rs. '
                                       '13,500/year.\n'
                                       '\n'
                                       '2. AICTE Pragati & Saksham Scholarships: Rs. 50,000/year for female and '
                                       'differently-abled students pursuing degree/diploma technical courses.\n'
                                       '\n'
                                       '3. Higher Education & Corporate CSR Grants: HDFC Parivartan ECSS (up to Rs. '
                                       '75,000/year for students in financial distress) and NSDL Vidyasaarathi (Rs. '
                                       '20,000 to Rs. 50,000/year for undergraduate/professional education).\n'
                                       '\n'
                                       '4. Documents Checklist: Aadhaar Card (Aadhaar-seeded bank account), previous '
                                       'year marksheet with at least 50%-60% marks, digital Caste Certificate, current '
                                       'income certificate (annual family income under Rs. 2.5 Lakhs), Bonafide '
                                       'student certificate from institution, and fee receipts.',
                            'section_title': 'Complete Directory of Scholarships for School & College Students'}],
        'source_url': 'https://scholarships.gov.in'},
    {   'doc_id': 'doc_farmer_schemes_guide',
        'last_updated': '2026-10-28',
        'scheme_name': 'Government Schemes & Assistance for Farmers',
        'sections': [   {   'content': 'Comprehensive welfare and financial assistance package available to '
                                       'agricultural families:\n'
                                       '\n'
                                       '1. Direct Income Support: PM-KISAN transfers Rs. 6,000 annually in 3 '
                                       'installments of Rs. 2,000 directly to farmer bank accounts.\n'
                                       '\n'
                                       '2. Crop Insurance: Pradhan Mantri Fasal Bima Yojana (PMFBY) covers crop '
                                       'damages from drought, floods, pests, and hailstorms with minimal 1.5% to 2% '
                                       'farmer premium.\n'
                                       '\n'
                                       '3. Farm Machinery & Equipment: SMAM scheme provides 40% to 50% capital subsidy '
                                       '(up to Rs. 1 Lakh for small/marginal/women farmers) on tractors, rotavators, '
                                       'power tillers, and laser levellers via kisansuvidha.gov.in.\n'
                                       '\n'
                                       '4. Affordable Credit: Kisan Credit Card (KCC) grants collateral-free crop '
                                       'production loans up to Rs. 1.6 Lakhs (and up to Rs. 3 Lakhs with land '
                                       'hypothecation) at an effective interest rate of only 4% per annum upon prompt '
                                       'repayment.\n'
                                       '\n'
                                       '5. Solar Irrigation Pumps: PM-KUSUM provides 60% capital subsidy to install '
                                       'solar water pumps and solarize existing grid pumps.\n'
                                       '\n'
                                       '6. Micro-Irrigation: PM Krishi Sinchayee Yojana (Per Drop More Crop) provides '
                                       '45% to 55% subsidy for installing Drip and Sprinkler irrigation systems.',
                            'section_title': 'Complete Directory of Assistance for Farmers & Cultivators'}],
        'source_url': 'https://agricoop.gov.in'},
    {   'doc_id': 'doc_csc_application_guide',
        'last_updated': '2026-10-28',
        'scheme_name': 'How to Apply for Government Schemes via Common Service Centres (CSC)',
        'sections': [   {   'content': 'Citizens without smart devices, scanner apps, or internet connectivity can '
                                       'visit their nearest Common Service Centre (CSC / Jan Seva Kendra / Grahak Seva '
                                       'Kendra) located in every Gram Panchayat and ward. Authorized Village Level '
                                       'Entrepreneurs (VLEs) assist with:\n'
                                       '\n'
                                       '1. Biometric e-KYC for PM-KISAN, Ayushman Bharat, and Pensions.\n'
                                       '2. Digital certificate issuance: Domicile (Mool Niwas), Caste (Jati Praman '
                                       'Patra), and Income certificates.\n'
                                       '3. Online application submission for scholarships (NSP), PMAY houses, Ujjwala '
                                       'gas connections, and Mudra loans.\n'
                                       '4. Printing official plastic/PVC cards: Ayushman Health Cards, Aadhaar Cards, '
                                       'PAN Cards, and E-Shram Cards.\n'
                                       '5. Direct Benefit Transfer (DBT) verification and cash withdrawals through '
                                       'Aadhaar Enabled Payment System (AePS).',
                            'section_title': 'Village-Level Digital Service Access'}],
        'source_url': 'https://digitalseva.csc.gov.in'}]
