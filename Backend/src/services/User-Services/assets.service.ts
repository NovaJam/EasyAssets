import { Asset } from "../../models/Asset/assetModel";

export const createAsset = async (values: Record<string, any>) => {
  await new Asset(values).save().then((asset) => asset.toObject());
};
export const getAssets = async () => await Asset.find();
