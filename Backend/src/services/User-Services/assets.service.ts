import { Asset } from "../../models/Asset/assetModel";

export const createAsset = async (values: Record<string, any>) => {
  await new Asset(values).save().then((asset) => asset.toObject());
};
export const getAssets = async () => await Asset.find();

export const deleteAsset = (id: string) => {
  return Asset.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { runValidators: true }
  );
};

export const getAssetsById = (id: string) => {
  return Asset.findById(id);
};

export const updateAsset = (id: string, updateData: any) => {
  return Asset.findByIdAndUpdate(id, {
    new: true,
    runValidators: true,
  });
};
