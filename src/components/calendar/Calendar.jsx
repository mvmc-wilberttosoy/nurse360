import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';

// Import plugins directly from the React package sub-paths in v7
import dayGridPlugin from '@fullcalendar/react/daygrid';
import timeGridPlugin from '@fullcalendar/react/timegrid';
import interactionPlugin from '@fullcalendar/react/interaction';
import listPlugin from '@fullcalendar/react/list';

// Import v7 skeleton and Breezy theme stylesheets
import '@fullcalendar/react/skeleton.css';
import '@fullcalendar/react/themes/breezy/theme.css';
import '@fullcalendar/react/themes/breezy/palettes/emerald.css';
import classicThemePlugin from '@fullcalendar/react/themes/breezy';

export default function CalendarApp() {
    const calendarRef = useRef(null);

    // Function to get today's year and month in "YYYY-MM" format
    const getTodayYearMonth = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    };

    const [currentYearMonth, setCurrentYearMonth] = useState(getTodayYearMonth());

    // React state managing your calendar events
    const [events, setEvents] = useState([
        {
            id: 1,
            title: 'Morning Shift / Nurse Briefing',
            start: '2026-10-15T08:00:00',
            end: '2026-10-15T09:00:00',
        },
        {
            id: 2,
            title: 'Patient Rounds',
            start: '2026-10-15T09:00:00',
            end: '2026-10-15T10:00:00',
        },
        {
            id: 3,
            title: 'Team Workshop',
            date: '2026-10-18',
            allDay: true
        },
        {
            id: 4,
            title: 'New Employee Orientation',
            start: '2026-10-15T10:00:00',
            end: '2026-10-15T11:00:00',
        },
    ]);

    // Automatically sync the input field when navigating via calendar prev/next buttons
    const handleDatesSet = (dateInfo) => {
        const currentDate = dateInfo.view.calendar.getDate();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        setCurrentYearMonth(`${year}-${month}`);
    };

    // Handle Month/Year input change to jump calendar date
    const handleMonthYearInputChange = (e) => {
        const val = e.target.value;
        if (val) {
            setCurrentYearMonth(val);
            if (calendarRef.current) {
                const calendarApi = calendarRef.current.getApi();
                calendarApi.gotoDate(`${val}-01`);
            }
        }
    };

    // Handle clicking an existing event (to delete)
    // const handleEventClick = (arg) => {
    //     if (window.confirm(`Do you want to delete "${arg.event.title}"?`)) {
    //         setEvents(prev => prev.filter(ev => String(ev.id) !== String(arg.event.id)));
    //     }
    // };

    // Handle selecting/dragging a date or time block to create an event
    // const handleSelect = (arg) => {
    //     const title = prompt(`Create event from ${arg.startStr} to ${arg.endStr}? Enter title:`);
    //     if (title) {
    //         const newEvent = {
    //             id: Date.now(),
    //             title,
    //             start: arg.startStr,
    //             end: arg.endStr,
    //             allDay: arg.allDay
    //         };
    //         setEvents(prev => [...prev, newEvent]);
    //     }
    //     arg.view.calendar.unselect();
    // };

    // Handle dragging and dropping an event to a new time slot
    // const handleEventDrop = (arg) => {
    //     setEvents(prev => prev.map(ev => {
    //         if (String(ev.id) === String(arg.event.id)) {
    //             return {
    //                 ...ev,
    //                 start: arg.event.startStr,
    //                 end: arg.event.endStr,
    //                 allDay: arg.event.allDay
    //             };
    //         }
    //         return ev;
    //     }));
    // };

    // Handle resizing an event's duration
    // const handleEventResize = (arg) => {
    //     setEvents(prev => prev.map(ev => {
    //         if (String(ev.id) === String(arg.event.id)) {
    //             return {
    //                 ...ev,
    //                 start: arg.event.startStr,
    //                 end: arg.event.endStr
    //             };
    //         }
    //         return ev;
    //     }));
    // };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>

            {/* Custom Month/Year Filter Bar replacing the Add Button */}
            <div style={{
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#f8f9fa',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
            }}>
                <span style={{ fontWeight: '600', fontSize: '13px', color: '#475569' }}>Jump to Month:</span>
                <input
                    type="month"
                    value={currentYearMonth}
                    onChange={handleMonthYearInputChange}
                    style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
            </div>

            {/* FullCalendar Component */}
            <FullCalendar
                ref={calendarRef}
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                    classicThemePlugin
                ]}
                timeZone="Asia/Manila"
                initialView="dayGridMonth"

                headerToolbar={{
                    left: 'prev,next,today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,listWeek'
                }}

                editable={true}
                selectable={true}
                dayMaxEventRows={2}
                events={events}

                // Callbacks & Handlers
                datesSet={handleDatesSet}
            // select={handleSelect}
            // eventClick={handleEventClick}
            // eventDrop={handleEventDrop}
            // eventResize={handleEventResize}
            />
        </div>
    );
}