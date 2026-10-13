import { useNavigate } from 'react-router';
import {
    FileText, Shield, Scale, Lock,
    HelpCircle, ArrowLeft, KeyRound,
    FileCode, Mail, MapPin, CheckCircle2
} from 'lucide-react';
import Logo from '../../assets/corporate-logo.png';
import './Legal.css';

const TermsOfService = () => {
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
                        <FileText size={14} /> Official Policy Document
                    </div>
                    <h1>Terms of Use & Clinical Governance</h1>
                    <p className="hero-description">
                        Welcome to <strong>MVMC LMS</strong>. This platform is managed by the Information and Communication Technology Department (ICT) and utilized by the Nursing Academy and HR Division to deliver clinical training, mandatory hospital compliance, and accredited continuing education units (CEUs).
                    </p>
                </div>

                {/* Section 1 */}
                <section className="doc-block">
                    <div className="doc-block-header">
                        <Scale className="doc-icon" />
                        <h2>I. Acceptance of Terms</h2>
                    </div>
                    <p>
                        By signing in or using MVMC LMS, you confirm that you have read, understood, and agreed to these Terms. If you do not agree, you must cease using the platform immediately. Access is restricted exclusively to authorized medical practitioners, nursing staff, and personnel of Marikina Valley Medical Center.
                    </p>
                </section>

                {/* Section 2 */}
                <section className="doc-block">
                    <div className="doc-block-header">
                        <KeyRound className="doc-icon" />
                        <h2>II. Description of MVMC LMS</h2>
                    </div>
                    <p>
                        MVMC LMS is an internal clinical training system engineered by the ICT Department. It provides self-paced coursework, live clinical scheduling, test evaluations, and automated tracking for accredited continuing education units (CEUs). The system is solely for institutional use and is not commercialized.
                    </p>
                </section>

                {/* Section 3 */}
                <section className="doc-block">
                    <div className="doc-block-header">
                        <Shield className="doc-icon" />
                        <h2>III. Data Security & Integrity</h2>
                    </div>
                    <p>
                        The Nursing Academy and HR Division determine the scope of learning curricula, while the ICT Department enforces technical, physical, and administrative safeguards. Training metrics, assessment logs, and professional license records are stored in encrypted environments compliant with local healthcare standards.
                    </p>
                </section>

                {/* Section 4 */}
                <section className="doc-block">
                    <div className="doc-block-header">
                        <Lock className="doc-icon" />
                        <h2>IV. Professional Responsibilities</h2>
                    </div>
                    <p>All enrolled practitioners must adhere to institutional standards:</p>

                    <div className="lms-feature-list">
                        <div className="feature-item">
                            <CheckCircle2 className="check-icon" size={18} />
                            <div>
                                <strong>Account Accountability:</strong> Keep PRN IDs and passwords confidential. Credential sharing is strictly prohibited.
                            </div>
                        </div>
                        <div className="feature-item">
                            <CheckCircle2 className="check-icon" size={18} />
                            <div>
                                <strong>Assessment Integrity:</strong> Completing modules or examinations on behalf of another practitioner will trigger administrative review under hospital policies.
                            </div>
                        </div>
                        <div className="feature-item">
                            <CheckCircle2 className="check-icon" size={18} />
                            <div>
                                <strong>Workstation Hygiene:</strong> Log out when leaving shared clinical stations or ward computers.
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5 */}
                <section className="doc-block">
                    <div className="doc-block-header">
                        <FileCode className="doc-icon" />
                        <h2>V. Intellectual Property & Curricula</h2>
                    </div>
                    <p>
                        All courseware, clinical protocols, video lectures, and exam contents hosted on MVMC LMS remain the exclusive intellectual property of Marikina Valley Medical Center. Reproduction or redistribution outside authorized hospital programs is strictly prohibited.
                    </p>
                </section>

                {/* Section 6: Contact Panel */}
                <section className="doc-block contact-block">
                    <h2><HelpCircle size={20} className="section-title-icon" /> VI. Support & Institutional Contacts</h2>
                    <p>For technical inquiries, module issues, or CEU recording questions, please reach out directly:</p>

                    <div className="lms-contact-bar">
                        <div className="contact-col">
                            <Shield size={16} className="col-icon" />
                            <div>
                                <span className="col-label">Division</span>
                                <span className="col-val">Nursing Academy / HR</span>
                            </div>
                        </div>
                        <div className="contact-col">
                            <MapPin size={16} className="col-icon" />
                            <div>
                                <span className="col-label">Location</span>
                                <span className="col-val">3F MAB, Marikina Valley Medical Center</span>
                            </div>
                        </div>
                        <div className="contact-col">
                            <Mail size={16} className="col-icon" />
                            <div>
                                <span className="col-label">ICT Support</span>
                                <a href="mailto:mvmcicthelpdesk@mvmc.com.ph" className="col-val link">mvmcicthelpdesk@mvmc.com.ph</a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default TermsOfService;