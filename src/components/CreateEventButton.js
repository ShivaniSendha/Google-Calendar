import React, { useContext } from "react";
import plusImg from "../assets/plus.svg";
import GlobalContext from "../context/GlobalContext";
import './CreateEventButton.css'; // Import your CSS file

export default function CreateEventButton() {
  const { setShowEventModal, isHidden } = useContext(GlobalContext); 
  
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className={`create-event-button ${isHidden ? 'hidden' : ''}`}
    >
      <img src={plusImg} alt="create_event" />
      <span>Create</span>
    </button>
  );
}
