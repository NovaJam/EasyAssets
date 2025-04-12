import { Request, Response } from "express";
import {
  updateAseet,
  deleteAsset,
} from "../services/Asset-Service/asset.service";

export const updatedRoute = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const upadatedData = req.body;
    const modified = await updateAseet(id, upadatedData);

    if (!modified) {
      res.json({
        succses: false,
        message: "Asset not found",
      });
      return;
    }
    res.json({
      succses: true,
      data: modified,
    });
    return;
  } catch (e) {
    console.error(e);
    res.json({
      succses: false,
      message: "failed to do anythying",
      error: (e as Error).message,
    });
    return;
  }
};

export const deleteRoute = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await deleteAsset(id);

    if (!deleted) {
      res.json({
        succses: false,
        message: "Asset not found",
      });
      return;
    }

    res.json({
      succses: true,
      message: "Asset deleted",
      data: deleted,
    });
    return;
  } catch (e) {
    console.error(e);
    res.json({
      succses: false,
      messsage: "Delete did not work",
      error: (e as Error).message,
    });
    return;
  }
};
