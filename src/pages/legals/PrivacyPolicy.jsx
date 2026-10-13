import { useNavigate } from 'react-router';
import {
    Shield, Lock, Eye, Database, UserCheck,
    FileCheck, Mail, ArrowLeft, KeyRound, Activity,
    MapPin, HelpCircle
} from 'lucide-react';
import Logo from '../../assets/corporate-logo.png';
import './Legal.css';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="lms-legal-shell">
            {/* Top Minimal Navigation Bar */}
            <header className="lms-legal-navbar">
                <div className="navbar-left">
                    <img src={Logo} alt="MVMC LMS Logo" className="navbar-logo" />
                    <div className="brand-divider"></div>
                    <div className="brand-text">
                        <span className="app-title">MVMC Academy</span>
                        <span className="app-tag">Clinical Learning Management System</span>
                    </div>
                </div>
                <button onClick={() => navigate('/')} className="btn-return">
                    <ArrowLeft size={16} /> Return to Portal
                </button>
            </header>

            {/* Main Document Body */}
            <main className="lms-legal-body">
                {/* Hero Banner Card */}
                <div className="lms-hero-card">
                    <div className="hero-status-pill">
                        <Shield size={14} /> Enterprise Privacy Standard
                    </div>
                    <h1>Data Protection & Practitioner Privacy Policy</h1>
                    <p className="hero-description">
                        This policy explains how the Information and Communication Technology Department (ICT) of Marikina Valley Medical Center (“MVMC”) protects clinical learning data and professional records in full compliance with the <strong>Philippine Data Privacy Act of 2012</strong> and HIPAA privacy guidelines.
                    </p>
                </div>

                {/* Section 1 */}
                <section className="doc-block">
                    <div className="doc-block-header">
                        <Database className="doc-icon" />
                        <h2>I. Information We Collect</h2>
                    </div>
                    <p>
                        To process accredited learning modules and credit PRC units, MVMC LMS collects essential professional information:
                    </p>

                    <div className="lms-feature-list">
                        <div className="feature-item">
                            <FileCheck className="check-icon" size={18} />
                            <div>
                                <strong>Professional & Identity Records:</strong> Full name, institutional email, PRN / PRC license numbers, employee ID, and department assignment.
                            </div>
                        </div>
                        <div className="feature-item">
                            <KeyRound className="check-icon" size={18} />
                            <div>
                                <strong>Academic Progress Metrics:</strong> Module completions, test results, logged training hours, and accredited CEU tallies.
                            </div>
                        </div>
                        <div className="feature-item">
                            <Activity className="check-icon" size={18} />
                            <div>
                                <strong>System Session Logs:</strong> IP address, device environment, browser type, and time-stamped access audit trails for security monitoring.
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="doc-block">
                    <div className="doc-block-header">
                        <Activity className="doc-icon" />
                        <h2>II. Purpose & Processing</h2>
                    </div>
                    <p>
                        Personal and educational data processed on MVMC LMS is strictly restricted to valid hospital operations: verifying mandatory clinical capabilities, updating internal HR training matrices, and issuing official CEU certificates.
                    </p>
                </section>

                {/* Section 3 */}
                <section className="doc-block">
                    <div className="doc-block-header">
                        <Eye className="doc-icon" />
                        <h2>III. Third-Party Sharing Rules</h2>
                    </div>
                    <p>
                        MVMC LMS does not sell or share personal data with external entities. Information is only shared with accredited regulatory boards (e.g., Professional Regulation Commission) when submitting official units for credential renewals.
                    </p>
                </section>

                {/* Section 4 */}
                <section className="doc-block">
                    <div className="doc-block-header">
                        <Lock className="doc-icon" />
                        <h2>IV. Safeguards & Retention</h2>
                    </div>
                    <p>
                        We employ multi-layered technical controls including database encryption, role-based access restrictions, and periodic vulnerability audits. Records are stored securely in alignment with institutional retention schedules.
                    </p>
                </section>

                {/* Section 5 */}
                <section className="doc-block">
                    <div className="doc-block-header">
                        <UserCheck className="doc-icon" />
                        <h2>V. Practitioner Rights</h2>
                    </div>
                    <p>
                        Under the Data Privacy Act of 2012, practitioners are entitled to access their academic transcripts, request correction of inaccurate license numbers, and inquire about log audit histories through the ICT or Data Protection Officer.
                    </p>
                </section>

                {/* Section 6: Contact */}
                <section className="doc-block contact-block">
                    <h2><HelpCircle size={20} className="section-title-icon" /> VI. Support & Data Protection Inquiries</h2>
                    <p>If you have concerns regarding data privacy or credential sync errors, contact the team:</p>

                    <div className="lms-contact-bar">
                        <div className="contact-col">
                            <Shield size={16} className="col-icon" />
                            <div>
                                <span className="col-label">Division</span>
                                <span className="col-val">Data Protection & ICT Desk</span>
                            </div>
                        </div>
                        <div className="contact-col">
                            <MapPin size={16} className="col-icon" />
                            <div>
                                <span className="col-label">Location</span>
                                <span className="col-val">Marikina Valley Medical Center</span>
                            </div>
                        </div>
                        <div className="contact-col">
                            <Mail size={16} className="col-icon" />
                            <div>
                                <span className="col-label">Helpdesk Email</span>
                                <a href="mailto:mvmcicthelpdesk@mvmc.com.ph" className="col-val link">mvmcicthelpdesk@mvmc.com.ph</a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default PrivacyPolicy;