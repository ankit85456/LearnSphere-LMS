import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, User, Mail, Lock, BookOpen, UserCheck, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'instructor' ? 'instructor' : 'student';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(initialRole);
  const [formError, setFormError] = useState('');

  const { register, error, setError, loading } = useAuth();
  const navigate = useNavigate();

  // Reset errors on load
  useEffect(() => {
    setError(null);
    setFormError('');
  }, [setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setError(null);

    // Form validation
    if (!name || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    try {
      await register(name, email, password, role);
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
          <h2>Create account</h2>
          <p>Join LearnSphere as a student or instructor</p>
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

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          
          {/* Role selector cards */}
          <div className="role-selector-container">
            <label className="section-label">Select Your Role</label>
            <div className="role-options">
              <div 
                className={`role-option-card ${role === 'student' ? 'active-student' : ''}`}
                onClick={() => setRole('student')}
              >
                <UserCheck size={20} className="role-icon" />
                <div className="role-option-text">
                  <span className="role-title">Student</span>
                  <span className="role-desc">I want to learn skills</span>
                </div>
              </div>

              <div 
                className={`role-option-card ${role === 'instructor' ? 'active-instructor' : ''}`}
                onClick={() => setRole('instructor')}
              >
                <BookOpen size={20} className="role-icon" />
                <div className="role-option-text">
                  <span className="role-title">Instructor</span>
                  <span className="role-desc">I want to teach courses</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-icon-wrapper">
              <User className="input-icon" size={18} />
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

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
            <label htmlFor="password">Password</label>
            <div className="input-icon-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                id="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-icon-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                id="confirmPassword"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
