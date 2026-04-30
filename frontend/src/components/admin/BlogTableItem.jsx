import React from "react";
import { FaTrash } from "react-icons/fa";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, category, createdAt } = blog;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?",
    );
    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/blog/delete", { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("error on delete blog item function", error);
    }
  };

  const togglePublished = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("error on toggle oublished item function", error);
    }
  };
  return (
    <tr className="border-y border-gray-300">
      <th className="pl-5 py-4 text-left">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4">{category}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex items-center text-xs gap-3">
        <button
          onClick={togglePublished}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </button>
        <FaTrash
          onClick={deleteBlog}
          className="hover:scale-110 transition-all cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
