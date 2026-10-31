export type Language = 
  | "en" 
  | "hi" 
  | "bn" 
  | "te" 
  | "mr" 
  | "ta" 
  | "gu" 
  | "kn" 
  | "ml" 
  | "pa" 
  | "or" 
  | "as";

export interface TranslationDictionary {
  portalTitle: string;
  portalSubtitle: string;
  navHome: string;
  navSchemes: string;
  navChat: string;
  navVoice: string;
  navFamily: string;
  navProfile: string;
  navLogin: string;
  navSignup: string;
  navGetStarted: string;
  navEligibility: string;

  // Hero Section
  heroHeadlineMain: string;
  heroHeadlineHighlight: string;
  heroSubheadline: string;
  searchPlaceholder: string;
  searchButton: string;
  filterByLabel: string;
  catAll: string;
  catWelfare: string;
  catAgriculture: string;
  catScholarship: string;
  catHousing: string;
  catHealth: string;
  catEmployment: string;
  catMore: string;
  speechBubble: string;
  featMultipleSchemes: string;
  featCheckEligibility: string;
  featMultilingual: string;
  popularSchemesTitle: string;
  popularSchemesSubtitle: string;
  viewAllSchemes: string;
  checkEligibilityBtn: string;

  // Schemes Directory
  directorySearchPlaceholder: string;
  directoryFilterBy: string;
  noSchemesFound: string;
  resetFilters: string;
  perYear: string;
  checkEligibilityArrow: string;

  // Detail Modal
  detailedInfoTitle: string;
  lastDateApply: string;
  benefitsInclude: string;
  amIEligibleTitle: string;
  amIEligibleSubtitle: string;
  familySummaryTitle: string;
  labelFarmerName: string;
  labelFamilyMembers: string;
  labelLandHolding: string;
  labelBankAccount: string;
  membersUnit: string;
  criteriaTitle: string;
  documentsTitle: string;
  applicationProcessTitle: string;
  applicationLinkText: string;
  youAreEligibleTitle: string;
  youWillReceiveSubtitle: string;
  nextInstallmentLabel: string;
  viewDetailsBtn: string;
  goToDashboardBtn: string;
  cscAdvisoryNote: string;

  // Eligibility Wizard
  modeSingle: string;
  modeFamily: string;
  addFamilyMember: string;
  removeMember: string;
  evaluateBtn: string;
  evaluatingBtn: string;

  // Results Dashboard
  totalAnnualBenefit: string;
  eligibleSchemesCount: string;
  nearMissCount: string;
  whyEligible: string;
  nearMissHeadline: string;
  nearMissExplanation: string;
  actionableTip: string;
  documentsChecklist: string;
  officialApplyBtn: string;
  mutualExclusionNotice: string;

  // AI Chat & Voice
  chatPlaceholder: string;
  chatVoiceInput: string;
  chatListening: string;
  sourceCitations: string;
  chatDisclaimer: string;

  // AI Assistant Page Features
  aiHeroTitle: string;
  aiHeroSubtitle: string;
  cardAnalyzeDocs: string;
  cardVerifyScreenshots: string;
  cardCheckForwarded: string;
  cardAmIEligible: string;
  cardExploreMore: string;
  chatInputPlaceholder: string;
  forwardModalTitle: string;
  forwardModalSubtitle: string;
  forwardModalPlaceholder: string;
  verifyMessageBtn: string;
  cancelBtn: string;

  // Voice Assistant Page
  voiceTitle: string;
  voiceSubtitle: string;
  voiceSpeakBtn: string;
  voiceListeningBtn: string;
  voicePlayVoice: string;
  voiceStop: string;
  voiceInputPlaceholder: string;
  voiceAskBtn: string;
  quickQuestionsLabel: string;

  // Family Members Page
  familyTitle: string;
  addMemberBtn: string;
  accountHolderBadge: string;
  personalInfoTitle: string;
  familyDetailsTitle: string;
  eligibleSchemesTitle: string;
  nearMissSchemesTitle: string;
  potentialBenefitTitle: string;
  ageLabel: string;
  genderLabel: string;
  occupationLabel: string;
  casteLabel: string;
  stateLabel: string;
  annualIncomeLabel: string;
  relationLabel: string;
  yearsUnit: string;
  editProfileBtn: string;
  deleteBtn: string;
  backToFamilyBtn: string;
  viewAllBtn: string;

  // User Profile & Document Locker Page
  profileTitle: string;
  profileSubtitle: string;
  smsVerifiedBadge: string;
  docsLockerTitle: string;
  docsLockerSubtitle: string;
  aadhaarCardLabel: string;
  panCardLabel: string;
  studentIdLabel: string;
  rationCardLabel: string;
  uploadBtn: string;
  updateBtn: string;
  notUploadedYet: string;
  editProfileTitle: string;
  saveChangesBtn: string;

  // Scam Detector
  scamHeading: string;
  scamSubheading: string;
  scamTrySample1: string;
  scamTrySample2: string;
  scamPlaceholder: string;
  scamVerifyBtn: string;
  scamVerifyingBtn: string;
  scamThreatMeter: string;

  // Footer
  footerTagline: string;
  footerDescription: string;
  footerQuickLinks: string;
  footerSupport: string;
  footerAbout: string;
  footerHowItWorks: string;
  footerContact: string;
  footerFaqs: string;
  footerPrivacy: string;
  footerDisclaimerTitle: string;
  footerDisclaimerText: string;
  footerCopyright: string;
  footerMadeWith: string;
}

const en: TranslationDictionary = {
  portalTitle: "Yojana Sahayak",
  portalSubtitle: "Sahi Yojana, Aapka Sahi Saath",
  navHome: "Home",
  navSchemes: "Explore Schemes",
  navChat: "AI Assistant",
  navVoice: "Voice Assistant",
  navFamily: "Family Members",
  navProfile: "My Profile",
  navLogin: "Login",
  navSignup: "Sign Up",
  navGetStarted: "Get Started",
  navEligibility: "Check Eligibility",

  heroHeadlineMain: "Find the Right Government Schemes for a ",
  heroHeadlineHighlight: "Better Tomorrow",
  heroSubheadline: "Yojana Sahayak helps you discover eligible government schemes, check your benefits, and get personalized guidance — in your language.",
  searchPlaceholder: "Search schemes (e.g., PM Kisan, Scholarship, Housing...)",
  searchButton: "Search",
  filterByLabel: "Filter by:",
  catAll: "All",
  catWelfare: "Welfare",
  catAgriculture: "Agriculture",
  catScholarship: "Scholarship",
  catHousing: "Housing",
  catHealth: "Health",
  catEmployment: "Employment",
  catMore: "More",
  speechBubble: "Sahi Yojana, Sahi Fayda!",
  featMultipleSchemes: "Multiple Schemes in One Place",
  featCheckEligibility: "Check Eligibility in Minutes",
  featMultilingual: "Multilingual Support (12+ Languages)",
  popularSchemesTitle: "Popular Schemes",
  popularSchemesSubtitle: "Explore some of the most accessed government schemes",
  viewAllSchemes: "View All Schemes",
  checkEligibilityBtn: "Check Eligibility",

  directorySearchPlaceholder: "Search schemes (e.g., PM Kisan, Scholarship, Housing...)",
  directoryFilterBy: "Filter by:",
  noSchemesFound: "No schemes match your search criteria.",
  resetFilters: "Reset Filters",
  perYear: "/ year",
  checkEligibilityArrow: "Check Eligibility",

  detailedInfoTitle: "Detailed Information",
  lastDateApply: "Last Date to Apply:",
  benefitsInclude: "Benefits include:",
  amIEligibleTitle: "Am I Eligible?",
  amIEligibleSubtitle: "Check your eligibility based on your profile and family details",
  familySummaryTitle: "Your Family Summary",
  labelFarmerName: "Citizen Name",
  labelFamilyMembers: "Family Members",
  labelLandHolding: "Land Holding",
  labelBankAccount: "Bank Account",
  membersUnit: "Members",
  criteriaTitle: "1. Eligible Criteria",
  documentsTitle: "2. Documents Required",
  applicationProcessTitle: "3. Application Process",
  applicationLinkText: "Application Form Link (Official Site)",
  youAreEligibleTitle: "You are Eligible for",
  youWillReceiveSubtitle: "You will receive financial support and benefits under this scheme.",
  nextInstallmentLabel: "Next Installment (Expected):",
  viewDetailsBtn: "View Your Eligibility Details",
  goToDashboardBtn: "Apply on Official Portal",
  cscAdvisoryNote: "If you think this is incorrect, please contact your nearest Common Service Center (CSC).",

  modeSingle: "Individual Citizen",
  modeFamily: "Entire Household / Family",
  addFamilyMember: "Add Family Member",
  removeMember: "Remove",
  evaluateBtn: "Calculate Family Eligibility",
  evaluatingBtn: "Evaluating Eligibility...",

  totalAnnualBenefit: "Total Potential Annual Benefit for Family",
  eligibleSchemesCount: "Eligible Schemes Found",
  nearMissCount: "Near-Miss Opportunities",
  whyEligible: "Why You Are Eligible",
  nearMissHeadline: "Near-Miss (Almost Eligible)",
  nearMissExplanation: "You missed eligibility by just one threshold. Here is the exact delta:",
  actionableTip: "How to qualify:",
  documentsChecklist: "Required Documents Checklist",
  officialApplyBtn: "Apply on Official Portal",
  mutualExclusionNotice: "Optimal Mutual Exclusion Applied",

  chatPlaceholder: "Ask about PM-KISAN, Ayushman Bharat, PMAY, scholarships, documents...",
  chatVoiceInput: "Voice Input",
  chatListening: "Listening... Speak now",
  sourceCitations: "Official Sources & Citations",
  chatDisclaimer: "Yojana Sahayak answers are strictly grounded in official government gazettes.",

  aiHeroTitle: "Identify & Check Fake Schemes Instantly",
  aiHeroSubtitle: "Verify welfare schemes, scan viral messages, and get grounded eligibility answers with zero fraud.",
  cardAnalyzeDocs: "Analyze Fake Schemes & Documents",
  cardVerifyScreenshots: "Verify Screenshots & Photos",
  cardCheckForwarded: "Check Forwarded Messages",
  cardAmIEligible: "Am I Eligible?",
  cardExploreMore: "Explore More Features",
  chatInputPlaceholder: "Ask a question, paste a link, or type scheme name...",
  forwardModalTitle: "Check Forwarded Message for Scams",
  forwardModalSubtitle: "Paste any message or viral forward to verify its authenticity",
  forwardModalPlaceholder: "Paste your WhatsApp forward, SMS, or viral post here...",
  verifyMessageBtn: "Verify Message",
  cancelBtn: "Cancel",

  voiceTitle: "Multilingual Voice Assistant",
  voiceSubtitle: "Speak or listen in 12 Indian languages with grounded AI intelligence",
  voiceSpeakBtn: "Speak",
  voiceListeningBtn: "Listening... (Tap to Send)",
  voicePlayVoice: "Play/Voice",
  voiceStop: "Stop",
  voiceInputPlaceholder: "Spoken or typed question: Ask anything about schemes...",
  voiceAskBtn: "Ask",
  quickQuestionsLabel: "Quick Questions:",

  familyTitle: "Family Members",
  addMemberBtn: "+ Add Family Member",
  accountHolderBadge: "Account Holder",
  personalInfoTitle: "Personal Information",
  familyDetailsTitle: "Family Details",
  eligibleSchemesTitle: "Eligible Schemes",
  nearMissSchemesTitle: "Near-Miss Schemes",
  potentialBenefitTitle: "Potential Benefit",
  ageLabel: "Age",
  genderLabel: "Gender",
  occupationLabel: "Occupation",
  casteLabel: "Caste Category",
  stateLabel: "State",
  annualIncomeLabel: "Annual Income",
  relationLabel: "Relationship with Account Holder",
  yearsUnit: "Years",
  editProfileBtn: "Edit Profile",
  deleteBtn: "Delete",
  backToFamilyBtn: "Back to Family",
  viewAllBtn: "View All",

  profileTitle: "Citizen Profile & Document Locker",
  profileSubtitle: "Aadhaar, PAN, and identity proofs can be uploaded anytime",
  smsVerifiedBadge: "SMS Verified",
  docsLockerTitle: "Citizen Document Locker & Identity Proofs",
  docsLockerSubtitle: "Uploading documents is 100% optional. Students, farmers, or workers can upload or update Aadhaar & PAN anytime.",
  aadhaarCardLabel: "Aadhaar Card",
  panCardLabel: "PAN Card",
  studentIdLabel: "Student ID / Occupation Certificate",
  rationCardLabel: "Ration Card / Income Certificate",
  uploadBtn: "Upload",
  updateBtn: "Update",
  notUploadedYet: "Not uploaded yet (Optional)",
  editProfileTitle: "Edit Citizen Profile",
  saveChangesBtn: "Save Changes",

  scamHeading: "Beware of Fake Welfare Schemes & Phishing Messages",
  scamSubheading: "Instant verification of viral WhatsApp forwards, fake registration portals, and illegal upfront fees.",
  scamTrySample1: "Fake WhatsApp Forward",
  scamTrySample2: "Official PM-KISAN SMS",
  scamPlaceholder: "Paste message, WhatsApp forward, SMS, or suspicious link to verify...",
  scamVerifyBtn: "Verify Scam & Fraud Markers",
  scamVerifyingBtn: "Scanning Against Official Repositories...",
  scamThreatMeter: "Scam Threat Meter",

  footerTagline: "Sahi Yojana, Aapka Sahi Saath",
  footerDescription: "Making government schemes easier to discover, understand and access for every Indian citizen.",
  footerQuickLinks: "Quick Links",
  footerSupport: "Support",
  footerAbout: "About Us",
  footerHowItWorks: "How It Works",
  footerContact: "Contact Us",
  footerFaqs: "FAQs",
  footerPrivacy: "Privacy Policy",
  footerDisclaimerTitle: "Important Disclaimer",
  footerDisclaimerText: "Yojana Sahayak is an independent information platform and is not affiliated with any government authority.",
  footerCopyright: "© 2026 Yojana Sahayak. All rights reserved.",
  footerMadeWith: "Made with care for every Indian citizen 🇮🇳",
};

