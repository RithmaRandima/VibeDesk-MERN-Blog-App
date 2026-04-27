import React, { useEffect, useState } from "react";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { FaBlog } from "react-icons/fa";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/admin/blogs");

      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 bg-gray-50 p-4 md:p-10 ">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 text-primary rounded-lg">
          <FaBlog />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">All Blogs</h1>
      </div>

      {/* TABLE WRAPPER (fixed height) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-[70vh] overflow-y-auto flex flex-col">
        {/* Sticky header */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase sticky top-0 z-10">
              <tr>
                <th className="px-4 py-4 text-left">#</th>
                <th className="px-4 py-4 text-left">Blog Title</th>
                <th className="px-4 py-4 text-left max-sm:hidden">Date</th>
                <th className="px-4 py-4 text-left max-sm:hidden">Status</th>
                <th className="px-4 py-4 text-left">Actions</th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Scrollable body ONLY */}
        <div className="flex-1 overflow-y-auto overflow-x-auto">
          <table className="w-full text-sm text-gray-600">
            <tbody>
              {!loading &&
                blogs.map((blog, index) => (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchBlogs}
                    index={index + 1}
                  />
                ))}
            </tbody>
          </table>

          {/* Loading */}
          {loading && (
            <div className="p-10 text-center text-gray-500">
              Loading blogs...
            </div>
          )}

          {/* Empty */}
          {!loading && blogs.length === 0 && (
            <div className="p-10 text-center text-gray-500">No blogs found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListBlog;
