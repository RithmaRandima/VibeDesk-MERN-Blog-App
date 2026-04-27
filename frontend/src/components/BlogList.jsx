import React, { useState } from "react";
import { blogCategories } from "../assets/assets.js";
import BlogCard from "./BlogCard.jsx";
import { useAppContext } from "../../context/AppContext.jsx";

const BlogList = () => {
  const [menu, setmenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (!blogs) return []; // 👈 prevents crash

    if (input === "") {
      return blogs;
    }

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase()),
    );
  };

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-5 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setmenu(item)}
              className={`cursor-pointer px-5 py-1 border border-primary rounded-full transition ${
                menu === item ? "bg-primary text-white" : "text-primary"
              }`}
            >
              {item}
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8 mb-24 mx-8 sm:mx-16">
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
