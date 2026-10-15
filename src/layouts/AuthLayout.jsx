import { Bell, BookOpen, Calendar, ChevronDown, LayoutDashboard, LogOut, Settings, User } from 'lucide-react';
import Logo from '../assets/corporate-logo.png';
import { NavLink, Outlet } from 'react-router';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const AuthLayout = () => {

    // Profile Dropdown Toggle States
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-navbar">
                <div className="nav-brand">
                    <img src={Logo} alt="Marikina Valley Medical Center Logo" className="nav-logo" />
                    <div className="brand-info">
                        <span className="nav-title">Nurse360</span>
                        <span className="nav-subtitle">MVMC Learning Management System Portal</span>
                    </div>
                </div>

                <div className="nav-actions">
                    <button className="icon-btn" aria-label='Notifications'>
                        <Bell size={18} />
                    </button>

                    {/* Interactive Profile Dropdown Menu */}
                    <div className="profile-dropdown-container" ref={dropdownRef}>
                        <button
                            className="user-profile-trigger"
                            onClick={() => setIsMenuOpen((previous) => !previous)}
                            aria-expanded={isMenuOpen}
                        >
                            <div className="avatar">RN</div>
                            <div className="user-info desktop-only">
                                <span className="user-name">Maria Santos</span>
                                <span className="user-role">ER Department</span>
                            </div>
                            <ChevronDown size={16} className={`chevron-icon ${isMenuOpen ? 'open' : ''}`} />
                        </button>

                        {isMenuOpen && (
                            <div className="profile-dropdown-menu">
                                <div className="dropdown-header">
                                    <p className="signed-in-as">Signed in as</p>
                                    <p className="signed-in-email">msantos@mvmc.com.ph</p>
                                </div>
                                <hr className="dropdown-divider" />
                                <button className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                                    <User size={16} /> My Profile
                                </button>
                                <button className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                                    <Settings size={16} /> Account Settings
                                </button>
                                <hr className="dropdown-divider" />
                                <button className="dropdown-item logout-btn">
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Horizontal Sub-Navigation Tab Bar using NavLink for auto active styling */}
            <nav className="sub-nav-tabs">
                <div className="sub-nav-container">
                    <NavLink
                        to='/dashboard'
                        end
                        className={({ isActive }) => `sub-nav-tab ${isActive ? 'active' : ''}`}
                    >
                        <LayoutDashboard size={16} /> Dashboard
                    </NavLink>
                    <NavLink
                        to='/dashboard/courses'
                        className={({ isActive }) => `sub-nav-tab ${isActive ? 'active' : ''}`}
                    >
                        <BookOpen size={16} /> Courses
                    </NavLink>
                    <NavLink
                        to='/dashboard/trainings'
                        className={({ isActive }) => `sub-nav-tab ${isActive ? 'active' : ''}`}
                    >
                        <Calendar size={16} /> Trainings
                    </NavLink>
                </div>
            </nav>

            {/* Dynamic Routed Page Content Render Area */}
            <main className="dashboard-content">
                <Outlet />
            </main>
        </div>
    )
}

export default AuthLayout;