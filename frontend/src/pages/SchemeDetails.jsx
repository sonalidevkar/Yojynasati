import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  IndianRupee,
  Landmark,
  MapPin,
  ShieldCheck,
  WalletCards,
  FileCheck2,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useLanguage } from "../context/LanguageContext.jsx";

// Deployed Render backend URL
const API_URL = "https://yojynasati.onrender.com";

// Multilingual labels only; backend scheme data stays unchanged.
const pageText = {
  mr: {
    "Back to Schemes": "योजनांकडे परत",
    "Loading scheme details...": "योजनेची माहिती लोड होत आहे...",
    "Please wait while we fetch the scheme information.": "योजनेची माहिती मिळेपर्यंत कृपया थांबा.",
    "Scheme Details Not Found": "योजनेची माहिती सापडली नाही",
    "Explore Schemes": "योजना पाहा",
    "FINANCIAL SUPPORT": "आर्थिक सहाय्य",
    AVAILABILITY: "उपलब्धता",
    "BUSINESS / ACTIVITY": "व्यवसाय / उपक्रम",
    OVERVIEW: "आढावा",
    "About the Scheme": "योजनेबद्दल",
    "KEY INFORMATION": "महत्त्वाची माहिती",
    "Main Benefit": "मुख्य लाभ",
    "BENEFIT / SUPPORT": "लाभ / सहाय्य",
    REQUIREMENTS: "पात्रता अटी",
    "Eligibility Information": "पात्रतेची माहिती",
    Category: "प्रवर्ग",
    "Business / Activity": "व्यवसाय / उपक्रम",
    "Eligible States": "पात्र राज्ये",
    "Income Requirement": "उत्पन्नाची अट",
    "SUPPORT TYPE": "सहाय्याचा प्रकार",
    "Financial Support": "आर्थिक सहाय्य",
    KEYWORDS: "कीवर्ड",
    "Scheme Tags": "योजनेचे टॅग",
    PREPARATION: "तयारी",
    "Documents Checklist": "आवश्यक कागदपत्रांची यादी",
    "READY TO EXPLORE?": "अर्ज करण्यास तयार आहात?",
    "Start Your Application": "अर्ज सुरू करा",
    "Open Official Portal": "अधिकृत पोर्टल उघडा",
    "Check Another Scheme": "दुसरी योजना तपासा",
    "Verify Before Applying": "अर्जापूर्वी पडताळणी करा",
    "Official Scheme Portal": "योजनेचे अधिकृत पोर्टल",
    "Open government website": "सरकारी वेबसाइट उघडा",
    "Check current status": "सध्याची स्थिती तपासा",
    "Government Support Scheme": "सरकारी सहाय्य योजना",
    "Government of India": "भारत सरकार",
    "Check official portal": "अधिकृत पोर्टल तपासा",
    "All States": "सर्व राज्ये",
    Various: "विविध",
    "Check official guidelines": "अधिकृत मार्गदर्शक सूचना तपासा",
    "No limit specified in this listing": "या यादीत मर्यादा नमूद नाही",
    "Check the official portal for support details": "सहाय्याच्या माहितीसाठी अधिकृत पोर्टल तपासा",
    "Check the official portal for the required documents.": "आवश्यक कागदपत्रांसाठी अधिकृत पोर्टल तपासा.",
    "Please select a scheme to view its details.": "माहिती पाहण्यासाठी योजना निवडा.",
    "The requested scheme could not be found.": "विनंती केलेली योजना सापडली नाही.",
    "Unable to load scheme details. Please make sure the backend is running.": "योजनेची माहिती लोड झाली नाही. बॅकएंड सुरू असल्याची खात्री करा.",
    "Please return to the schemes page and select a scheme again.": "योजनांच्या पानावर जाऊन पुन्हा योजना निवडा.",
    "Please check the official portal for scheme information.": "योजनेच्या माहितीसाठी अधिकृत पोर्टल तपासा.",
    "Benefits depend on current scheme rules.": "लाभ सध्याच्या योजनेच्या नियमांवर अवलंबून आहेत.",
    "Official application link is not available yet.": "अधिकृत अर्ज लिंक सध्या उपलब्ध नाही.",
    "Review the official scheme guidelines and confirm your eligibility before applying.": "अर्ज करण्यापूर्वी अधिकृत मार्गदर्शक सूचना वाचा आणि पात्रता तपासा.",
    "Eligibility, documents, benefits and application rules can change. Always verify current information on the official government portal.": "पात्रता, कागदपत्रे, लाभ आणि अर्जाचे नियम बदलू शकतात. अद्ययावत माहिती नेहमी अधिकृत सरकारी पोर्टलवर तपासा.",
    "Up to": "पर्यंत",
  },

  hi: {
    "Back to Schemes": "योजनाओं पर वापस",
    "Loading scheme details...": "योजना का विवरण लोड हो रहा है...",
    "Please wait while we fetch the scheme information.": "योजना की जानकारी प्राप्त होने तक प्रतीक्षा करें।",
    "Scheme Details Not Found": "योजना का विवरण नहीं मिला",
    "Explore Schemes": "योजनाएं देखें",
    "FINANCIAL SUPPORT": "वित्तीय सहायता",
    AVAILABILITY: "उपलब्धता",
    "BUSINESS / ACTIVITY": "व्यवसाय / गतिविधि",
    OVERVIEW: "अवलोकन",
    "About the Scheme": "योजना के बारे में",
    "KEY INFORMATION": "मुख्य जानकारी",
    "Main Benefit": "मुख्य लाभ",
    "BENEFIT / SUPPORT": "लाभ / सहायता",
    REQUIREMENTS: "आवश्यकताएं",
    "Eligibility Information": "पात्रता की जानकारी",
    Category: "श्रेणी",
    "Business / Activity": "व्यवसाय / गतिविधि",
    "Eligible States": "पात्र राज्य",
    "Income Requirement": "आय की शर्त",
    "SUPPORT TYPE": "सहायता का प्रकार",
    "Financial Support": "वित्तीय सहायता",
    KEYWORDS: "कीवर्ड",
    "Scheme Tags": "योजना टैग",
    PREPARATION: "तैयारी",
    "Documents Checklist": "आवश्यक दस्तावेज़ सूची",
    "READY TO EXPLORE?": "आवेदन करने के लिए तैयार हैं?",
    "Start Your Application": "आवेदन शुरू करें",
    "Open Official Portal": "आधिकारिक पोर्टल खोलें",
    "Check Another Scheme": "दूसरी योजना जांचें",
    "Verify Before Applying": "आवेदन से पहले सत्यापित करें",
    "Official Scheme Portal": "योजना का आधिकारिक पोर्टल",
    "Open government website": "सरकारी वेबसाइट खोलें",
    "Check current status": "वर्तमान स्थिति जांचें",
    "Government Support Scheme": "सरकारी सहायता योजना",
    "Government of India": "भारत सरकार",
    "Check official portal": "आधिकारिक पोर्टल देखें",
    "All States": "सभी राज्य",
    Various: "विभिन्न",
    "Check official guidelines": "आधिकारिक दिशानिर्देश देखें",
    "No limit specified in this listing": "इस सूची में कोई सीमा निर्दिष्ट नहीं है",
    "Check the official portal for support details": "सहायता विवरण के लिए आधिकारिक पोर्टल देखें",
    "Check the official portal for the required documents.": "आवश्यक दस्तावेज़ों के लिए आधिकारिक पोर्टल देखें।",
    "Please select a scheme to view its details.": "विवरण देखने के लिए एक योजना चुनें।",
    "The requested scheme could not be found.": "अनुरोधित योजना नहीं मिली।",
    "Unable to load scheme details. Please make sure the backend is running.": "योजना का विवरण लोड नहीं हो सका। सुनिश्चित करें कि बैकएंड चल रहा है।",
    "Please return to the schemes page and select a scheme again.": "योजनाओं के पेज पर जाकर फिर से योजना चुनें।",
    "Please check the official portal for scheme information.": "योजना की जानकारी के लिए आधिकारिक पोर्टल देखें।",
    "Benefits depend on current scheme rules.": "लाभ वर्तमान योजना नियमों पर निर्भर हैं।",
    "Official application link is not available yet.": "आधिकारिक आवेदन लिंक अभी उपलब्ध नहीं है।",
    "Review the official scheme guidelines and confirm your eligibility before applying.": "आवेदन से पहले आधिकारिक दिशानिर्देश पढ़ें और अपनी पात्रता जांचें।",
    "Eligibility, documents, benefits and application rules can change. Always verify current information on the official government portal.": "पात्रता, दस्तावेज़, लाभ और आवेदन नियम बदल सकते हैं। नवीनतम जानकारी आधिकारिक सरकारी पोर्टल पर जांचें।",
    "Up to": "तक",
  },
};

