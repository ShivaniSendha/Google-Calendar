// App.js
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import Signup from "./components/User/SignUp";
import Login from "./components/User/Login";
import WeekView from "./components/Weekview";
import Month from "./components/Month";
import BookingList from "./components/BookinList";


function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, view } = useContext(GlobalContext);
  const [showBookings, setShowBookings] = useState(false); 

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const toggleBookings = () => {
    setShowBookings((prev) => !prev);
  };

  return (
    <Router>
      <React.Fragment>
        {showEventModal && <EventModal />}

        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/month"
            element={
              <div className="h-screen flex flex-col">
                <CalendarHeader toggleBookings={toggleBookings} /> 
                <div className="flex flex-1">
                  <Sidebar />
                  {showBookings ? (
                    <BookingList />
                  ) : (
                    <>
                      {view === "month" && <Month month={currentMonth} />}
                      {view === "week" && <WeekView />}
                    </>
                  )}
                </div>
              </div>
            }
          />
        </Routes>
      </React.Fragment>
    </Router>
  );
}

export default App;