const hi: TranslationDictionary = {
  portalTitle: "योजना सहायक",
  portalSubtitle: "सही योजना, आपका सही साथ",
  navHome: "होम",
  navSchemes: "योजनाएं खोजें",
  navChat: "एआई सहायक",
  navVoice: "आवाज सहायक",
  navFamily: "परिवार के सदस्य",
  navProfile: "मेरी प्रोफ़ाइल",
  navLogin: "लॉगिन करें",
  navSignup: "साइन अप करें",
  navGetStarted: "शुरू करें",
  navEligibility: "पात्रता जांचें",

  heroHeadlineMain: "एक बेहतर कल के लिए खोजें ",
  heroHeadlineHighlight: "सही सरकारी योजनाएं",
  heroSubheadline: "योजना सहायक आपको पात्र सरकारी योजनाओं को खोजने, अपने लाभों की जांच करने और अपनी भाषा में व्यक्तिगत मार्गदर्शन प्राप्त करने में मदद करता है।",
  searchPlaceholder: "योजनाएं खोजें (उदा. पीएम किसान, छात्रवृत्ति, आवास...)",
  searchButton: "खोजें",
  filterByLabel: "फ़िल्टर करें:",
  catAll: "सभी",
  catWelfare: "कल्याण",
  catAgriculture: "कृषि",
  catScholarship: "छात्रवृत्ति",
  catHousing: "आवास",
  catHealth: "स्वास्थ्य",
  catEmployment: "रोजगार",
  catMore: "अन्य",
  speechBubble: "सही योजना, सही फायदा!",
  featMultipleSchemes: "सभी योजनाएं एक ही स्थान पर",
  featCheckEligibility: "मिनटों में पात्रता जांचें",
  featMultilingual: "बहुभाषी सहायता (12+ भाषाएं)",
  popularSchemesTitle: "लोकप्रिय योजनाएं",
  popularSchemesSubtitle: "नागरिकों द्वारा सर्वाधिक खोजी जाने वाली सरकारी योजनाएं",
  viewAllSchemes: "सभी योजनाएं देखें",
  checkEligibilityBtn: "पात्रता जांचें",

  directorySearchPlaceholder: "योजनाएं खोजें (उदा. पीएम किसान, छात्रवृत्ति, आवास...)",
  directoryFilterBy: "श्रेणी चुनें:",
  noSchemesFound: "आपकी खोज के अनुसार कोई योजना नहीं मिली।",
  resetFilters: "फ़िल्टर रीसेट करें",
  perYear: "/ वर्ष",
  checkEligibilityArrow: "पात्रता जांचें",

  detailedInfoTitle: "विस्तृत जानकारी",
  lastDateApply: "आवेदन की अंतिम तिथि:",
  benefitsInclude: "मुख्य लाभ शामिल हैं:",
  amIEligibleTitle: "क्या मैं पात्र हूँ?",
  amIEligibleSubtitle: "अपनी प्रोफ़ाइल और पारिवारिक विवरण के आधार पर अपनी पात्रता जांचें",
  familySummaryTitle: "आपके परिवार का विवरण",
  labelFarmerName: "नागरिक का नाम",
  labelFamilyMembers: "परिवार के सदस्य",
  labelLandHolding: "कृषि भूमि",
  labelBankAccount: "बैंक खाता",
  membersUnit: "सदस्य",
  criteriaTitle: "1. पात्रता मानदंड",
  documentsTitle: "2. आवश्यक दस्तावेज",
  applicationProcessTitle: "3. आवेदन प्रक्रिया",
  applicationLinkText: "आवेदन पत्र लिंक (आधिकारिक वेबसाइट)",
  youAreEligibleTitle: "आप इस योजना के लिए पात्र हैं:",
  youWillReceiveSubtitle: "आपको इस योजना के तहत प्रत्यक्ष वित्तीय लाभ प्रदान किया जाएगा।",
  nextInstallmentLabel: "अगली किस्त (संभावित):",
  viewDetailsBtn: "अपनी पात्रता का विवरण देखें",
  goToDashboardBtn: "आधिकारिक पोर्टल पर आवेदन करें",
  cscAdvisoryNote: "यदि आपको लगता है कि यह गलत है, तो कृपया अपने नजदीकी कॉमन सर्विस सेंटर (CSC) से संपर्क करें।",

  modeSingle: "व्यक्तिगत नागरिक",
  modeFamily: "सम्पूर्ण परिवार / गृहस्थी",
  addFamilyMember: "परिवार का नया सदस्य जोड़ें",
  removeMember: "हटाएं",
  evaluateBtn: "सम्पूर्ण परिवार की सटीक पात्रता की गणना करें",
  evaluatingBtn: "पात्रता जांची जा रही है...",

  totalAnnualBenefit: "परिवार का कुल संभावित वार्षिक कल्याणकारी लाभ",
  eligibleSchemesCount: "योजनाएं जिनमें आप पात्र हैं",
  nearMissCount: "नियर-मिस (Near-Miss) अवसर",
  whyEligible: "आप क्यों पात्र हैं",
  nearMissHeadline: "नियर-मिस (Near-Miss) अवसर",
  nearMissExplanation: "आप केवल 1 नियम या सीमा के कारण रह गए। सटीक अंतर नीचे देखें:",
  actionableTip: "पात्रता कैसे प्राप्त करें:",
  documentsChecklist: "जरूरी दस्तावेजों की सूची",
  officialApplyBtn: "आधिकारिक पोर्टल पर आवेदन करें",
  mutualExclusionNotice: "पारस्परिक रूप से सर्वोत्तम लाभ का समाधान लागू किया गया",

  chatPlaceholder: "पीएम किसान, आयुष्मान भारत, पीएम आवास, छात्रवृत्ति आदि के बारे में पूछें...",
  chatVoiceInput: "आवाज से पूछें",
  chatListening: "सुन रहा हूँ... अब बोलिए",
  sourceCitations: "आधिकारिक स्रोत व उद्धरण",
  chatDisclaimer: "योजना सहायक केवल आधिकारिक गजट और सरकारी पोर्टलों के आधार पर सत्यापित उत्तर देता है।",

  aiHeroTitle: "फर्जी योजनाओं और संदेशों की तुरंत जांच करें",
  aiHeroSubtitle: "आधिकारिक सरकारी नियमों, एआई उद्धरणों और एंटी-फ़िशिंग शील्ड के साथ योजनाओं का सत्यापन करें।",
  cardAnalyzeDocs: "फर्जी योजनाएं व दस्तावेज जांचें",
  cardVerifyScreenshots: "स्क्रीनशॉट और फोटो सत्यापित करें",
  cardCheckForwarded: "फॉरवर्ड किए गए संदेश जांचें",
  cardAmIEligible: "क्या मैं पात्र हूँ?",
  cardExploreMore: "अन्य सुविधाएं देखें",
  chatInputPlaceholder: "प्रश्न पूछें, लिंक पेस्ट करें या योजना का नाम टाइप करें...",
  forwardModalTitle: "व्हाट्सएप / एसएमएस संदेश की जांच करें",
  forwardModalSubtitle: "संदिग्ध संदेश यहाँ पेस्ट करें और प्रामाणिकता परखें",
  forwardModalPlaceholder: "यहाँ अपना व्हाट्सएप संदेश, एसएमएस अथवा कोई भी वायरल पोस्ट पेस्ट करें...",
  verifyMessageBtn: "सत्यापित करें",
  cancelBtn: "रद्द करें",

  voiceTitle: "बहुभाषी आवाज सहायक",
  voiceSubtitle: "12 भारतीय भाषाओं में बोलें या सुनें, प्रामाणिक एआई मार्गदर्शन के साथ",
  voiceSpeakBtn: "बोलें",
  voiceListeningBtn: "सुन रहा हूँ... (भेजने के लिए टैप करें)",
  voicePlayVoice: "आवाज सुनें",
  voiceStop: "रोकें",
  voiceInputPlaceholder: "बोला गया या टाइप किया गया प्रश्न: योजनाओं के बारे में कुछ भी पूछें...",
  voiceAskBtn: "पूछें",
  quickQuestionsLabel: "त्वरित प्रश्न:",

  familyTitle: "परिवार के सदस्य",
  addMemberBtn: "+ सदस्य जोड़ें",
  accountHolderBadge: "खाताधारक (मुख्य)",
  personalInfoTitle: "व्यक्तिगत जानकारी",
  familyDetailsTitle: "पारिवारिक विवरण",
  eligibleSchemesTitle: "पात्र योजनाएं",
  nearMissSchemesTitle: "नियर-मिस योजनाएं",
  potentialBenefitTitle: "संभावित वार्षिक लाभ",
  ageLabel: "आयु",
  genderLabel: "लिंग",
  occupationLabel: "पेशा",
  casteLabel: "जाति श्रेणी",
  stateLabel: "राज्य",
  annualIncomeLabel: "वार्षिक आय",
  relationLabel: "खाताधारक से संबंध",
  yearsUnit: "वर्ष",
  editProfileBtn: "प्रोफ़ाइल संपादित करें",
  deleteBtn: "हटाएं",
  backToFamilyBtn: "परिवार सूची पर वापस जाएं",
  viewAllBtn: "सभी देखें",

  profileTitle: "नागरिक प्रोफ़ाइल व दस्तावेज़ लॉकर",
  profileSubtitle: "आधार, पैन और पहचान प्रमाण पत्र किसी भी समय अपलोड किए जा सकते हैं",
  smsVerifiedBadge: "एसएमएस सत्यापित",
  docsLockerTitle: "नागरिक दस्तावेज़ लॉकर व पहचान प्रमाण",
  docsLockerSubtitle: "दस्तावेज़ अपलोड करना 100% वैकल्पिक है। छात्र, किसान अथवा श्रमिक किसी भी समय आधार व पैन अपलोड कर सकते हैं।",
  aadhaarCardLabel: "आधार कार्ड (Aadhaar)",
  panCardLabel: "पैन कार्ड (PAN)",
  studentIdLabel: "छात्र पहचान पत्र / पेशा प्रमाण",
  rationCardLabel: "राशन कार्ड / आय प्रमाण पत्र",
  uploadBtn: "अपलोड करें",
  updateBtn: "बदलें",
  notUploadedYet: "अभी तक अपलोड नहीं किया गया (वैकल्पिक)",
  editProfileTitle: "नागरिक प्रोफ़ाइल संपादित करें",
  saveChangesBtn: "परिवर्तन सहेजें",

  scamHeading: "धोखाधड़ी और फर्जी संदेशों से सावधान रहें — पहले जांचें",
  scamSubheading: "फर्जी व्हाट्सएप संदेश, अनधिकृत पंजीकरण लिंक और अवैध शुल्क का तुरंत पता लगाएं।",
  scamTrySample1: "फर्जी व्हाट्सएप संदेश नमूना",
  scamTrySample2: "आधिकारिक पीएम-किसान सूचना",
  scamPlaceholder: "संदेश, व्हाट्सएप फॉरवर्ड, एसएमएस या संदिग्ध लिंक यहाँ पेस्ट करें...",
  scamVerifyBtn: "धोखाधड़ी के संकेतों की जांच करें",
  scamVerifyingBtn: "फर्जीवाड़े के पैटर्न से मिलान हो रहा है...",
  scamThreatMeter: "जोखिम मीटर",

  footerTagline: "सही योजना, आपका सही साथ",
  footerDescription: "हर भारतीय नागरिक के लिए सरकारी योजनाओं को खोजना, समझना और पाना आसान बनाना।",
  footerQuickLinks: "त्वरित लिंक्स",
  footerSupport: "सहायता",
  footerAbout: "हमारे बारे में",
  footerHowItWorks: "यह कैसे काम करता है",
  footerContact: "संपर्क करें",
  footerFaqs: "अक्सर पूछे जाने वाले प्रश्न",
  footerPrivacy: "गोपनीयता नीति",
  footerDisclaimerTitle: "महत्वपूर्ण अस्वीकरण (Disclaimer)",
  footerDisclaimerText: "योजना सहायक एक स्वतंत्र सूचना मंच है और किसी भी सरकारी प्राधिकरण से संबद्ध नहीं है।",
  footerCopyright: "© 2026 योजना सहायक। सर्वाधिकार सुरक्षित।",
  footerMadeWith: "हर भारतीय नागरिक के लिए सप्रेम समर्पित 🇮🇳",
};

