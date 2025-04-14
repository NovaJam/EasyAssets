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

export default router;
