import Booking from "../models/bookingModel.js";

export const createBooking = async (req, res) => {
    try {
        const {id: userId} = req.user;
        const { name, phone, numberOfPeople, date, time, note } = req.body;

        if(!name || !phone || !numberOfPeople || !date || !time) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const existingBooking = await Booking.findOne({ date, time, status: { $ne: "cancelled" } });
        if(existingBooking) {
            return res.status(400).json({ message: "This time slot is already booked", success: false });
        }

        const booking = await Booking.create({ user: userId, name, phone, numberOfPeople, date, time, note });
        res.status(201).json({ message: "Table booked successfully", success: true });
    } catch (error) {
        console.error("createBooking error:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message, success: false });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const {id} = req.user;
        const bookings = await Booking.find({ user: id }).sort({ createdAt: -1 });
        res.status(200).json({ message: "Bookings retrieved successfully", bookings, success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("user", "name email");
        res.status(200).json({ message: "Bookings retrieved successfully", bookings, success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const {bookingId} = req.params;
        const {status} = req.body;
        console.log("Updating booking status - bookingId:", bookingId, "status:", status);
        const booking = await Booking.findById(bookingId);
        if(!booking) {
            console.log("Booking not found with ID:", bookingId);
            return res.status(404).json({ message: "Booking not found", success: false });
        }
        booking.status = status;
        await booking.save();
        console.log("Booking status updated successfully");
        res.status(200).json({ message: "Booking status updated successfully", booking, success: true });
    } catch (error) {
        console.error("updateBookingStatus error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message, success: false });
    }
};