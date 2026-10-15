import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
    ArrowLeft,
    Plus,
    Edit,
    Trash2,
    X,
    Clapperboard
} from 'lucide-react';

export default function LessonDetail() {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();

    // Module / Lesson Overview Metadata
    const [lessonInfo] = useState({
        title: 'Module 1: Foundations of Effective Leadership',
        facilitator: 'Daiken Antonio',
        description: 'Introduces core principles and competencies required to guide teams and organizations successfully. Participants explore core leadership styles, self-awareness, communication strategies, decision-making frameworks, and emotional intelligence to build a strong personal baseline for driving impact and influence.'
    });

    // Attachments List State
    const [attachments, setAttachments] = useState([
        {
            id: 1,
            fileName: 'The Fundamentals of Effective Leadership',
            fileType: 'presentation',
            description: 'Learn the core principles of effective leadership and how leaders can guide, influence, and support their teams in achieving organizational goals. Explore the key qualities and practices that contribute to a productive workplace.'
        },
        {
            id: 2,
            fileName: 'The Fundamentals of Effective Leadership Video',
            fileType: 'video',
            description: 'Learn the core principles of effective leadership and how leaders can guide, influence, and support their teams in achieving organizational goals. Explore the key qualities and practices that contribute to a productive workplace.'
        },
        {
            id: 3,
            fileName: 'The Fundamentals of Effective Leadership Read Material',
            fileType: 'pdf',
            description: 'Learn the core principles of effective leadership and how leaders can guide, influence, and support their teams in achieving organizational goals. Explore the key qualities and practices that contribute to a productive workplace.'
        },
        {
            id: 4,
            fileName: 'Forms and Notes',
            fileType: 'pdf',
            description: 'Learn the core principles of effective leadership and how leaders can guide, influence, and support their teams in achieving organizational goals. Explore the key qualities and practices that contribute to a productive workplace.'
        }
    ]);

    // UI States
    const [hoveredCard, setHoveredCard] = useState(null); // Tracks hovered attachment card ID
    const [hoveredBtn, setHoveredBtn] = useState(null);     // Tracks hovered action button
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newFile, setNewFile] = useState({ fileName: '', description: '' });

    // Delete Attachment Handler
    const handleDeleteAttachment = (id, fileName) => {
        if (window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
            setAttachments(prev => prev.filter(item => item.id !== id));
        }
    };

    // Add Attachment Handler
    const handleAddAttachmentSubmit = (e) => {
        e.preventDefault();
        if (!newFile.fileName.trim()) return alert('Please enter a file name');

        let type = 'file';
        if (newFile.fileName.endsWith('.pptx') || newFile.fileName.endsWith('.ppt')) type = 'presentation';
        else if (newFile.fileName.endsWith('.mp4') || newFile.fileName.endsWith('.mov')) type = 'video';
        else if (newFile.fileName.endsWith('.pdf')) type = 'pdf';

        const newItem = {
            id: Date.now(),
            fileName: newFile.fileName,
            fileType: type,
            description: newFile.description || 'Supplementary training resource.'
        };

        setAttachments(prev => [...prev, newItem]);
        setIsAddModalOpen(false);
        setNewFile({ fileName: '', description: '' });
    };

    // Helper to render distinct File Type Pill Styling & Label
    const getFilePillConfig = (type) => {
        switch (type) {
            case 'presentation':
                return { label: 'PPTX', color: '#b45309', bg: '#fef3c7', border: '#fde68a' };
            case 'video':
                return { label: 'VIDEO', color: '#1d4ed8', bg: '#dbeafe', border: '#bfdbfe' };
            case 'pdf':
                return { label: 'PDF', color: '#b91c1c', bg: '#fee2e2', border: '#fca5a5' };
            default:
                return { label: 'FILE', color: '#0f766e', bg: '#f0fdfa', border: '#99f6e4' };
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, [lessonId]);

    return (
        <div style={{ width: '100%', padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Navigation & Header */}
            <div>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#00897b',
                        fontSize: '0.78rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '24px',
                        padding: 0,
                    }}
                >
                    <ArrowLeft size={15} /> Back to Course Overview
                </button>

                <h1 style={{ fontSize: '1.6rem', fontWeight: '600', color: '#0f172a', margin: '0 0 14px 0', letterSpacing: '-0.02em' }}>
                    {lessonInfo.title}
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '700', color: '#00897b' }}>
                    <span>Facilitator: <strong style={{ color: '#334155', fontWeight: '600' }}>{lessonInfo.facilitator}</strong></span>
                </div>
            </div>

            {/* Lesson Overview Description Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
                border: '1px solid #99f6e4',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
            }}>
                <div>
                    <span style={{ fontSize: '0.68rem', paddingBottom: '16px', fontWeight: '700', color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.03em', display: 'block', marginBottom: '4px' }}>
                        Lesson Overview
                    </span>
                    <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: '1.6', margin: 0 }}>
                        {lessonInfo.description}
                    </p>
                </div>
            </div>

            {/* Attachments Section Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '20px',
                borderBottom: '1px solid #e2e8f0',
                marginTop: '16px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '500', color: '#0f172a', margin: 0 }}>
                        Attachments
                    </h2>
                    <span style={{
                        background: '#e2e8f0',
                        color: '#475569',
                        fontSize: '0.68rem',
                        fontWeight: '700',
                        padding: '2px 8px',
                        borderRadius: '12px'
                    }}>
                        {attachments.length} Files
                    </span>
                </div>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    style={{
                        background: '#00897b',
                        color: '#ffffff',
                        border: 'none',
                        padding: '7px 14px',
                        borderRadius: '10px',
                        fontSize: '0.78rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 6px rgba(0, 137, 123, 0.25)',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <Plus size={16} /> New
                </button>
            </div>

            {/* Itemized Attachments List with Card Hover Effects */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {attachments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px', color: '#64748b', fontSize: '0.85rem' }}>
                        No attachments uploaded for this lesson yet.
                    </div>
                ) : (
                    attachments.map((file) => {
                        const isCardHovered = hoveredCard === file.id;
                        const pillConfig = getFilePillConfig(file.fileType);

                        return (
                            <div
                                key={file.id}
                                onMouseEnter={() => setHoveredCard(file.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                style={{
                                    background: '#ffffff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '16px',
                                    padding: '16px',
                                    height: '110px',
                                    boxSizing: 'border-box',
                                    // Dynamic hover lift and shadow effect
                                    transform: isCardHovered ? 'translateY(-4px)' : 'translateY(0)',
                                    boxShadow: isCardHovered
                                        ? '0 12px 20px -3px rgba(0, 137, 123, 0.12), 0 4px 6px -4px rgba(0, 0, 0, 0.05)'
                                        : '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -2px rgba(0, 0, 0, 0.02)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '16px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease'
                                }}
                            >
                                <div style={{ flex: 1, overflow: 'hidden', minWidth: 0 }}>
                                    {/* Header Row with File Pill & Name */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                                        {/* FILE TYPE PILL */}
                                        <span style={{
                                            background: pillConfig.bg,
                                            color: pillConfig.color,
                                            border: `1px solid ${pillConfig.border}`,
                                            fontSize: '8px',
                                            fontWeight: '400',
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            letterSpacing: '0.02em',
                                            flexShrink: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            <Clapperboard size={11} />{pillConfig.label}
                                        </span>

                                        <h3 style={{
                                            fontSize: '0.925rem',
                                            fontWeight: '500',
                                            color: '#0f172a',
                                            margin: 0,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {file.fileName}
                                        </h3>
                                    </div>

                                    {/* Subtitle with Ellipsis Truncation */}
                                    <p style={{
                                        fontSize: '0.78rem',
                                        color: '#64748b',
                                        margin: 0,
                                        lineHeight: '1.4',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {file.description}
                                    </p>
                                </div>

                                {/* Actions Bar */}
                                <div style={{ display: 'flex', gap: '6px', flexShrink: 0, alignItems: 'center' }}>
                                    {/* EDIT BUTTON */}
                                    <button
                                        onClick={() => alert(`Edit attachment: ${file.fileName}`)}
                                        onMouseEnter={() => setHoveredBtn(`${file.id}-edit`)}
                                        onMouseLeave={() => setHoveredBtn(null)}
                                        title="Edit Attachment"
                                        style={{
                                            background: hoveredBtn === `${file.id}-edit` ? 'rgba(0, 137, 123, 0.1)' : 'transparent',
                                            color: hoveredBtn === `${file.id}-edit` ? '#00897b' : '#64748b',
                                            border: '1px solid #e2e8f0',
                                            padding: '6px 10px',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <Edit size={14} />
                                    </button>

                                    {/* DELETE BUTTON */}
                                    <button
                                        onClick={() => handleDeleteAttachment(file.id, file.fileName)}
                                        onMouseEnter={() => setHoveredBtn(`${file.id}-delete`)}
                                        onMouseLeave={() => setHoveredBtn(null)}
                                        title="Delete Attachment"
                                        style={{
                                            background: hoveredBtn === `${file.id}-delete` ? '#fef2f2' : 'transparent',
                                            color: hoveredBtn === `${file.id}-delete` ? '#dc2626' : '#64748b',
                                            border: '1px solid #e2e8f0',
                                            padding: '6px 10px',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* ADD ATTACHMENT MODAL OVERLAY */}
            {isAddModalOpen && (
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
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        position: 'relative'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Add New Attachment</h3>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddAttachmentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>File Name (including extension)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Clinical Guidelines.pdf or Presentation.pptx"
                                    value={newFile.fileName}
                                    onChange={(e) => setNewFile({ ...newFile, fileName: e.target.value })}
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

                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Description</label>
                                <textarea
                                    rows="3"
                                    placeholder="Brief summary of the attachment contents..."
                                    value={newFile.description}
                                    onChange={(e) => setNewFile({ ...newFile, description: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid #cbd5e1',
                                        fontSize: '0.825rem',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
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
                                    Add Attachment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}