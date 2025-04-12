import { Router, Request, Response } from "express";

import { deleteRoute, updatedRoute } from "../controllers/assetsController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Assets Endpoint" });
});
router.get("/:id", (req: Request, res: Response) => {
  res.json({ message: `Fetching asset with ID: ${req.params.id}` });
});

router.post("/", async (req: Request, res: Response) => {});
router.put("/:id", updatedRoute);
router.delete("/:id", deleteRoute);

export default router;
