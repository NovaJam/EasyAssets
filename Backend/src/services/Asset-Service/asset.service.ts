import { Asset } from "../../models/assetModel";

export const getAssets = () => {
  Asset.find();
};
export const updateAseet = (id: string, updateData: any) => {
  updateData.updatedAt = new Date();

  return Asset.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};
export const deleteAsset = (id: string) => {
  return Asset.findByIdAndDelete(id);
};
