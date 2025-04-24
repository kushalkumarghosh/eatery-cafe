import { useState } from "react";
import axios from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@material-tailwind/react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/register", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.msg || "Registration failed.");
      toast.error("Registration failed.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative flex flex-col rounded-xl bg-white p-6 shadow-lg w-96">
        <h4 className="text-xl font-medium text-slate-800">Sign Up</h4>
        <p className="text-slate-500 font-light">
          Create an account to enjoy our services.
        </p>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-slate-600">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none"
              required
              minLength={10}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-1/2 rounded-md bg-[#FF9130] hover:bg-[#E07B00] py-2 text-white flex mx-auto justify-center"
          >
            Register Now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
