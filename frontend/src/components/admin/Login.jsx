import React, { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const { axios, setToken } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);

        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        toast.success("Login successful");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log("error on admin Login data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="text-primary">Admin</span> Login
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Enter your credentials to access the dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handelSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
