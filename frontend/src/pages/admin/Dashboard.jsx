import React, { useEffect, useState } from "react";
import { FaBars, FaBlog, FaComment, FaPen } from "react-icons/fa";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
    recentComments: [],
  });

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load dashboard");
      console.log("Dashboard error:", error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cardClass =
    "flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition hover:-translate-y-1 cursor-pointer border border-gray-100";

  return (
    <div className="flex-1 p-4 md:p-10 bg-gray-50 min-h-screen">
      {/* ================= TOP CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className={cardClass}>
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <FaBars />
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-800">
              {dashboardData.blogs}
            </p>
            <p className="text-sm text-gray-500">Total Blogs</p>
          </div>
        </div>

        <div className={cardClass}>
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <FaComment />
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-800">
              {dashboardData.comments}
            </p>
            <p className="text-sm text-gray-500">Comments</p>
          </div>
        </div>

        <div className={cardClass}>
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <FaPen />
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-800">
              {dashboardData.drafts}
            </p>
            <p className="text-sm text-gray-500">Drafts</p>
          </div>
        </div>
      </div>

      {/* ================= LATEST BLOGS ================= */}
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <FaBlog className="text-primary" />
          <h2 className="text-lg font-semibold">Latest Blogs</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-4 text-left">#</th>
                  <th className="px-4 py-4 text-left">Blog Title</th>
                  <th className="px-4 py-4 text-left max-sm:hidden">Date</th>
                  <th className="px-4 py-4 text-left max-sm:hidden">Status</th>
                  <th className="px-4 py-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= LATEST COMMENTS ================= */}
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <FaComment className="text-primary" />
          <h2 className="text-lg font-semibold">Latest Comments</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-4 text-left">User</th>
                  <th className="px-4 py-4 text-left">Comment</th>
                  <th className="px-4 py-4 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {dashboardData.recentComments?.map((comment) => (
                  <tr
                    key={comment._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {comment.name || "User"}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {comment.comment?.slice(0, 60)}...
                    </td>

                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
