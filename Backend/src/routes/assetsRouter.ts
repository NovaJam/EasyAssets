import { Router, Request, Response } from "express";

import {
  authAdmin,
  createAssets,
  deleteRoute,
  getAllAssets,
  getAssetRoute,
  updatedRoute,
} from "../controllers/assetsController";
import { getAssetsById } from "../services/Asset-Service/asset.service";

const router = Router();

router.get("/", getAllAssets);
router.get("/:id", getAssetRoute);

router.post("/create", authAdmin, createAssets);
router.put("/:id", authAdmin, updatedRoute);
router.delete("/:id", authAdmin, deleteRoute);

export default router;
