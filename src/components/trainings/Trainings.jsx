import { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

const allTrainings = [
    { id: 1, title: 'Advanced Cardiac Life Support (ACLS)', date: 'Oct 18, 2026', time: '08:00 AM - 05:00 PM', status: 'Ongoing', venue: 'MMK' },
    { id: 2, title: 'Infection Control & Patient Safety Protocols', date: 'Oct 22, 2026', time: '01:00 PM - 04:00 PM', status: 'Upcoming', venue: 'Robinsons Magnolia' },
    { id: 3, title: 'Emergency Pediatric Care Refresher', date: 'Oct 29, 2026', time: '09:00 AM - 12:00 PM', status: 'Upcoming', venue: 'Bonifacio Global City' },
    { id: 4, title: 'Basic Life Support (BLS) Certification', date: 'Nov 02, 2026', time: '08:00 AM - 01:00 PM', status: 'Upcoming', venue: 'Tropicana' },
    { id: 5, title: 'Pharmacology & Medication Safety in Nursing', date: 'Nov 06, 2026', time: '10:00 AM - 02:00 PM', status: 'Upcoming', venue: 'MCI' },
    { id: 6, title: 'Mental Health First Aid for Healthcare Workers', date: 'Nov 12, 2026', time: '01:00 PM - 05:00 PM', status: 'Upcoming', venue: 'ADH' },
    { id: 7, title: 'Wound Care & Advanced Dressing Techniques', date: 'Nov 18, 2026', time: '09:00 AM - 12:00 PM', status: 'Upcoming', venue: 'Main' },
    { id: 8, title: 'Disaster Triage & Emergency Preparedness', date: 'Nov 25, 2026', time: '08:00 AM - 04:00 PM', status: 'Upcoming', venue: 'MAB' },
];

export default function TrainingsTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // 3 card items per page keeps the box compact and clean

    const totalPages = Math.ceil(allTrainings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTrainings = allTrainings.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

            {/* Header */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ background: 'rgba(0, 137, 123, 0.1)', color: '#00897b', padding: '6px', borderRadius: '8px', display: 'flex' }}>
                            <BookOpen size={16} />
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: 0 }}>Upcoming Trainings</h3>
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>
                        {startIndex + 1}-{Math.min(startIndex + itemsPerPage, allTrainings.length)} of {allTrainings.length}
                    </span>
                </div>

                {/* Modern Card List Container */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '210px' }}>
                    {currentTrainings.map((item) => {
                        const isOngoing = item.status === 'Ongoing';
                        return (
                            <div
                                key={item.id}
                                style={{
                                    background: isOngoing ? '#f0fdfa' : '#f8fafc', // Soft teal tint for ongoing, neutral slate for upcoming
                                    border: `1px solid ${isOngoing ? '#99f6e4' : '#f1f5f9'}`,
                                    borderRadius: '10px',
                                    padding: '10px 12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '6px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {/* Top Row: Title & Status Badge */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', lineHeight: '1.25' }}>
                                        {item.title}
                                    </span>
                                    <span style={{
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        fontSize: '10px',
                                        fontWeight: '600',
                                        backgroundColor: isOngoing ? '#ccfbf1' : '#e2e8f0',
                                        color: isOngoing ? '#0f766e' : '#475569',
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0
                                    }}>
                                        {item.status}
                                    </span>
                                </div>

                                {/* Bottom Row: Venue, Date, Time Metadata */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <MapPin size={12} color="#00897b" />
                                        <span style={{ fontWeight: '600', color: '#334155' }}>{item.venue}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Calendar size={12} color="#00897b" />
                                        <span>{item.date}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Clock size={12} color="#94a3b8" />
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Pagination Footer Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </span>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        style={{
                            background: currentPage === 1 ? '#f8fafc' : '#ffffff',
                            color: currentPage === 1 ? '#cbd5e1' : '#0f172a',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            padding: '3px 8px',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.72rem',
                            fontWeight: '600'
                        }}
                    >
                        <ChevronLeft size={13} /> Prev
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        style={{
                            background: currentPage === totalPages ? '#f8fafc' : '#ffffff',
                            color: currentPage === totalPages ? '#cbd5e1' : '#0f172a',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            padding: '3px 8px',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.72rem',
                            fontWeight: '600'
                        }}
                    >
                        Next <ChevronRight size={13} />
                    </button>
                </div>
            </div>
        </div>
    );
}