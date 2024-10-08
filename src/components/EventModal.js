import React, { useContext, useState } from "react";
import axios from 'axios';
import GlobalContext from "../context/GlobalContext";
import '../components/EventModel.css';
import Swal from "sweetalert2";

const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

const roomOptions = [
  "Conference 1",
  "Conference 2",
  "Think Tank 2",
];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
    savedEvents,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "");
  const [selectedLabel, setSelectedLabel] = useState(selectedEvent ? selectedEvent.label : labelsClasses[0]);
  const [room, setRoom] = useState(selectedEvent ? selectedEvent.room : "");
  const [date, setDate] = useState(selectedEvent ? selectedEvent.start.split('T')[0] : daySelected.format("YYYY-MM-DD"));
  const [startTime, setStartTime] = useState(selectedEvent ? selectedEvent.start.split('T')[1].substring(0, 5) : "09:00");
  const [endTime, setEndTime] = useState(selectedEvent ? selectedEvent.end.split('T')[1].substring(0, 5) : "10:00");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('token');

  const handleDelete = async () => {
    if (!selectedEvent || !selectedEvent.id) return;

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    try {
      await axios.delete(`http://localhost:3000/api/bookings/Delete/${selectedEvent.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: { userId },
      });

      // Update local storage
      const updatedSavedEvents = savedEvents.filter(event => event.id !== selectedEvent.id);
      localStorage.setItem('savedEvents', JSON.stringify(updatedSavedEvents));

      // Update the context and close the modal
      dispatchCalEvent({ type: "delete", payload: selectedEvent });
      setShowEventModal(false);
      Swal.fire({
        title: "Deleted",
        text: "Event deleted successfully!",
        icon: "success"
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete event.",
        icon: "error"
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    // Validate form inputs
    if (!title || !room || !date || !startTime || !endTime) {
      setErrorMessage('All fields are required.');
      setLoading(false);
      return;
    }

    const start = `${date}T${startTime}`;
    const end = `${date}T${endTime}`;

    const hasConflict = savedEvents.some(event => {
      return (
        event.room === room &&
        new Date(event.start) < new Date(end) &&
        new Date(event.end) > new Date(start)
      );
    });

    if (hasConflict) {
      Swal.fire({
        title: "Alert",
        text: "You can't add this event right now because this room is already booked for the selected time.",
        icon: "error"
      });
      setLoading(false);
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      room,
      start,
      end,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
      userId: userId
    };

    try {
      if (selectedEvent) {
        await axios.put(`http://localhost:3000/api/bookings/Update/${selectedEvent.id}`, calendarEvent, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatchCalEvent({ type: "update", payload: calendarEvent });
        Swal.fire({
          title: "Success",
          text: "Event updated successfully!",
          icon: "success"
        });
      } else {
        await axios.post('http://localhost:3000/api/bookings/Create', calendarEvent, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatchCalEvent({ type: "push", payload: calendarEvent });
        Swal.fire({
          title: "Success",
          text: "Event created successfully!",
          icon: "success"
        });
      }
      setShowEventModal(false);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Failed to save event.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <form className="modal" onSubmit={handleSubmit}>
        <header className="modal-header">
          <span className="material-icons-outlined modal-title">drag_handle</span>
          <div className="modal-controls">
            {selectedEvent && (
              <span
                onClick={handleDelete}
                className="material-icons-outlined modal-title cursor-pointer"
              >
                delete
              </span>
            )}
            <button type="button" className="close-button" onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined modal-title">close</span>
            </button>
          </div>
        </header>
        <div className="modal-body">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <input
            type="text"
            name="title"
            placeholder="Add title"
            value={title}
            required
            className="input-field"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="date-info">
            <span className="material-icons-outlined label">schedule</span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
          </div>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            name="start"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <input
            type="time"
            name="end"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
          <select className="room" value={room} onChange={(e) => setRoom(e.target.value)} required>
            <option value="">Select Room</option>
            {roomOptions.map((roomOption, index) => (
              <option key={index} value={roomOption}>{roomOption}</option>
            ))}
          </select>
          <div className="label-section">
            <span className="material-icons-outlined label">bookmark_border</span>
            <div className="label-container">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`label-circle ${lblClass}`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="modal-footer">
          <button
            type="submit"
            className="save-button"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </footer>
      </form>
    </div>
  );
}
