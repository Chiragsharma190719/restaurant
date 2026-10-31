import express from "express";
import { adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import { addMenuItem, deleteMenuItem, getAllMenuItems, updateMenuItem } from "../controllers/menuController.js";

const menuRoutes = express.Router();

menuRoutes.post("/add", upload.single("image"), addMenuItem);
menuRoutes.delete("/delete/:id", deleteMenuItem);
menuRoutes.get("/get", getAllMenuItems);
menuRoutes.put("/update/:id", upload.single("image"), updateMenuItem);

export default menuRoutes;