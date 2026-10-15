import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
    ArrowLeft,
    Plus,
    Paperclip,
    Edit,
    Trash2,
    UserMinus,
    HelpCircle,
    UserPlus,
    Users,
    FileText
} from 'lucide-react';

export default function CourseDetail() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    // Course Metadata State
    const [courseInfo] = useState({
        title: 'Leadership and People Management',
        description: 'This class develops supervisors and managers’ skills in leading teams, delegating tasks, coaching employees, and managing performance effectively. It also focuses on communication, conflict resolution, employee motivation, and creating a positive and productive workplace.'
    });

    // Modules and Quizzes List State
    const [modulesList, setModulesList] = useState([
        {
            id: 1,
            type: 'module',
            title: 'Foundations of Effective Leadership',
            facilitator: 'Daiken Antonio',
            description: 'Learn the key principles of effective leadership, including decision-making, accountability, delegation, and motivating employees.',
            attachmentsCount: 2
        },
        {
            id: 2,
            type: 'quiz',
            title: 'Foundations of Effective Leadership',
            facilitator: null,
            description: 'Learn the key principles of effective leadership, including decision-making, accountability, delegation, and motivating employees.',
            attachmentsCount: 0
        },
        {
            id: 3,
            type: 'module',
            title: 'Advanced Team Dynamics & Coaching',
            facilitator: 'Harold Tosoy',
            description: 'Learn the key principles of effective leadership, including decision-making, accountability, delegation, and motivating employees.',
            attachmentsCount: 2
        },
        {
            id: 4,
            type: 'quiz',
            title: 'Team Dynamics Assessment',
            facilitator: null,
            description: 'Learn the key principles of effective leadership, including decision-making, accountability, delegation, and motivating employees.',
            attachmentsCount: 0
        },
        {
            id: 5,
            type: 'quiz',
            title: 'Foundations of Effective Leadership',
            facilitator: null,
            description: 'Learn the key principles of effective leadership, including decision-making, accountability, delegation, and motivating employees.',
            attachmentsCount: 0
        }
    ]);

    // Participants List State
    const [participants, setParticipants] = useState([
        { id: 1, name: 'Wilbert Tosoy', role: 'Staff Nurse' },
        { id: 2, name: 'Clint Alvin Cesar', role: 'Staff Nurse' },
        { id: 3, name: 'Marlon Morfe', role: 'Staff Nurse' },
        { id: 4, name: 'Alexzandra Fernando', role: 'Staff Nurse' },
    ]);

    // Hover States
    const [hoveredCard, setHoveredCard] = useState(null); // Tracks hovered module card ID
    const [hoveredBtn, setHoveredBtn] = useState(null);

    // Handlers
    const handleDeleteModule = (moduleId, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            setModulesList(prev => prev.filter(m => m.id !== moduleId));
        }
    };

    const handleRemoveParticipant = (participantId, name) => {
        if (window.confirm(`Remove ${name} from this course?`)) {
            setParticipants(prev => prev.filter(p => p.id !== participantId));
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, [courseId]);

    return (
        <div style={{ width: '100%', padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Top Navigation & Title Bar */}
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
                        padding: 0
                    }}
                >
                    <ArrowLeft size={15} /> Back to Courses
                </button>
                <h1 style={{ fontSize: '1.6rem', fontWeight: '600', color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
                    {courseInfo.title}
                </h1>
            </div>

            {/* Main Layout Grid: Content Area + Sidebar */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 280px',
                gap: '20px',
                alignItems: 'start'
            }}>

                {/* LEFT MAIN CONTAINER */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* Course Overview Card Banner */}
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
                            <span style={{ fontSize: '0.68rem', fontWeight: '700', color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.03em', display: 'block', marginBottom: '4px' }}>
                                Course Description
                            </span>
                            <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: '1.6', marginTop: '20px' }}>
                                {courseInfo.description}
                            </p>
                        </div>
                    </div>

                    {/* Modules & Quizzes Section Header */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '20px',
                        borderBottom: '1px solid #e2e8f0',
                        paddingTop: '16px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: '500', color: '#0f172a', margin: 0 }}>
                                Modules
                            </h2>
                            <span style={{
                                background: '#e2e8f0',
                                color: '#475569',
                                fontSize: '0.68rem',
                                fontWeight: '700',
                                padding: '2px 8px',
                                borderRadius: '12px'
                            }}>
                                {modulesList.length} Items
                            </span>
                        </div>

                        <button
                            onClick={() => alert('Add Module modal trigger')}
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

                    {/* Modules & Quizzes Itemized List with Card Hover Effects */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {modulesList.map((item) => {
                            const isCardHovered = hoveredCard === item.id;
                            const isQuiz = item.type === 'quiz';

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => navigate(`/dashboard/courses/${courseId}/lesson/${item.id}`)}
                                    onMouseEnter={() => setHoveredCard(item.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    style={{
                                        background: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '16px',
                                        padding: '16px',
                                        // Dynamic hover lift and shadow effect
                                        transform: isCardHovered ? 'translateY(-4px)' : 'translateY(0)',
                                        boxShadow: isCardHovered
                                            ? '0 12px 20px -3px rgba(0, 137, 123, 0.12), 0 4px 6px -4px rgba(0, 0, 0, 0.05)'
                                            : '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -2px rgba(0, 0, 0, 0.02)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        gap: '16px',
                                        transition: 'all 0.25s ease',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ flex: 1 }}>
                                        {/* Header Row with Type Pill Badge & Title */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                                            <span style={{
                                                background: isQuiz ? '#fef3c7' : '#dcfce7',
                                                color: isQuiz ? '#b45309' : '#15803d',
                                                border: `1px solid ${isQuiz ? '#fde68a' : '#bbf7d0'}`,
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                fontSize: '8px',
                                                fontWeight: '400',
                                                textTransform: 'uppercase',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                            }}>
                                                {isQuiz ? <HelpCircle size={12} /> : <FileText size={12} />}
                                                {isQuiz ? 'Quiz' : 'Lesson'}
                                            </span>

                                            <h3 style={{ fontSize: '0.925rem', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                                                {item.title}
                                            </h3>
                                        </div>

                                        {/* Facilitator Subtitle if present */}
                                        {item.facilitator && (
                                            <div style={{ fontSize: '0.72rem', fontWeight: '500', color: '#00897b', marginBottom: '6px' }}>
                                                Facilitator: <span style={{ color: '#334155', fontWeight: '600' }}>{item.facilitator}</span>
                                            </div>
                                        )}

                                        {/* Description */}
                                        <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '4px 0 10px 0', lineHeight: '1.4' }}>
                                            {item.description}
                                        </p>

                                        {/* Attachment Indicator */}
                                        {item.attachmentsCount > 0 && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#00897b', fontWeight: '500', paddingTop: '20px' }}>
                                                <Paperclip size={13} color="#00897b" />
                                                <span>{item.attachmentsCount} files attached</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => alert(`Edit ${item.title}`)}
                                            onMouseEnter={() => setHoveredBtn(`${item.id}-edit`)}
                                            onMouseLeave={() => setHoveredBtn(null)}
                                            title="Edit Item"
                                            style={{
                                                background: hoveredBtn === `${item.id}-edit` ? 'rgba(0, 137, 123, 0.1)' : 'transparent',
                                                color: '#94a3b8',
                                                border: 'none',
                                                padding: '4px 6px',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <Edit size={14} />
                                        </button>

                                        <button
                                            onClick={() => handleDeleteModule(item.id, item.title)}
                                            onMouseEnter={() => setHoveredBtn(`${item.id}-delete`)}
                                            onMouseLeave={() => setHoveredBtn(null)}
                                            title="Delete Item"
                                            style={{
                                                background: hoveredBtn === `${item.id}-delete` ? '#fef2f2' : 'transparent',
                                                color: hoveredBtn === `${item.id}-delete` ? '#dc2626' : '#94a3b8',
                                                border: 'none',
                                                padding: '4px 6px',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT SIDEBAR: PARTICIPANTS */}
                <div style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    {/* Sidebar Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Users size={16} color="#00897b" />
                            <h3 style={{ fontSize: '0.85rem', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                                Participants ({participants.length})
                            </h3>
                        </div>
                        <button
                            onClick={() => alert('Enroll participant modal')}
                            title="Enroll Participant"
                            style={{
                                background: '#00897b',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '0.72rem',
                                fontWeight: '700'
                            }}
                        >
                            <UserPlus size={14} />
                        </button>
                    </div>

                    {/* Participant List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {participants.length === 0 ? (
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '8px 0', textAlign: 'center' }}>No enrolled participants.</p>
                        ) : (
                            participants.map((person) => (
                                <div
                                    key={person.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '6px 10px',
                                        borderRadius: '8px',
                                        background: '#f8fafc',
                                        border: '1px solid #f1f5f9'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: '400', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {person.name}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handleRemoveParticipant(person.id, person.name)}
                                        title="Remove Participant"
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#cbd5e1',
                                            cursor: 'pointer',
                                            padding: '2px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            transition: 'color 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                                    >
                                        <UserMinus size={14} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}