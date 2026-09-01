import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});