import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  // State for an interactive preview switcher to showcase development skills
  const [activeFeature, setActiveFeature] = React.useState("focus");
  const navigate = useNavigate()

  const featureData = {
    focus: {
      title: "Brewed for Deep Focus",
      desc: "Clean minimal interfaces designed to strip away ambient digital friction, keeping your current core goal center-stage.",
      metric: "40% reduction in daily cognitive drag.",
    },
    analytics: {
      title: "Caffeine-Infused Analytics",
      desc: "Track task completion speed and daily productivity metrics over time using smooth structural data loops.",
      metric: "Visualized progress logs update in real-time.",
    },
    sync: {
      title: "Seamless Cloud Streams",
      desc: "Full-stack token streaming guarantees that your tasks are perfectly synchronized across multiple clients dynamically.",
      metric: "Secured with authenticated server-side architecture.",
    },
  };

  return (
    <div className="landing-container">
      {/* Dynamic Background Blurs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      {/* Navigation Header */}
      <nav className="landing-nav">
        <div className="logo-section">
          <span className="logo-icon">☕</span>
          <span className="logo-text">Daily Brew</span>
        </div>
        <div className="nav-actions">
          <button
            className="btn-secondary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign In
          </button>
          <button
            className="btn-primary"
            onClick={() => {
              navigate("/register");
            }}
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <div className="tagline-badge">✨ Redefining Productivity</div>
          <h1 className="hero-title">
            Capture your thoughts, <br />
            <span className="text-highlight">one task at a time.</span>
          </h1>
          <p className="hero-subtitle">
            A premium, distraction-free digital canvas designed for developers,
            creatives, and builders who turn ideas into reality daily.
          </p>
          <div className="cta-group">
            <button className="btn-primary btn-large">
              Launch Application
            </button>
            <button className="btn-secondary btn-large">
              View Documentation
            </button>
          </div>
        </div>

        {/* High-Fidelity Glassmorphism Interface Mockup */}
        <div className="hero-visual">
          <div className="glass-card-preview">
            <div className="glass-header">
              <div className="window-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="glass-title">Daily Brew Dashboard</div>
            </div>

            <div className="mock-task-list">
              <div className="mock-item completed">
                <div className="check-circle checked">✓</div>
                <div className="mock-text">
                  Refactor database authentication validation schema
                </div>
              </div>
              <div className="mock-item active">
                <div className="check-circle intense"></div>
                <div className="mock-text">
                  Polish glassmorphic landing layout variables
                </div>
              </div>
              <div className="mock-item">
                <div className="check-circle"></div>
                <div className="mock-text">
                  Build custom skeleton loaders for homepage stream
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Interactive Skills Showcase Section */}
      <section className="features-showcase">
        <div className="section-header-center">
          <h2 className="showcase-title">Engineered For Performance</h2>
          <p className="showcase-subtitle">
            Click below to preview how our application mechanics optimize system
            experiences.
          </p>
        </div>

        <div className="interactive-widget">
          <div className="widget-tabs">
            {Object.keys(featureData).map((key) => (
              <button
                key={key}
                className={`tab-btn ${activeFeature === key ? "active" : ""}`}
                onClick={() => setActiveFeature(key)}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="widget-display-card">
            <h3>{featureData[activeFeature].title}</h3>
            <p>{featureData[activeFeature].desc}</p>
            <div className="widget-footer-metric">
              <span className="metric-label">System Value:</span>{" "}
              {featureData[activeFeature].metric}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