const bn: TranslationDictionary = {
  ...en,
  portalTitle: "যোজনা সহায়ক",
  portalSubtitle: "সঠিক যোজনা, আপনার সঠিক সাথী",
  navHome: "হোম",
  navSchemes: "প্রকল্প অনুসন্ধান",
  navChat: "এআই সহকারী",
  navVoice: "ভয়েস সহকারী",
  navFamily: "পরিবারের সদস্য",
  navProfile: "আমার প্রোফাইল",
  navLogin: "লগইন",
  navSignup: "সাইন আপ",
  navGetStarted: "শুরু করুন",
  navEligibility: "যোগ্যতা যাচাই",
  heroHeadlineMain: "উন্নত আগামীর জন্য খুঁজুন ",
  heroHeadlineHighlight: "সঠিক সরকারি প্রকল্প",
  heroSubheadline: "যোজনা সহায়ক আপনাকে উপযুক্ত সরকারি প্রকল্পগুলি আবিষ্কার করতে, আপনার সুবিধার পরিমাণ জানতে এবং আপনার নিজের ভাষায় সহায়তা পেতে সাহায্য করে।",
  searchPlaceholder: "প্রকল্প খুঁজুন (যেমন: পিএম কিষাণ, স্কলারশিপ, আবাসন...)",
  searchButton: "অনুসন্ধান",
  catAll: "সকল",
  catWelfare: "কল্যাণ",
  catAgriculture: "কৃষি",
  catScholarship: "বৃত্তি",
  catHousing: "আবাসন",
  catHealth: "স্বাস্থ্য",
  catEmployment: "কর্মসংস্থান",
  popularSchemesTitle: "জনপ্রিয় প্রকল্পসমূহ",
  popularSchemesSubtitle: "সর্বাধিক ব্যবহৃত সরকারি প্রকল্পসমূহ",
  viewAllSchemes: "সকল প্রকল্প দেখুন",
  checkEligibilityBtn: "যোগ্যতা যাচাই করুন",
  detailedInfoTitle: "বিস্তারিত তথ্য",
  amIEligibleTitle: "আমি কি যোগ্য?",
  familySummaryTitle: "আপনার পরিবারের বিবরণ",
  labelFarmerName: "নাগরিকের নাম",
  labelFamilyMembers: "পরিবারের সদস্য",
  youAreEligibleTitle: "আপনি এই প্রকল্পের জন্য যোগ্য:",
  viewDetailsBtn: "যোগ্যতার বিবরণ দেখুন",
  goToDashboardBtn: "অফিসিয়াল পোর্টালে আবেদন করুন",
  evaluateBtn: "পরিবারের সঠিক যোগ্যতা হিসাব করুন",
  aiHeroTitle: "ভুয়ো প্রকল্প ও বার্তা তাৎক্ষণিক যাচাই করুন",
  cardAnalyzeDocs: "ভুয়ো নথি ও সার্কুলার বিশ্লেষণ",
  cardVerifyScreenshots: "স্ক্রিনশট ও ছবি যাচাই",
  cardCheckForwarded: "ফরওয়ার্ড করা বার্তা পরীক্ষা",
  cardAmIEligible: "আমি কি যোগ্য?",
  cardExploreMore: "অন্যান্য সুবিধাসমূহ",
  voiceTitle: "বহুভাষিক ভয়েস সহকারী",
  voiceSpeakBtn: "কথা বলুন",
  voiceListeningBtn: "শুনছি... (পাঠাতে ট্যাপ করুন)",
  familyTitle: "পরিবারের সদস্যবৃন্দ",
  addMemberBtn: "+ সদস্য যোগ করুন",
  accountHolderBadge: "প্রধান অ্যাকাউন্টধারী",
  personalInfoTitle: "ব্যক্তিগত তথ্য",
  familyDetailsTitle: "পারিবারিক বিবরণ",
  eligibleSchemesTitle: "যোগ্য প্রকল্পসমূহ",
  nearMissSchemesTitle: "নিয়ার-মিস প্রকল্প",
  potentialBenefitTitle: "সম্ভাব্য বার্ষিক সুবিধা",
  profileTitle: "নাগরিক প্রোফাইল ও নথি লকার",
  docsLockerTitle: "নাগরিক নথি লকার",
  footerTagline: "সঠিক যোজনা, আপনার সঠিক সাথী",
  footerQuickLinks: "দ্রুত লিঙ্ক",
  footerSupport: "সহায়তা",
  footerAbout: "আমাদের সম্পর্কে",
  footerHowItWorks: "কীভাবে কাজ করে",
  footerContact: "যোগাযোগ",
  footerFaqs: "সাধারণ প্রশ্নোত্তর",
  footerPrivacy: "গোপনীয়তা নীতি",
};

