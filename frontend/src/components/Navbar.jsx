import React from "react";
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer">
      {/* logo */}
      <div onClick={() => navigate("/")}>
        <h1>Blog Logo</h1>
      </div>
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
      >
        {token ? "Dashboard" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;
