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

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // filter logic
  const filteredComments = comments.filter((comment) =>
    filter === "Approved"
      ? comment.isApproved === true
      : comment.isApproved === false,
  );

  // pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentComments = filteredComments.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredComments.length / itemsPerPage);

  return (
    <div className="flex-1 p-4 md:p-10 bg-gray-50 min-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <FaComment />
          </div>
          <h1 className="text-lg md:text-xl font-semibold text-gray-800">
            Comments
          </h1>
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

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="w-full overflow-x-auto max-h-[75vh]">
          <table className="min-w-[700px] w-full text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase sticky top-0 z-10">
              <tr>
                <th className="py-4 px-6 text-left">Blog & Comment</th>
                <th className="py-4 px-6 text-left">Date</th>
                <th className="py-4 px-6 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                currentComments.map((comment, index) => (
                  <CommentTableItem
                    key={comment._id}
                    comment={comment}
                    index={index + 1 + (currentPage - 1) * itemsPerPage}
                    fetchComment={fetchComments}
                  />
                ))}
            </tbody>
          </table>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
            Loading comments...
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredComments.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            No comments found
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredComments.length > itemsPerPage && (
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

export default Comments;
