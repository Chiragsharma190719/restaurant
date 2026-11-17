import express from "express";
import { getDashboardStats } from "../controllers/adminController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const adminRoutes = express.Router();

adminRoutes.get("/stats", protect, adminOnly, getDashboardStats);

export default adminRoutes;
