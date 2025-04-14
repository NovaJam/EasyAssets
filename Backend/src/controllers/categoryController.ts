import { Request, Response, NextFunction } from "express";
import { getCategories, getCategoryByName, createCategory, deleteCategory, getCategoryByCategoryId } from "../services/Category-Services/category.service";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { getUserById } from "../services/User-Services/user.service";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.sessionToken;
        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return
        }
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string };

        if (!decoded) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return
        }
        const user = await getUserById(decoded.id);

        if (!user) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return
        }

        if (user.role !== "Admin") {
            res.status(403).json({ success: false, message: "Admin role needed." });
            return
        }
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return
    }
}

// fetch all categories
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await getCategories();
        if (!categories) {
            res.status(404).json({ success: false, message: "No categories found" });
            return
        }

        res.status(200).json({ success: true, categories })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" })
        return
    }
}

// create new categoru - admin only
export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body || {};
        if (!name) {
            res.status(400).json({ success: false, message: "Name is required" })
            return
        }

        const existingCategory = await getCategoryByName(name);
        if (existingCategory) {
            res.status(400).json({ success: false, message: "This category already existed." })
            return
        }
        const categoryId = nanoid();

        const newCategory = await createCategory({ categoryId, name })
        if (!newCategory) {
            res.status(400).json({ success: false, message: "Failed to create category" })
            return
        }
        res.status(201).json({ success: true, message: "Category created successfully", category: newCategory })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// delete a categoru - admin only [buggy]
export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params || {};
        console.log(id)
        if (!id) {
            res.status(400).json({ success: false, message: "Category ID not found / already deleted" });
            return
        }
        const category = await getCategoryByCategoryId(id);
        if (!category) {
            res.status(404).json({ success: false, message: 'Category not found / already deleted' });
            return;
        }
        // const idtoDelete: string = category._id.toString();
        await deleteCategory(id);
        res.status(200).json({ success: true, message: "Category deleted successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}