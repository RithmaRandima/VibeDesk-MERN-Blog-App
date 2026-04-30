import React from "react";
import { FaTrash } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";

const CommentTableItem = ({ comment, fetchComment }) => {
  const { axios } = useAppContext();
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt).toDateString();

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComment();
      }
    } catch (error) {
      toast.error(error.message);
      console.log(
        "error on approveComment function on CommentTsbleItem page",
        error,
      );
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this comment?",
      );

      if (!confirm) return;
      const { data } = axios.post("/api/admin/delete-comment", { id: _id });
      if (data.success) {
        toast.success(data.message);
        fetchComment();
      }
    } catch (error) {
      toast.error(error.message);
      console.log(
        "error on deleteComment function on CommentTsbleItem page",
        error,
      );
    }
  };

  return (
    <tr className="border-y border-gray-200">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b> : {blog?.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.content}
      </td>

      <td className="px-6 py-4 max-sm:hidden">{BlogDate}</td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <IoCheckmark
              onClick={approveComment}
              className="hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <FaTrash
            onClick={deleteComment}
            className="hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
