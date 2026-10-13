import { useState } from 'react';
import { DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';

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
    const itemsPerPage = 10; // Displays 3 items per page to keep the box tidy

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
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Training Cost Summary</h3>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>
                        {startIndex + 1}-{Math.min(startIndex + itemsPerPage, allCostData.length)} of {allCostData.length}
                    </span>
                </div>

                {/* Total Cost Banner */}
                <div style={{
                    background: '#ccfbf1',
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
                        <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f766e', fontFamily: 'system-ui, sans-serif' }}>
                            ₱35,750
                        </span>
                    </div>
                    <div style={{ background: '#0f766e', color: '#ffffff', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <DollarSign size={16} />
                    </div>
                </div>

                {/* Breakdown Itemized List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minHeight: '110px' }}>
                    {currentItems.map((item, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '0.75rem',
                            paddingBottom: '4px',
                            borderBottom: '1px solid #f1f5f9'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00897b', flexShrink: 0 }}></span>
                                <span style={{ fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '170px' }}>
                                    {item.category}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: '#94a3b8', fontSize: '0.68rem' }}>{item.percentage}</span>
                                <strong style={{ color: '#0f172a', fontWeight: '700' }}>{item.amount}</strong>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination & Footer Controls */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '6px', borderTop: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                    </span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            style={{
                                background: currentPage === 1 ? '#f1f5f9' : '#ffffff',
                                color: currentPage === 1 ? '#cbd5e1' : '#0f172a',
                                border: '1px solid #e2e8f0',
                                borderRadius: '4px',
                                padding: '3px 6px',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '0.7rem',
                                fontWeight: '600'
                            }}
                        >
                            <ChevronLeft size={12} /> Prev
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            style={{
                                background: currentPage === totalPages ? '#f1f5f9' : '#ffffff',
                                color: currentPage === totalPages ? '#cbd5e1' : '#0f172a',
                                border: '1px solid #e2e8f0',
                                borderRadius: '4px',
                                padding: '3px 6px',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '0.7rem',
                                fontWeight: '600'
                            }}
                        >
                            Next <ChevronRight size={12} />
                        </button>
                    </div>
                </div>

                {/* <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', color: '#94a3b8' }}>
                    <span>Hospital HR Development Fund</span>
                    <span style={{ color: '#00897b', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
                        Details <ArrowUpRight size={11} />
                    </span>
                </div> */}
            </div>
        </div>
    );
}