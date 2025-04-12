import { Request, Response, NextFunction } from "express";
import {
  updateAseet,
  deleteAsset,
  getAssetsById,
  getAssets,
  createAsset,
} from "../services/Asset-Service/asset.service";
import jwt, { JwtPayload } from "jsonwebtoken";
import z from "zod";

const AssetStatus = z.enum(["available", "in_use", "maintenance", "retired"]);
const AssetStatusEnum = z.enum([
  "available",
  "in_use",
  "maintenance",
  "retired",
]);

export const updatedRoute = async (req: Request, res: Response) => {
  const { id } = req.params;
  const createAssetSchema = z
    .object({
      assetId: z.string().min(1).trim(),
      name: z.string().min(1),
      category: z.string().min(1),
      description: z.string().optional(),
      location: z.string().min(1),
      status: AssetStatus,
      assignedTo: z.string().optional(),
      purchaseDate: z.string().datetime().optional(),
      warrantyDate: z.string().datetime().optional(),
      lastMaintained: z.string().datetime().optional(),
      nextMaintenance: z.string().datetime().optional(),
      qrCodeUrl: z.string().url().optional(),
      createdBy: z.string().min(1),
    })
    .partial();

  const isparse = createAssetSchema.safeParse(req.body);

  if (!isparse.success) {
    res.json({
      success: false,
      message: "Schema is not validated",
      error: isparse.error.issues,
    });
    return;
  }

  try {
    const upadatedData = req.body;
    const modified = await updateAseet(id, upadatedData);

    if (!modified) {
      res.json({
        success: false,
        message: "Asset not found",
      });
      return;
    }
    res.json({
      success: true,
      data: modified,
    });
    return;
  } catch (e) {
    console.error(e);
    res.json({
      success: false,
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
        success: false,
        message: "Asset not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Asset deleted",
      data: deleted,
    });
    return;
  } catch (e) {
    console.error(e);
    res.json({
      success: false,
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
        success: false,
        messsage: "Data not found ",
      });
      return;
    }

    res.json({
      success: true,
      message: "Data found",
      data: foundData,
    });
    return;
  } catch (e) {
    res.json({
      success: false,
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
    data: data.filter((el) => !(el.isDeleted === true)),
  });
};

export const createAssets = async (req: Request, res: Response) => {
  const assetdata = req.body;
  const creatingSchema = z.object({
    assetId: z.string().min(1).nonempty().trim(),
    name: z.string().min(1).nonempty(),
    category: z.string().min(1).nonempty(),
    description: z.string().optional(),
    location: z.string().min(1).nonempty(),
    status: AssetStatusEnum,
    assignedTo: z.string().optional(),
    purchaseDate: z.string().datetime().optional().or(z.date().optional()),
    warrantyDate: z.string().datetime().optional().or(z.date().optional()),
    lastMaintained: z.string().datetime().optional().or(z.date().optional()),
    nextMaintenance: z.string().datetime().optional().or(z.date().optional()),
    qrCodeUrl: z.string().url().optional(),
    createdBy: z.string().min(1).nonempty(),
    isDeleted: z.boolean().default(false).optional(),
  });

  const isParse = creatingSchema.safeParse(req.body);

  if (!isParse.success) {
    res.json({
      success: false,
      message: "Not correct data",
      erroe: isParse.error.issues,
    });
    return;
  }
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
