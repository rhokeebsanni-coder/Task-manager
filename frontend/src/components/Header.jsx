import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.25rem 2rem",
        backgroundColor: "rgb(122,94,62)", // Deep roasted coffee brown background
        borderBottom: "1px solid #3E2C20",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Brand Logo Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {/* Decorative dynamic coffee cup icon using pure CSS */}
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            backgroundColor: "#8B5A2B", // Your primary brown
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFF",
            fontWeight: "bold",
            fontSize: "1.1rem",
            boxShadow: "0 2px 8px rgba(139, 90, 43, 0.4)",
          }}
        >
          ☕
        </div>

        <p
          style={{
            margin: 0,
            fontSize: "1.4rem",
            fontWeight: "800",
            letterSpacing: "-0.5px",
            color: "#F5F0EB", // Soft cream text
          }}
        >
          Daily <span style={{ color: "#D4A373" }}>Brew</span>
        </p>
      </div>

      {/* Right Side: Interactive User Profile/Settings Link */}
      <Link
        to="/settings"
        title="Account Settings"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          textDecoration: "none",
          padding: "0.5rem 0.75rem",
          borderRadius: "12px",
          transition: "all 0.2s ease",
          border: "1px solid transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#3E2C20";
          e.currentTarget.style.borderColor = "#543D2E";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.borderColor = "transparent";
        }}
      >
        {/* Simulated dynamic user profile image */}
        <div style={{ position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" // High quality portrait asset
            alt="User profile"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #8B5A2B",
            }}
          />
          {/* Subtle status indicator dot or tiny gear layout overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "12px",
              height: "12px",
              backgroundColor: "#D4A373",
              border: "2px solid #2B1E16",
              borderRadius: "50%",
            }}
          />
        </div>
      </Link>
    </header>
  );
};

export default Header;
