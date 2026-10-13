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
import CalendarApp from '../../components/calendar/Calendar';

const Dashboard = () => {
    const navigate = useNavigate();

    // Horizontal Tab
    const [activeTab, setActiveTab] = useState('overview'); // Defaulting to schedule for your grid preview

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
                            <div className="avatar">RN</div>
                            <div className="user-info desktop-only">
                                <span className="user-name">Maria Santos</span>
                                <span className="user-role">ER Department</span>
                            </div>
                            <ChevronDown size={16} className={`chevron-icon ${isMenuOpen ? 'open' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="profile-dropdown-menu">
                                <div className="dropdown-header">
                                    <p className="signed-in-as">Signed in as</p>
                                    <p className="signed-in-email">msantos@mvmc.com.ph</p>
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
                    <div className="dashboard-grid">

                        {/* GRID AREA 1: CALENDAR (Top Left) */}
                        <div className="grid-card calendar">
                            <CalendarApp />
                        </div>

                        {/* GRID AREA 2: COMPLETION RATE (Top Right) */}
                        <div className="grid-card chart">

                        </div>

                        {/* GRID AREA 3: UPCOMING TRAININGS TABLE (Bottom Left) */}
                        <div className="grid-card training">

                        </div>

                        {/* GRID AREA 4: TRAINING COST SUMMARY (Bottom Right) */}
                        <div className="grid-card cost">

                        </div>
                    </div>

                )}
                {activeTab === 'modules' && (
                    <div className="view-container">
                        <h2>Modules & Courses Workspace</h2>
                        <p>Dedicated workspace for active coursework and module library.</p>
                    </div>
                )}
                {activeTab === 'schedule' && (
                    <div className="view-container">
                        <h2>Dashboard</h2>
                        <p>Dashboard for active coursework and module library.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;