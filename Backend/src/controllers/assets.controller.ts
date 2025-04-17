import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  createAsset,
  getAssets,
  deleteAsset,
  getAssetsById,
  updateAsset,
} from "../services/User-Services/assets.service";
import { assetSchema, updateSchema } from "../validators/asset/asset.validator";
import { ZodError } from "zod";
import { v4 as createUniqueId } from "uuid";
import { nanoid } from "nanoid";

export const create = async (req: Request, res: Response) => {
  try {
    const validatedAsset = assetSchema.parse(req.body);
    const saveAsset = { assetId: nanoid(), ...validatedAsset };
    console.log("we managed to validate the asset !!!", saveAsset);

    await createAsset(req.body);

    console.log("we managed to create the asset in the database !!!");
    res.status(201).json({ message: "Data is created" });
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    } else {
      res.status(500).json({ message: "Internal server error", error: error });
    }
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const assets = await getAssets();
    if (assets.length === 0) {
      console.log("Assets not found in the database");
      res.status(200).json({ message: "No assets found in database" });
    } else {
      res.status(200).json({
        message: "We go all the assets for you",
        data: assets.filter((el) => !(el.isDeleted === true)),
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.sessionToken;
    const decode = jwt.verify(token as string, process.env.JWT_SECRET!);

    if (!decode) {
      console.log("Authentication failed: No valid token");
      res.status(401).json({
        message: "You are not logged in",
      });
      return;
    }

    const user = (decode as JwtPayload).role;

    if (user === "Admin") {
      console.log("Admin authorization successful");
      next();
    } else {
      console.log("Authorization failed: User is not an admin");
      res.status(403).json({
        message: "You are not authorized for this action",
      });
    }
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const deleteRoute = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteAsset(id);

    if (!deleted) {
      console.log(`Asset with id ${id} not found for deletion`);
      res.status(404).json({
        message: "Asset not found",
      });
      return;
    }

    console.log(`Asset with id ${id} deleted successfully`, deleted);
    res.status(200).json({
      message: "Asset deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.error("Error deleting asset:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

export const getAssetRoute = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const foundData = await getAssetsById(id);

    if (!foundData) {
      console.log(`Asset with id ${id} not found`);
      res.status(404).json({
        message: "Asset not found",
      });
      return;
    }

    console.log(`Asset with id ${id} retrieved successfully`, foundData);
    res.status(200).json({
      message: "Asset retrieved successfully",
      data: foundData,
    });
  } catch (error) {
    console.error("Error retrieving asset:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

export const updatedRoute = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const isSafe = updateSchema.safeParse(req.body);
    if (!isSafe.success) {
      res.status(400).json({
        message: "Asset not found",
        errors: isSafe.error.issues,
      });
      return;
    }
    const upadatedData = req.body;
    const modified = await updateAsset(id, upadatedData);

    if (!modified) {
      res.status(400).json({
        success: false,
        message: "Asset not found",
      });
      return;
    }
    res.status(200).json({
      message: "Asset updated",
      data: modified,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Internal server error",
      error: (e as Error).message,
    });
  }
};
