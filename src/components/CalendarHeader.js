import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";

import '../components/Calendarheader.css';
import AuthContext from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const { user, logout } = useContext(AuthContext) || {}; // Provide a fallback
  const [users, setUsers] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [newUsername, setNewUsername] = useState(user ? user.username : '');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset() {
    setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
  }

  const fetchUserProfile = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUsers(storedUser);
      setNewUsername(storedUser.username);
      console.log('username', newUsername);

    }
  };

  useEffect(() => {

    fetchUserProfile();
  }, []);

  const handleProfileUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:3000/api/auth/profile/update', { username: newUsername }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers({ ...user, username: newUsername });
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


  return (
    <header className="header">
      <img src={logo} alt="calendar" />
      <h1>Calendar</h1>
      <button onClick={handleReset}>Today</button>
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined">chevron_left</span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined">chevron_right</span>
      </button>
      <h2>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h2>

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
    </header>
  );
}
