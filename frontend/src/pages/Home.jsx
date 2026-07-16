import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Compass, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      className="landing-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header / Nav */}
      <header className="landing-header">
        <div className="logo-section">
          <GraduationCap className="logo-icon animate-glow" size={36} />
          <span className="logo-text">Learn<span>Sphere</span></span>
        </div>
        <div className="header-actions">
          <Link to="/login" className="btn btn-secondary">Sign In</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div className="hero-content" variants={itemVariants}>
          <div className="badge">
            <Cpu size={14} className="badge-icon" />
            <span>Next-Generation LMS Platform</span>
          </div>
          <h1>
            Map out your knowledge with <span className="text-gradient">LearnSphere</span>
          </h1>
          <p className="hero-subtitle">
            An advanced, clean, and intuitive ecosystem for learning. Empowering instructors to create immersive courses, and inspiring students to build career-defining skills.
          </p>
          <div className="hero-buttons">
            <Link to="/register?role=student" className="btn btn-primary btn-large">
              Join as Student <ArrowRight size={18} />
            </Link>
            <Link to="/register?role=instructor" className="btn btn-outline btn-large">
              Teach on LearnSphere
            </Link>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div className="features-grid" variants={containerVariants}>
          <motion.div className="feature-card" variants={itemVariants} whileHover={{ y: -8 }}>
            <div className="icon-wrapper border-student">
              <Compass className="icon student-color" size={24} />
            </div>
            <h3>Explore & Discover</h3>
            <p>Access hundreds of curated courses in software engineering, AI, creative arts, and business strategies.</p>
          </motion.div>

          <motion.div className="feature-card" variants={itemVariants} whileHover={{ y: -8 }}>
            <div className="icon-wrapper border-instructor">
              <BookOpen className="icon instructor-color" size={24} />
            </div>
            <h3>Expert Instruction</h3>
            <p>Teach with state-of-the-art course builders, quizzes, and live assessments tailored for student success.</p>
          </motion.div>

          <motion.div className="feature-card" variants={itemVariants} whileHover={{ y: -8 }}>
            <div className="icon-wrapper border-accent">
              <ShieldCheck className="icon accent-color" size={24} />
            </div>
            <h3>Verified Credentials</h3>
            <p>Earn cryptographically signed, shareable certificates that validate your professional expertise.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} LearnSphere LMS. All rights reserved.</p>
      </footer>
    </motion.div>
  );
};

export default Home;
