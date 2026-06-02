import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="auth-container">
      <div
        className="auth-card"
        style={{ textAlign: "center", padding: "3rem 2rem" }}
      >
        {/* Visual Cue: Large 404 Status */}
        <h1
          className="auth-title"
          style={{
            fontSize: "4rem",
            marginBottom: "0.5rem",
            color: "var(--primary-color, #8B5A2B)",
          }}
        >
          404
        </h1>

        <h2
          className="auth-subtitle"
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          Page Not Found
        </h2>

        <p
          className="auth-footer-text"
          style={{
            marginBottom: "2rem",
            maxWidth: "300px",
            marginGrid: "0 auto",
          }}
        >
          We looked everywhere, but we couldn't find the page you're searching
          for. It might have been moved or deleted.
        </p>

        {/* Declarative Link to navigate home safely without page reload */}
        <Link
          to="/home"
          className="auth-button"
          style={{
            display: "inline-block",
            textDecoration: "none",
            width: "auto",
            padding: "0.75rem 2rem",
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
