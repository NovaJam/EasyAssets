import { Asset } from "../../models/Asset/assetModel";

export const createAsset = async (values: Record<string, any>) => {
  await new Asset(values).save().then((asset) => asset.toObject());
};
export const getAssets = async () => await Asset.find();

export const deleteAsset = (assetId: string) => {
  return Asset.findByIdAndUpdate(
    { assetId }, // Query by custom assetId
    { isDeleted: true },
    { runValidators: true }
  );
};

export const getAssetsById = (assetId: string) => {
  return Asset.findOne({ assetId }); // Search by custom assetId field
};

export const updateAsset = (assetId: string, updateData: any) => {
  return Asset.findByIdAndUpdate({assetId}, {
    new: true,
    runValidators: true,
  });
};
