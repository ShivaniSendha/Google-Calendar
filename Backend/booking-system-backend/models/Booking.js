import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: String, required: true },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt

// Custom validation to ensure 'end' is after 'start'
bookingSchema.pre('validate', function (next) {
    if (this.start >= this.end) {
        const error = new Error('End time must be after start time.');
        next(error);
    } else {
        next();
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