const te: TranslationDictionary = {
  ...en,
  portalTitle: "యోజన సహాయక్",
  portalSubtitle: "సరైన పథకం, మీ సరైన సహకారం",
  navHome: "హోమ్",
  navSchemes: "పథకాల శోధన",
  navChat: "AI సహాయకుడు",
  navVoice: "వాయిస్ అసిస్టెంట్",
  navFamily: "కుటుంబ సభ్యులు",
  navProfile: "నా ప్రొఫైల్",
  navLogin: "లాగిన్",
  navSignup: "సైన్ అప్",
  navGetStarted: "ప్రారంభించండి",
  navEligibility: "అర్హత తనిఖీ",
  heroHeadlineMain: "మంచి భవిష్యత్తు కోసం సరైన ",
  heroHeadlineHighlight: "ప్రభుత్వ పథకాలు",
  heroSubheadline: "యోజన సహాయక్ మీకు తగిన ప్రభుత్వ పథకాలను కనుగొనడంలో, ప్రయోజనాలను అంచనా వేయడంలో మీ భాషలోనే మార్గదర్శకత్వం అందిస్తుంది.",
  searchPlaceholder: "పథకాలను శోధించండి (ఉదా. పీఎం కిసాన్, స్కాలర్‌షిప్, గృహ నిర్మాణం...)",
  searchButton: "శోధించండి",
  catAll: "అన్నీ",
  catWelfare: "సంక్షేమం",
  catAgriculture: "వ్యవసాయం",
  catScholarship: "స్కాలర్‌షిప్",
  catHousing: "గృహనిర్మాణం",
  catHealth: "ఆరోగ్యం",
  catEmployment: "ఉపాధి",
  popularSchemesTitle: "ప్రజాదరణ పొందిన పథకాలు",
  popularSchemesSubtitle: "పౌరులు ఎక్కువగా యాక్సెస్ చేసే ప్రభుత్వ పథకాలు",
  viewAllSchemes: "అన్ని పథకాలు చూడండి",
  checkEligibilityBtn: "అర్హత తనిఖీ చేయండి",
  detailedInfoTitle: "వివరణాత్మక సమాచారం",
  amIEligibleTitle: "నేను అర్హుడినేనా?",
  familySummaryTitle: "కుటుంబ సారాంశం",
  labelFarmerName: "పౌరుని పేరు",
  labelFamilyMembers: "కుటుంబ సభ్యులు",
  youAreEligibleTitle: "మీరు ఈ పథకానికి అర్హులు:",
  viewDetailsBtn: "అర్హత వివరాలు చూడండి",
  goToDashboardBtn: "అధికారిక పోర్టల్‌లో దరఖాస్తు చేయండి",
  evaluateBtn: "కుటుంబ అర్హతను లెక్కించండి",
  aiHeroTitle: "నకిలీ పథకాలను తక్షణమే గుర్తించండి",
  cardAnalyzeDocs: "నకిలీ పత్రాల విశ్లేషణ",
  cardVerifyScreenshots: "స్క్రీన్ షాట్ల ధృవీకరణ",
  cardCheckForwarded: "ఫార్వార్డ్ మెసేజ్ తనిఖీ",
  cardAmIEligible: "నేను అర్హుడినేనా?",
  cardExploreMore: "మరిన్ని ఫీచర్లు",
  voiceTitle: "బహుభాషా వాయిస్ అసిస్టెంట్",
  voiceSpeakBtn: "మాట్లాడండి",
  voiceListeningBtn: "వింటున్నాము...",
  familyTitle: "కుటుంబ సభ్యులు",
  addMemberBtn: "+ సభ్యుడిని చేర్చండి",
  accountHolderBadge: "ఖాతాదారుడు",
  personalInfoTitle: "వ్యక్తిగత సమాచారం",
  familyDetailsTitle: "కుటుంబ వివరాలు",
  eligibleSchemesTitle: "అర్హత గల పథకాలు",
  nearMissSchemesTitle: "దాదాపు అర్హత గల పథకాలు",
  potentialBenefitTitle: "వార్షిక సంభావ్య ప్రయోజనం",
  profileTitle: "పౌరుని ప్రొఫైల్ మరియు డాక్యుమెంట్ లాకర్",
  docsLockerTitle: "డాక్యుమెంట్ లాకర్",
  footerTagline: "సరైన పథకం, మీ సరైన సహకారం",
  footerQuickLinks: "ముఖ్య లింకులు",
  footerSupport: "మద్దతు",
  footerAbout: "మా గురించి",
  footerHowItWorks: "ఇది ఎలా పనిచేస్తుంది",
  footerContact: "సంప్రదించండి",
  footerFaqs: "తరచుగా అడిగే ప్రశ్నలు",
  footerPrivacy: "గోప్యతా విధానం",
};

const mr: TranslationDictionary = {
  ...en,
  portalTitle: "योजना सहायक",
  portalSubtitle: "योग्य योजना, तुमची खरी साथ",
  navHome: "मुख्यपृष्ठ",
  navSchemes: "योजना शोधा",
  navChat: "AI सहाय्यक",
  navVoice: "व्हॉइस सहाय्यक",
  navFamily: "कुटुंबातील सदस्य",
  navProfile: "माझे प्रोफाइल",
  navLogin: "लॉगिन",
  navSignup: "साइन अप",
  navGetStarted: "सुरू करा",
  navEligibility: "पात्रता तपासा",
  heroHeadlineMain: "उज्ज्वल भविष्यासाठी शोधा ",
  heroHeadlineHighlight: "योग्य सरकारी योजना",
  heroSubheadline: "योजना सहायक आपल्याला पात्र सरकारी योजना शोधण्यात, लाभांची माहिती मिळवण्यात आणि आपल्या भाषेत मार्गदर्शन मिळवण्यात मदत करते.",
  searchPlaceholder: "योजना शोधा (उदा. पीएम किसान, शिष्यवृत्ती, घरकुल...)",
  searchButton: "शोधा",
  catAll: "सर्व",
  catWelfare: "कल्याण",
  catAgriculture: "कृषी",
  catScholarship: "शिष्यवृत्ती",
  catHousing: "गृहनिर्माण",
  catHealth: "आरोग्य",
  catEmployment: "रोजगार",
  popularSchemesTitle: "लोकप्रिय योजना",
  popularSchemesSubtitle: "नागरिकांद्वारे सर्वाधिक पाहिल्या गेलेल्या योजना",
  viewAllSchemes: "सर्व योजना पहा",
  checkEligibilityBtn: "पात्रता तपासा",
  detailedInfoTitle: "सविस्तर माहिती",
  amIEligibleTitle: "मी पात्र आहे का?",
  familySummaryTitle: "कुटुंबाचा तपशील",
  labelFarmerName: "नागरिकाचे नाव",
  labelFamilyMembers: "कुटुंब सदस्य",
  youAreEligibleTitle: "तुम्ही या योजनेसाठी पात्र आहात:",
  viewDetailsBtn: "पात्रतेचा तपशील पहा",
  goToDashboardBtn: "अधिकृत पोर्टलवर अर्ज करा",
  evaluateBtn: "कुटुंबाची अचूक पात्रता मोजा",
  aiHeroTitle: "बनावट योजना आणि मेसेज त्वरित ओळखा",
  cardAnalyzeDocs: "बनावट कागदपत्रे तपासा",
  cardVerifyScreenshots: "स्क्रीनशॉट आणि फोटो पडताळा",
  cardCheckForwarded: "फॉरवर्ड केलेले मेसेज तपासा",
  cardAmIEligible: "मी पात्र आहे का?",
  cardExploreMore: "अधिक वैशिष्ट्ये",
  voiceTitle: "बहुभाषिक व्हॉइस सहाय्यक",
  voiceSpeakBtn: "बोला",
  voiceListeningBtn: "ऐकत आहे...",
  familyTitle: "कुटुंबातील सदस्य",
  addMemberBtn: "+ सदस्य जोडा",
  accountHolderBadge: "खातेदार",
  personalInfoTitle: "वैयक्तिक माहिती",
  familyDetailsTitle: "कौटुंबिक तपशील",
  eligibleSchemesTitle: "पात्र योजना",
  nearMissSchemesTitle: "नियर-मिस योजना",
  potentialBenefitTitle: "संभाव्य वार्षिक लाभ",
  profileTitle: "नागरिक प्रोफाइल आणि दस्तऐवज लॉकर",
  docsLockerTitle: "दस्तऐवज लॉकर",
  footerTagline: "योग्य योजना, तुमची खरी साथ",
  footerQuickLinks: "महत्त्वाच्या लिंक्स",
  footerSupport: "मदत आणि पाठबळ",
  footerAbout: "आमच्याबद्दल",
  footerHowItWorks: "हे कसे कार्य करते",
  footerContact: "संपर्क करा",
  footerFaqs: "वारंवार विचारले जाणारे प्रश्न",
  footerPrivacy: "गोपनीयता धोरण",
};

