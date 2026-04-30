import React, { useState, useEffect } from "react";
import { blogCategories } from "../assets/assets.js";
import BlogCard from "./BlogCard.jsx";
import { useAppContext } from "../../context/AppContext.jsx";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  const { blogs, input } = useAppContext();

  // ================= FILTER LOGIC =================
  const filteredBlogs = () => {
    if (!blogs) return [];

    let filtered = blogs;

    // search filter
    if (input !== "") {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(input.toLowerCase()) ||
          blog.category.toLowerCase().includes(input.toLowerCase()),
      );
    }

    // category filter
    if (menu !== "All") {
      filtered = filtered.filter((blog) => blog.category === menu);
    }

    return filtered;
  };

  const finalBlogs = filteredBlogs();

  // ================= PAGINATION =================
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const currentBlogs = finalBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(finalBlogs.length / blogsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [menu, input]);

  return (
    <div>
      {/* ================= CATEGORY FILTER ================= */}
      <div className="flex justify-center gap-4 sm:gap-5 my-10 flex-wrap">
        {blogCategories.map((item) => (
          <button
            key={item}
            onClick={() => setMenu(item)}
            className={`px-5 py-1 rounded-full border transition ${
              menu === item
                ? "bg-primary text-white border-primary"
                : "text-primary border-primary hover:bg-primary/10"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* ================= BLOG GRID ================= */}
      <div className="mb-12 mx-8 sm:mx-16">
        {currentBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">
              No posts found
            </h2>
            <p className="text-gray-500">
              {input || menu !== "All"
                ? "Try changing your search or filter."
                : "There are no blog posts yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {currentBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>

      {/* ================= PAGINATION ================= */}
      {finalBlogs.length > blogsPerPage && (
        <div className="flex items-center justify-center gap-4 mb-20">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50"
          >
            Prev
          </button>

          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages || 1}
          </p>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-40 hover:bg-primary/90"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;
