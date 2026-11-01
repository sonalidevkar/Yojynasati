
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Brain,
  Calculator,
  CheckCircle2,
  FileText,
  Landmark,
  Search,
  Sparkles,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";

// Live backend URL
const API_URL = "https://yojynasati.onrender.com";

const translations = {
  en: {
    welcome: "Your Entrepreneur Dashboard",
    welcomeDesc: "Discover government schemes, check eligibility, get AI recommendations and manage your journey.",
    aiLabel: "AI-POWERED RECOMMENDATION",
    aiTitle: "Find schemes made for your needs",
    aiDesc: "Tell YojanaSathi AI about your category, business type and financial requirement. We will identify suitable government schemes.",
    findSchemes: "Find My Matching Schemes",
    aiReady: "AI Matching Ready",
    availableSchemes: "Available Schemes",
    aiMatching: "AI Matching",
    ready: "Ready",
    applicationTracking: "Application Tracking",
    available: "Available",
    financialTools: "Financial Tools",
    exploreLabel: "EXPLORE",
    quickActions: "Quick Actions",
    browseSchemes: "Browse Schemes",
    browseDesc: "Explore government schemes, loans, subsidies and support.",
    explore: "Explore",
    schemeMatching: "AI Scheme Matching",
    matchingDesc: "Get personalized recommendations based on your profile.",
    findMatch: "Find Match",
    calculator: "Financial Calculator",
    calculatorDesc: "Estimate loan payments and understand your financial needs.",
    calculate: "Calculate",
    trackApplication: "Track Application",
    trackDesc: "Follow your application journey and check its current status.",
    track: "Track",
    journeyLabel: "YOUR JOURNEY",
    journeyTitle: "From Discovery to Growth",
    discover: "Discover",
    discoverDesc: "Explore relevant government opportunities.",
    match: "Match",
    matchDesc: "Let AI identify schemes suitable for your needs.",
    qualify: "Qualify",
    qualifyDesc: "Understand eligibility and required documents.",
    grow: "Grow",
    growDesc: "Apply confidently and build your business.",
    ctaLabel: "READY TO GET STARTED?",
    ctaTitle: "Find the support your business deserves.",
    ctaDesc: "YojanaSathi AI helps you move from searching to taking action.",
    ctaButton: "Start AI Matching",
  },

  hi: {
    welcome: "आपका उद्यमी डैशबोर्ड",
    welcomeDesc: "सरकारी योजनाएँ खोजें, पात्रता जाँचें, AI सुझाव पाएँ और अपनी प्रगति प्रबंधित करें।",
    aiLabel: "AI आधारित सुझाव",
    aiTitle: "अपनी ज़रूरतों के अनुसार योजनाएँ खोजें",
    aiDesc: "YojanaSathi AI को अपनी श्रेणी, व्यवसाय का प्रकार और वित्तीय आवश्यकता बताएँ। हम उपयुक्त सरकारी योजनाएँ खोजने में मदद करेंगे।",
    findSchemes: "मेरे लिए उपयुक्त योजनाएँ खोजें",
    aiReady: "AI मिलान तैयार है",
    availableSchemes: "उपलब्ध योजनाएँ",
    aiMatching: "AI योजना मिलान",
    ready: "तैयार",
    applicationTracking: "आवेदन ट्रैकिंग",
    available: "उपलब्ध",
    financialTools: "वित्तीय उपकरण",
    exploreLabel: "खोजें",
    quickActions: "त्वरित विकल्प",
    browseSchemes: "योजनाएँ देखें",
    browseDesc: "सरकारी योजनाएँ, ऋण, सब्सिडी और सहायता खोजें।",
    explore: "देखें",
    schemeMatching: "AI योजना मिलान",
    matchingDesc: "अपनी प्रोफ़ाइल के आधार पर व्यक्तिगत सुझाव पाएँ।",
    findMatch: "मिलान खोजें",
    calculator: "वित्तीय कैलकुलेटर",
    calculatorDesc: "ऋण की किस्तों का अनुमान लगाएँ और वित्तीय ज़रूरतें समझें।",
    calculate: "गणना करें",
    trackApplication: "आवेदन ट्रैक करें",
    trackDesc: "अपने आवेदन की प्रगति और वर्तमान स्थिति देखें।",
    track: "ट्रैक करें",
    journeyLabel: "आपकी यात्रा",
    journeyTitle: "खोज से विकास तक",
    discover: "खोजें",
    discoverDesc: "संबंधित सरकारी अवसर खोजें।",
    match: "मिलान",
    matchDesc: "AI को अपनी ज़रूरतों के अनुसार योजनाएँ पहचानने दें।",
    qualify: "पात्रता",
    qualifyDesc: "पात्रता और आवश्यक दस्तावेज़ समझें।",
    grow: "विकास",
    growDesc: "आत्मविश्वास से आवेदन करें और अपना व्यवसाय बढ़ाएँ।",
    ctaLabel: "शुरू करने के लिए तैयार हैं?",
    ctaTitle: "अपने व्यवसाय के लिए सही सहायता खोजें।",
    ctaDesc: "YojanaSathi AI खोज से कार्रवाई तक आपकी मदद करता है।",
    ctaButton: "AI मिलान शुरू करें",
  },

  mr: {
    welcome: "तुमचा उद्योजक डॅशबोर्ड",
    welcomeDesc: "सरकारी योजना शोधा, पात्रता तपासा, AI शिफारसी मिळवा आणि तुमचा प्रवास व्यवस्थापित करा.",
    aiLabel: "AI आधारित शिफारस",
    aiTitle: "तुमच्या गरजांसाठी योग्य योजना शोधा",
    aiDesc: "YojanaSathi AI ला तुमचा प्रवर्ग, व्यवसायाचा प्रकार आणि आर्थिक गरज सांगा. आम्ही योग्य सरकारी योजना शोधण्यास मदत करू.",
    findSchemes: "माझ्यासाठी योग्य योजना शोधा",
    aiReady: "AI जुळणी तयार आहे",
    availableSchemes: "उपलब्ध योजना",
    aiMatching: "AI योजना जुळणी",
    ready: "तयार",
    applicationTracking: "अर्ज ट्रॅकिंग",
    available: "उपलब्ध",
    financialTools: "आर्थिक साधने",
    exploreLabel: "शोधा",
    quickActions: "जलद पर्याय",
    browseSchemes: "योजना पाहा",
    browseDesc: "सरकारी योजना, कर्ज, अनुदाने आणि सहाय्य शोधा.",
    explore: "पाहा",
    schemeMatching: "AI योजना जुळणी",
    matchingDesc: "तुमच्या प्रोफाइलनुसार वैयक्तिक शिफारसी मिळवा.",
    findMatch: "जुळणी शोधा",
    calculator: "आर्थिक कॅल्क्युलेटर",
    calculatorDesc: "कर्जाचे हप्ते मोजा आणि तुमच्या आर्थिक गरजा समजून घ्या.",
    calculate: "गणना करा",
    trackApplication: "अर्ज ट्रॅक करा",
    trackDesc: "अर्जाचा प्रवास आणि सध्याची स्थिती तपासा.",
    track: "ट्रॅक करा",
    journeyLabel: "तुमचा प्रवास",
    journeyTitle: "योजना शोधण्यापासून प्रगतीपर्यंत",
    discover: "शोधा",
    discoverDesc: "संबंधित सरकारी संधी शोधा.",
    match: "जुळणी",
    matchDesc: "AI ला तुमच्या गरजांसाठी योग्य योजना शोधू द्या.",
    qualify: "पात्रता",
    qualifyDesc: "पात्रता आणि आवश्यक कागदपत्रे समजून घ्या.",
    grow: "प्रगती",
    growDesc: "आत्मविश्वासाने अर्ज करा आणि व्यवसाय वाढवा.",
    ctaLabel: "सुरुवात करण्यास तयार आहात?",
    ctaTitle: "तुमच्या व्यवसायासाठी योग्य सहाय्य शोधा.",
    ctaDesc: "YojanaSathi AI तुम्हाला योजना शोधण्यापासून पुढील कृतीपर्यंत मदत करते.",
    ctaButton: "AI जुळणी सुरू करा",
  },
};