const ta: TranslationDictionary = {
  ...en,
  portalTitle: "யோஜனா சகாயக்",
  portalSubtitle: "சரியான திட்டம், உங்கள் சிறந்த துணை",
  navHome: "முகப்பு",
  navSchemes: "திட்டங்களை ஆராய்க",
  navChat: "AI உதவியாளர்",
  navVoice: "குரல் உதவியாளர்",
  navFamily: "குடும்ப உறுப்பினர்கள்",
  navProfile: "என் சுயவிவரம்",
  navLogin: "உள்நுழைவு",
  navSignup: "பதிவு செய்க",
  navGetStarted: "தொடங்குக",
  navEligibility: "தகுதி சரிபார்க்க",
  heroHeadlineMain: "சிறந்த எதிர்காலத்திற்கு கண்டறியுங்கள் ",
  heroHeadlineHighlight: "சரியான அரசு திட்டங்கள்",
  heroSubheadline: "யோஜனா சகாயக் தகுதியான அரசு திட்டங்களை கண்டறியவும், பலன்களை கணக்கிடவும் உங்கள் சொந்த மொழியிலேயே வழிகாட்டுகிறது.",
  searchPlaceholder: "திட்டங்களை தேடுக (எ.கா. பிஎம் கிசான், கல்வித்தொகை, வீடு...)",
  searchButton: "தேடுக",
  catAll: "அனைத்தும்",
  catWelfare: "நலத்திட்டம்",
  catAgriculture: "விவசாயம்",
  catScholarship: "கல்வி உதவித்தொகை",
  catHousing: "வீட்டுவசதி",
  catHealth: "சுகாதாரம்",
  catEmployment: "வேலைவாய்ப்பு",
  popularSchemesTitle: "பிரபலமான திட்டங்கள்",
  popularSchemesSubtitle: "அதிகம் பயன்படுத்தப்படும் அரசு நலத்திட்டங்கள்",
  viewAllSchemes: "அனைத்து திட்டங்களையும் காண்க",
  checkEligibilityBtn: "தகுதி காண்க",
  detailedInfoTitle: "விரிவான தகவல்",
  amIEligibleTitle: "நான் தகுதியானவரா?",
  familySummaryTitle: "குடும்ப சுருக்கம்",
  labelFarmerName: "குடிமகன் பெயர்",
  labelFamilyMembers: "குடும்ப உறுப்பினர்கள்",
  youAreEligibleTitle: "நீங்கள் இத்திட்டத்திற்கு தகுதியானவர்:",
  viewDetailsBtn: "தகுதி விவரங்களை காண்க",
  goToDashboardBtn: "அதிகாரப்பூர்வ தளத்தில் விண்ணப்பிக்கவும்",
  evaluateBtn: "குடும்ப தகுதியை கணக்கிடுக",
  aiHeroTitle: "போலி திட்டங்களை உடனே கண்டறியுங்கள்",
  cardAnalyzeDocs: "போலி ஆவணங்கள் ஆய்வு",
  cardVerifyScreenshots: "ஸ்கிரீன்ஷாட் சரிபார்ப்பு",
  cardCheckForwarded: "முன்னனுப்பிய செய்தி சரிபார்ப்பு",
  cardAmIEligible: "நான் தகுதியானவரா?",
  cardExploreMore: "கூடுதல் வசதிகள்",
  voiceTitle: "பலமொழி குரல் உதவியாளர்",
  voiceSpeakBtn: "பேசுங்கள்",
  voiceListeningBtn: "கேட்கிறது...",
  familyTitle: "குடும்ப உறுப்பினர்கள்",
  addMemberBtn: "+ உறுப்பினர் சேர்க்க",
  accountHolderBadge: "முதன்மை கணக்குதாரர்",
  personalInfoTitle: "தனிப்பட்ட விவரங்கள்",
  familyDetailsTitle: "குடும்ப விவரங்கள்",
  eligibleSchemesTitle: "தகுதியான திட்டங்கள்",
  nearMissSchemesTitle: "கிட்டத்தட்ட தகுதியானவை",
  potentialBenefitTitle: "ஆண்டு பலன்",
  profileTitle: "குடிமகன் சுயவிவரம் & ஆவண பாதுகாப்பு",
  docsLockerTitle: "ஆவண லாக்கர்",
  footerTagline: "சரியான திட்டம், உங்கள் சிறந்த துணை",
  footerQuickLinks: "விரைவு இணைப்புகள்",
  footerSupport: "ஆதரவு",
  footerAbout: "எங்களை பற்றி",
  footerHowItWorks: "எவ்வாறு செயல்படுகிறது",
  footerContact: "தொடர்பு கொள்க",
  footerFaqs: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
  footerPrivacy: "தனியுரிமை கொள்கை",
};

const gu: TranslationDictionary = {
  ...en,
  portalTitle: "યોજના સહાયક",
  portalSubtitle: "સાચી યોજના, તમારો સાચો સાથ",
  navHome: "હોમ",
  navSchemes: "યોજનાઓ શોધો",
  navChat: "AI સહાયક",
  navVoice: "વોઇસ સહાયક",
  navFamily: "પરિવારના સભ્યો",
  navProfile: "મારી પ્રોફાઇલ",
  navLogin: "લૉગિન",
  navSignup: "સાઇન અપ",
  navGetStarted: "શરૂ કરો",
  navEligibility: "પાત્રતા ચકાસો",
  heroHeadlineMain: "ઉજ્જવળ ભવિષ્ય માટે શોધો ",
  heroHeadlineHighlight: "સાચી સરકારી યોજનાઓ",
  heroSubheadline: "યોજના સહાયક તમને યોગ્ય સરકારી યોજનાઓ શોધવા અને લાભ મેળવવા તમારી ભાષામાં માર્ગદર્શન પૂરું પાડે છે.",
  searchPlaceholder: "યોજના શોધો (દા.ત. પીએમ કિસાન, સ્કોલરશિપ, આવાસ...)",
  searchButton: "શોધો",
  catAll: "બધા",
  catWelfare: "કલ્યાણ",
  catAgriculture: "કૃષિ",
  catScholarship: "શિષ્યવૃત્તિ",
  catHousing: "આવાસ",
  catHealth: "આરોગ્ય",
  catEmployment: "રોજગાર",
  popularSchemesTitle: "લોકપ્રિય યોજનાઓ",
  popularSchemesSubtitle: "સૌથી વધુ વપરાતી સરકારી યોજનાઓ",
  viewAllSchemes: "બધી યોજનાઓ જુઓ",
  checkEligibilityBtn: "પાત્રતા ચકાસો",
  detailedInfoTitle: "વિગતવાર માહિતી",
  amIEligibleTitle: "શું હું પાત્ર છું?",
  familySummaryTitle: "પરિવારની વિગત",
  labelFarmerName: "નાગરિકનું નામ",
  labelFamilyMembers: "પરિવારના સભ્યો",
  youAreEligibleTitle: "તમે આ યોજના માટે પાત્ર છો:",
  viewDetailsBtn: "પાત્રતા વિગતો જુઓ",
  goToDashboardBtn: "સત્તાવાર પોર્ટલ પર અરજી કરો",
  evaluateBtn: "પરિવારની પાત્રતા ગણો",
  aiHeroTitle: "બનાવટી યોજનાઓ તરત જ ઓળખો",
  cardAnalyzeDocs: "બનાવટી દસ્તાવેજ ચકાસો",
  cardVerifyScreenshots: "સ્ક્રીનશોટ ચકાસો",
  cardCheckForwarded: "ફોરવર્ડ મેસેજ ચકાસો",
  cardAmIEligible: "શું હું પાત્ર છું?",
  cardExploreMore: "વધુ સુવિધાઓ",
  voiceTitle: "બહુભાષી વોઇસ સહાયક",
  voiceSpeakBtn: "બોલો",
  voiceListeningBtn: "સાંભળી રહ્યું છે...",
  familyTitle: "પરિવારના સભ્યો",
  addMemberBtn: "+ સભ્ય ઉમેરો",
  accountHolderBadge: "મુખ્ય ખાતાધારક",
  personalInfoTitle: "વ્યક્તિગત માહિતી",
  familyDetailsTitle: "કૌટુંબિક વિગતો",
  eligibleSchemesTitle: "પાત્ર યોજનાઓ",
  nearMissSchemesTitle: "નિયર-મિસ યોજનાઓ",
  potentialBenefitTitle: "વાર્ષિક સંભવિત લાભ",
  profileTitle: "નાગરિક પ્રોફાઇલ અને દસ્તાવેજ લોકર",
  docsLockerTitle: "દસ્તાવેજ લોકર",
  footerTagline: "સાચી યોજના, તમારો સાચો સાથ",
  footerQuickLinks: "ઝડપી લિંક્સ",
  footerSupport: "સહાય",
  footerAbout: "અમારા વિશે",
  footerHowItWorks: "કેવી રીતે કામ કરે છે",
  footerContact: "સંપર્ક કરો",
  footerFaqs: "વારંવાર પૂછાતા પ્રશ્નો",
  footerPrivacy: "ગોપનીયતા નીતિ",
};

