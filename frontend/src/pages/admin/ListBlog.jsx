import React, { useEffect, useState } from "react";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { FaBlog } from "react-icons/fa";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios } = useAppContext();

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
      toast.error("Failed to load blogs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  return (
    <div className="flex-1 p-4 md:p-10 bg-gray-50 min-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <FaBlog />
          </div>
          <h1 className="text-lg md:text-xl font-semibold text-gray-800">
            All Blogs
          </h1>
        </div>

        <p className="text-sm text-gray-500 hidden sm:block">
          Manage and organize your content
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="w-full overflow-x-auto max-h-[75vh]">
          <table className="min-w-[700px] w-full text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase sticky top-0 z-10">
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
              {!loading &&
                currentBlogs.map((blog, index) => (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchBlogs}
                    index={index + 1 + (currentPage - 1) * itemsPerPage}
                  />
                ))}
            </tbody>
          </table>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
            Loading blogs...
          </div>
        )}

        {/* Empty state */}
        {!loading && blogs.length === 0 && (
          <div className="py-12 text-center text-gray-500">No blogs found</div>
        )}

        {/* Pagination */}
        {!loading && blogs.length > itemsPerPage && (
          <div className="flex items-center justify-center gap-4 py-4 border-t border-gray-200">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm border rounded-lg disabled:opacity-40 hover:bg-gray-100"
            >
              Prev
            </button>

            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm bg-primary text-white rounded-lg disabled:opacity-40 hover:bg-primary/90"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListBlog;
