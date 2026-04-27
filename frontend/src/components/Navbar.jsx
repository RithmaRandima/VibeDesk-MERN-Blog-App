import React from "react";
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex justify-between items-center py-4 px-6 md:px-10 lg:px-16">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            B
          </div>
          <h1 className="text-lg font-semibold text-gray-800">BlogSphere</h1>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/admin")}
          className="px-6 py-2.5 rounded-full text-sm font-medium text-white bg-primary hover:bg-primary/90 transition shadow-sm hover:shadow-md"
        >
          {token ? "Dashboard" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
