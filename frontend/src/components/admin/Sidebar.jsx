import React from "react";
import { FaComment, FaHome, FaList, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    // parent (normal flow)
    <div className="w-[70px] md:w-[220px] lg:w-[250px] bg-white border-r min-h-screen">
      {/* fixed content */}
      <div className="fixed top-[70px] left-0 h-[calc(100vh-70px)] w-[70px] md:w-[220px] lg:w-[250px] bg-white border-r border-gray-200 flex flex-col pt-6">
        <NavItem to="/admin" icon={<FaHome />} label="Dashboard" end />
        <NavItem to="/admin/addBlog" icon={<FaPlus />} label="Add Blog" />
        <NavItem to="/admin/listBlog" icon={<FaList />} label="Blog List" />
        <NavItem to="/admin/comments" icon={<FaComment />} label="Comments" />
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, end }) => {
  return (
    <NavLink
      end={end}
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 py-3.5 px-3 md:px-6 cursor-pointer transition ${
          isActive
            ? "bg-primary/10 border-r-4 border-primary"
            : "hover:bg-gray-100"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <p className="hidden md:block">{label}</p>
    </NavLink>
  );
};

export default Sidebar;
