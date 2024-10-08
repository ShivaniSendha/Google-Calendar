import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

const savedEventsReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map(evt => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter(evt => evt.id !== payload.id);
    default:
      throw new Error();
  }
};

const initEvents = () => {
  const storageEvents = localStorage.getItem("savedEvents");
  return storageEvents ? JSON.parse(storageEvents) : [];
};

export default function ContextWrapper({ children }) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);
  const [view, setView] = useState("month")
  const filteredEvents = useMemo(() => {
    const activeLabels = labels.filter(lbl => lbl.checked).map(lbl => lbl.label);
    return savedEvents.filter(evt => activeLabels.includes(evt.label));
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels(prevLabels => {
      const uniqueLabels = [...new Set(savedEvents.map(evt => evt.label))];
      return uniqueLabels.map(label => ({
        label,
        checked: prevLabels.find(lbl => lbl.label === label)?.checked ?? true,
      }));
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) setMonthIndex(smallCalendarMonth);
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) setSelectedEvent(null);
  }, [showEventModal]);

  const updateLabel = label => {
    setLabels(labels.map(lbl => (lbl.label === label.label ? label : lbl)));
  };

  return (
    <GlobalContext.Provider value={{
      monthIndex,
      setMonthIndex,
      smallCalendarMonth,
      setSmallCalendarMonth,
      daySelected,
      setDaySelected,
      showEventModal,
      setShowEventModal,
      dispatchCalEvent,
      selectedEvent,
      setSelectedEvent,
      savedEvents,
      labels,
      setLabels,
      updateLabel,
      filteredEvents,
      view, 
      setView, 
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
