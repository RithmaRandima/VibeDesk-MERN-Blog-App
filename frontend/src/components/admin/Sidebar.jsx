import React from "react";
import { FaAd, FaComment, FaHome, FaList, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-ful pt-6">
      {/* Go to Dashboard */}
      <NavLink
        end
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`
        }
      >
        <FaHome />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      {/* Add Blog */}
      <NavLink
        to="/admin/addBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`
        }
      >
        <FaPlus />
        <p className="hidden md:inline-block">Add Blog</p>
      </NavLink>

      {/* List Blog */}
      <NavLink
        to="/admin/listBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`
        }
      >
        <FaList />
        <p className="hidden md:inline-block">Blog List</p>
      </NavLink>

      {/* List Blog */}
      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`
        }
      >
        <FaComment />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
