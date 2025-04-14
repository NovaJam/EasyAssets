import { Router } from "express";

import {
  authAdmin,
  createAssets,
  deleteRoute,
  getAllAssets,
  getAssetRoute,
  updatedRoute,
} from "../controllers/assetsController";

const router = Router();

router.get("/", getAllAssets);
router.get("/:id", getAssetRoute);

router.post("/create", authAdmin, createAssets);
router.put("/:id", authAdmin, updatedRoute);
router.delete("/:id", authAdmin, deleteRoute);
import { create, getAll } from "../controllers/assets.controller";



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

router.post("/", create);

export default router;
