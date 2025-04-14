import { Asset } from "../../models/asset/assetModel";

export const getAssets = () => {
  return Asset.find({});
};
export const updateAseet = (id: string, updateData: any) => {
  updateData.updatedAt = new Date();

  return Asset.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};
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

export const createAsset = async (assetData: any) => {
  try {
    return Asset.create({
      ...assetData,
    });
  } catch (e) {
    throw e;
  }
};
