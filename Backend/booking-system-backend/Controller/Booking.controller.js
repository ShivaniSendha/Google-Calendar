
import Booking from "../models/Booking.js";


export const CreateBooking = async (req, res) => {
    console.log('Received data:', req.body);
    console.log(req.body.userId);

    const { title, start, end, room, userId } = req.body;

    // console.log('ghhjjhghjgj', req.body);

    try {
        const booking = await Booking.create({ title, start, end, userId, room });
        console.log("booking", booking);

        await booking.save();
        return res.status(201).json(booking);
    } catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({ message: 'Error creating booking' });
    }
};
export const GetBooking = async (req, res) => {
    try {
        // If userId is provided, fetch bookings for that user
        // If not, fetch all bookings
        const query = req.body.userId ? { userId: req.body.userId } : {};

        const events = await Booking.find(query);
        return res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        return res.status(500).json({ message: 'Error fetching events' });
    }
};

export const GetUserEvents = async (req, res) => {
    const userId = req.params.userId;
    console.log('dsjfhdjsfjhdsjfhdsf', userId);

    try {
        const events = await Booking.find({ userId });
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching user events:', error);
        res.status(500).json({ message: 'Error fetching events' });
    }
};
export const UpdateBooking = async (req, res) => {
    const { title, start, end, userId } = req.body;


    // Validate incoming data
    if (!title && !start && !end) {
        return res.status(400).json({ message: 'At least one field (title, start, end) must be provided to update.' });
    }

    try {

        const booking = await Booking.findOneAndUpdate(
            { userId },
            { title, start, end },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found or you do not have permission to update this booking.' });
        }
        console.log('dsajd', booking);
        return res.json(booking);
    } catch (error) {
        console.error('Error updating booking:', error);
        return res.status(500).json({ message: 'Error updating booking' });
    }
}

export const DeleteBooking = async (req, res) => {

    const { userId } = req.body;
    console.log(userId);

    // console.log("fdskjfk", bookingId);

    try {
        const booking = await Booking.findOneAndDelete({ userId: userId });
        console.log('dsajd', booking);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found or you do not have permission to delete this booking.' });
        }
        console.log('dsajd', booking);
        return res.json({ message: 'Booking deleted.' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        return res.status(500).json({ message: 'Error deleting booking' });
    }
}


