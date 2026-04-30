import React, { useEffect, useState } from "react";
import { FaBars, FaBlog, FaComment, FaPen } from "react-icons/fa";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  console.log(dashboardData.comments);

  const cardClass =
    "flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition hover:-translate-y-1 cursor-pointer border border-gray-100";

  const navigate = useNavigate();
  return (
    <div className="flex-1 p-4 md:p-10 min-h-screen overflow-y-auto mb-5">
      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className={cardClass} onClick={() => navigate("/admin/listBlog")}>
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <FaBars />
          </div>
          <div>
            <p className="text-2xl font-semibold">{dashboardData.blogs}</p>
            <p className="text-sm text-gray-500">Total Blogs</p>
          </div>
        </div>

        <div className={cardClass} onClick={() => navigate("/admin/comments")}>
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <FaComment />
          </div>
          <div>
            <p className="text-2xl font-semibold">{dashboardData.comments}</p>
            <p className="text-sm text-gray-500">Comments</p>
          </div>
        </div>

        <div className={cardClass} onClick={() => navigate("/admin/comments")}>
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <FaPen />
          </div>
          <div>
            <p className="text-2xl font-semibold">
              {
                dashboardData.recentComments.filter(
                  (comment) => !comment.isApproved,
                ).length
              }
            </p>
            <p className="text-sm text-gray-500">Drafts</p>
          </div>
        </div>
      </div>

      {/* ================= LATEST BLOGS ================= */}
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <FaBlog className="text-primary" />
          <h2 className="text-lg font-semibold">Latest Blogs</h2>
        </div>

        <div className="bg-white rounded-2xl  shadow-sm overflow-y-auto">
          {/* horizontal scroll wrapper */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-[700px] w-full text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase">
                <tr>
                  <th className="px-4 py-4 text-left">#</th>
                  <th className="px-4 py-4 text-left">Blog Title</th>
                  <th className="px-4 py-4 text-left">Category</th>
                  <th className="px-4 py-4 text-left hidden sm:table-cell">
                    Date
                  </th>
                  <th className="px-4 py-4 text-left hidden md:table-cell">
                    Status
                  </th>
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

          {/* vertical scroll (optional) */}
        </div>
      </div>

      {/* ================= LATEST COMMENTS ================= */}
      <div className="my-10">
        <div className="flex items-center gap-2 mb-4">
          <FaComment className="text-primary" />
          <h2 className="text-lg font-semibold">Latest Comments</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm h-[45vh] overflow-y-auto">
          {/* horizontal scroll */}
          <div className="w-full overflow-x-auto ">
            <table className="min-w-[750px] w-full text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase">
                <tr>
                  <th className="px-4 py-4 text-left">#</th>
                  <th className="px-4 py-4 text-left">User</th>
                  <th className="px-4 py-4 text-left">Comment</th>
                  <th className="px-4 py-4 text-left hidden sm:table-cell">
                    Post
                  </th>
                  <th className="px-4 py-4 text-left hidden md:table-cell">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {dashboardData.recentComments?.map((comment, index) => (
                  <tr
                    key={comment._id}
                    className="border-y border-gray-300 hover:bg-gray-50"
                  >
                    {/* number */}
                    <td className="px-4 py-3 font-medium">
                      {index + 1 || "#"}
                    </td>

                    {/* USER */}
                    <td className="px-4 py-3 font-medium">
                      {comment.name || "User"}
                    </td>

                    {/* COMMENT */}
                    <td className="px-4 py-3 text-gray-700 max-w-[250px] truncate">
                      {comment?.content?.slice(0, 60)}
                    </td>

                    {/* BLOG TITLE */}
                    <td className="px-4 py-3 text-primary hidden sm:table-cell">
                      {comment.blog?.title || "Deleted Post"}
                    </td>

                    {/* DATE */}
                    <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">
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
