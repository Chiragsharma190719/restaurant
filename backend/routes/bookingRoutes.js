import express from "express";
import { createBooking, getUserBookings, getAllBookings, updateBookingStatus } from "../controllers/bookingController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const bookingRoutes = express.Router();

bookingRoutes.post("/create", protect, createBooking);
bookingRoutes.get("/my-bookings", protect, getUserBookings);
bookingRoutes.get("/bookings", adminOnly, getAllBookings);
bookingRoutes.put("/update-status/:bookingId", updateBookingStatus);

export default bookingRoutes;