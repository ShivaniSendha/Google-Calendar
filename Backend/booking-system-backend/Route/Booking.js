


import authMiddleware from '../Middleware/midleware.js'
import { CreateBooking, DeleteBooking, GetBooking, GetUserEvents, UpdateBooking } from '../Controller/Booking.controller.js';

import express from 'express'
const router = express.Router()
router.post('/Create', CreateBooking)
// Get all bookings for the CreateBookingauthenticated user
router.get('/Get', GetBooking)
router.get('/Get/:id', GetUserEvents)
// Update a booking
router.put('/Update/:id', UpdateBooking)
// Delete a booking
router.delete('/Delete/:id', DeleteBooking)

export default router;