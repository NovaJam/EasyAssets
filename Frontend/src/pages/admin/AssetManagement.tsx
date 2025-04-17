// pages/AssetManagement.tsx
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Pencil, Trash2 } from "lucide-react";

interface Asset {
  id: string;
  name: string;
  type: string;
  value: number;
}

const AssetManagement = () => {
  const { user } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [newAsset, setNewAsset] = useState({ name: "", type: "", value: 0 });
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);

  if (!user || user.role !== "Admin") {
    console.log("Redirecting to dashboard, user:", user);
    return <Navigate to="/dashboard" />;
  }

  const fetchAssets = async () => {
    try {
      // Simulated API call
      const response = await new Promise<Asset[]>((resolve) =>
        setTimeout(
          () =>
            resolve([
              { id: "1", name: "Laptop", type: "Electronics", value: 1000 },
              { id: "2", name: "Desk", type: "Furniture", value: 300 },
            ]),
          500
        )
      );
      setAssets(response);
    } catch (error) {
      toast.error("Failed to fetch assets");
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAssetData = {
        ...newAsset,
        id: Math.random().toString(),
      };
      setAssets([...assets, newAssetData]);
      setNewAsset({ name: "", type: "", value: 0 });
      toast.success("Asset added successfully");
    } catch (error) {
      toast.error("Failed to add asset");
    }
  };

  const handleEditAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAsset) return;
    try {
      setAssets(
        assets.map((asset) =>
          asset.id === editingAsset.id ? editingAsset : asset
        )
      );
      setEditingAsset(null);
      toast.success("Asset updated successfully");
    } catch (error) {
      toast.error("Failed to update asset");
    }
  };

  const handleDeleteAsset = async (id: string) => {
    try {
      setAssets(assets.filter((asset) => asset.id !== id));
      toast.error("Asset deleted successfully");
    } catch (error) {
      toast.error("Failed to delete asset");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Asset Management</h1>

      {/* Add Asset Form */}
      <form onSubmit={handleAddAsset} className="mb-8 p-4 bg-gray-100 rounded">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Asset Name"
            value={newAsset.name}
            onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Asset Type"
            value={newAsset.type}
            onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Value"
            value={newAsset.value}
            onChange={(e) =>
              setNewAsset({ ...newAsset, value: Number(e.target.value) })
            }
            className="p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Asset
        </button>
      </form>

      {/* Edit Asset Form */}
      {editingAsset && (
        <form
          onSubmit={handleEditAsset}
          className="mb-8 p-4 bg-gray-100 rounded"
        >
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              value={editingAsset.name}
              onChange={(e) =>
                setEditingAsset({ ...editingAsset, name: e.target.value })
              }
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              value={editingAsset.type}
              onChange={(e) =>
                setEditingAsset({ ...editingAsset, type: e.target.value })
              }
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              value={editingAsset.value}
              onChange={(e) =>
                setEditingAsset({
                  ...editingAsset,
                  value: Number(e.target.value),
                })
              }
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="mt-4 space-x-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditingAsset(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Assets Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Value</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td className="px-6 py-4">{asset.name}</td>
                <td className="px-6 py-4">{asset.type}</td>
                <td className="px-6 py-4">${asset.value}</td>
                <td className="px-6 py-4 text-right space-x-5">
                  <button
                    onClick={() => setEditingAsset(asset)}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteAsset(asset.id)}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
export default AssetManagement;