const kn: TranslationDictionary = {
  ...en,
  portalTitle: "ಯೋಜನಾ ಸಹಾಯಕ",
  portalSubtitle: "ಸರಿಯಾದ ಯೋಜನೆ, ನಿಮ್ಮ ಸರಿಯಾದ ಜೊತೆ",
  navHome: "ಮುಖಪುಟ",
  navSchemes: "ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
  navChat: "AI ಸಹಾಯಕ",
  navVoice: "ಧ್ವನಿ ಸಹಾಯಕ",
  navFamily: "ಕುಟುಂಬದ ಸದಸ್ಯರು",
  navProfile: "ನನ್ನ ಪ್ರೊಫೈಲ್",
  navLogin: "ಲಾಗಿನ್",
  navSignup: "ಸೈನ್ ಅಪ್",
  navGetStarted: "ಪ್ರಾರಂಭಿಸಿ",
  navEligibility: "ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ",
  heroHeadlineMain: "ಉತ್ತಮ ಭವಿಷ್ಯಕ್ಕಾಗಿ ಕಂಡುಕೊಳ್ಳಿ ",
  heroHeadlineHighlight: "ಸರಿಯಾದ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
  heroSubheadline: "ಯೋಜನಾ ಸಹಾಯಕ ಅರ್ಹ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಕಂಡುಕೊಳ್ಳಲು ಮತ್ತು ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿಯೇ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಲು ನೆರವಾಗುತ್ತದೆ.",
  searchPlaceholder: "ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ (ಉದಾ: ಪಿಎಂ ಕಿಸಾನ್, ವಿದ್ಯಾರ್ಥಿವೇತನ...)",
  searchButton: "ಹುಡುಕಿ",
  catAll: "ಎಲ್ಲವೂ",
  catWelfare: "ಕಲ್ಯಾಣ",
  catAgriculture: "ಕೃಷಿ",
  catScholarship: "ವಿದ್ಯಾರ್ಥಿವೇತನ",
  catHousing: "ವಸತಿ",
  catHealth: "ಆರೋಗ್ಯ",
  catEmployment: "ಉದ್ಯೋಗ",
  popularSchemesTitle: "ಜನಪ್ರಿಯ ಯೋಜನೆಗಳು",
  popularSchemesSubtitle: "ಹೆಚ್ಚು ಬಳಸಲಾದ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
  viewAllSchemes: "ಎಲ್ಲ ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
  checkEligibilityBtn: "ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ",
  detailedInfoTitle: "ವಿವರವಾದ ಮಾಹಿತಿ",
  amIEligibleTitle: "ನಾನು ಅರ್ಹನೇ?",
  familySummaryTitle: "ಕುಟುಂಬದ ವಿವರ",
  labelFarmerName: "ನಾಗರಿಕರ ಹೆಸರು",
  labelFamilyMembers: "ಕುಟುಂಬದ ಸದಸ್ಯರು",
  youAreEligibleTitle: "ನೀವು ಈ ಯೋಜನೆಗೆ ಅರ್ಹರಾಗಿದ್ದೀರಿ:",
  viewDetailsBtn: "ಅರ್ಹತೆಯ ವಿವರಗಳನ್ನು ನೋಡಿ",
  goToDashboardBtn: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
  evaluateBtn: "ಕುಟುಂಬದ ಅರ್ಹತೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ",
  aiHeroTitle: "ನಕಲಿ ಯೋಜನೆಗಳನ್ನು ತಕ್ಷಣವೇ ಪತ್ತೆಹಚ್ಚಿ",
  cardAnalyzeDocs: "ನಕಲಿ ದಾಖಲೆ ಪರಿಶೀಲನೆ",
  cardVerifyScreenshots: "ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಪರಿಶೀಲನೆ",
  cardCheckForwarded: "ಫಾರ್ವರ್ಡ್ ಸಂದೇಶ ಪರಿಶೀಲನೆ",
  cardAmIEligible: "ನಾನು ಅರ್ಹನೇ?",
  cardExploreMore: "ಹೆಚ್ಚಿನ ವೈಶಿಷ್ಟ್ಯಗಳು",
  voiceTitle: "ಬಹುಭಾಷಾ ಧ್ವನಿ ಸಹಾಯಕ",
  voiceSpeakBtn: "ಮಾತನಾಡಿ",
  voiceListeningBtn: "ಆಲಿಸುತ್ತಿದೆ...",
  familyTitle: "ಕುಟುಂಬದ ಸದಸ್ಯರು",
  addMemberBtn: "+ ಸದಸ್ಯರನ್ನು ಸೇರಿಸಿ",
  accountHolderBadge: "ಖಾತೆದಾರ",
  personalInfoTitle: "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ",
  familyDetailsTitle: "ಕುಟುಂಬದ ವಿವರಗಳು",
  eligibleSchemesTitle: "ಅರ್ಹ ಯೋಜನೆಗಳು",
  nearMissSchemesTitle: "ಹತ್ತಿರದ ಯೋಜನೆಗಳು",
  potentialBenefitTitle: "ವಾರ್ಷಿಕ ಸಂಭಾವ್ಯ ಲಾಭ",
  profileTitle: "ನಾಗರಿಕ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಡಾಕ್ಯುಮೆಂಟ್ ಲಾಕರ್",
  docsLockerTitle: "ಡಾಕ್ಯುಮೆಂಟ್ ಲಾಕರ್",
  footerTagline: "ಸರಿಯಾದ ಯೋಜನೆ, ನಿಮ್ಮ ಸರಿಯಾದ ಜೊತೆ",
  footerQuickLinks: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
  footerSupport: "ಬೆಂಬಲ",
  footerAbout: "ನಮ್ಮ ಬಗ್ಗೆ",
  footerHowItWorks: "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
  footerContact: "ಸಂಪರ್ಕಿಸಿ",
  footerFaqs: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
  footerPrivacy: "ಗೌಪ್ಯತಾ ನೀತಿ",
};

const ml: TranslationDictionary = {
  ...en,
  portalTitle: "യോജന സഹായക്",
  portalSubtitle: "ശരിയായ പദ്ധതി, നിങ്ങളുടെ യഥാർത്ഥ പിന്തുണ",
  navHome: "ഹോം",
  navSchemes: "പദ്ധതികൾ തിരയുക",
  navChat: "AI അസിസ്റ്റന്റ്",
  navVoice: "വോയ്‌സ് അസിസ്റ്റന്റ്",
  navFamily: "കുടുംബാംഗങ്ങൾ",
  navProfile: "എന്റെ പ്രൊഫൈൽ",
  navLogin: "ലോഗിൻ",
  navSignup: "സൈൻ അപ്പ്",
  navGetStarted: "ആരംഭിക്കുക",
  navEligibility: "അർഹത പരിശോധിക്കുക",
  heroHeadlineMain: "മെച്ചപ്പെട്ട ഭാവിക്കായി കണ്ടെത്തുക ",
  heroHeadlineHighlight: "ശരിയായ സർക്കാർ പദ്ധതികൾ",
  heroSubheadline: "നിങ്ങൾക്ക് അർഹമായ സർക്കാർ പദ്ധതികൾ കണ്ടെത്താനും ആനുകൂല്യങ്ങൾ മനസിലാക്കാനും യോജന സഹായക് സഹായിക്കുന്നു.",
  searchPlaceholder: "പദ്ധതികൾ തിരയുക (ഉദാ: പിഎം കിസാൻ, സ്കോളർഷിപ്പ്...)",
  searchButton: "തിരയുക",
  catAll: "എല്ലാം",
  catWelfare: "ക്ഷേമം",
  catAgriculture: "കൃഷി",
  catScholarship: "സ്കോളർഷിപ്പ്",
  catHousing: "ഭവനം",
  catHealth: "ആരോഗ്യം",
  catEmployment: "തൊഴിൽ",
  popularSchemesTitle: "ജനപ്രിയ പദ്ധതികൾ",
  popularSchemesSubtitle: "കൂടുതൽ ആളുകൾ ഉപയോഗിക്കുന്ന സർക്കാർ പദ്ധതികൾ",
  viewAllSchemes: "എല്ലാ പദ്ധതികളും കാണുക",
  checkEligibilityBtn: "അർഹത പരിശോധിക്കുക",
  detailedInfoTitle: "വിശദമായ വിവരങ്ങൾ",
  amIEligibleTitle: "ഞാൻ അർഹനാണോ?",
  familySummaryTitle: "കുടുംബ വിവരങ്ങൾ",
  labelFarmerName: "ഗുണഭോക്താവിന്റെ പേര്",
  labelFamilyMembers: "കുടുംബാംഗങ്ങൾ",
  youAreEligibleTitle: "നിങ്ങൾ ഈ പദ്ധതിക്ക് അർഹനാണ്:",
  viewDetailsBtn: "അർഹതാ വിവരങ്ങൾ കാണുക",
  goToDashboardBtn: "ഔദ്യോഗിക പോർട്ടലിൽ അപേക്ഷിക്കുക",
  evaluateBtn: "കുടുംബ അർഹത കണക്കാക്കുക",
  aiHeroTitle: "വ്യാജ പദ്ധതികൾ തത്സമയം തിരിച്ചറിയുക",
  cardAnalyzeDocs: "വ്യാജ രേഖകൾ പരിശോധിക്കുക",
  cardVerifyScreenshots: "സ്ക്രീൻഷോട്ടുകൾ പരിശോധിക്കുക",
  cardCheckForwarded: "ഫോർവേഡ് സന്ദേശങ്ങൾ പരിശോധിക്കുക",
  cardAmIEligible: "ഞാൻ അർഹനാണോ?",
  cardExploreMore: "കൂടുതൽ ഫീച്ചറുകൾ",
  voiceTitle: "ബഹുഭാഷാ വോയ്‌സ് അസിസ്റ്റന്റ്",
  voiceSpeakBtn: "സംസാരിക്കുക",
  voiceListeningBtn: "കേൾക്കുന്നു...",
  familyTitle: "കുടുംബാംഗങ്ങൾ",
  addMemberBtn: "+ അംഗത്തെ ചേർക്കുക",
  accountHolderBadge: "പ്രധാന അക്കൗണ്ട് ഉടമ",
  personalInfoTitle: "വ്യക്തിഗത വിവരങ്ങൾ",
  familyDetailsTitle: "കുടുംബ വിവരങ്ങൾ",
  eligibleSchemesTitle: "അർഹമായ പദ്ധതികൾ",
  nearMissSchemesTitle: "നിയർ-മിസ്സ് പദ്ധതികൾ",
  potentialBenefitTitle: "പ്രതീക്ഷിക്കുന്ന വാർഷിക ആനുകൂല്യം",
  profileTitle: "സിറ്റിസൺ പ്രൊഫൈലും ഡോക്യുമെന്റ് ലോക്കറും",
  docsLockerTitle: "ഡോക്യുമെന്റ് ലോക്കർ",
  footerTagline: "ശരിയായ പദ്ധതി, നിങ്ങളുടെ യഥാർത്ഥ പിന്തുണ",
  footerQuickLinks: "പ്രധാന ലിങ്കുകൾ",
  footerSupport: "സഹായം",
  footerAbout: "ഞങ്ങളെ കുറിച്ച്",
  footerHowItWorks: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
  footerContact: "ബന്ധപ്പെടുക",
  footerFaqs: "പതിവുചോദ്യങ്ങൾ",
  footerPrivacy: "സ്വകാര്യതാ നയം",
};

