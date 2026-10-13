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
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JS!
        return `${year}-${month}`;
    };

    // State stores a single YYYY-MM string (e.g., "2026-10")
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
        }
    ]);

    // Automatically sync the input field when the user navigates using prev/next buttons
    const handleDatesSet = (dateInfo) => {
        const currentDate = dateInfo.view.calendar.getDate();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        setCurrentYearMonth(`${year}-${month}`);
    };

    // Handle Month/Year input change
    const handleMonthYearInputChange = (e) => {
        const val = e.target.value; // Returns format like "2026-10"
        if (val) {
            setCurrentYearMonth(val);
            if (calendarRef.current) {
                const calendarApi = calendarRef.current.getApi();
                // Jump to the 1st day of the selected year and month
                calendarApi.gotoDate(`${val}-01`);
            }
        }
    };

    // Custom "Add Event" button action
    const handleAddEventClick = () => {
        const title = prompt('Enter new event title:');
        if (title) {
            const newEvent = {
                id: Date.now(),
                title,
                start: `${currentYearMonth}-16T10:00:00`,
                end: `${currentYearMonth}-16T11:00:00`,
            };
            setEvents(prev => [...prev, newEvent]);
        }
    };

    // Handle clicking an existing event (to delete)
    const handleEventClick = (arg) => {
        if (window.confirm(`Do you want to delete "${arg.event.title}"?`)) {
            setEvents(prev => prev.filter(ev => String(ev.id) !== String(arg.event.id)));
        }
    };

    // Handle selecting/dragging a date or time block to create an event
    const handleSelect = (arg) => {
        const title = prompt(`Create event from ${arg.startStr} to ${arg.endStr}? Enter title:`);
        if (title) {
            const newEvent = {
                id: Date.now(),
                title,
                start: arg.startStr,
                end: arg.endStr,
                allDay: arg.allDay
            };
            setEvents(prev => [...prev, newEvent]);
        }
        arg.view.calendar.unselect();
    };

    // Handle dragging and dropping an event to a new time slot
    const handleEventDrop = (arg) => {
        setEvents(prev => prev.map(ev => {
            if (String(ev.id) === String(arg.event.id)) {
                return {
                    ...ev,
                    start: arg.event.startStr,
                    end: arg.event.endStr,
                    allDay: arg.event.allDay
                };
            }
            return ev;
        }));
    };

    // Handle resizing an event's duration
    const handleEventResize = (arg) => {
        setEvents(prev => prev.map(ev => {
            if (String(ev.id) === String(arg.event.id)) {
                return {
                    ...ev,
                    start: arg.event.startStr,
                    end: arg.event.endStr
                };
            }
            return ev;
        }));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>

            {/* Custom Month/Year Input Filter Bar */}
            <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center', background: '#f8f9fa', padding: '12px 20px', borderRadius: '8px' }}>
                <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Month & Year:</label>
                <input
                    type="month"
                    value={currentYearMonth}
                    onChange={handleMonthYearInputChange}
                    style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }}
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

                buttons={{
                    add: {
                        text: 'Add Event',
                        click: handleAddEventClick
                    }
                }}

                headerToolbar={{
                    left: 'add prev,next,today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}

                editable={true}
                selectable={true}
                dayMaxEventRows={6}
                events={events}

                // Callbacks & Handlers
                datesSet={handleDatesSet}
                select={handleSelect}
                eventClick={handleEventClick}
                eventDrop={handleEventDrop}
                eventResize={handleEventResize}
            />
        </div>
    );
}