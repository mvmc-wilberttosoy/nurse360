import { useState } from 'react';
import { Filter, Edit, Trash2, StickyNotePlus, Calendar, Building2, CheckCircle2, Clock, PlayCircle, Archive, BookOpen, X, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router';

const initialClasses = [
    { id: 1, title: 'Records Management and Document Control', yearMonth: '2026-10', category: 'Administration', department: 'General Nursing', status: 'Active' },
    { id: 2, title: 'Infection Prevention and Control Training', yearMonth: '2026-10', category: 'Safety', department: 'ICU', status: 'Active' },
    { id: 3, title: 'Basic Life Support Certification', yearMonth: '2026-10', category: 'Emergency', department: 'ER', status: 'Upcoming' },
    { id: 4, title: 'Occupational Safety and Health Training', yearMonth: '2026-11', category: 'Compliance', department: 'General Nursing', status: 'Upcoming' },
    { id: 5, title: 'Pediatric Advanced Life Support', yearMonth: '2026-11', category: 'Emergency', department: 'Pediatrics', status: 'Upcoming' },
    { id: 6, title: 'Healthcare Quality Management Training', yearMonth: '2026-12', category: 'Quality', department: 'Administration', status: 'Archived' },
    { id: 7, title: 'Advanced Cardiac Life Support', yearMonth: '2026-12', category: 'Emergency', department: 'ICU', status: 'Upcoming' },
    { id: 8, title: 'HIPAA & Patient Privacy Compliance', yearMonth: '2027-01', category: 'Compliance', department: 'Administration', status: 'Active' },
    { id: 9, title: 'Wound Care and Management Masterclass', yearMonth: '2027-01', category: 'Clinical', department: 'General Nursing', status: 'Upcoming' },
    { id: 10, title: 'Neonatal Resuscitation Program', yearMonth: '2027-02', category: 'Emergency', department: 'Pediatrics', status: 'Upcoming' },
    { id: 11, title: 'Pharmacology and Safe Medication Administration', yearMonth: '2027-02', category: 'Clinical', department: 'General Nursing', status: 'Active' },
    { id: 12, title: 'Mental Health First Aid for Healthcare Workers', yearMonth: '2027-03', category: 'Wellness', department: 'Human Resources', status: 'Upcoming' },
    { id: 13, title: 'Fire Safety and Emergency Evacuation', yearMonth: '2026-10', category: 'Safety', department: 'Facilities', status: 'Active' },
    { id: 14, title: 'EHR and Patient Database Navigation', yearMonth: '2026-11', category: 'Administration', department: 'IT', status: 'Active' },
    { id: 15, title: 'Evidence-Based Practice in Nursing', yearMonth: '2026-11', category: 'Research', department: 'General Nursing', status: 'Archived' },
    { id: 16, title: 'Telehealth Best Practices and Patient Etiquette', yearMonth: '2026-12', category: 'Clinical', department: 'Outpatient', status: 'Upcoming' },
    { id: 17, title: 'Palliative Care and Pain Management', yearMonth: '2027-01', category: 'Clinical', department: 'Oncology', status: 'Upcoming' },
    { id: 18, title: 'Bloodborne Pathogens and Hazard Communication', yearMonth: '2027-01', category: 'Safety', department: 'Laboratory', status: 'Active' },
    { id: 19, title: 'Geriatric Nursing Core Competencies', yearMonth: '2027-02', category: 'Clinical', department: 'Geriatrics', status: 'Upcoming' },
    { id: 20, title: 'Medical Ethics and Legal Liabilities', yearMonth: '2027-02', category: 'Compliance', department: 'Administration', status: 'Archived' },
    { id: 21, title: 'Trauma Nursing Core Course', yearMonth: '2027-03', category: 'Emergency', department: 'ER', status: 'Upcoming' },
    { id: 22, title: 'Surgical Sterility and Operating Room Protocols', yearMonth: '2027-03', category: 'Safety', department: 'Surgery', status: 'Active' },
    { id: 23, title: 'Patient De-escalation and Conflict Resolution', yearMonth: '2027-04', category: 'Safety', department: 'Security', status: 'Upcoming' },
    { id: 24, title: 'Leadership Essentials for Charge Nurses', yearMonth: '2027-04', category: 'Administration', department: 'General Nursing', status: 'Upcoming' }
];

export default function ModulesTab() {

    const navigate = useNavigate();

    const [classesList, setClassesList] = useState(initialClasses);

    // Filter & Search States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYearMonth, setSelectedYearMonth] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('ALL');
    const [selectedStatus, setSelectedStatus] = useState('ALL');

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Display 8 course cards per page

    // Hover & Modal States
    const [hoveredCard, setHoveredCard] = useState(null);
    const [hoveredBtn, setHoveredBtn] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State for Adding Class
    const [formData, setFormData] = useState({
        title: '',
        category: 'Safety',
        department: 'General Nursing',
        status: 'Active',
        yearMonth: '2026-10'
    });

    const handleDelete = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            setClassesList(prev => prev.filter(item => item.id !== id));
        }
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedYearMonth('');
        setSelectedDepartment('ALL');
        setSelectedStatus('ALL');
        setCurrentPage(1);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return alert('Please enter a class title');

        const newClass = {
            id: Date.now(),
            ...formData
        };

        setClassesList(prev => [newClass, ...prev]);
        setIsModalOpen(false);
        setFormData({ title: '', category: 'Safety', department: 'General Nursing', status: 'Active', yearMonth: '2026-10' });
    };

    // Filter Logic with Search Support
    const filteredClasses = classesList.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMonth = !selectedYearMonth || item.yearMonth === selectedYearMonth;
        const matchesDept = selectedDepartment === 'ALL' || item.department === selectedDepartment;
        const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;
        return matchesSearch && matchesMonth && matchesDept && matchesStatus;
    });

    // Pagination Calculations
    const totalPages = Math.ceil(filteredClasses.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentClasses = filteredClasses.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Helper for Status Icon Config
    const getStatusConfig = (status) => {
        switch (status) {
            case 'Active':
                return { icon: <PlayCircle size={15} />, bg: '#dcfce7', color: '#15803d', border: '#bbf7d0', label: 'Active' };
            case 'Upcoming':
                return { icon: <Clock size={15} />, bg: '#dcfce7', color: '#15803d', border: '#bbf7d0', label: 'Upcoming' };
            case 'Completed':
                return { icon: <CheckCircle2 size={15} />, bg: '#dcfce7', color: '#15803d', border: '#bbf7d0', label: 'Completed' };
            case 'Archived':
                return { icon: <Archive size={15} />, bg: '#dcfce7', color: '#15803d', border: '#bbf7d0', label: 'Archived' };
            default:
                return { icon: <Clock size={15} />, bg: '#dcfce7', color: '#15803d', border: '#bbf7d0', label: status };
        }
    };

    return (
        <div style={{ width: '100%', padding: '10px 0', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>

            {/* Header Action & Filter Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                {/* FILTERS & SEARCH CONTAINER */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    flexWrap: 'wrap'
                }}>
                    {/* SEARCH INPUT */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 8px' }}>
                        <Search size={14} color="#64748b" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#0f172a',
                                fontSize: '0.75rem',
                                outline: 'none',
                                width: '400px',
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderLeft: '1px solid #e2e8f0', paddingLeft: '12px' }}>
                        <Filter size={16} color="#00897b" />
                        {/* <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase' }}>
                            Filters:
                        </span> */}
                    </div>

                    <input
                        type="month"
                        value={selectedYearMonth}
                        onChange={(e) => { setSelectedYearMonth(e.target.value); setCurrentPage(1); }}
                        style={{
                            background: '#f8fafc',
                            border: '1px solid #cbd5e1',
                            color: '#0f172a',
                            fontWeight: '400',
                            fontSize: '0.75rem',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    />

                    <select
                        value={selectedDepartment}
                        onChange={(e) => { setSelectedDepartment(e.target.value); setCurrentPage(1); }}
                        style={{
                            background: '#f8fafc',
                            border: '1px solid #cbd5e1',
                            color: '#0f172a',
                            fontWeight: '400',
                            fontSize: '0.75rem',
                            padding: '5px 8px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        <option value="ALL">Department: All</option>
                        <option value="General Nursing">General Nursing</option>
                        <option value="ER">ER</option>
                        <option value="ICU">ICU</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Administration">Administration</option>
                    </select>

                    <select
                        value={selectedStatus}
                        onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                        style={{
                            background: '#f8fafc',
                            border: '1px solid #cbd5e1',
                            color: '#0f172a',
                            fontWeight: '400',
                            fontSize: '0.75rem',
                            padding: '5px 8px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        <option value="ALL">Status: All</option>
                        <option value="Active">Active</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Completed">Completed</option>
                        <option value="Archived">Archived</option>
                    </select>

                    {(searchQuery || selectedYearMonth || selectedDepartment !== 'ALL' || selectedStatus !== 'ALL') && (
                        <button
                            onClick={handleClearFilters}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#00897b',
                                fontSize: '0.72rem',
                                fontWeight: '700',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                paddingLeft: '4px'
                            }}
                        >
                            Reset
                        </button>
                    )}
                </div>

                {/* ADD NEW CLASS BUTTON */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        background: '#00897b',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '10px',
                        fontSize: '0.825rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 6px rgba(0, 137, 123, 0.25)',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <StickyNotePlus size={16} /> New
                </button>
            </div>

            {/* Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '20px',
                width: '100%',
                flex: 1
            }}>
                {currentClasses.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#64748b', fontSize: '0.9rem' }}>
                        No modules match your search or filter criteria.
                    </div>
                ) : (
                    currentClasses.map((item) => {
                        const isCardHovered = hoveredCard === item.id;
                        const statusConfig = getStatusConfig(item.status);

                        return (
                            <div
                                key={item.id}
                                onClick={() => navigate(`/dashboard/courses/${item.id}`)}
                                onMouseEnter={() => setHoveredCard(item.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                style={{
                                    background: '#ffffff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    transform: isCardHovered ? 'translateY(-4px)' : 'translateY(0)',
                                    boxShadow: isCardHovered
                                        ? '0 12px 20px -3px rgba(0, 137, 123, 0.12), 0 4px 6px -4px rgba(0, 0, 0, 0.05)'
                                        : '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -2px rgba(0, 0, 0, 0.02)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.25s ease',
                                    cursor: 'pointer'
                                }}
                            >
                                {/* Header Container */}
                                <div style={{
                                    background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
                                    height: '160px',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderBottom: '1px solid #e2e8f0'
                                }}>
                                    <div
                                        title={`Status: ${statusConfig.label}`}
                                        style={{
                                            position: 'absolute',
                                            top: '12px',
                                            left: '12px',
                                            background: statusConfig.bg,
                                            color: statusConfig.color,
                                            border: `1px solid ${statusConfig.border}`,
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {statusConfig.icon}
                                    </div>

                                    <span style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        background: 'rgba(255, 255, 255, 0.85)',
                                        backdropFilter: 'blur(4px)',
                                        color: '#0f766e',
                                        padding: '3px 8px',
                                        borderRadius: '20px',
                                        fontSize: '0.65rem',
                                        fontWeight: '700',
                                        textTransform: 'uppercase'
                                    }}>
                                        {item.category}
                                    </span>

                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: '#ffffff',
                                        color: '#00897b',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 4px 12px rgba(0, 137, 123, 0.15)'
                                    }}>
                                        <BookOpen size={24} />
                                    </div>
                                </div>

                                {/* Body */}
                                <div style={{
                                    padding: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    flex: 1,
                                    gap: '16px'
                                }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.72rem', color: '#64748b', marginBottom: '8px', flexWrap: 'wrap' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Calendar size={13} color="#00897b" />
                                                <span>{item.yearMonth}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Building2 size={13} color="#00897b" />
                                                <span style={{ fontWeight: '600', color: '#334155' }}>{item.department}</span>
                                            </div>
                                        </div>

                                        <h4 style={{
                                            fontSize: '0.925rem',
                                            fontWeight: '500',
                                            color: '#0f172a',
                                            lineHeight: '1.4',
                                            margin: 0
                                        }}>
                                            {item.title}
                                        </h4>
                                    </div>

                                    {/* Action Buttons Bar */}
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'center',
                                            gap: '2px',
                                            paddingTop: '12px',
                                            borderTop: '1px solid #f1f5f9'
                                        }}
                                    >
                                        <button
                                            onClick={() => alert(`Edit class: ${item.title}`)}
                                            onMouseEnter={() => setHoveredBtn(`${item.id}-edit`)}
                                            onMouseLeave={() => setHoveredBtn(null)}
                                            title="Edit Class"
                                            style={{
                                                background: hoveredBtn === `${item.id}-edit` ? 'rgba(0, 137, 123, 0.1)' : 'transparent',
                                                color: '#94a3b8',
                                                border: 'none',
                                                padding: '4px 6px',
                                                borderRadius: '8px',
                                                fontSize: '0.75rem',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                transition: 'background 0.2s ease, color 0.2s ease'
                                            }}
                                        >
                                            <Edit size={14} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(item.id, item.title)}
                                            onMouseEnter={() => setHoveredBtn(`${item.id}-delete`)}
                                            onMouseLeave={() => setHoveredBtn(null)}
                                            title="Delete Class"
                                            style={{
                                                background: hoveredBtn === `${item.id}-delete` ? '#fef2f2' : 'transparent',
                                                color: hoveredBtn === `${item.id}-delete` ? '#dc2626' : '#94a3b8',
                                                border: 'none',
                                                padding: '4px 6px',
                                                borderRadius: '8px',
                                                fontSize: '0.75rem',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                transition: 'background 0.2s ease, color 0.2s ease'
                                            }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* PAGINATION FOOTER CONTROLS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Showing <strong>{filteredClasses.length > 0 ? startIndex + 1 : 0}</strong>-<strong>{Math.min(startIndex + itemsPerPage, filteredClasses.length)}</strong> of <strong>{filteredClasses.length}</strong> items
                </span>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', marginRight: '6px' }}>
                        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                    </span>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        style={{
                            background: currentPage === 1 ? '#f8fafc' : '#ffffff',
                            color: currentPage === 1 ? '#cbd5e1' : '#0f172a',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            padding: '4px 10px',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                        }}
                    >
                        <ChevronLeft size={14} /> Prev
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || totalPages === 0}
                        style={{
                            background: currentPage === totalPages || totalPages === 0 ? '#f8fafc' : '#ffffff',
                            color: currentPage === totalPages || totalPages === 0 ? '#cbd5e1' : '#0f172a',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            padding: '4px 10px',
                            cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                        }}
                    >
                        Next <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            {/* ADD NEW CLASS MODAL OVERLAY */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 23, 42, 0.4)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '16px'
                }}>
                    <div style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        width: '100%',
                        maxWidth: '480px',
                        padding: '24px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        position: 'relative'
                    }}>
                        {/* Modal Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Create New Class</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Class Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Advanced ACLS Simulation"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid #cbd5e1',
                                        fontSize: '0.825rem',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                    required
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                                    >
                                        <option value="Safety">Safety</option>
                                        <option value="Emergency">Emergency</option>
                                        <option value="Administration">Administration</option>
                                        <option value="Compliance">Compliance</option>
                                        <option value="Quality">Quality</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Department</label>
                                    <select
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                                    >
                                        <option value="General Nursing">General Nursing</option>
                                        <option value="ER">ER</option>
                                        <option value="ICU">ICU</option>
                                        <option value="Pediatrics">Pediatrics</option>
                                        <option value="Administration">Administration</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Archived">Archived</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Schedule Month</label>
                                    <input
                                        type="month"
                                        value={formData.yearMonth}
                                        onChange={(e) => setFormData({ ...formData, yearMonth: e.target.value })}
                                        style={{ width: '100%', padding: '7px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem', boxSizing: 'border-box' }}
                                    />
                                </div>
                            </div>

                            {/* Modal Actions */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    style={{
                                        background: '#f1f5f9',
                                        color: '#475569',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        fontSize: '0.8rem',
                                        fontWeight: '700',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        background: '#00897b',
                                        color: '#ffffff',
                                        border: 'none',
                                        padding: '8px 18px',
                                        borderRadius: '8px',
                                        fontSize: '0.8rem',
                                        fontWeight: '700',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Save Class
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}