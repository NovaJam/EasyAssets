import mongoose, { Schema, Document } from "mongoose";

export interface IAsset extends Document {
  assetId: string; // auto-generated unique ID
  name: string;
  category: string;
  description?: string;
  location: string;
  status: "available" | "in_use" | "maintenance" | "retired";
  assignedTo?: string;
  purchaseDate?: Date;
  warrantyExpiry?: Date;
  lastMaintained?: Date;
  nextMaintenance?: Date;
  qrCodeUrl?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const AssetSchema = new Schema<IAsset>({
  assetId: { type: String, required: true, unique: true },
  name: { type: String, required: true, lowercase: true, maxlength: 50 },
  category: { type: String, required: true, lowercase: true, maxlength: 50 },
  description: { type: String, required: false, maxlength: 150 },
  location: { type: String, required: true, maxlength: 50 },
  status: {
    type: String,
    enum: ["available", "in_use", "maintenance", "retired"],
    default: "available",
  },
  assignedTo: { type: String },
  purchaseDate: { type: Date, default: Date.now },
  warrantyExpiry: { type: Date, require: true },
  lastMaintained: { type: Date, require: true },
  nextMaintenance: { type: Date, require: true },
  qrCodeUrl: { type: String, required: false },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, required: true },
});

export const Asset = mongoose.model<IAsset>("Asset", AssetSchema);
