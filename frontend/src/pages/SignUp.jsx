import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import illustration from '/image.png';
import InputField from '../components/InputField';
import AuthFooter from '../components/AuthFooter';
import Header from '../components/Header/Header';
import { COLORS } from '../styles/colors';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState({
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Client-side validation
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const { data } = response;

      // Store token in sessionStorage (session-based)
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.user));
      
      // Check if there's a redirect path, otherwise default to /app
      const redirectTo = location.state?.redirectTo || "/app";
      navigate(redirectTo);
    } catch (error) {
      // Axios provides better error handling
      const errorMessage = error.response?.data?.message || 'Signup failed';
      if (errorMessage.includes('email')) {
        setErrors({ email: errorMessage });
      } else {
        setErrors({ general: errorMessage });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <motion.div 
        className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Form Section */}
        <motion.div 
          className="w-full md:w-1/2 p-8"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
              <i className="fa-solid fa-file-lines text-xl" style={{ color: COLORS.primary }}></i> ATS Resume Checker
            </h2>
            <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>Create your account</p>
          </div>

          {errors.general && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <InputField
              label="Full Name"
              icon={User}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              error={!!errors.name}
              errorMessage={errors.name}
              disabled={loading}
            />
            
            <InputField
              label="Email Address"
              icon={Mail}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              error={!!errors.email}
              errorMessage={errors.email}
              disabled={loading}
            />
            
            <InputField
              label="Password"
              icon={Lock}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              showToggle
              showPassword={toggle.password}
              onToggle={() =>
                setToggle((prev) => ({ ...prev, password: !prev.password }))
              }
              error={!!errors.password}
              errorMessage={errors.password}
              disabled={loading}
            />
            
            <InputField
              label="Confirm Password"
              icon={Lock}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              showToggle
              showPassword={toggle.confirmPassword}
              onToggle={() =>
                setToggle((prev) => ({
                  ...prev,
                  confirmPassword: !prev.confirmPassword,
                }))
              }
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              disabled={loading}
            />

            <div className="text-sm" style={{ color: COLORS.textMuted }}>
              <label className="flex items-start gap-2">
                <input type="checkbox" required className="mt-1" disabled={loading} />
                <span>
                  I agree to the{' '}
                  <a href="/terms" style={{ color: COLORS.secondary }} className="hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" style={{ color: COLORS.secondary }} className="hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-white rounded-md font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                background: loading ? COLORS.textMuted : COLORS.primary,
                cursor: loading ? "not-allowed" : "pointer"
              }}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          <AuthFooter />
        </motion.div>

        {/* Image Section */}
        <motion.div 
          className="hidden md:flex w-1/2 items-center justify-center p-6"
          style={{ background: COLORS.background }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
        >
          <img
            src={illustration}
            alt="ATS Resume"
            className="max-h-[60%] object-contain"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default SignUp;
