import express from "express";
import { getAllCategories, updateCategory, deleteCategory, addCategory } from "../controllers/categoryController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/add", adminOnly, upload.single('image'), addCategory);
categoryRoutes.get("/get", getAllCategories);
categoryRoutes.put("/update/:id", adminOnly, upload.single('image'), updateCategory);
categoryRoutes.delete("/delete/:id", adminOnly, deleteCategory);

export default categoryRoutes;