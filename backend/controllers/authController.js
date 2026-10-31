import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (res, payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    });
    return token;
};

// Register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ message: "Please provide all required fields", success: false });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({ message: "User already exists", success: false });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        return res.json({ message: "User registered successfully", success: true });
    } catch (error) {
        console.error(error);
        return res.json({ message: "Internal server error", success: false });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ message: "Please provide all required fields", success: false });
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.json({ message: "User not found", success: false });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({ message: "Invalid password", success: false });
        }
        
        const token = generateToken(res, { id: user._id, role: user.isAdmin ? "admin" : "user" });
        res.json({ 
            message: "User logged in successfully", 
            success: true,
            token,
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        return res.json({ message: "Internal server error", success: false });
    }
};

// AdminLogin
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "Please provide all required fields", success: false });
        }
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (email !== adminEmail || password !== adminPassword) {
            return res.json({ message: "Invalid email or password", success: false });
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        return res.json({ success:true, message: "Admin logged in successfully", admin:{admin:adminEmail} }); 
    } catch (error) {
        console.error(error);
        return res.json({ message: "Internal server error", success: false });
    }
};

// Logout user
const logoutUser = (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ message: "User logged out successfully", success: true });
    } catch (error) {
        console.error(error);
        return res.json({ message: "Internal server error", success: false });
    }
};


// Get user profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({ message: "User not found", success: false });
        } 
        res.json({ user, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" , success: false });
    }
};

// Get user => no logout
const isAuth = async (req, res) => {
    try{
        const {id} = req.user;
        const user = await User.findById(id).select("-password");
        res.json({ user, success: true });
    } catch (error) {
        console.error(error);
        return res.json({ message: "Internal server error", success: false });
    }
}


export { generateToken, registerUser, loginUser, logoutUser, adminLogin, getProfile, isAuth };