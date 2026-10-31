import express from "express";
import { registerUser, loginUser, adminLogin, logoutUser, getProfile, isAuth } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/admin/login", adminLogin);
authRoutes.post("/logout", logoutUser);
authRoutes.get("/profile", protect, getProfile);
authRoutes.get("/is-auth", protect, isAuth);

export default authRoutes;