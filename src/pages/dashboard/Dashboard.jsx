import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
    BookOpen,
    Settings,
    Bell,
    Calendar,
    LogOut,
    User,
    ChevronDown,
    LayoutDashboard
} from 'lucide-react';
import Logo from '../../assets/corporate-logo.png';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    // Role Switcher State: 'student' | 'teacher' | 'admin'
    const [role, setRole] = useState('student');

    // Horizontal Sub-Nav Tab State (e.g., 'overview', 'courses', 'schedule')
    const [activeTab, setActiveTab] = useState('overview');

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
    }, [],);

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
                        <span className="nav-title">Nurse360</span>
                        <span className="nav-subtitle">MVMC Learning Management System Portal</span>
                    </div>
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
                                    {role === 'student' && 'Maria Santos, RN'}
                                    {role === 'teacher' && 'Gabriel Torres, MAN'}
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

            {/* Horizontal Sub-Navigation Tab Bar */}
            <nav className="sub-nav-tabs">
                <div className="sub-nav-container">
                    <button
                        className={`sub-nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <LayoutDashboard size={16} /> Dashboard
                    </button>
                    <button
                        className={`sub-nav-tab ${activeTab === 'modules' ? 'active' : ''}`}
                        onClick={() => setActiveTab('modules')}
                    >
                        <BookOpen size={16} /> Courses
                    </button>
                    <button
                        className={`sub-nav-tab ${activeTab === 'schedule' ? 'active' : ''}`}
                        onClick={() => setActiveTab('schedule')}
                    >
                        <Calendar size={16} /> Trainings
                    </button>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="dashboard-content">
                {activeTab === 'overview' && (
                    <>
                        {role === 'student' && <StudentDashboard />}
                        {role === 'teacher' && <TeacherDashboard />}
                        {role === 'admin' && <AdminDashboard />}
                    </>
                )}
                {activeTab === 'modules' && (
                    <div className="view-container">
                        <h2>Modules & Courses Workspace</h2>
                        <p>Dedicated workspace for active coursework and module library.</p>
                    </div>
                )}
                {activeTab === 'schedule' && (
                    <div className="view-container">
                        <h2>Clinical Schedules & Calendar</h2>
                        <p>Manage your upcoming hospital rotations and simulation lab slots.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

/* ==========================================================================
   1. STUDENT DASHBOARD VIEW (Truncated for brevity)
   ========================================================================== */
const StudentDashboard = () => (
    <div className="view-container">
        <div className="welcome-banner">
            <div>
                <h2>Welcome back, Nurse Maria!</h2>
                <p>You have 2 mandatory clinical compliance modules due this week.</p>
            </div>
        </div>
        {/* Rest of student dashboard code... */}
    </div>
);

const TeacherDashboard = () => (<div className="view-container"><h2>Instructor Command Center</h2></div>);
const AdminDashboard = () => (<div className="view-container"><h2>System Governance</h2></div>);

export default Dashboard;