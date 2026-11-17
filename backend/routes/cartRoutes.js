import express from "express";
import { addToCart, getCart, removeFromCart, clearCart } from "../controllers/cartController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const cartRoutes = express.Router();

cartRoutes.post("/add", protect, addToCart);
cartRoutes.get("/get", protect, getCart);
cartRoutes.delete("/remove", protect, removeFromCart);
cartRoutes.delete("/clear", protect, clearCart);

export default cartRoutes;
