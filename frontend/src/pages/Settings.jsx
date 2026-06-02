import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    emailDigest: false,
    darkMode: false,
    compactView: false,
    soundEnabled: true,
    autoRefresh: true,
  });

  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const handleSettingChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F0EB",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {/* Header with Back Button */}
        <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: "#8B5A2B",
              border: "none",
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 8px rgba(139, 90, 43, 0.3)",
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "#F5F0EB",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#6B4423";
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 90, 43, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#8B5A2B";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(139, 90, 43, 0.3)";
            }}
            title="Go back"
          >
            ←
          </button>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "800",
              color: "#2B1E16",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            Settings
          </h1>
          <p
            style={{
              color: "#6B5344",
              marginTop: "0.5rem",
              fontSize: "0.95rem",
            }}
          >
            Manage your account and preferences
          </p>
        </div>

        {/* Settings Card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          {/* Profile Section */}
          <div
            style={{
              padding: "1.5rem",
              borderBottom: "1px solid #E8DCC8",
            }}
          >
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                color: "#2B1E16",
                margin: "0 0 1rem 0",
              }}
            >
              Profile
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="User avatar"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #D4A373",
                }}
              />
              <div>
                <p
                  style={{
                    margin: "0 0 0.25rem 0",
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#2B1E16",
                  }}
                >
                  John Doe
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.9rem",
                    color: "#6B5344",
                  }}
                >
                  john@example.com
                </p>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div
            style={{
              padding: "1.5rem",
              borderBottom: "1px solid #E8DCC8",
            }}
          >
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                color: "#2B1E16",
                margin: "0 0 1.5rem 0",
              }}
            >
              Notifications
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <SettingToggle
                label="Enable Notifications"
                description="Get alerts for task reminders"
                value={settings.notifications}
                onChange={() => handleSettingChange("notifications")}
              />
              <SettingToggle
                label="Email Digest"
                description="Receive weekly summary emails"
                value={settings.emailDigest}
                onChange={() => handleSettingChange("emailDigest")}
              />
              <SettingToggle
                label="Sound Effects"
                description="Play sounds for notifications"
                value={settings.soundEnabled}
                onChange={() => handleSettingChange("soundEnabled")}
              />
            </div>
          </div>

          {/* Display Section */}
          <div
            style={{
              padding: "1.5rem",
              borderBottom: "1px solid #E8DCC8",
            }}
          >
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                color: "#2B1E16",
                margin: "0 0 1.5rem 0",
              }}
            >
              Display
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <SettingToggle
                label="Dark Mode"
                description="Use dark theme for reduced eye strain"
                value={settings.darkMode}
                onChange={() => handleSettingChange("darkMode")}
              />
              <SettingToggle
                label="Compact View"
                description="Show more tasks on screen"
                value={settings.compactView}
                onChange={() => handleSettingChange("compactView")}
              />
            </div>
          </div>

          {/* System Section */}
          <div
            style={{
              padding: "1.5rem",
              borderBottom: "1px solid #E8DCC8",
            }}
          >
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                color: "#2B1E16",
                margin: "0 0 1.5rem 0",
              }}
            >
              System
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <SettingToggle
                label="Auto Refresh"
                description="Automatically sync tasks every 30 seconds"
                value={settings.autoRefresh}
                onChange={() => handleSettingChange("autoRefresh")}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: "0 0 0.25rem 0",
                      fontSize: "0.95rem",
                      fontWeight: "600",
                      color: "#2B1E16",
                    }}
                  >
                    App Version
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.85rem",
                      color: "#6B5344",
                    }}
                  >
                    View current version and updates
                  </p>
                </div>
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "#8B5A2B",
                    fontWeight: "600",
                  }}
                >
                  v1.0.0
                </span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div
            style={{
              padding: "1.5rem",
              backgroundColor: "#FFF9F3",
            }}
          >
            {!showConfirm ? (
              <button
                onClick={() => setShowConfirm(true)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "#D4A373",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#B8885D";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(212, 163, 115, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#D4A373";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                🚪 Logout
              </button>
            ) : (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#FDF6F0",
                  borderRadius: "8px",
                  border: "1px solid #E8DCC8",
                }}
              >
                <p
                  style={{
                    margin: "0 0 1rem 0",
                    color: "#2B1E16",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                  }}
                >
                  Are you sure you want to logout?
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                  }}
                >
                  <button
                    onClick={handleLogout}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      backgroundColor: "#E63946",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#D62828";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#E63946";
                    }}
                  >
                    Yes, Logout
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      backgroundColor: "#6B5344",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#4A3A33";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#6B5344";
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#FFF9F3",
            borderRadius: "8px",
            border: "1px solid #E8DCC8",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.85rem",
              color: "#6B5344",
            }}
          >
            💡 Your settings are automatically saved
          </p>
        </div>
      </div>
    </div>
  );
};

const SettingToggle = ({ label, description, value, onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 0",
      }}
    >
      <div>
        <p
          style={{
            margin: "0 0 0.25rem 0",
            fontSize: "0.95rem",
            fontWeight: "600",
            color: "#2B1E16",
          }}
        >
          {label}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "0.85rem",
            color: "#6B5344",
          }}
        >
          {description}
        </p>
      </div>
      <label
        style={{
          position: "relative",
          display: "inline-block",
          width: "50px",
          height: "28px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={value}
          onChange={onChange}
          style={{
            opacity: 0,
            width: 0,
            height: 0,
          }}
        />
        <span
          style={{
            position: "absolute",
            cursor: "pointer",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: value ? "#8B5A2B" : "#D1C0B3",
            transition: "0.3s",
            borderRadius: "28px",
          }}
        >
          <span
            style={{
              position: "absolute",
              content: '""',
              height: "22px",
              width: "22px",
              left: value ? "24px" : "3px",
              bottom: "3px",
              backgroundColor: "white",
              transition: "0.3s",
              borderRadius: "50%",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          />
        </span>
      </label>
    </div>
  );
};

export default Settings;
