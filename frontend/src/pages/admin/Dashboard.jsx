import React, { useEffect, useState } from "react";
import { FaBars, FaBlog, FaComment, FaPen } from "react-icons/fa";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { dashboard_data } from "../../assets/assets";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashboard = async () => {
    setDashboardData(dashboard_data);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* top info box */}
      <div className="flex flex-wrap gap-4">
        {/* dashboard Blog count box */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          {/* Icon */}
          <div>
            <FaBars />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        {/* dashboard comment count box */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          {/* Icon */}
          <div>
            <FaComment />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        {/* dashboard Blog count box */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          {/* Icon */}
          <div>
            <FaPen />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>
      {/* bottom post section */}
      <div>
        {/* heading */}
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          {/* icon blogs */}
          <FaBlog />
          <p>Latest Blogs</p>
        </div>
        {/* content */}
        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-4">
                  Blog Title
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Data
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Status
                </th>
                <th scope="col" className="px-2 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => {
                return (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
