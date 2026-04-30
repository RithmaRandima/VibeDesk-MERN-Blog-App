import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../../context/AppContext";

const Layout = () => {
  const { setToken, axios, navigate } = useAppContext();
  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
  };
  return (
    <>
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between h-[70px] px-4 sm:px-8 md:px-12">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              B
            </div>
            <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="px-6 py-2 rounded-full text-sm font-medium text-white bg-primary hover:bg-primary/90 transition shadow-sm hover:shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
