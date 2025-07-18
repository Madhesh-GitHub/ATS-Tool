import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { COLORS } from "../styles/colors";
import axios from "axios";
import "./Login.css";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      const { token, user } = response.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      navigate(location.state?.redirectTo || "/app");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const res = await axios.post("http://localhost:5000/api/users/google-login", {
        credential,
      });

      const { token, user } = res.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      navigate(location.state?.redirectTo || "/app");
    } catch (err) {
      console.error(err);
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <motion.div
      className="login-root"
      style={{ background: COLORS.background }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="login-left"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
      >
        <h1 style={{ color: COLORS.primary }}>Welcome Back</h1>
        <p style={{ color: COLORS.textMuted }}>
          Log in to your account to access your resume tools and continue building your professional profile.
        </p>
        <img src="/image1.png" alt="Person at desk" className="login-illustration" />
      </motion.div>

      <motion.div
        className="login-right"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
      >
        <div className="login-header">
          <span className="login-logo" style={{ color: COLORS.primary }}>📄</span>
          <span className="login-title" style={{ color: COLORS.primary, fontWeight: 700 }}>CVortex</span>
        </div>
        <h2 style={{ color: COLORS.primary }}>Login to your account</h2>

        {location.state?.redirectTo && (
          <div
            style={{
              color: COLORS.primary,
              background: "#F0F4FF",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "15px",
              border: "1px solid #E0E7FF",
              fontSize: "14px",
            }}
          >
            {location.state.redirectTo === "/builder"
              ? "Please login to access Resume Builder"
              : "Please login to upload your resume"}
          </div>
        )}

        {error && (
          <div
            style={{
              color: COLORS.error,
              background: "#FEF2F2",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "15px",
              border: "1px solid #FECACA",
            }}
          >
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <label style={{ color: COLORS.textPrimary }}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={loading}
          />

          <label style={{ color: COLORS.textPrimary }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={loading}
          />

          <div className="login-forgot">
            <a href="#" style={{ color: COLORS.secondary }}>Forgot Password?</a>
          </div>

          <motion.button
            type="submit"
            className="login-btn"
            style={{
              background: loading ? COLORS.textMuted : COLORS.primary,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
            whileHover={!loading ? { scale: 1.05, boxShadow: "0 4px 24px rgba(99,102,241,0.15)" } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <div className="login-divider"><span>or</span></div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError("Google login failed.")}
            size="large"
            theme="filled_black"
            width="100%"
          />
        </div>

        <div className="login-signup">
          <span style={{ color: COLORS.textMuted }}>Don't have an account?</span>
          <a href="/signup" style={{ color: COLORS.secondary }}>Sign up</a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Login;
