import { Request, Response } from "express";
import {
  createAsset,
  getAssets,
} from "../services/User-Services/assets.service";
import { assetSchema } from "../validators/asset/asset.validator";
import { ZodError } from "zod";
import { v4 as createUniqueId } from "uuid";

export const create = async (req: Request, res: Response) => {
  try {
    const validatedAsset = assetSchema.parse(req.body);
    const saveAsset = { assetId: createUniqueId(), ...validatedAsset };
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
      console.log("Assets found in the database", assets);
      res
        .status(200)
        .json({ message: "We go all the assets for you", data: assets });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
