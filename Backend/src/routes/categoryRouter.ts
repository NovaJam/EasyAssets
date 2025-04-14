import express from 'express';
import { isAdmin, getAllCategories, create, remove } from "../controllers/categoryController"
import { Router } from "express"

const router = express.Router();


/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       categoryId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       createdAt:
 *                        type: string
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllCategories);


/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Add a new category (Admin only)
 *     tags: [Categories]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     categoryId:
 *                       type: string
 *                     name:
 *                       type: string
 *       400:
 *         description: Category already exists or missing required fields
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied (Admin role required)
 *       500:
 *         description: Internal server error
 */
router.post('/', isAdmin, create)

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Remove a category (Admin only)
 *     tags: [Categories]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Category ID is required
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied (Admin role required)
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', isAdmin, remove);

export default router;