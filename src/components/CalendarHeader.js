import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
import AuthContext from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../components/Calendarheader.css';

export default function CalendarHeader({ toggleBookings }) {
  const { monthIndex, setMonthIndex, setView, setDaySelected } = useContext(GlobalContext);
  const { user } = useContext(AuthContext) || {};
  const [users, setUsers] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [newUsername, setNewUsername] = useState(user ? user.username : '');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUsers(storedUser);
      setNewUsername(storedUser.username);
    }
  }, []);

  const handleProfileUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:3000/api/auth/profile/update', { username: newUsername }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers({ ...users, username: newUsername });
      setEditingProfile(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    Swal.fire({
      title: "Success",
      text: "Logout Successfully done!",
      icon: "success"
    });
    navigate('/login');
  };

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(dayjs().month());
    setDaySelected(dayjs());
  };

  const handleViewChange = (view) => {
    setView(view);
    setDaySelected(dayjs());
  };

  return (
    <header className="header">
      <img src={logo} alt="calendar" />
      <h1>Calendar</h1>
      <div className="view-buttons">
        <button onClick={() => handleViewChange("day")}>Day View</button>
        <button onClick={() => handleViewChange("week")}>Week View</button>
        <button onClick={() => handleViewChange("month")}>Month View</button>
      </div>
      <h2>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h2>
      <button onClick={handleReset}>Today</button>
      <button onClick={handlePrevMonth}>Previous</button>
      <button onClick={handleNextMonth}>Next</button>

      {/* User Profile Section */}
      <div className="user-profile">
        <div className="avatar" onClick={() => setMenuOpen(!menuOpen)}>
          {users && users.username ? users.username.charAt(0).toUpperCase() : 'U'}
        </div>
        {menuOpen && (
          <div className="dropdown-menu">
            <h3>{users ? users.username : 'Guest'}</h3>
            {editingProfile ? (
              <div>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <button onClick={handleProfileUpdate}>Update</button>
                <button onClick={() => setEditingProfile(false)}>Cancel</button>
              </div>
            ) : (
              <button onClick={() => setEditingProfile(true)}>Edit Profile</button>
            )}
            <button onClick={handleLogout}>Logout</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        )}
      </div>

      {/* Bookings Button */}
      <div className="bookings-button">
        <button onClick={toggleBookings}>Show Bookings</button>
      </div>
    </header>
  );
}
