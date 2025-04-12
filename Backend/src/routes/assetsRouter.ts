import { Router } from "express";
import { create, getAll } from "../controllers/assets.controller";

const router = Router();

router.get("/", getAll);
router.post("/", create);

export default router;
