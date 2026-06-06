
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Toggle component */
const SettingToggle = ({ label, description, value, onChange }) => (
  <div className="settings-toggle-row">
    <div>
      <p className="settings-toggle-label">{label}</p>
      <p className="settings-toggle-desc">{description}</p>
    </div>
    <label className="toggle-switch">
      <input type="checkbox" checked={value} onChange={onChange} />
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
    </label>
  </div>
);

/* Settings page */
const Settings = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    notifications: true,
    emailDigest:   false,
    darkMode:      false,
    compactView:   false,
    soundEnabled:  true,
    autoRefresh:   true,
  });

  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth:changed"));
    navigate("/login");
  };

  const toggle = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="settings-wrapper">
      <div className="settings-container">

        {/* Header */}
        <div className="settings-header">
          <button className="settings-back-btn" onClick={() => navigate(-1)} title="Go back">
            Back
          </button>
          <h1 className="settings-title">Settings</h1>
        </div>

        {/* Main card */}
        <div className="settings-card">

          {/* Profile */}
          <div className="settings-section">
            <h2 className="settings-section-title">Profile</h2>
            <div className="settings-profile-row">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="User avatar"
                className="settings-avatar"
              />
              <div>
                <p className="settings-profile-name">John Doe</p>
                <p className="settings-profile-email">john@example.com</p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="settings-section">
            <h2 className="settings-section-title">Notifications</h2>
            <SettingToggle label="Enable Notifications" description="Get alerts for task reminders"      value={settings.notifications} onChange={() => toggle("notifications")} />
            <SettingToggle label="Email Digest"         description="Receive weekly summary emails"      value={settings.emailDigest}   onChange={() => toggle("emailDigest")}   />
            <SettingToggle label="Sound Effects"        description="Play sounds for notifications"      value={settings.soundEnabled}  onChange={() => toggle("soundEnabled")}  />
          </div>

          {/* Display */}
          <div className="settings-section">
            <h2 className="settings-section-title">Display</h2>
            <SettingToggle label="Dark Mode"    description="Use dark theme for reduced eye strain" value={settings.darkMode}    onChange={() => toggle("darkMode")}    />
            <SettingToggle label="Compact View" description="Show more tasks on screen"             value={settings.compactView} onChange={() => toggle("compactView")} />
          </div>

          {/* System */}
          <div className="settings-section">
            <h2 className="settings-section-title">System</h2>
            <SettingToggle label="Auto Refresh" description="Automatically sync tasks every 30 seconds" value={settings.autoRefresh} onChange={() => toggle("autoRefresh")} />
            <div className="settings-version-row">
              <div>
                <p className="settings-toggle-label">App Version</p>
                <p className="settings-toggle-desc">View current version and updates</p>
              </div>
              <span className="settings-version-badge">v1.0.0</span>
            </div>
          </div>

          {/* Logout */}
          <div className="settings-logout-section">
            {!showConfirm ? (
              <button className="settings-logout-btn" onClick={() => setShowConfirm(true)}>
                Logout
              </button>
            ) : (
              <div className="settings-confirm-box">
                <p className="settings-confirm-text">Are you sure you want to logout?</p>
                <div className="settings-confirm-btns">
                  <button className="btn-confirm-logout" onClick={handleLogout}>Yes, Logout</button>
                  <button className="btn-confirm-cancel" onClick={() => setShowConfirm(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="settings-info-footer">
          Your settings are automatically saved
        </div>

      </div>
    </div>
  );
};

export default Settings;
