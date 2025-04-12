import { Router, Request, Response } from "express";

import {
  deleteRoute,
  getAssetRoute,
  updatedRoute,
} from "../controllers/assetsController";
import { getAssetsById } from "../services/Asset-Service/asset.service";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Assets Endpoint" });
});
router.get("/:id", getAssetRoute);

router.post("/", async (req: Request, res: Response) => {});
router.put("/:id", updatedRoute);
router.delete("/:id", deleteRoute);

export default router;
