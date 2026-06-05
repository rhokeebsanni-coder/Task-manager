import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="site-header">
      {/* Brand */}
      <div className="header-brand">
        <div className="header-brand-icon">☕</div>
        <p className="header-brand-name">
          Daily <span>Brew</span>
        </p>
      </div>

      {/* Avatar / settings link */}
      <Link to="/settings" title="Account Settings" className="header-avatar-link">
        <div className="header-avatar-wrap">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            alt="User profile"
          />
          <div className="header-avatar-dot" />
        </div>
      </Link>
    </header>
  );
};

export default Header;