const pa: TranslationDictionary = {
  ...en,
  portalTitle: "ਯੋਜਨਾ ਸਹਾਇਕ",
  portalSubtitle: "ਸਹੀ ਯੋਜਨਾ, ਤੁਹਾਡਾ ਸੱਚਾ ਸਾਥ",
  navHome: "ਮੁੱਖ ਪੰਨਾ",
  navSchemes: "ਯੋਜਨਾਵਾਂ ਲੱਭੋ",
  navChat: "AI ਸਹਾਇਕ",
  navVoice: "ਆਵਾਜ਼ ਸਹਾਇਕ",
  navFamily: "ਪਰਿਵਾਰਕ ਮੈਂਬਰ",
  navProfile: "ਮੇਰਾ ਪ੍ਰੋਫਾਈਲ",
  navLogin: "ਲਾਗਇਨ",
  navSignup: "ਸਾਈਨ ਅੱਪ",
  navGetStarted: "ਸ਼ੁਰੂ ਕਰੋ",
  navEligibility: "ਯੋਗਤਾ ਜਾਂਚੋ",
  heroHeadlineMain: "ਬਿਹਤਰ ਭਵਿੱਖ ਲਈ ਲੱਭੋ ",
  heroHeadlineHighlight: "ਸਹੀ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ",
  heroSubheadline: "ਯੋਜਨਾ ਸਹਾਇਕ ਤੁਹਾਨੂੰ ਯੋਗ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਖੋਜਣ ਅਤੇ ਤੁਹਾਡੀ ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਮਾਰਗਦਰਸ਼ਨ ਲੈਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
  searchPlaceholder: "ਯੋਜਨਾਵਾਂ ਲੱਭੋ (ਜਿਵੇਂ ਪੀਐਮ ਕਿਸਾਨ, ਸਕਾਲਰਸ਼ਿਪ, ਆਵਾਸ...)",
  searchButton: "ਖੋਜੋ",
  catAll: "ਸਾਰੇ",
  catWelfare: "ਭਲਾਈ",
  catAgriculture: "ਖੇਤੀਬਾੜੀ",
  catScholarship: "ਵਜ਼ੀਫ਼ਾ",
  catHousing: "ਰਿਹਾਇਸ਼",
  catHealth: "ਸਿਹਤ",
  catEmployment: "ਰੁਜ਼ਗਾਰ",
  popularSchemesTitle: "ਪ੍ਰਸਿੱਧ ਯੋਜਨਾਵਾਂ",
  popularSchemesSubtitle: "ਸਭ ਤੋਂ ਵੱਧ ਵੇਖੀਆਂ ਗਈਆਂ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ",
  viewAllSchemes: "ਸਾਰੀਆਂ ਯੋਜਨਾਵਾਂ ਵੇਖੋ",
  checkEligibilityBtn: "ਯੋਗਤਾ ਜਾਂਚੋ",
  detailedInfoTitle: "ਵਿਸਥਾਰਪੂਰਵਕ ਜਾਣਕਾਰੀ",
  amIEligibleTitle: "ਕੀ ਮੈਂ ਯੋਗ ਹਾਂ?",
  familySummaryTitle: "ਪਰਿਵਾਰਕ ਵੇਰਵਾ",
  labelFarmerName: "ਨਾਗਰਿਕ ਦਾ ਨਾਮ",
  labelFamilyMembers: "ਪਰਿਵਾਰਕ ਮੈਂਬਰ",
  youAreEligibleTitle: "ਤੁਸੀਂ ਇਸ ਯੋਜਨਾ ਲਈ ਯੋਗ ਹੋ:",
  viewDetailsBtn: "ਯੋਗਤਾ ਵੇਰਵੇ ਵੇਖੋ",
  goToDashboardBtn: "ਸਰਕਾਰੀ ਪੋਰਟਲ 'ਤੇ ਅਰਜ਼ੀ ਦਿਓ",
  evaluateBtn: "ਪਰਿਵਾਰਕ ਯੋਗਤਾ ਦੀ ਗਣਨਾ ਕਰੋ",
  aiHeroTitle: "ਨਕਲੀ ਯੋਜਨਾਵਾਂ ਅਤੇ ਸੁਨੇਹੇ ਤੁਰੰਤ ਪਛਾਣੋ",
  cardAnalyzeDocs: "ਨਕਲੀ ਦਸਤਾਵੇਜ਼ਾਂ ਦੀ ਜਾਂਚ",
  cardVerifyScreenshots: "ਸਕ੍ਰੀਨਸ਼ੌਟ ਪੜਤਾਲ",
  cardCheckForwarded: "ਫਾਰਵਰਡ ਸੁਨੇਹੇ ਜਾਂਚੋ",
  cardAmIEligible: "ਕੀ ਮੈਂ ਯੋਗ ਹਾਂ?",
  cardExploreMore: "ਹੋਰ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
  voiceTitle: "ਬਹੁ-ਭਾਸ਼ਾਈ ਆਵਾਜ਼ ਸਹਾਇਕ",
  voiceSpeakBtn: "ਬੋਲੋ",
  voiceListeningBtn: "ਸੁਣ ਰਿਹਾ ਹੈ...",
  familyTitle: "ਪਰਿਵਾਰਕ ਮੈਂਬਰ",
  addMemberBtn: "+ ਮੈਂਬਰ ਜੋੜੋ",
  accountHolderBadge: "ਖਾਤਾ ਧਾਰਕ",
  personalInfoTitle: "ਨਿੱਜੀ ਜਾਣਕਾਰੀ",
  familyDetailsTitle: "ਪਰਿਵਾਰਕ ਵੇਰਵੇ",
  eligibleSchemesTitle: "ਯੋਗ ਸਕੀਮਾਂ",
  nearMissSchemesTitle: "ਨੇੜਲੀ ਯੋਗਤਾ ਸਕੀਮਾਂ",
  potentialBenefitTitle: "ਸੰਭਾਵਿਤ ਸਾਲਾਨਾ ਲਾਭ",
  profileTitle: "ਨਾਗਰਿਕ ਪ੍ਰੋਫਾਈਲ ਅਤੇ ਦਸਤਾਵੇਜ਼ ਲਾਕਰ",
  docsLockerTitle: "ਦਸਤਾਵੇਜ਼ ਲਾਕਰ",
  footerTagline: "ਸਹੀ ਯੋਜਨਾ, ਤੁਹਾਡਾ ਸੱਚਾ ਸਾਥ",
  footerQuickLinks: "ਜ਼ਰੂਰੀ ਲਿੰਕ",
  footerSupport: "ਸਹਾਇਤਾ",
  footerAbout: "ਸਾਡੇ ਬਾਰੇ",
  footerHowItWorks: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
  footerContact: "ਸੰਪਰਕ ਕਰੋ",
  footerFaqs: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ",
  footerPrivacy: "ਪਰਦੇਦਾਰੀ ਨੀਤੀ",
};

