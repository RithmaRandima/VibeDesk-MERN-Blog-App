import React, { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";

const Comments = () => {
  const { axios } = useAppContext();
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      // console.log(data);
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
      console.log("error on fetchComments function on Comments page", error);
    }
  };

  console.log(comments);

  useEffect(() => {
    fetchComments();
  });
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      {/* top section */}
      <div className="flex justify-between items-center  max-w-3xl">
        {/* heading */}
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          {/* icon blogs */}
          <FaComment />
          <p>All Blogs</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow border rounded-full px-4 py-1 cursor-pointer tezt-xs ${filter === "Approved" ? "text-primary" : "text-gray-700"}`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow border rounded-full px-4 py-1 cursor-pointer tezt-xs ${filter === "Not Approved" ? "text-primary" : "text-gray-700"}`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* content */}
      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-7 bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="py-3 px-6">
                Blog Title & Comment
              </th>
              <th scope="col" className="py-3 px-6">
                Date
              </th>{" "}
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {comments
              .filter((comment) => {
                if (filter === "Approved") {
                  return comment.isApproved === true;
                }
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComment={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
