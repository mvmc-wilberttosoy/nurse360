import { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const allTrainings = [
    { id: 1, title: 'Advanced Cardiac Life Support (ACLS)', date: 'Oct 18, 2026', time: '08:00 AM - 05:00 PM', status: 'Ongoing' },
    { id: 2, title: 'Infection Control & Patient Safety Protocols', date: 'Oct 22, 2026', time: '01:00 PM - 04:00 PM', status: 'Upcoming' },
    { id: 3, title: 'Emergency Pediatric Care Refresher', date: 'Oct 29, 2026', time: '09:00 AM - 12:00 PM', status: 'Upcoming' },
    { id: 4, title: 'Basic Life Support (BLS) Certification', date: 'Nov 02, 2026', time: '08:00 AM - 01:00 PM', status: 'Upcoming' },
    { id: 5, title: 'Pharmacology & Medication Safety in Nursing', date: 'Nov 06, 2026', time: '10:00 AM - 02:00 PM', status: 'Upcoming' },
    { id: 6, title: 'Mental Health First Aid for Healthcare Workers', date: 'Nov 12, 2026', time: '01:00 PM - 05:00 PM', status: 'Upcoming' },
    { id: 7, title: 'Wound Care & Advanced Dressing Techniques', date: 'Nov 18, 2026', time: '09:00 AM - 12:00 PM', status: 'Upcoming' },
    { id: 8, title: 'Disaster Triage & Emergency Preparedness', date: 'Nov 25, 2026', time: '08:00 AM - 04:00 PM', status: 'Upcoming' },
];

export default function TrainingsTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Number of items to display per page

    // Calculate total pages
    const totalPages = Math.ceil(allTrainings.length / itemsPerPage);

    // Get current page items
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTrainings = allTrainings.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Upcoming Trainings</h3>

            </div>

            <div style={{ width: '100%', overflowX: 'auto', flex: 1, minHeight: '190px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', whiteSpace: 'nowrap' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                            <th style={{ textAlign: 'left', padding: '8px 6px', color: '#64748b', fontWeight: '600', fontSize: '0.75rem' }}>Training Title</th>
                            <th style={{ textAlign: 'left', padding: '8px 6px', color: '#64748b', fontWeight: '600', fontSize: '0.75rem' }}>Schedule</th>
                            <th style={{ textAlign: 'center', padding: '8px 6px', color: '#64748b', fontWeight: '600', fontSize: '0.75rem' }}>Status</th>
                            {/* <th style={{ textAlign: 'right', padding: '8px 6px', color: '#64748b', fontWeight: '600', fontSize: '0.75rem' }}>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {currentTrainings.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '8px 6px', fontWeight: '600', color: '#0f172a' }}>
                                    {item.title}
                                </td>
                                <td style={{ padding: '8px 6px', color: '#475569' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.775rem' }}>
                                        <Calendar size={13} color="#00897b" />
                                        <span>{item.date}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>
                                        <Clock size={11} />
                                        <span>{item.time}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '8px 6px', textAlign: 'center' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '3px 8px',
                                        borderRadius: '12px',
                                        fontSize: '0.7rem',
                                        fontWeight: '700',
                                        backgroundColor: item.status === 'Ongoing' ? '#ccfbf1' : '#f1f5f9',
                                        color: item.status === 'Ongoing' ? '#0f766e' : '#475569',
                                    }}>
                                        {item.status}
                                    </span>
                                </td>
                                {/* <td style={{ padding: '8px 6px', textAlign: 'right' }}>
                                    <button
                                        onClick={() => alert(`Joining session: ${item.title}`)}
                                        style={{
                                            background: 'rgba(0, 137, 123, 0.08)',
                                            color: '#00897b',
                                            border: 'none',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}
                                    >
                                        Join <ArrowRight size={12} />
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '6px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>
                            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, allTrainings.length)} of {allTrainings.length}
                        </span>
                    </div>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        style={{
                            background: currentPage === 1 ? '#f1f5f9' : '#ffffff',
                            color: currentPage === 1 ? '#cbd5e1' : '#0f172a',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            padding: '4px 8px',
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
                        disabled={currentPage === totalPages}
                        style={{
                            background: currentPage === totalPages ? '#f1f5f9' : '#ffffff',
                            color: currentPage === totalPages ? '#cbd5e1' : '#0f172a',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
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
        </div>
    );
}