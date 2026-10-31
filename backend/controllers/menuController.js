import Menu from "../models/menuModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addMenuItem = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        console.log("Request body:", req.body);
        console.log("File:", req.file);
        
        if (!name || !description || !price || !category || !req.file) {
            const missingFields = [];
            if (!name) missingFields.push("name");
            if (!description) missingFields.push("description");
            if (!price) missingFields.push("price");
            if (!category) missingFields.push("category");
            if (!req.file) missingFields.push("image");
            console.log("Missing fields:", missingFields);
            return res.status(400).json({ message: "All fields are required", success: false, missingFields });
        }
        const result = await cloudinary.uploader.upload(req.file.path);

        const newMenuItem = await Menu.create({
            name,
            description,
            price,
            category,
            isAvailable: true,
            image: result.secure_url
        });

        res.status(201).json({ message: "Menu item added successfully", success: true, data: newMenuItem });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getAllMenuItems = async (req, res) => {
    try {
        const menus = await Menu.find().populate("category", "name").sort({ createdAt: -1 });
        res.status(200).json({ message: "Menu items fetched successfully", success: true, data: menus });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, isAvailable } = req.body;

        console.log("Updating menu item with ID:", id);

        const menuItem = await Menu.findById(id);
        if (!menuItem) {
            console.log("Menu item not found with ID:", id);
            return res.status(404).json({ message: "Menu item not found", success: false });
        }

        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            menuItem.image = result.secure_url;
        }

        if(name){
            menuItem.name = name;
        }
        if(description){
            menuItem.description = description;
        }
        if(price){
            menuItem.price = price;
        }
        if(category){
            menuItem.category = category;
        }
        if(isAvailable !== undefined){
            menuItem.isAvailable = isAvailable;
        }

        await menuItem.save();

        res.status(200).json({ message: "Menu item updated successfully", success: true, data: menuItem });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const menuItem = await Menu.findByIdAndDelete(id);
        // if (!menuItem) {
        //     return res.status(404).json({ message: "Menu item not found", success: false });
        // }
        res.status(200).json({ message: "Menu item deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};