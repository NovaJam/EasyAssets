import { Request, Response } from "express";
import {
  updateAseet,
  deleteAsset,
  getAssetsById,
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

export const getAssetRoute = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const foundData = await getAssetsById(id);

    if (!foundData) {
      res.json({
        succses: false,
        messsage: "Data not found ",
      });
      return;
    }

    res.json({
      succses: true,
      message: "Data found",
      data: foundData,
    });
    return;
  } catch (e) {
    console.error(e);
    res.json({
      succses: false,
      messsage: "Couldn't get the data",
      error: (e as Error).message,
    });
    return;
  }
};
