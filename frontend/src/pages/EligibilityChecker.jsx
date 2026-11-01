import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import {
  ShieldCheck,
  ArrowLeft,
  ExternalLink,
  MapPin,
  Users,
  BriefcaseBusiness,
  Wallet,
  HandCoins,
  Sparkles,
  CheckCircle2,
  Building2,
  FileCheck2,
  Search,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";

// Deployed Render backend URL
const API_URL = "https://yojynasati.onrender.com";

const TEXT = {
  back: {
    en: "Back to Schemes",
    hi: "योजनाओं पर वापस जाएं",
    mr: "योजनांकडे परत जा",
  },
  eyebrow: {
    en: "SMART SCHEME DISCOVERY",
    hi: "स्मार्ट योजना खोज",
    mr: "स्मार्ट योजना शोध",
  },
  hero1: {
    en: "Find the right schemes",
    hi: "सही योजनाएं खोजें",
    mr: "योग्य योजना शोधा",
  },
  hero2: {
    en: "for your future.",
    hi: "अपने भविष्य के लिए।",
    mr: "तुमच्या भविष्यासाठी.",
  },
  heroDesc: {
    en: "Tell us a little about yourself. YojanaSathi AI will identify government schemes that may match your profile.",
    hi: "अपने बारे में कुछ जानकारी दें। योजनासाथी एआई आपकी प्रोफ़ाइल के अनुसार संभावित सरकारी योजनाएं खोजेगा।",
    mr: "तुमची थोडी माहिती द्या. योजनासाथी एआय तुमच्या प्रोफाइलशी जुळणाऱ्या सरकारी योजना शोधेल.",
  },
  guided: {
    en: "Guided scheme discovery",
    hi: "मार्गदर्शित योजना खोज",
    mr: "मार्गदर्शित योजना शोध",
  },
  officialLinks: {
    en: "Official links included",
    hi: "आधिकारिक लिंक उपलब्ध",
    mr: "अधिकृत लिंक उपलब्ध",
  },
  discovery: {
    en: "Scheme discovery",
    hi: "योजना खोज",
    mr: "योजना शोध",
  },
  simple: {
    en: "One simple process",
    hi: "एक आसान प्रक्रिया",
    mr: "एक सोपी प्रक्रिया",
  },
  opportunities: {
    en: "Explore support opportunities",
    hi: "सहायता के अवसर खोजें",
    mr: "सहाय्याच्या संधी शोधा",
  },
  personalize: {
    en: "Personalise your search",
    hi: "अपनी खोज को अनुकूल बनाएं",
    mr: "तुमचा शोध वैयक्तिक करा",
  },
  enter: {
    en: "Enter your details to discover relevant schemes.",
    hi: "संबंधित योजनाएं खोजने के लिए जानकारी दर्ज करें।",
    mr: "संबंधित योजना शोधण्यासाठी माहिती भरा.",
  },
  state: {
    en: "Your State",
    hi: "आपका राज्य",
    mr: "तुमचे राज्य",
  },
  stateHint: {
    en: "Where you live",
    hi: "आप कहाँ रहते हैं",
    mr: "तुम्ही कुठे राहता",
  },
  category: {
    en: "Applicant Category",
    hi: "आवेदक की श्रेणी",
    mr: "अर्जदाराचा प्रवर्ग",
  },
  categoryHint: {
    en: "Select your category",
    hi: "अपनी श्रेणी चुनें",
    mr: "तुमचा प्रवर्ग निवडा",
  },
  business: {
    en: "Business Type",
    hi: "व्यवसाय का प्रकार",
    mr: "व्यवसायाचा प्रकार",
  },
  businessHint: {
    en: "Your business area",
    hi: "आपका व्यवसाय क्षेत्र",
    mr: "तुमचे व्यवसाय क्षेत्र",
  },
  income: {
    en: "Annual Family Income",
    hi: "वार्षिक पारिवारिक आय",
    mr: "वार्षिक कौटुंबिक उत्पन्न",
  },
  incomeHint: {
    en: "Select yearly income",
    hi: "वार्षिक आय चुनें",
    mr: "वार्षिक उत्पन्न निवडा",
  },
  need: {
    en: "Support Required",
    hi: "आवश्यक सहायता",
    mr: "आवश्यक सहाय्य",
  },
  needHint: {
    en: "What support do you need?",
    hi: "आपको किस सहायता की जरूरत है?",
    mr: "तुम्हाला कोणती मदत हवी?",
  },
  note: {
    en: "Your selections help us find relevant schemes. Final eligibility depends on each scheme's official rules.",
    hi: "आपकी जानकारी से संबंधित योजनाएं खोजने में मदद मिलती है। अंतिम पात्रता योजना के आधिकारिक नियमों पर निर्भर करती है.",
    mr: "तुमच्या निवडींमुळे संबंधित योजना शोधता येतात. अंतिम पात्रता योजनेच्या अधिकृत नियमांवर अवलंबून असते.",
  },
  finding: {
    en: "Finding schemes...",
    hi: "योजनाएं खोजी जा रही हैं...",
    mr: "योजना शोधत आहे...",
  },
  find: {
    en: "Find Matching Schemes",
    hi: "मिलती-जुलती योजनाएं खोजें",
    mr: "जुळणाऱ्या योजना शोधा",
  },
  reset: {
    en: "Reset",
    hi: "रीसेट करें",
    mr: "पुन्हा सुरू करा",
  },
  sideTitle: {
    en: "Support that fits your needs",
    hi: "आपकी जरूरत के अनुसार सहायता",
    mr: "तुमच्या गरजेनुसार सहाय्य",
  },
  sideDesc: {
    en: "Explore government initiatives for business loans, subsidies, training and more.",
    hi: "व्यवसाय ऋण, सब्सिडी, प्रशिक्षण और अन्य सरकारी पहल खोजें।",
    mr: "व्यवसाय कर्ज, अनुदान, प्रशिक्षण आणि इतर सरकारी उपक्रम शोधा.",
  },
  point1: {
    en: "Explore potential scheme matches",
    hi: "संभावित योजनाएं खोजें",
    mr: "संभाव्य जुळणाऱ्या योजना शोधा",
  },
  point2: {
    en: "Understand scheme benefits",
    hi: "योजना के लाभ समझें",
    mr: "योजनेचे फायदे समजून घ्या",
  },
  point3: {
    en: "Visit official portals for verification",
    hi: "सत्यापन के लिए आधिकारिक पोर्टल देखें",
    mr: "पडताळणीसाठी अधिकृत पोर्टल पाहा",
  },
  sideFoot: {
    en: "Informed decisions start here.",
    hi: "सही निर्णय की शुरुआत यहाँ से होती है।",
    mr: "माहितीपूर्ण निर्णयाची सुरुवात इथून होते.",
  },
  connection: {
    en: "Connection issue",
    hi: "कनेक्शन में समस्या",
    mr: "कनेक्शनमध्ये समस्या",
  },
  apiError: {
    en: "Unable to connect to YojanaSathi AI. Please check whether your backend is running.",
    hi: "योजनासाथी एआई से कनेक्ट नहीं हो सका। कृपया बैकएंड सर्वर जांचें।",
    mr: "योजनासाथी एआयशी कनेक्ट होता आले नाही. कृपया बॅकएंड सर्व्हर तपासा.",
  },
  resultsLabel: {
    en: "YOUR SEARCH RESULTS",
    hi: "आपके खोज परिणाम",
    mr: "तुमचे शोध परिणाम",
  },
  resultsTitle: {
    en: "Potential scheme matches",
    hi: "संभावित उपयुक्त योजनाएं",
    mr: "संभाव्य जुळणाऱ्या योजना",
  },
  resultsDesc: {
    en: "Review these options and verify the requirements before applying.",
    hi: "इन विकल्पों की जांच करें और आवेदन से पहले आवश्यकताएं सत्यापित करें।",
    mr: "हे पर्याय पाहा आणि अर्ज करण्यापूर्वी अटी तपासा.",
  },
  foundOne: {
    en: "scheme found",
    hi: "योजना मिली",
    mr: "योजना सापडली",
  },
  foundMany: {
    en: "schemes found",
    hi: "योजनाएं मिलीं",
    mr: "योजना सापडल्या",
  },
  option: {
    en: "OPTION",
    hi: "विकल्प",
    mr: "पर्याय",
  },
  initiative: {
    en: "Government initiative",
    hi: "सरकारी पहल",
    mr: "सरकारी उपक्रम",
  },
  benefit: {
    en: "SCHEME BENEFIT",
    hi: "योजना का लाभ",
    mr: "योजनेचा लाभ",
  },
  why: {
    en: "Why it matched",
    hi: "यह क्यों मिला",
    mr: "ही योजना का जुळली",
  },
  score: {
    en: "Match score",
    hi: "मिलान स्कोर",
    mr: "जुळणी गुण",
  },
  details: {
    en: "View Details",
    hi: "विवरण देखें",
    mr: "तपशील पाहा",
  },
  official: {
    en: "Official Site",
    hi: "आधिकारिक वेबसाइट",
    mr: "अधिकृत संकेतस्थळ",
  },
  verify: {
    en: "Verify current eligibility on the official portal.",
    hi: "वर्तमान पात्रता आधिकारिक पोर्टल पर सत्यापित करें।",
    mr: "सध्याची पात्रता अधिकृत पोर्टलवर तपासा.",
  },
  empty: {
    en: "No matching schemes found",
    hi: "कोई उपयुक्त योजना नहीं मिली",
    mr: "जुळणारी योजना सापडली नाही",
  },
  emptyDesc: {
    en: "Try different selections to explore other available government schemes.",
    hi: "अन्य सरकारी योजनाएं खोजने के लिए अलग विकल्प चुनें।",
    mr: "इतर सरकारी योजना शोधण्यासाठी वेगळे पर्याय निवडा.",
  },
  change: {
    en: "Change my selections",
    hi: "मेरे विकल्प बदलें",
    mr: "माझ्या निवडी बदला",
  },
};

const OPTION_LABELS = {
  Maharashtra: { hi: "महाराष्ट्र", mr: "महाराष्ट्र" },
  Karnataka: { hi: "कर्नाटक", mr: "कर्नाटक" },
  Gujarat: { hi: "गुजरात", mr: "गुजरात" },
  "Tamil Nadu": { hi: "तमिलनाडु", mr: "तामिळनाडू" },
  "Other / All India": {
    hi: "अन्य / पूरा भारत",
    mr: "इतर / संपूर्ण भारत",
  },
  "Scheduled Caste (SC)": {
    hi: "अनुसूचित जाति (SC)",
    mr: "अनुसूचित जाती (SC)",
  },
  "Scheduled Tribe (ST)": {
    hi: "अनुसूचित जनजाति (ST)",
    mr: "अनुसूचित जमाती (ST)",
  },
  "Other Backward Class (OBC)": {
    hi: "अन्य पिछड़ा वर्ग (OBC)",
    mr: "इतर मागासवर्गीय (OBC)",
  },
  "Women Entrepreneur": {
    hi: "महिला उद्यमी",
    mr: "महिला उद्योजक",
  },
  General: { hi: "सामान्य", mr: "सर्वसाधारण" },
  Other: { hi: "अन्य", mr: "इतर" },
  Manufacturing: { hi: "विनिर्माण", mr: "उत्पादन" },
  Services: { hi: "सेवाएं", mr: "सेवा" },
  Trading: { hi: "व्यापार", mr: "व्यापार" },
  Technology: { hi: "प्रौद्योगिकी", mr: "तंत्रज्ञान" },
  "Food Processing": {
    hi: "खाद्य प्रसंस्करण",
    mr: "अन्न प्रक्रिया",
  },
  "Micro Enterprise": {
    hi: "सूक्ष्म उद्यम",
    mr: "सूक्ष्म उद्योग",
  },
  "Below ₹1 lakh": {
    hi: "₹1 लाख से कम",
    mr: "₹1 लाखांपेक्षा कमी",
  },
  "₹1–3 lakh": {
    hi: "₹1–3 लाख",
    mr: "₹1–3 लाख",
  },
  "₹3–5 lakh": {
    hi: "₹3–5 लाख",
    mr: "₹3–5 लाख",
  },
  "Above ₹5 lakh": {
    hi: "₹5 लाख से अधिक",
    mr: "₹5 लाखांपेक्षा जास्त",
  },
  "Start a new business": {
    hi: "नया व्यवसाय शुरू करें",
    mr: "नवीन व्यवसाय सुरू करा",
  },
  "Business loan": {
    hi: "व्यवसाय ऋण",
    mr: "व्यवसाय कर्ज",
  },
  "Government subsidy": {
    hi: "सरकारी सब्सिडी",
    mr: "सरकारी अनुदान",
  },
  "Training & skill support": {
    hi: "प्रशिक्षण और कौशल सहायता",
    mr: "प्रशिक्षण व कौशल्य सहाय्य",
  },
  "Marketing support": {
    hi: "विपणन सहायता",
    mr: "विपणन सहाय्य",
  },
};

export default function EligibilityChecker() {
  const { language } = useLanguage();

  const tr = (key) =>
    TEXT[key]?.[language] ?? TEXT[key]?.en ?? key;

  const optionLabel = (label) =>
    OPTION_LABELS[label]?.[language] ?? label;

  const [form, setForm] = useState({
    state: "Maharashtra",
    category: "",
    businessType: "",
    income: "",
    financialNeed: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkEligibility = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/api/match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Unable to check schemes.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Eligibility API Error:", err);
      setError(tr("apiError"));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      state: "Maharashtra",
      category: "",
      businessType: "",
      income: "",
      financialNeed: "",
    });

    setResult(null);
    setError("");
  };

  const fields = [
    {
      name: "state",
      label: tr("state"),
      icon: MapPin,
      hint: tr("stateHint"),
      options: [
        ["Maharashtra", "Maharashtra"],
        ["Karnataka", "Karnataka"],
        ["Gujarat", "Gujarat"],
        ["Tamil Nadu", "Tamil Nadu"],
        ["All India", "Other / All India"],
      ],
    },
    {
      name: "category",
      label: tr("category"),
      icon: Users,
      hint: tr("categoryHint"),
      options: [
        ["SC", "Scheduled Caste (SC)"],
        ["ST", "Scheduled Tribe (ST)"],
        ["OBC", "Other Backward Class (OBC)"],
        ["Women", "Women Entrepreneur"],
        ["General", "General"],
        ["Other", "Other"],
      ],
    },
    {
      name: "businessType",
      label: tr("business"),
      icon: BriefcaseBusiness,
      hint: tr("businessHint"),
      options: [
        ["Manufacturing", "Manufacturing"],
        ["Services", "Services"],
        ["Trading", "Trading"],
        ["Technology", "Technology"],
        ["Food Processing", "Food Processing"],
        ["Micro Enterprise", "Micro Enterprise"],
      ],
    },
    {
      name: "income",
      label: tr("income"),
      icon: Wallet,
      hint: tr("incomeHint"),
      options: [
        ["0-1", "Below ₹1 lakh"],
        ["1-3", "₹1–3 lakh"],
        ["3-5", "₹3–5 lakh"],
        ["5+", "Above ₹5 lakh"],
      ],
    },
    {
      name: "financialNeed",
      label: tr("need"),
      icon: HandCoins,
      hint: tr("needHint"),
      options: [
        ["startup", "Start a new business"],
        ["loan", "Business loan"],
        ["subsidy", "Government subsidy"],
        ["training", "Training & skill support"],
        ["marketing", "Marketing support"],
      ],
    },
  ];

  const schemes = Array.isArray(result?.schemes)
    ? result.schemes
    : [];

  const count = result?.count ?? schemes.length;

  return (
    <main className="eligibility-page">
      <div className="eligibility-shell">
        <Link to="/schemes" className="eligibility-back">
          <ArrowLeft size={17} />
          <span>{tr("back")}</span>
        </Link>

        <section className="eligibility-hero">
          <div className="eligibility-hero-content">
            <div className="eligibility-eyebrow">
              <Sparkles size={15} />
              <span>{tr("eyebrow")}</span>
            </div>

            <h1>
              {tr("hero1")}
              <br />
              <span>{tr("hero2")}</span>
            </h1>

            <p>{tr("heroDesc")}</p>

            <div className="eligibility-trust">
              <span>
                <ShieldCheck size={17} />
                {tr("guided")}
              </span>

              <span>
                <FileCheck2 size={17} />
                {tr("officialLinks")}
              </span>
            </div>
          </div>

          <div
            className="eligibility-hero-art"
            aria-hidden="true"
          >
            <div className="eligibility-orbit orbit-one" />
            <div className="eligibility-orbit orbit-two" />

            <div className="eligibility-art-icon">
              <Building2 size={49} strokeWidth={1.5} />
            </div>

            <div className="eligibility-floating-card floating-top">
              <CheckCircle2 size={19} />
              <span>{tr("discovery")}</span>
            </div>

            <div className="eligibility-floating-card floating-bottom">
              <ShieldCheck size={20} />

              <div>
                <strong>{tr("simple")}</strong>
                <small>{tr("opportunities")}</small>
              </div>
            </div>
          </div>
        </section>

        <section className="eligibility-workspace">
          <div className="eligibility-form-panel">
            <div className="eligibility-section-heading">
              <div className="eligibility-heading-icon">
                <Search size={21} />
              </div>

              <div>
                <h2>{tr("personalize")}</h2>
                <p>{tr("enter")}</p>
              </div>
            </div>

            <form
              className="eligibility-form"
              onSubmit={checkEligibility}
            >
              <div className="eligibility-fields">
                {fields.map(
                  ({ name, label, icon: Icon, hint, options }) => (
                    <label
                      className={`eligibility-field field-${name}`}
                      key={name}
                    >
                      <span className="eligibility-label">
                        <Icon size={17} />
                        {label}

                        {name !== "state" && (
                          <span className="eligibility-required">
                            *
                          </span>
                        )}
                      </span>

                      <select
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        required={name !== "state"}
                      >
                        <option value="">{hint}</option>

                        {options.map(([value, text]) => (
                          <option key={value} value={value}>
                            {optionLabel(text)}
                          </option>
                        ))}
                      </select>
                    </label>
                  )
                )}
              </div>

              <div className="eligibility-form-note">
                <ShieldCheck size={18} />
                <p>{tr("note")}</p>
              </div>

              <div className="eligibility-form-actions">
                <button
                  type="submit"
                  className="eligibility-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="eligibility-spinner" />
                      {tr("finding")}
                    </>
                  ) : (
                    <>
                      {tr("find")}
                      <ArrowUpRight size={19} />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="eligibility-reset"
                  onClick={resetForm}
                  disabled={loading}
                  aria-label={tr("reset")}
                >
                  <RotateCcw size={17} />
                  {tr("reset")}
                </button>
              </div>
            </form>
          </div>

          <aside className="eligibility-side-panel">
            <div className="eligibility-side-icon">
              <ShieldCheck size={27} />
            </div>

            <h3>{tr("sideTitle")}</h3>
            <p>{tr("sideDesc")}</p>

            <div className="eligibility-side-divider" />

            <div className="eligibility-side-point">
              <CheckCircle2 size={18} />
              <span>{tr("point1")}</span>
            </div>

            <div className="eligibility-side-point">
              <CheckCircle2 size={18} />
              <span>{tr("point2")}</span>
            </div>

            <div className="eligibility-side-point">
              <CheckCircle2 size={18} />
              <span>{tr("point3")}</span>
            </div>

            <div className="eligibility-side-footer">
              <ShieldCheck size={16} />
              <span>{tr("sideFoot")}</span>
            </div>
          </aside>
        </section>

        {error && (
          <div className="eligibility-error" role="alert">
            <ShieldCheck size={20} />

            <div>
              <strong>{tr("connection")}</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {result && (
          <section className="eligibility-results">
            <div className="eligibility-results-heading">
              <div>
                <div className="eligibility-eyebrow results-eyebrow">
                  <Sparkles size={15} />
                  {tr("resultsLabel")}
                </div>

                <h2>{tr("resultsTitle")}</h2>
                <p>{tr("resultsDesc")}</p>
              </div>

              <div className="eligibility-results-count">
                <span>{count}</span>

                <small>
                  {count === 1
                    ? tr("foundOne")
                    : tr("foundMany")}
                </small>
              </div>
            </div>

            {schemes.length > 0 ? (
              <div className="eligibility-results-grid">
                {schemes.map((scheme, index) => (
                  <article
                    className="eligibility-card"
                    key={scheme.id ?? index}
                  >
                    <div className="eligibility-card-top">
                      <div className="eligibility-card-icon">
                        <Building2 size={23} />
                      </div>

                      <span className="eligibility-card-number">
                        {tr("option")}{" "}
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3>{scheme.name}</h3>

                    <div className="eligibility-ministry">
                      <Building2 size={14} />
                      <span>
                        {scheme.ministry || tr("initiative")}
                      </span>
                    </div>

                    {scheme.category && (
                      <div className="eligibility-tags">
                        {(Array.isArray(scheme.category)
                          ? scheme.category
                          : [scheme.category]
                        )
                          .slice(0, 3)
                          .map((category) => (
                            <span key={category}>
                              {category}
                            </span>
                          ))}
                      </div>
                    )}

                    <div className="eligibility-card-divider" />

                    {scheme.benefit && (
                      <div className="eligibility-benefit">
                        <span className="eligibility-benefit-icon">
                          <HandCoins size={18} />
                        </span>

                        <div>
                          <small>{tr("benefit")}</small>
                          <p>{scheme.benefit}</p>
                        </div>
                      </div>
                    )}

                    {scheme.description && (
                      <p className="eligibility-description">
                        {scheme.description}
                      </p>
                    )}

                    {scheme.matchReasons?.length > 0 && (
                      <div className="eligibility-reasons">
                        <strong>
                          <CheckCircle2 size={16} />
                          {tr("why")}
                        </strong>

                        <ul>
                          {scheme.matchReasons.map(
                            (reason, i) => (
                              <li key={i}>{reason}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {scheme.matchScore != null && (
                      <div className="eligibility-match-info">
                        <span>{tr("score")}</span>
                        <strong>
                          {scheme.matchScore}%
                        </strong>
                      </div>
                    )}

                    <div className="eligibility-card-actions">
                      <Link
                        to={`/schemes/${scheme.id}`}
                        className="eligibility-details-btn"
                      >
                        {tr("details")}
                        <ArrowUpRight size={16} />
                      </Link>

                      <a
                        href={
                          scheme.officialLink ||
                          "https://www.myscheme.gov.in/"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="eligibility-official-btn"
                      >
                        {tr("official")}
                        <ExternalLink size={15} />
                      </a>
                    </div>

                    <p className="eligibility-card-disclaimer">
                      <ShieldCheck size={14} />
                      {tr("verify")}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="eligibility-empty">
                <div className="eligibility-empty-icon">
                  <Search size={28} />
                </div>

                <h3>{tr("empty")}</h3>
                <p>{tr("emptyDesc")}</p>

                <button
                  type="button"
                  onClick={resetForm}
                >
                  {tr("change")}
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}