function SchemeDetails() {
  const { language } = useLanguage();

  const tr = (text) => pageText[language]?.[text] || text;

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [scheme, setScheme] = useState(
    location.state?.scheme || null
  );

  const [loading, setLoading] = useState(
    !location.state?.scheme
  );

  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state?.scheme) {
      setScheme(location.state.scheme);
      setLoading(false);
      return;
    }

    if (!id) {
      setError(
        tr("Please select a scheme to view its details.")
      );
      setLoading(false);
      return;
    }

    const fetchScheme = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/schemes`
        );

        if (!response.ok) {
          throw new Error("Unable to load schemes.");
        }

        const data = await response.json();

        const schemes = Array.isArray(data)
          ? data
          : data.schemes || [];

        const selectedScheme = schemes.find(
          (item) => String(item.id) === String(id)
        );

        if (!selectedScheme) {
          setScheme(null);
          setError(
            tr("The requested scheme could not be found.")
          );
          return;
        }

        setScheme(selectedScheme);
      } catch (err) {
        console.error("Scheme details API error:", err);

        setError(
          tr(
            "Unable to load scheme details. Please make sure the backend is running."
          )
        );
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [id, location.state]);

  if (loading) {
    return (
      <main className="scheme-details-page">
        <div className="scheme-details-container">
          <div className="details-section">
            <h2>{tr("Loading scheme details...")}</h2>
            <p>
              {tr(
                "Please wait while we fetch the scheme information."
              )}
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!scheme) {
    return (
      <main className="scheme-details-page">
        <div className="scheme-details-container">
          <button
            className="back-button"
            onClick={() => navigate("/schemes")}
          >
            <ArrowLeft size={17} />
            {tr("Back to Schemes")}
          </button>

          <div className="no-results">
            <div className="scheme-details-empty-icon">
              🔍
            </div>

            <h2>{tr("Scheme Details Not Found")}</h2>

            <p>
              {error ||
                tr(
                  "Please return to the schemes page and select a scheme again."
                )}
            </p>

            <button
              className="view-scheme-button"
              onClick={() => navigate("/schemes")}
            >
              {tr("Explore Schemes")}
            </button>
          </div>
        </div>
      </main>
    );
  }

  const eligibility = scheme.eligibility || {};

  const toArray = (value) => {
    if (Array.isArray(value)) return value;
    if (value) return [value];
    return [];
  };

  const categories = toArray(scheme.category);
  const states = toArray(eligibility.states);
  const businessTypes = toArray(scheme.businessType);
  const financialSupport = toArray(scheme.financialSupport);
  const documents = toArray(scheme.documents);
  const tags = toArray(scheme.tags);

  const handleApply = () => {
    if (scheme.applyLink && scheme.applyLink !== "#") {
      window.open(
        scheme.applyLink,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      alert(
        tr("Official application link is not available yet.")
      );
    }
  };

  return (
    <main className="scheme-details-page">
      <div className="scheme-details-container">
        <Link to="/schemes" className="back-button">
          <ArrowLeft size={17} />
          {tr("Back to Schemes")}
        </Link>

        <section className="scheme-details-hero">
          <div className="scheme-details-hero-icon">
            {scheme.icon || "🤝"}
          </div>

          <div className="scheme-details-hero-content">
            <div className="scheme-details-top-row">
              <p className="scheme-details-label">
                YOJANASATHI AI
              </p>

              <span className="active-status">
                <CheckCircle2 size={14} />
                {scheme.status ||
                  tr("Check current status")}
              </span>
            </div>

            <h1>{scheme.name}</h1>

            <p className="scheme-details-short-name">
              {scheme.shortName ||
                tr("Government Support Scheme")}
            </p>

            <div className="scheme-details-ministry">
              <Landmark size={16} />
              <span>
                {scheme.ministry ||
                  tr("Government of India")}
              </span>
            </div>
          </div>
        </section>

        <section className="scheme-quick-info">
          <div className="quick-info-item">
            <div className="quick-info-icon">
              <IndianRupee size={19} />
            </div>

            <div>
              <span>{tr("FINANCIAL SUPPORT")}</span>
              <strong>
                {financialSupport.join(", ") ||
                  tr("Check official portal")}
              </strong>
            </div>
          </div>

          <div className="quick-info-item">
            <div className="quick-info-icon">
              <MapPin size={19} />
            </div>

            <div>
              <span>{tr("AVAILABILITY")}</span>
              <strong>
                {states.includes("All")
                  ? tr("All States")
                  : states.join(", ") ||
                    tr("Check official portal")}
              </strong>
            </div>
          </div>

          <div className="quick-info-item">
            <div className="quick-info-icon">
              <BriefcaseBusiness size={19} />
            </div>

            <div>
              <span>{tr("BUSINESS / ACTIVITY")}</span>
              <strong>
                {businessTypes.slice(0, 3).join(", ") ||
                  tr("Various")}
              </strong>
            </div>
          </div>
        </section>

        <div className="scheme-details-grid">
          <div className="scheme-details-left">
            <section className="details-section">
              <div className="details-section-heading">
                <div className="section-heading-icon">
                  📋
                </div>

                <div>
                  <span>{tr("OVERVIEW")}</span>
                  <h2>{tr("About the Scheme")}</h2>
                </div>
              </div>

              <p className="details-main-text">
                {scheme.description ||
                  tr(
                    "Please check the official portal for scheme information."
                  )}
              </p>
            </section>

            <section className="details-section">
              <div className="details-section-heading">
                <div className="section-heading-icon">
                  💰
                </div>

                <div>
                  <span>{tr("KEY INFORMATION")}</span>
                  <h2>{tr("Main Benefit")}</h2>
                </div>
              </div>

              <div className="main-benefit-box">
                <div className="main-benefit-icon">
                  <WalletCards size={25} />
                </div>

                <div>
                  <span>{tr("BENEFIT / SUPPORT")}</span>
                  <strong>
                    {scheme.benefit ||
                      tr(
                        "Benefits depend on current scheme rules."
                      )}
                  </strong>
                </div>
              </div>
            </section>

            <section className="details-section">
              <div className="details-section-heading">
                <div className="section-heading-icon">
                  ✓
                </div>

                <div>
                  <span>{tr("REQUIREMENTS")}</span>
                  <h2>{tr("Eligibility Information")}</h2>
                </div>
              </div>

              <div className="details-grid">
                <div className="detail-box">
                  <span>{tr("Category")}</span>
                  <strong>
                    {categories.join(", ") ||
                      tr("Check official guidelines")}
                  </strong>
                </div>

                <div className="detail-box">
                  <span>{tr("Business / Activity")}</span>
                  <strong>
                    {businessTypes.join(", ") ||
                      tr("Various")}
                  </strong>
                </div>

                <div className="detail-box">
                  <span>{tr("Eligible States")}</span>
                  <strong>
                    {states.includes("All")
                      ? tr("All States")
                      : states.join(", ") ||
                        tr("Check official portal")}
                  </strong>
                </div>

                <div className="detail-box">
                  <span>{tr("Income Requirement")}</span>
                  <strong>
                    {eligibility.maxIncome != null
                      ? `${tr("Up to")} ₹${Number(
                          eligibility.maxIncome
                        ).toLocaleString("en-IN")}`
                      : tr(
                          "No limit specified in this listing"
                        )}
                  </strong>
                </div>
              </div>

              {eligibility.notes && (
                <div className="eligibility-note">
                  <ShieldCheck size={18} />
                  <p>{eligibility.notes}</p>
                </div>
              )}
            </section>

            <section className="details-section">
              <div className="details-section-heading">
                <div className="section-heading-icon">
                  💳
                </div>

                <div>
                  <span>{tr("SUPPORT TYPE")}</span>
                  <h2>{tr("Financial Support")}</h2>
                </div>
              </div>

              <div className="support-tags">
                {financialSupport.length ? (
                  financialSupport.map((item) => (
                    <span key={item}>
                      <CheckCircle2 size={14} />
                      {item}
                    </span>
                  ))
                ) : (
                  <span>
                    {tr(
                      "Check the official portal for support details"
                    )}
                  </span>
                )}
              </div>
            </section>

            {tags.length > 0 && (
              <section className="details-section">
                <div className="details-section-heading">
                  <div className="section-heading-icon">
                    🏷️
                  </div>

                  <div>
                    <span>{tr("KEYWORDS")}</span>
                    <h2>{tr("Scheme Tags")}</h2>
                  </div>
                </div>

                <div className="details-tags">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </section>
            )}

            <section className="details-section">
              <div className="details-section-heading">
                <div className="section-heading-icon">
                  <FileCheck2 size={22} />
                </div>

                <div>
                  <span>{tr("PREPARATION")}</span>
                  <h2>{tr("Documents Checklist")}</h2>
                </div>
              </div>

              {documents.length > 0 ? (
                <div className="document-list">
                  {documents.map((document, index) => (
                    <div
                      className="document-item"
                      key={document}
                    >
                      <div className="document-number">
                        {index + 1}
                      </div>

                      <span>{document}</span>
                      <CheckCircle2 size={16} />
                    </div>
                  ))}
                </div>
              ) : (
                <p>
                  {tr(
                    "Check the official portal for the required documents."
                  )}
                </p>
              )}
            </section>
          </div>

          <aside className="scheme-details-right">
            <div className="application-card">
              <div className="application-card-icon">
                🚀
              </div>

              <p className="application-label">
                {tr("READY TO EXPLORE?")}
              </p>

              <h2>{tr("Start Your Application")}</h2>

              <p>
                {tr(
                  "Review the official scheme guidelines and confirm your eligibility before applying."
                )}
              </p>

              <button
                className="apply-button"
                onClick={handleApply}
              >
                {tr("Open Official Portal")}
                <ExternalLink size={17} />
              </button>

              <button
                className="details-back-action"
                onClick={() =>
                  navigate("/eligibility-checker")
                }
              >
                {tr("Check Another Scheme")}
              </button>
            </div>

            <div className="verification-card">
              <ShieldCheck size={25} />

              <div>
                <strong>
                  {tr("Verify Before Applying")}
                </strong>

                <p>
                  {tr(
                    "Eligibility, documents, benefits and application rules can change. Always verify current information on the official government portal."
                  )}
                </p>
              </div>
            </div>

            {scheme.officialLink &&
              scheme.officialLink !== "#" && (
                <a
                  href={scheme.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="official-link-card"
                >
                  <Landmark size={21} />

                  <div>
                    <strong>
                      {tr("Official Scheme Portal")}
                    </strong>

                    <span>
                      {tr("Open government website")}
                    </span>
                  </div>

                  <ExternalLink size={16} />
                </a>
              )}
          </aside>
        </div>
      </div>
    </main>
  );
}

export default SchemeDetails;