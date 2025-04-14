import { Router } from "express";

const router = Router();

import {
  create,
  getAll,
  deleteRoute,
  getAssetRoute,
  updatedRoute,
  authAdmin,
} from "../controllers/assets.controller";

/**
 * @swagger
 * /api/assets:
 *   get:
 *     summary: Get all Assets
 *     tags: [Assets]
 *     responses:
 *       200:
 *         description: Assets retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get("/", getAll);
/**
 * @swagger
 * /api/assets:
 *   post:
 *     summary: Register a new asset
 *     tags: [Assets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:              
 *               - name
 *               - category
 *               - location
 *               - status
 *               - createdBy
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                type: string
 *               location:
 *                type: string
 *               status:
 *                type: string
 *               assignedTo:
 *                type: string
 *               purchaseDate:
 *                type: string   
 *               warrantyDate:
 *                type: string
 *               lastMaintained:
 *                type: string
 *               nextMaintenance:
 *                type: string
 *               qrCodeUrl:
 *                type: string
 *               createdBy:
 *                type: string
 *               createdAt:
 *                type: string
 *               updatedAt:
 *                type: string      

 *     responses:
*       201:
*         description: Asset created successfully
*       400:
*         description: Asset has invalid data
*       500:
*         description: Internal server error
*/
router.post("/", authAdmin, create);

/**
 * @swagger
 * api/assets:
 *   get:
 *     summary: Get a specific asset by id
 *     tags: [Assets]
 *     responses:
 *       200:
 *         description: Asset retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getAssetRoute);

/**
 * @swagger
 * /api/assets/{id}:
 *   put:
 *     summary: Updating the asset
 *     tags: [Assets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the asset to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - location
 *               - status
 *               - createdBy
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               status:
 *                 type: string
 *               assignedTo:
 *                 type: string
 *               purchaseDate:
 *                 type: string
 *               warrantyDate:
 *                 type: string
 *               lastMaintained:
 *                 type: string
 *               nextMaintenance:
 *                 type: string
 *               qrCodeUrl:
 *                 type: string
 *               createdBy:
 *                 type: string
 *               createdAt:
 *                 type: string
 *               updatedAt:
 *                 type: string
 *     responses:
 *       200:
 *         description: Asset updated successfully
 *       400:
 *         description: Invalid update data
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authAdmin, updatedRoute);

/**
 * @swagger
 * /api/assets/{id}:
 *   delete:
 *     summary: Delete a specific asset by id
 *     tags: [Assets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the asset to delete
 *     responses:
 *       200:
 *         description: Asset deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authAdmin, deleteRoute);

export default router;
