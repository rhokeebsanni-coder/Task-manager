import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/tasks";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const response = await API.post("/auth/register", {
        username,
        email,
        password,
        confirmPassword,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/home", { replace: true });
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.msg || "Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Get started with your new task manager</p>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <label className="auth-label">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="e.g., alex_dev"
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
              required
            />
          </div>

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

          <div className="auth-input-group">
            <label className="auth-label">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              placeholder="••••••••"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="auth-input"
              required
            />
            <button
              type="button"
              className="auth-toggle-visibility"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            ></button>
          </div>

          <button type="submit" className="auth-button">
            Register
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign In
          </Link>
        </p>
        <div className="login-divider">
          <span>or</span>
        </div>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              const response = await API.post("/auth/googleLogin", {
                credential: credentialResponse.credential,
              });
              const token = response.data.token;
              localStorage.setItem("token", token);
              navigate("/home", { replace: true });
            } catch (error) {
              setError(
                error.response?.data?.msg || "Google login failed. Try again.",
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
  );
};

export default Register;
