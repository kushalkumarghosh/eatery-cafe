import { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import toast from "react-hot-toast";

const ManageMenu = () => {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: null,
  });

  const fetchMenu = async () => {
    try {
      const res = await axios.get("/api/menu");
      setMenu(res.data);
    } catch (err) {
      toast.error("Failed to fetch menu.");
      console.error(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newItem.imgUrl) {
      toast.error("Image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("description", newItem.description);
    formData.append("price", newItem.price);
    formData.append("image", newItem.imgUrl);

    try {
      await axios.post("/api/menu", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Menu item added!");
      setNewItem({ name: "", description: "", price: "", imgUrl: null });
      fetchMenu();
    } catch (err) {
      toast.error("Failed to add menu item.");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`/api/menu/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Menu item deleted!");
      fetchMenu();
    } catch (err) {
      toast.error("Failed to delete menu item.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Menu Management</h3>

      <form onSubmit={handleAdd} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Food Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="input w-full border rounded px-3 py-2 focus:outline-none"
          required
        />
        <textarea
          placeholder="Description"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
          className="input w-full border rounded px-3 py-2 focus:outline-none"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="input w-full border rounded px-3 py-2 focus:outline-none"
          required
          min="0"
          step="1"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewItem({ ...newItem, imgUrl: e.target.files[0] })
          }
          className="input w-full"
          required
        />
        <button
          type="submit"
          className="btn bg-green-600 text-white w-full rounded py-2"
        >
          Add Item
        </button>
      </form>

      <ul className="space-y-4">
        {menu.map((item) => (
          <li
            key={item._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.imgUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <span className="font-semibold">{item.name}</span>
                <p className="text-gray-600">{item.description}</p>
                <span>${item.price}</span>
              </div>
            </div>
            <button
              onClick={() => handleDelete(item._id)}
              className="btn bg-red-500 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageMenu;
