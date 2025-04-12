import { Asset } from "../../models/assetModel";

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
  return Asset.findByIdAndDelete(id);
};

export const getAssetsById = (id: string) => {
  return Asset.findById(id);
};

export const createAsset = async (assetData: any) => {
  try {
    return Asset.create({
      ...assetData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (e) {
    throw e;
  }
};
