// EventFetcher.js

import React, { useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../context/GlobalContext";


const EventFetcher = () => {
    const { dispatchCalEvent, setUserId } = useContext(GlobalContext);
    const userId = JSON.parse(localStorage.getItem("user"))?.userId;

    useEffect(() => {
        const fetchEvents = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/bookings/Get/${userId}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    });
                    dispatchCalEvent({ type: 'push', payload: response.data }); // Assuming response.data is an array of events
                } catch (error) {
                    console.error('Error fetching events:', error);
                }
            }
        };

        fetchEvents();
    }, [userId, dispatchCalEvent]);

    return null; // This component doesn't need to render anything
};

export default EventFetcher;