const or: TranslationDictionary = {
  ...en,
  portalTitle: "ଯୋଜନା ସହାୟକ",
  portalSubtitle: "ସଠିକ୍ ଯୋଜନା, ଆପଣଙ୍କ ସଠିକ୍ ସାଥ୍",
  navHome: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
  navSchemes: "ଯୋଜନା ଖୋଜନ୍ତୁ",
  navChat: "AI ସହାୟକ",
  navVoice: "ଭଏସ୍ ସହାୟକ",
  navFamily: "ପରିବାର ସଦସ୍ୟ",
  navProfile: "ମୋ ପ୍ରୋଫାଇଲ୍",
  navLogin: "ଲଗଇନ୍",
  navSignup: "ସାଇନ୍ ଅପ୍",
  navGetStarted: "ଆରମ୍ଭ କରନ୍ତୁ",
  navEligibility: "ଯୋଗ୍ୟତା ଯାଞ୍ଚ",
  heroHeadlineMain: "ଉତ୍ତମ ଭବିଷ୍ୟତ ପାଇଁ ଖୋଜନ୍ତୁ ",
  heroHeadlineHighlight: "ସଠିକ୍ ସରକାରୀ ଯୋଜନା",
  heroSubheadline: "ଯୋଜନା ସହାୟକ ଆପଣଙ୍କୁ ଯୋଗ୍ୟ ସରକାରୀ ଯୋଜନା ଖୋଜିବାରେ ଏବଂ ନିଜ ଭାଷାରେ ମାର୍ଗଦର୍ଶନ ପାଇବାରେ ସାହାଯ୍ୟ କରେ।",
  searchPlaceholder: "ଯୋଜନା ଖୋଜନ୍ତୁ (ଯଥା: ପିଏମ୍ କିଷାନ୍, ଛାତ୍ରବୃତ୍ତି...)",
  searchButton: "ଖୋଜନ୍ତୁ",
  catAll: "ସମସ୍ତ",
  catWelfare: "କଲ୍ୟାଣ",
  catAgriculture: "କୃଷି",
  catScholarship: "ଛାତ୍ରବୃତ୍ତି",
  catHousing: "ଆବାସ",
  catHealth: "ସ୍ୱାସ୍ଥ୍ୟ",
  catEmployment: "ନିଯୁକ୍ତି",
  popularSchemesTitle: "ଲୋକପ୍ରିୟ ଯୋଜନା",
  popularSchemesSubtitle: "ଅଧିକ ବ୍ୟବହୃତ ସରକାରୀ ଯୋଜନାସମୂହ",
  viewAllSchemes: "ସମସ୍ତ ଯୋଜନା ଦେଖନ୍ତୁ",
  checkEligibilityBtn: "ଯୋଗ୍ୟତା ଯାଞ୍ଚ କରନ୍ତୁ",
  detailedInfoTitle: "ବିସ୍ତୃତ ସୂଚନା",
  amIEligibleTitle: "ମୁଁ ଯୋଗ୍ୟ କି?",
  familySummaryTitle: "ପରିବାର ବିବରଣୀ",
  labelFarmerName: "ନାଗରିକଙ୍କ ନାମ",
  labelFamilyMembers: "ପରିବାର ସଦସ୍ୟ",
  youAreEligibleTitle: "ଆପଣ ଏହି ଯୋଜନା ପାଇଁ ଯୋଗ୍ୟ:",
  viewDetailsBtn: "ଯୋଗ୍ୟତା ବିବରଣୀ ଦେଖନ୍ତୁ",
  goToDashboardBtn: "ସରକାରୀ ପୋର୍ଟାଲରେ ଆବେଦନ କରନ୍ତୁ",
  evaluateBtn: "ପରିବାର ଯୋଗ୍ୟତା ଗଣନା କରନ୍ତୁ",
  aiHeroTitle: "ଜାଲ୍ ଯୋଜନା ତୁରନ୍ତ ଚିହ୍ନଟ କରନ୍ତୁ",
  cardAnalyzeDocs: "ଜାଲ୍ ଦଲିଲ୍ ଯାଞ୍ଚ",
  cardVerifyScreenshots: "ସ୍କ୍ରିନ୍‌ସଟ୍ ଯାଞ୍ଚ",
  cardCheckForwarded: "ଫରୱାର୍ଡ ବାର୍ତ୍ତା ଯାଞ୍ଚ",
  cardAmIEligible: "ମୁଁ ଯୋଗ୍ୟ କି?",
  cardExploreMore: "ଅଧିକ ସୁବିଧା",
  voiceTitle: "ବହୁଭାଷୀ ଭଏସ୍ ସହାୟକ",
  voiceSpeakBtn: "କୁହନ୍ତୁ",
  voiceListeningBtn: "ଶୁଣୁଛି...",
  familyTitle: "ପରିବାର ସଦସ୍ୟ",
  addMemberBtn: "+ ସଦସ୍ୟ ଯୋଡ଼ନ୍ତୁ",
  accountHolderBadge: "ଖାତାଧାରୀ",
  personalInfoTitle: "ବ୍ୟକ୍ତିଗତ ସୂଚନା",
  familyDetailsTitle: "ପାରିବାରିକ ବିବରଣୀ",
  eligibleSchemesTitle: "ଯୋଗ୍ୟ ଯୋଜନା",
  nearMissSchemesTitle: "ନିକଟବର୍ତ୍ତୀ ଯୋଜନା",
  potentialBenefitTitle: "ବାର୍ଷିକ ସମ୍ଭାବ୍ୟ ଲାଭ",
  profileTitle: "ନାଗରିକ ପ୍ରୋଫାଇଲ୍ ଏବଂ ଡକ୍ୟୁମେଣ୍ଟ ଲକର୍",
  docsLockerTitle: "ଡକ୍ୟୁମେଣ୍ଟ ଲକର୍",
  footerTagline: "ସଠିକ୍ ଯୋଜନା, ଆପଣଙ୍କ ସଠିକ୍ ସାଥ୍",
  footerQuickLinks: "ମୁଖ୍ୟ ଲିଙ୍କ୍",
  footerSupport: "ସହାୟତା",
  footerAbout: "ଆମ ବିଷୟରେ",
  footerHowItWorks: "ଏହା କିପରି କାମ କରେ",
  footerContact: "ଯୋଗାଯୋଗ",
  footerFaqs: "ସାଧାରଣ ପ୍ରଶ୍ନୋତ୍ତର",
  footerPrivacy: "ଗୋପନୀୟତା ନୀତି",
};

const as: TranslationDictionary = {
  ...en,
  portalTitle: "যোজনা সহায়ক",
  portalSubtitle: "সঠিক যোজনা, আপোনাৰ সঠিক সংগী",
  navHome: "গৃহ",
  navSchemes: "আঁচনি সন্ধান",
  navChat: "AI সহায়ক",
  navVoice: "ভইচ সহায়ক",
  navFamily: "পৰিয়ালৰ সদস্য",
  navProfile: "মোৰ প্ৰফাইল",
  navLogin: "লগইন",
  navSignup: "ছাইন আপ",
  navGetStarted: "আৰম্ভ কৰক",
  navEligibility: "যোগ্যতা পৰীক্ষা",
  heroHeadlineMain: "উন্নত ভৱিষ্যতৰ বাবে বিচাৰক ",
  heroHeadlineHighlight: "সঠিক চৰকাৰী আঁচনি",
  heroSubheadline: "যোজনা সহায়কে আপোনাক উপযুক্ত চৰকাৰী আঁচনি বিচাৰি পোৱাত আৰু নিজৰ ভাষাত পথপ্রদর্শন লাভ কৰাত সহায় কৰে।",
  searchPlaceholder: "আঁচনি সন্ধান কৰক (যেনে: পিএম কিষাণ, বৃত্তি, আৱাস...)",
  searchButton: "সন্ধান",
  catAll: "সকলো",
  catWelfare: "কল্যাণ",
  catAgriculture: "কৃষি",
  catScholarship: "বৃত্তি",
  catHousing: "গৃহ নিৰ্মাণ",
  catHealth: "স্বাস্থ্য",
  catEmployment: "নিয়োগ",
  popularSchemesTitle: "জনপ্ৰিয় আঁচনিসমূহ",
  popularSchemesSubtitle: "সৰ্বাধিক ব্যৱহৃত চৰকাৰী আঁচনিসমূহ",
  viewAllSchemes: "সকলো আঁচনি চাওক",
  checkEligibilityBtn: "যোগ্যতা পৰীক্ষা কৰক",
  detailedInfoTitle: "বিতং তথ্য",
  amIEligibleTitle: "মই যোগ্য নে?",
  familySummaryTitle: "পৰিয়ালৰ বিৱৰণ",
  labelFarmerName: "নাগৰিকৰ নাম",
  labelFamilyMembers: "পৰিয়ালৰ সদস্য",
  youAreEligibleTitle: "আপুনি এই আঁচনিৰ বাবে যোগ্য:",
  viewDetailsBtn: "যোগ্যতাৰ সবিশেষ চাওক",
  goToDashboardBtn: "চৰকাৰী প’ৰ্টেলত আবেদন কৰক",
  evaluateBtn: "পৰিয়ালৰ যোগ্যতা গণনা কৰক",
  aiHeroTitle: "ভুৱা আঁচনি আৰু বাৰ্তা তৎকালীন চিনাক্ত কৰক",
  cardAnalyzeDocs: "ভুৱা নথিপত্ৰ পৰীক্ষা",
  cardVerifyScreenshots: "স্ক্ৰীণশ্বট পৰীক্ষা",
  cardCheckForwarded: "ফৰৱাৰ্ড বাৰ্তা পৰীক্ষা",
  cardAmIEligible: "মই যোগ্য নে?",
  cardExploreMore: "অন্যান্য সুবিধাসমূহ",
  voiceTitle: "বহুভাষিক ভইচ সহায়ক",
  voiceSpeakBtn: "কওক",
  voiceListeningBtn: "শুনি আছোঁ...",
  familyTitle: "পৰিয়ালৰ সদস্যসকল",
  addMemberBtn: "+ সদস্য যোগ কৰক",
  accountHolderBadge: "মুখ্য একাউন্টধাৰী",
  personalInfoTitle: "ব্যক্তিগত তথ্য",
  familyDetailsTitle: "পারিবাৰিক তথ্য",
  eligibleSchemesTitle: "যোগ্য আঁচনিসমূহ",
  nearMissSchemesTitle: "নিয়াৰ-মিছ আঁচনিসমূহ",
  potentialBenefitTitle: "সম্ভাব্য বাৰ্ষিক লাভ",
  profileTitle: "নাগৰিক প্ৰফাইল আৰু নথিপত্ৰ লকাৰ",
  docsLockerTitle: "নথিপত্ৰ লকাৰ",
  footerTagline: "সঠিক যোজনা, আপোনাৰ সঠিক সংগী",
  footerQuickLinks: "প্ৰয়োজনীয় সংযোগ",
  footerSupport: "সহায়তা",
  footerAbout: "আমাৰ বিষয়ে",
  footerHowItWorks: "ই কেনেকৈ কাম কৰে",
  footerContact: "যোগাযোগ কৰক",
  footerFaqs: "সঘনাই সোধা প্ৰশ্ন",
  footerPrivacy: "গোপনীয়তা নীতি",
};

export const translations: Record<Language, TranslationDictionary> = {
  en,
  hi,
  bn,
  te,
  mr,
  ta,
  gu,
  kn,
  ml,
  pa,
  or,
  as,
};
