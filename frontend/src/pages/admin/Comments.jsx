import React, { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";

const Comments = () => {
  const { axios } = useAppContext();

  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/admin/comments");

      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load comments");
      console.log("fetching comment error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = comments.filter((comment) =>
    filter === "Approved"
      ? comment.isApproved === true
      : comment.isApproved === false,
  );

  return (
    <div className="flex-1 bg-gray-50 p-4 md:p-10 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-w-4xl">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <FaComment />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Comments</h1>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("Approved")}
            className={`px-4 py-1 rounded-full text-xs border transition ${
              filter === "Approved"
                ? "bg-primary text-white border-primary"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter("Not Approved")}
            className={`px-4 py-1 rounded-full text-xs border transition ${
              filter === "Not Approved"
                ? "bg-primary text-white border-primary"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Pending
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-4xl h-[70vh] overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="py-4 px-6 text-left">Blog & Comment</th>
                <th className="py-4 px-6 text-left">Date</th>
                <th className="py-4 px-6 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                filteredComments.map((comment, index) => (
                  <CommentTableItem
                    key={comment._id}
                    comment={comment}
                    index={index + 1}
                    fetchComment={fetchComments}
                  />
                ))}
            </tbody>
          </table>

          {/* Loading */}
          {loading && (
            <div className="p-10 text-center text-gray-500">
              Loading comments...
            </div>
          )}

          {/* Empty */}
          {!loading && filteredComments.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No comments found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
