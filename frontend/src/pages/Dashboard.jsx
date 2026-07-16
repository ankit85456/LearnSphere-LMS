import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, LogOut, BookOpen, Clock, Award, 
  TrendingUp, Users, DollarSign, Star, Plus, FileText, Settings 
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  // Mock Student Data
  const studentStats = [
    { label: 'Enrolled Courses', value: '3', icon: BookOpen, color: 'student-color' },
    { label: 'Study Hours', value: '28.5 hrs', icon: Clock, color: 'accent-color' },
    { label: 'Completed Courses', value: '1', icon: Award, color: 'instructor-color' },
  ];

  const studentCourses = [
    { title: 'Introduction to Full-Stack Web Development', category: 'Coding', progress: 75, instructor: 'Dr. Sarah Jenkins' },
    { title: 'UI/UX Design Systems & Micro-animations', category: 'Design', progress: 92, instructor: 'Marcus Aurelius' },
    { title: 'Advanced Machine Learning with Python', category: 'Data Science', progress: 18, instructor: 'Prof. Alan Turing' },
  ];

  // Mock Instructor Data
  const instructorStats = [
    { label: 'Active Courses', value: '2', icon: BookOpen, color: 'instructor-color' },
    { label: 'Total Students', value: '512', icon: Users, color: 'student-color' },
    { label: 'Course Earnings', value: '$4,850', icon: DollarSign, color: 'accent-color' },
    { label: 'Avg Rating', value: '4.9 ★', icon: Star, color: 'star-color' },
  ];

  const instructorCourses = [
    { title: 'Mastering React 19 & Next.js Ecosystem', category: 'Web Dev', students: 320, rating: 4.9 },
    { title: 'Data Structures & Algorithms for Beginners', category: 'Computer Science', students: 192, rating: 4.8 },
  ];

  const isInstructor = user?.role === 'instructor';

  return (
    <div className="dashboard-container">
      {/* Sidebar / Left Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <GraduationCap className="logo-icon" size={28} />
          <span className="logo-text">Learn<span>Sphere</span></span>
        </div>

        <nav className="sidebar-nav">
          <a href="#dashboard" className="nav-item active">
            <TrendingUp size={18} />
            Dashboard
          </a>
          <a href="#courses" className="nav-item">
            <BookOpen size={18} />
            {isInstructor ? 'My Courses' : 'My Learning'}
          </a>
          <a href="#documents" className="nav-item">
            <FileText size={18} />
            Materials
          </a>
          <a href="#settings" className="nav-item">
            <Settings size={18} />
            Settings
          </a>
        </nav>

        <button onClick={handleLogout} className="sidebar-logout">
          <LogOut size={18} />
          Log Out
        </button>
      </aside>

      {/* Main Dashboard Area */}
      <main className="dashboard-content">
        {/* Top Navbar */}
        <header className="dashboard-header">
          <div className="welcome-banner">
            <h1>Welcome back, <span className="user-name">{user?.name}</span></h1>
            <p>Here is an overview of your activity today.</p>
          </div>
          <div className="user-profile-badge">
            <span className={`role-tag ${isInstructor ? 'instructor-tag' : 'student-tag'}`}>
              {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}
            </span>
            <div className="avatar-placeholder">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>

        {/* Dynamic content wrapper */}
        <motion.div 
          className="dashboard-overview"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Statistics Grid */}
          <div className="stats-grid">
            {(isInstructor ? instructorStats : studentStats).map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div key={idx} className="stat-card" variants={cardVariants} whileHover={{ y: -4 }}>
                  <div className={`stat-icon-wrapper ${stat.color}`}>
                    <Icon size={22} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-value">{stat.value}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Core Content Layout */}
          <div className="content-grid">
            {/* Left Main Box: Course Lists */}
            <motion.div className="main-box" variants={cardVariants}>
              <div className="box-header">
                <h2>{isInstructor ? 'My Created Courses' : 'In-Progress Courses'}</h2>
                {isInstructor ? (
                  <button className="btn btn-primary btn-small">
                    <Plus size={16} /> Create Course
                  </button>
                ) : (
                  <button className="btn btn-secondary btn-small">Browse Catalog</button>
                )}
              </div>

              {/* Course Items List */}
              <div className="course-items-list">
                {isInstructor ? (
                  instructorCourses.map((course, idx) => (
                    <div key={idx} className="dashboard-course-card">
                      <div className="course-details">
                        <span className="course-category">{course.category}</span>
                        <h3>{course.title}</h3>
                        <div className="course-stats">
                          <span><strong>{course.students}</strong> enrolled students</span>
                          <span className="divider">•</span>
                          <span className="course-rating">★ {course.rating} Rating</span>
                        </div>
                      </div>
                      <div className="course-action">
                        <button className="btn btn-outline btn-small">Manage</button>
                      </div>
                    </div>
                  ))
                ) : (
                  studentCourses.map((course, idx) => (
                    <div key={idx} className="dashboard-course-card">
                      <div className="course-details">
                        <span className="course-category">{course.category}</span>
                        <h3>{course.title}</h3>
                        <span className="instructor-name">by {course.instructor}</span>
                        
                        {/* Progress Bar */}
                        <div className="progress-bar-container">
                          <div className="progress-bar" style={{ width: `${course.progress}%` }}></div>
                        </div>
                        <span className="progress-text">{course.progress}% Completed</span>
                      </div>
                      <div className="course-action">
                        <button className="btn btn-primary btn-small">Continue</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Right Side Box: Announcements/Logs */}
            <motion.div className="side-box" variants={cardVariants}>
              <h2>System Announcements</h2>
              <div className="announcements-list">
                <div className="announcement-item">
                  <span className="announcement-date">July 16, 2026</span>
                  <h4>Server Upgrade Maintenance</h4>
                  <p>Database optimizations scheduled for tonight 02:00 - 04:00 UTC. Expect short intervals of downtime.</p>
                </div>
                <div className="announcement-item">
                  <span className="announcement-date">July 12, 2026</span>
                  <h4>Welcome to LearnSphere v1.0!</h4>
                  <p>Start publishing your course structures or enrolling in existing catalogs using our interface.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
