import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import './Sidebar.css'; // Import your CSS file

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
