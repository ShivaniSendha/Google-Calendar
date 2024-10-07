import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import Signup from "./components/User/SignUp";
import Login from "./components/User/Login";
import EventFetcher from "./components/EventFetch";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <Router>
      <React.Fragment>
        <EventFetcher />
        {showEventModal && <EventModal />}

        <Routes>
          {/* Signup Route */}
          <Route path="/" element={<Signup />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Month (Calendar) Route */}
          <Route
            path="/month"
            element={
              <div className="h-screen flex flex-col">
                <CalendarHeader />
                <div className="flex flex-1">
                  <Sidebar />
                  <Month month={currentMonth} />
                </div>
              </div>
            }
          />

          {/* Redirect from any other path to Signup */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </React.Fragment>
    </Router>
  );
}

export default App;
