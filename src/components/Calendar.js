import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import AddEvent from './AddEvent';
import CalendarHeader from './CalendarHeader'; // Import the header

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
    const [events, setEvents] = useState([]);
    const [view, setView] = useState('month'); // Initialize view state
    const [monthIndex, setMonthIndex] = useState(moment().month()); // Initialize month index

    // Example: Fetch events if necessary
    // useEffect(() => { ... });

    return (
        <div className="calendar-container">
            <CalendarHeader setView={setView} monthIndex={monthIndex} setMonthIndex={setMonthIndex} /> {/* Pass props */}
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '80vh', width: '100%' }}
                selectable
                views={['month', 'week', 'day', 'agenda']}
                defaultView={view}
                onView={(newView) => setView(newView)} // Update view state
            />
        </div>
    );
};

export default CalendarComponent;