function Dashboard() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const [schemeCount, setSchemeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch scheme count from the deployed backend
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/schemes`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setSchemeCount(data.count || 0);
        }
      } catch (error) {
        console.error("Dashboard scheme fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  const stats = [
    {
      icon: Landmark,
      label: t.availableSchemes,
      value: loading ? "..." : schemeCount,
    },
    {
      icon: Brain,
      label: t.aiMatching,
      value: t.ready,
    },
    {
      icon: FileText,
      label: t.applicationTracking,
      value: t.available,
    },
    {
      icon: WalletCards,
      label: t.financialTools,
      value: t.available,
    },
  ];

  const actions = [
    {
      to: "/schemes",
      icon: Search,
      title: t.browseSchemes,
      desc: t.browseDesc,
      action: t.explore,
    },
    {
      to: "/match-scheme",
      icon: Brain,
      title: t.schemeMatching,
      desc: t.matchingDesc,
      action: t.findMatch,
    },
    {
      to: "/calculator",
      icon: Calculator,
      title: t.calculator,
      desc: t.calculatorDesc,
      action: t.calculate,
    },
    {
      to: "/track",
      icon: FileText,
      title: t.trackApplication,
      desc: t.trackDesc,
      action: t.track,
    },
  ];

  const journey = [
    {
      icon: Search,
      title: t.discover,
      desc: t.discoverDesc,
    },
    {
      icon: Brain,
      title: t.match,
      desc: t.matchDesc,
    },
    {
      icon: CheckCircle2,
      title: t.qualify,
      desc: t.qualifyDesc,
    },
    {
      icon: TrendingUp,
      title: t.grow,
      desc: t.growDesc,
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        {/* Welcome Section */}
        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-label">YOJANASATHI AI</p>
            <h1>{t.welcome}</h1>
            <p>{t.welcomeDesc}</p>
          </div>

          <div className="dashboard-ai-icon">
            <Brain size={32} />
          </div>
        </section>

        {/* AI Recommendation Card */}
        <section className="dashboard-main-card">
          <div className="dashboard-main-content">
            <div className="dashboard-main-icon">
              <Sparkles size={28} />
            </div>

            <p className="dashboard-card-label">{t.aiLabel}</p>
            <h2>{t.aiTitle}</h2>
            <p>{t.aiDesc}</p>

            <Link to="/match-scheme" className="dashboard-primary-btn">
              {t.findSchemes}
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="dashboard-main-visual">
            <div className="dashboard-visual-circle">
              <Brain size={55} />
            </div>

            <div className="dashboard-floating-card">
              <CheckCircle2 size={18} />
              <span>{t.aiReady}</span>
            </div>
          </div>
        </section>

        {/* Dashboard Statistics */}
        <section className="dashboard-stats">
          {stats.map(({ icon: Icon, label, value }, index) => (
            <div className="dashboard-stat-card" key={index}>
              <div className="dashboard-stat-icon">
                <Icon size={22} />
              </div>

              <div>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div>
              <p>{t.exploreLabel}</p>
              <h2>{t.quickActions}</h2>
            </div>

            <TrendingUp size={25} />
          </div>

          <div className="dashboard-actions-grid">
            {actions.map(({ to, icon: Icon, title, desc, action }) => (
              <Link to={to} className="dashboard-action-card" key={to}>
                <div className="action-icon">
                  <Icon size={23} />
                </div>

                <h3>{title}</h3>
                <p>{desc}</p>

                <span>
                  {action}
                  <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* User Journey */}
        <section className="dashboard-journey">
          <div className="dashboard-section-heading">
            <div>
              <p>{t.journeyLabel}</p>
              <h2>{t.journeyTitle}</h2>
            </div>
          </div>

          <div className="journey-grid">
            {journey.map(({ icon: Icon, title, desc }, index) => (
              <React.Fragment key={title}>
                {index > 0 && <div className="journey-line" />}

                <div className="journey-step">
                  <div className="journey-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <Icon size={21} />
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Bottom Call To Action */}
        <section className="dashboard-bottom-cta">
          <div>
            <p>{t.ctaLabel}</p>
            <h2>{t.ctaTitle}</h2>
            <span>{t.ctaDesc}</span>
          </div>

          <Link to="/match-scheme" className="dashboard-cta-btn">
            {t.ctaButton}
            <ArrowRight size={18} />
          </Link>
        </section>

      </div>
    </div>
  );
}

export default Dashboard;
