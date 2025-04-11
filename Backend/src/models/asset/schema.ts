import { Document, model, Schema } from "mongoose";

//I am inside the models and it looks great

interface IAsset extends Document {
  assetId: string;
  name: string;
  category: string;
  description?: string;
  location: string;
  status: "available" | "in_use" | "maintenance" | "retired";
  assignedTo?: string;
  purchaseDate?: Date;
  warrantyDate?: Date;
  lastMaintained?: Date;
  nextMaintenance?: Date;
  qrCodeUrl?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const assetSchema = new Schema<IAsset>({
  assetId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  status: {
    type: String,
    enum: ["available", "in_use", "maintenance", "retired"],
    required: true,
  },
  assignedTo: { type: String },
  purchaseDate: { type: Date },
  warrantyDate: { type: Date },
  lastMaintained: { type: Date },
  nextMaintenance: { type: Date },
  qrCodeUrl: { type: String },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Asset = model<IAsset>("Asset", assetSchema);
