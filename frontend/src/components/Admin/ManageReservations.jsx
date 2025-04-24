import { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import toast from "react-hot-toast";

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/reservations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setReservations(res.data);
    } catch (err) {
      toast.error("Failed to load reservations.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reservation?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/reservations/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setReservations((prev) => prev.filter((r) => r._id !== id));
      toast.success("Reservation deleted.");
    } catch (err) {
      toast.error("Failed to delete reservation.");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) return <p className="p-6">Loading reservations...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Time</th>
                <th className="py-2 px-4 border">Guests</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res._id}>
                  <td className="py-2 px-4 border">{res.name}</td>
                  <td className="py-2 px-4 border">{res.email}</td>
                  <td className="py-2 px-4 border">{res.phone}</td>
                  <td className="py-2 px-4 border">{res.date}</td>
                  <td className="py-2 px-4 border">{res.time}</td>
                  <td className="py-2 px-4 border">{res.guests}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDelete(res._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageReservations;
