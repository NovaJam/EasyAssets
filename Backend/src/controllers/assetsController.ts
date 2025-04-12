import { Request, Response, NextFunction } from "express";
import {
  updateAseet,
  deleteAsset,
  getAssetsById,
  getAssets,
  createAsset,
} from "../services/Asset-Service/asset.service";
import jwt, { JwtPayload } from "jsonwebtoken";

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
    res.json({
      succses: false,
      messsage: "Couldn't get the data",
      error: (e as Error).message,
    });
    return;
  }
};

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.sessionToken;
  const decode = jwt.verify(token as string, process.env.JWT_SECRET!);

  if (!decode) {
    res.json({
      success: false,
      message: "You are not logged in ",
    });
    return;
  }

  const user = (decode as JwtPayload).role;

  if (user === "Admin") {
    next();
  } else {
    res.json({
      success: false,
      message: "You are not autharised for it",
    });
    return;
  }
};

export const getAllAssets = async (req: Request, res: Response) => {
  const data = await getAssets();

  if (!data) {
    res.json({
      message: "something is wrong",
    });
    return;
  }

  res.json({
    data: data,
  });
};

export const createAssets = async (req: Request, res: Response) => {
  const assetdata = req.body;
  try {
    const createdAsset = await createAsset(assetdata);
    res.json({
      success: true,
      message: "Asset have been created",
      data: createdAsset,
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Asset have not ben created",
      error: (e as Error).message,
    });
  }
};
