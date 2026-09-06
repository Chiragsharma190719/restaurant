import Category from "../models/categoryModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addCategory = async (req, res) => {
    try {
        const {name} = req.body;
        if (!name || !req.file) {
            return res.status(400).json({message: "Name and image are required", success: false});
        }

        const alreadyExists = await Category.findOne({name});
        if (alreadyExists) {
            return res.status(400).json({message: "Category already exists", success: false});
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        const newCategory = await Category.create({
            name,
            image: result.secure_url,
        });
        return res.status(201).json({message: "Category added successfully", success: true, category: newCategory});
    } catch (error) {
        console.error("Error adding category:", error);
        return res.status(500).json({message: "Failed to add category", success: false, error: error.message});
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({createdAt: -1});
        return res.status(200).json({message: "Categories fetched successfully", success: true, categories});
    } catch (error) {
        return res.status(500).json({message: "Failed to fetch categories", success: false});
    }
};

export const updateCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({message: "Category not found", success: false});
        }
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            category.image = result.secure_url;
        }
        if (name) category.name = name;

        await category.save();
        return res.status(200).json({message: "Category updated successfully", success: true, category});
    } catch (error) {
        return res.status(500).json({message: "Failed to update category", success: false});
    }
};

export const deleteCategory = async (req, res) => {
    try{
        const {id} = req.params;
        const category = await Category.findByIdAndDelete(id);
        if(!category) {
            return res.status(404).json({message: "Category Not Found"});
        }
        res.status(200).json({message: "Category deleted successfully", success: true});
    } catch (error) {
        return res.status(500).json({message: "Failed to delete category", success: false});
    }
}