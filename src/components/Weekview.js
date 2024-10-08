// WeekView.js
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import Day from "./Day";
import '../components/Week.css'
export default function WeekView() {
    const { daySelected } = useContext(GlobalContext);
    const startOfWeek = daySelected.startOf('week');
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        weekDays.push(startOfWeek.add(i, 'day'));
    }

    return (
        <div className="week-container">
            {weekDays.map((day, index) => (
                <Day key={index} day={day} />
            ))}
        </div>
    );
}
