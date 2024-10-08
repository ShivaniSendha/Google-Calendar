import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs"; // Import dayjs for date formatting
import '../components/BookingList.css'; // Import your CSS file

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/bookings/Get");
                const bookingData = response.data; // Assuming this is the array of bookings

                // Extract title, start, end, and room from each booking
                const formattedBookings = bookingData.map(booking => ({
                    title: booking.title,
                    room: booking.room, // Add room information
                    start: dayjs(booking.start).format('MMMM D, YYYY hh:mm A'), // Format start time with date
                    end: dayjs(booking.end).format('MMMM D, YYYY hh:mm A'),     // Format end time with date
                }));

                setBookings(formattedBookings);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchBookings();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="booking-list">
            <h2>Bookings List</h2>
            <div className="grid1">
                {bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <div key={index} className="booking-item">
                            <strong>{booking.room}</strong><br></br>
                            <strong>{booking.title}:</strong> from {booking.start} to {booking.end}
                        </div>
                    ))
                ) : (
                    <div className="no-bookings">There are no bookings right now.</div>
                )}
            </div>
        </div>
    );
};

export default BookingList;
