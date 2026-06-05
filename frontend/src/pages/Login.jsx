import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import API from "../api/tasks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/home", { replace: true });
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.msg || "Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Log in to manage your daily workspace</p>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <label className="auth-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
            <button
              type="button"
              className="auth-toggle-visibility"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? (
                /* Eye Slash Icon (Hide) */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                  <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                  <line x1="2" y1="2" x2="22" y2="22"></line>
                </svg>
              ) : (
                /* Eye Icon (Show) */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>

          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>

        <p className="auth-footer-text">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">
            Create one
          </Link>
        </p>
        <div className="login-divider">
          <span>or</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const response = await API.post("/auth/googleLogin", {
                  credential: credentialResponse.credential,
                });
                console.log("FULL GOOGLE RESPONSE:", credentialResponse);
                const token = response.data.token;
                localStorage.setItem("token", token);
                navigate("/home", { replace: true });
              } catch (error) {
                setError(
                  error.response?.data?.msg ||
                    "Google login failed. Try again.",
                );
              }
            }}
            onError={() => {
              setError("Google login failed.");
            }}
            theme="outline"
            shape="pill" // ⚡ Makes the button fully rounded
            size="large" // ⚡ Makes the button larger vertically
            width="320px" // ⚡ Sets a concrete, larger width (match this to your main button width)
          >
            Sign in with Google
          </GoogleLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
