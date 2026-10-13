import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
    BookOpen, Award, Clock, AlertCircle, Users, CheckCircle,
    BarChart2, FileText, Settings, Bell, Shield,
    GraduationCap, TrendingUp, Calendar, ArrowRight, UserCheck,
    LogOut, User, ChevronDown
} from 'lucide-react';
import Logo from '../../assets/corporate-logo.png';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    // Role Switcher State: 'student' | 'teacher' | 'admin'
    const [role, setRole] = useState('student');

    // Profile Dropdown Toggle State
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Logout Handler
    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="dashboard-wrapper">
            {/* Top Navigation Header */}
            <header className="dashboard-navbar">
                <div className="nav-brand">
                    <img src={Logo} alt="MVMC LMS Logo" className="nav-logo" />
                    <div className="brand-info">
                        <span className="nav-title">MVMC Academy</span>
                        <span className="nav-subtitle">Clinical Learning Portal</span>
                    </div>
                </div>

                {/* Role Switcher Tabs (Demo Simulator Controls) */}
                <div className="role-switcher-bar">
                    <span className="switcher-label">View:</span>
                    <button
                        className={`role-btn ${role === 'student' ? 'active' : ''}`}
                        onClick={() => setRole('student')}
                        title="Student View"
                    >
                        <GraduationCap size={15} /> <span>Student</span>
                    </button>
                    <button
                        className={`role-btn ${role === 'teacher' ? 'active' : ''}`}
                        onClick={() => setRole('teacher')}
                        title="Instructor View"
                    >
                        <UserCheck size={15} /> <span>Instructor</span>
                    </button>
                    <button
                        className={`role-btn ${role === 'admin' ? 'active' : ''}`}
                        onClick={() => setRole('admin')}
                        title="Admin View"
                    >
                        <Shield size={15} /> <span>Admin</span>
                    </button>
                </div>

                <div className="nav-actions">
                    <button className="icon-btn" aria-label="Notifications">
                        <Bell size={18} />
                    </button>

                    {/* Interactive Profile Dropdown Menu */}
                    <div className="profile-dropdown-container" ref={dropdownRef}>
                        <button
                            className="user-profile-trigger"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            aria-expanded={isMenuOpen}
                        >
                            <div className="avatar">
                                {role === 'student' ? 'RN' : role === 'teacher' ? 'CI' : 'AD'}
                            </div>
                            <div className="user-info desktop-only">
                                <span className="user-name">
                                    {role === 'student' && 'Nurse Maria Santos, RN'}
                                    {role === 'teacher' && 'Prof. Gabriel Torres, MAN'}
                                    {role === 'admin' && 'ICT Admin Desk'}
                                </span>
                                <span className="user-role">
                                    {role === 'student' && 'ER Department'}
                                    {role === 'teacher' && 'Clinical Instructor'}
                                    {role === 'admin' && 'System Administrator'}
                                </span>
                            </div>
                            <ChevronDown size={16} className={`chevron-icon ${isMenuOpen ? 'open' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="profile-dropdown-menu">
                                <div className="dropdown-header">
                                    <p className="signed-in-as">Signed in as</p>
                                    <p className="signed-in-email">
                                        {role === 'student' && 'm.santos@mvmc.com.ph'}
                                        {role === 'teacher' && 'g.torres@mvmc.com.ph'}
                                        {role === 'admin' && 'ictadmin@mvmc.com.ph'}
                                    </p>
                                </div>
                                <hr className="dropdown-divider" />
                                <button className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                                    <User size={16} /> My Profile & PRN
                                </button>
                                <button className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                                    <Settings size={16} /> Account Settings
                                </button>
                                <hr className="dropdown-divider" />
                                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="dashboard-content">
                {role === 'student' && <StudentDashboard />}
                {role === 'teacher' && <TeacherDashboard />}
                {role === 'admin' && <AdminDashboard />}
            </main>
        </div>
    );
};

/* ==========================================================================
   1. STUDENT DASHBOARD VIEW
   ========================================================================== */
const StudentDashboard = () => (
    <div className="view-container">
        <div className="welcome-banner">
            <div>
                <h2>Welcome back, Nurse Maria!</h2>
                <p>You have 2 mandatory clinical compliance modules due this week.</p>
            </div>
            <div className="ceu-badge-summary desktop-flex">
                <Award size={20} />
                <div>
                    <strong>18.5 / 24.0 CEU</strong>
                    <span>PRC Accreditation Progress</span>
                </div>
            </div>
        </div>

        <div className="stats-grid">
            <div className="dash-stat-card">
                <div className="stat-icon-wrapper teal"><BookOpen size={20} /></div>
                <div>
                    <h3>4 Active</h3>
                    <p>Enrolled Courses</p>
                </div>
            </div>
            <div className="dash-stat-card">
                <div className="stat-icon-wrapper orange"><AlertCircle size={20} /></div>
                <div>
                    <h3>2 Due Soon</h3>
                    <p>Mandatory Compliance</p>
                </div>
            </div>
            <div className="dash-stat-card">
                <div className="stat-icon-wrapper blue"><Clock size={20} /></div>
                <div>
                    <h3>14.2 Hours</h3>
                    <p>Logged Clinical Hours</p>
                </div>
            </div>
            <div className="dash-stat-card">
                <div className="stat-icon-wrapper green"><CheckCircle size={20} /></div>
                <div>
                    <h3>8 Completed</h3>
                    <p>Modules Passed</p>
                </div>
            </div>
        </div>

        <div className="dashboard-grid-2col">
            <div className="card-panel">
                <div className="panel-header">
                    <h3>My Clinical Modules</h3>
                    <a href="#view-all" className="panel-link">View All</a>
                </div>
                <div className="course-list">
                    <div className="course-item">
                        <div className="course-details">
                            <span className="course-tag urgent">Mandatory</span>
                            <h4>Advanced Cardiac Life Support (ACLS) Refresher</h4>
                            <p>Deadline: Oct 20, 2026 • 3.0 CEU Units</p>
                            <div className="progress-bar-container">
                                <div className="progress-fill" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                        <button className="btn-primary-sm">Continue <ArrowRight size={14} /></button>
                    </div>

                    <div className="course-item">
                        <div className="course-details">
                            <span className="course-tag normal">Clinical Practice</span>
                            <h4>Infection Prevention & Control in ICU Settings</h4>
                            <p>Deadline: Nov 05, 2026 • 2.5 CEU Units</p>
                            <div className="progress-bar-container">
                                <div className="progress-fill" style={{ width: '25%' }}></div>
                            </div>
                        </div>
                        <button className="btn-primary-sm">Continue <ArrowRight size={14} /></button>
                    </div>
                </div>
            </div>

            <div className="card-panel">
                <div className="panel-header">
                    <h3>Upcoming Clinical Schedules</h3>
                </div>
                <ul className="schedule-list">
                    <li className="schedule-item">
                        <Calendar className="item-icon" size={18} />
                        <div>
                            <h4>IV Therapy Hands-On Skills Evaluation</h4>
                            <p>Oct 16, 2026 • 09:00 AM (3F Simulation Lab)</p>
                        </div>
                    </li>
                    <li className="schedule-item">
                        <Calendar className="item-icon" size={18} />
                        <div>
                            <h4>Emergency Triage Protocol Webinar</h4>
                            <p>Oct 22, 2026 • 02:00 PM (Live Virtual Session)</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

/* ==========================================================================
   2. TEACHER DASHBOARD VIEW
   ========================================================================== */
const TeacherDashboard = () => (
    <div className="view-container">
        <div className="welcome-banner instructor">
            <div>
                <h2>Instructor Command Center 🎓</h2>
                <p>Review active clinical trainees, evaluate assessments, and upload coursework.</p>
            </div>
            <button className="btn-light desktop-only">+ Create New Module</button>
        </div>

        <div className="stats-grid">
            <div className="dash-stat-card">
                <div className="stat-icon-wrapper teal"><Users size={20} /></div>
                <div>
                    <h3>142 Nurses</h3>
                    <p>Enrolled Trainees</p>
                </div>
            </div>
            <div className="dash-stat-card">
                <div className="stat-icon-wrapper orange"><FileText size={20} /></div>
                <div>
                    <h3>18 Pending</h3>
                    <p>Submissions to Grade</p>
                </div>
            </div>
            <div className="dash-stat-card">
                <div className="stat-icon-wrapper green"><TrendingUp size={20} /></div>
                <div>
                    <h3>94.2%</h3>
                    <p>Average Pass Rate</p>
                </div>
            </div>
            <div className="dash-stat-card">
                <div className="stat-icon-wrapper blue"><BookOpen size={20} /></div>
                <div>
                    <h3>6 Modules</h3>
                    <p>Currently Teaching</p>
                </div>
            </div>
        </div>

        <div className="dashboard-grid-2col">
            <div className="card-panel">
                <div className="panel-header">
                    <h3>Pending Practical Evaluations</h3>
                </div>
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Trainee</th>
                                <th>Assessment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Nurse J. Dela Cruz</strong></td>
                                <td>Aseptic Technique Video Log</td>
                                <td><button className="btn-table">Grade</button></td>
                            </tr>
                            <tr>
                                <td><strong>Nurse R. Reyes</strong></td>
                                <td>ECG Strip Interpretation Exam</td>
                                <td><button className="btn-table">Grade</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card-panel">
                <div className="panel-header">
                    <h3>Course Completion Insights</h3>
                </div>
                <div className="chart-placeholder">
                    <BarChart2 size={32} className="placeholder-icon" />
                    <p>Trainee Completion Rates Across Wards</p>
                </div>
            </div>
        </div>
    </div>
);

/* ==========================================================================
   3. ADMIN DASHBOARD VIEW
   ========================================================================== */
const AdminDashboard = () => (
    <div className="view-container">
        <div className="welcome-banner admin">
            <div>
                <h2>System Governance & Oversight 🛡️</h2>
                <p>MVMC LMS System Health, HIPAA Audit Logs, and User Management.</p>
            </div>
            <div className="sys-status desktop-flex">
                <span className="dot online"></span> System Status: <strong>Operational</strong>
            </div>
        </div>

        <div className="stats-grid">
            <div className="dash-stat-card">
                <div className="stat-icon-wrapper teal"><Users size={20} /></div>
                <div>
                    <h3>1,240</h3>
                    <p>Active Staff Accounts</p>
                </div>
            </div>
            <div className="dash-stat-card">
                <div className="stat-icon-wrapper green"><Award size={20} /></div>
                <div>
                    <h3>3,820</h3>
                    <p>CEU Credits Issued</p>
                </div>
            </div>
            <div className="dash-stat-card">
                <div className="stat-icon-wrapper blue"><Shield size={20} /></div>
                <div>
                    <h3>100%</h3>
                    <p>HIPAA Security Audit</p>
                </div>
            </div>
            <div className="dash-stat-card">
                <div className="stat-icon-wrapper orange"><Settings size={20} /></div>
                <div>
                    <h3>24 Active</h3>
                    <p>Published Courses</p>
                </div>
            </div>
        </div>
    </div>
);

export default Dashboard;