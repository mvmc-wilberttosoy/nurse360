import { useState } from 'react';
import Logo from '../../assets/corporate-logo.png';
import { Link } from 'react-router';
import { ArrowRight, Eye, EyeOff, ShieldCheck, BookOpenCheck, Award, GraduationCap } from 'lucide-react';
import './Login.css';

const NurseGlassSplitLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="glass-split-wrapper">
            {/* Left Panel: Frosted Glass Form Card */}
            <div className="glass-split-form-panel">
                <div className="glass-card">
                    <div className="logo-container">
                        <img src={Logo} alt="MVMC Nursing Academy Logo" className="brand-logo" />
                        <span className="portal-tag">MVMC LMS</span>
                    </div>

                    <div className="glass-header">
                        <h1 className="glass-header-title">Welcome back</h1>
                        <p className="glass-header-subtitle">Sign in to access your clinical modules and CEUs.</p>
                    </div>

                    <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="email">Professional Email / PRN ID</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="off"
                                placeholder="nurse.name@hospital.com"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <div className="password-label-row">
                                <label htmlFor="password">Password</label>
                                <Link to="/forgot-password" className="forgot-password">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    autoComplete="off"
                                    placeholder="Enter secure password"
                                    className="form-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="eye-toggle-btn"
                                    aria-label="Toggle Password Visibility"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">
                            Sign In <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="glass-security-badge">
                        <ShieldCheck size={16} />
                        <span>HIPAA Compliant Secure Session</span>
                    </div>

                    <p className="terms-of-use">
                        Protected by hospital guidelines. <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms of Use</Link>
                    </p>
                </div>
            </div>

            {/* Right Panel: Glassmorphic Feature Showcase */}
            <div className="glass-split-banner-panel">
                <div className="glass-banner-card">
                    <div className="banner-pill">
                        <GraduationCap size={14} />
                        <span>Clinical Excellence</span>
                    </div>
                    <h2>Advance Your Career & Patient Care Standards</h2>
                    <p>Log clinical hours, complete mandatory compliance training, and earn accredited continuing education units seamlessly.</p>

                    <div className="glass-stats-grid">
                        <div className="stat-card">
                            <BookOpenCheck className="stat-icon" size={20} />
                            <div>
                                <h4>Modern Modules</h4>
                                <p>Active CE Courses</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <Award className="stat-icon" size={20} />
                            <div>
                                <h4>Accredited</h4>
                                <p>PRC Certified Units</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NurseGlassSplitLogin;