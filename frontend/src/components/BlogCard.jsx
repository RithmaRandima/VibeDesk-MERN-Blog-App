import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRegCalendarAlt,
  FaHeart,
  FaRegComment,
  FaRegCommentAlt,
  FaComment,
} from "react-icons/fa";
import axios from "axios";

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id, createdAt } = blog;

  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const formatCount = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num;
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/comment/comments", {
        blogId: blog._id,
      });

      if (data.success) {
        setComments(data.comments);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("error on fetch Blog Comments", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  console.log(comments.length);

  return (
    <div className="relative max-w-md mx-auto bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-2">
      {/* Title */}
      <div className=" pt-1">
        <h2 className="text-xl capitalize font-semibold text-gray-800 leading-snug">
          {title}
        </h2>

        <p>{category}</p>

        {/* date info */}
        <div className="flex items-center gap-1 text-[11px] mt-2 text-gray-500">
          <FaRegCalendarAlt />
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>

        {/* like and comment count */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mt-3">
          <div className="flex items-center gap-1">
            <FaHeart />
            <span>{comments.length + "k"}</span>
          </div>

          <div className="flex items-center gap-1">
            <FaComment />

            <span>{formatCount(comments.length)} comments</span>
          </div>
        </div>

        {/* Description */}
        <p
          className="mt-3 text-gray-600 text-sm leading-relaxed line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: description.slice(0, 120),
          }}
        />

        {/* CTA */}
        <div className="absolute bg-white p-1 pt-3 z-3 rounded-br-xl">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/blog/${_id}`);
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
          >
            Read Article →
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="mt-5 overflow-hidden rounded-xl">
        <img
          src={`http://localhost:3000/uploads/${image}`}
          alt={title}
          className="w-full h-60 object-cover hover:scale-105 transition duration-500"
        />
      </div>
    </div>
  );
};

export default BlogCard;
