import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios.js";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext.jsx";
import { Button } from "@material-tailwind/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      login(response.data, response.data.token, response.data.role);
      toast.success("Login Successful!");
      if (response.data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative flex flex-col rounded-xl bg-white p-6 shadow-lg w-96">
        <h4 className="text-xl font-medium text-slate-800">Login</h4>
        <p className="text-slate-500 font-light">
          Welcome back! Please enter your details.
        </p>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-slate-600">Email</label>
            <input
              type="email"
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-slate-700 focus:outline-none focus:border-slate-400"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-slate-600">Password</label>
            <input
              type="password"
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-slate-700 focus:outline-none focus:border-slate-400"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-1/2 rounded-md bg-[#FF9130] hover:bg-[#E07B00] py-2 text-white flex mx-auto justify-center"
          >
            Login
          </Button>
        </form>

        <p className="text-sm text-slate-600 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-slate-700 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
