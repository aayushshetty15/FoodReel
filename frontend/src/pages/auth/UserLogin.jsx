import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RoleToggle from '../../components/RoleToggle';
import '../../styles/auth.css';

const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/user/login',
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      setSuccess(response.data.message || 'User Logged in Successfully');
      // Can redirect to home or user feed:
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Invalid email or password';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-brand-row">
            <Link to="/" className="auth-logo">
              <span className="auth-logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                </svg>
              </span>
              <span>FoodReel</span>
            </Link>
          </div>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your account to continue discovering</p>
        </div>

        <RoleToggle activeRole="user" type="login" />

        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-900/50">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 text-sm text-green-600 bg-green-50 dark:bg-green-950/40 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-900/50">
            {success}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="user-login-email">
              Email Address
            </label>
            <div className="form-input-container">
              <input
                id="user-login-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="user-login-password">
              Password
            </label>
            <div className="form-input-container">
              <input
                id="user-login-password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label" htmlFor="user-remember-me">
              <input type="checkbox" id="user-remember-me" />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Don't have an account?{' '}
            <Link to="/user/register" className="auth-link">
              Sign up
            </Link>
          </p>

          <div className="portal-switch-box">
            <span>Are you a food partner?</span>
            <Link to="/food-partner/login" className="portal-switch-link">
              Partner Portal →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
