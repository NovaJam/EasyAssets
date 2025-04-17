import { z } from "zod";

const AssetStatus = z.enum(["available", "in_use", "maintenance", "retired"]);

export const assetSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().optional(),
  location: z.string().min(1),
  status: AssetStatus,
  assignedTo: z.string().optional(),
  purchaseDate: z.coerce.date().optional(),
  warrantyDate: z.coerce.date().optional(),
  lastMaintained: z.coerce.date().optional(),
  nextMaintenance: z.coerce.date().optional(),
  qrCodeUrl: z.string().url().optional(),
  createdBy: z.string().min(1),
});

export const updateSchema = assetSchema.partial();
