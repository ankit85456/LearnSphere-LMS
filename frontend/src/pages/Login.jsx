import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, Lock, ArrowRight, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  const { login, error, setError, loading } = useAuth();
  const navigate = useNavigate();

  // Clear errors when visiting the page
  useEffect(() => {
    setError(null);
    setFormError('');
  }, [setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setError(null);

    // Simple Client-side validation
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      // Error handled by AuthContext, will show up in 'error'
    }
  };

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Brand Logo */}
        <div className="auth-brand">
          <Link to="/" className="logo-section">
            <GraduationCap className="logo-icon" size={32} />
            <span className="logo-text">Learn<span>Sphere</span></span>
          </Link>
          <h2>Welcome back!</h2>
          <p>Login to resume your learning path</p>
        </div>

        {/* Errors Display */}
        {(formError || error) && (
          <motion.div 
            className="alert alert-error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <AlertCircle size={18} />
            <span>{formError || error}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-icon-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-icon-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full btn-large"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="spinner-icon" size={18} />
                Signing In...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            New to LearnSphere? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
