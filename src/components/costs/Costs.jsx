import { useState } from 'react';
import { Receipt, PhilippinePeso, ChevronLeft, ChevronRight } from 'lucide-react';

const allCostData = [
    { category: 'Certifications & ACLS', amount: '₱12,450', percentage: '35%' },
    { category: 'Specialized Workshops', amount: '₱8,200', percentage: '23%' },
    { category: 'Online Modules & Subscriptions', amount: '₱4,150', percentage: '12%' },
    { category: 'Materials & Handbooks', amount: '₱2,700', percentage: '8%' },
    { category: 'BLS & Re-certification Fees', amount: '₱3,500', percentage: '10%' },
    { category: 'Pediatric Care Simulation Kit', amount: '₱2,200', percentage: '6%' },
    { category: 'Trauma & ER Seminar Passes', amount: '₱1,800', percentage: '4%' },
    { category: 'Instructor Honoraria', amount: '₱750', percentage: '2%' },
];

export default function TrainingCostSummary() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7; // Fixed to 3 items per page to align height with neighboring cards

    // Pagination calculations
    const totalPages = Math.ceil(allCostData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = allCostData.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                {/* Header matching Upcoming Trainings design */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ background: 'rgba(0, 137, 123, 0.1)', color: '#00897b', padding: '6px', borderRadius: '8px', display: 'flex' }}>
                            <Receipt size={16} />
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: 0 }}>Training Cost Summary</h3>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '500' }}>
                        {startIndex + 1}-{Math.min(startIndex + itemsPerPage, allCostData.length)} of {allCostData.length}
                    </span>
                </div>

                {/* Total Cost Banner */}
                <div style={{
                    background: '#f0fdfa',
                    border: '1px solid #99f6e4',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <div>
                        <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '800', color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                            Total YTD Investment
                        </span>
                        <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#00897b', fontFamily: 'system-ui, sans-serif' }}>
                            ₱35,750
                        </span>
                    </div>
                    <div style={{ background: '#00897b', color: '#ffffff', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PhilippinePeso size={16} />
                    </div>
                </div>

                {/* Modern Card Itemized List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '150px' }}>
                    {currentItems.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                background: '#f8fafc',
                                border: '1px solid #f1f5f9',
                                borderRadius: '10px',
                                padding: '10px 12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00897b', flexShrink: 0 }}></span>
                                <span style={{ fontSize: '0.78rem', fontWeight: '400', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
                                    {item.category}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                <span style={{
                                    background: '#e2e8f0',
                                    color: '#475569',
                                    padding: '2px 6px',
                                    borderRadius: '10px',
                                    fontSize: '10px',
                                    fontWeight: '500'
                                }}>
                                    {item.percentage}
                                </span>
                                <strong style={{ color: '#0f172a', fontSize: '0.8rem', fontWeight: '600' }}>{item.amount}</strong>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Controls */}
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