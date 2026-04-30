import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Moment from "moment";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const Blog = () => {
  const { axios } = useAppContext();
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/all/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error("Failed to load blog");
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/comment/comments", {
        blogId: id,
      });

      if (data.success) setComments(data.comments);
      else toast.error(data.message);
    } catch (error) {
      toast.error("Failed to load comments");
      console.log(error);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/comment/add-comment", {
        blog: id,
        name,
        content,
      });

      if (data.success) {
        toast.success("Comment added");
        setName("");
        setContent("");
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add comment");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  if (!data) return <Loader />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* HERO */}
      <div className="text-center px-4 mt-20">
        <p className="text-primary font-medium text-sm">
          Published {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>

        <h1 className="text-2xl md:text-5xl font-bold text-gray-800 mt-3 max-w-3xl mx-auto leading-tight">
          {data.title}
        </h1>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
          {data.subTitle}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm">
          Author: John Doe
        </div>
      </div>

      {/* IMAGE */}
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <img
          src={`http://localhost:3000/uploads/${data.image}`}
          className="w-full h-64 md:h-[450px] object-cover rounded-2xl md:rounded-3xl shadow-lg"
          alt="blog"
        />
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-4 mt-10">
        <div
          className="prose prose-sm md:prose-lg max-w-none text-gray-700 break-words"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        {/* SOCIAL SHARE */}
        <div className="mt-12 border-t pt-6">
          <p className="font-semibold text-gray-700 mb-3">Share this article</p>

          <div className="flex flex-wrap gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white hover:scale-110 transition">
              <FaFacebook />
            </button>

            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-500 text-white hover:scale-110 transition">
              <FaTwitter />
            </button>

            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white hover:scale-110 transition">
              <FaLinkedin />
            </button>
          </div>
        </div>

        {/* COMMENTS */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Comments ({comments.length})
          </h2>

          <div className="space-y-4">
            {comments.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {item.name?.charAt(0)}
                  </div>

                  <p className="font-medium text-gray-700">{item.name}</p>
                </div>

                <p className="text-gray-600 text-sm break-words ml-0 md:ml-12">
                  {item.content}
                </p>

                <p className="text-xs text-gray-400 mt-2 ml-0 md:ml-12">
                  {Moment(item.createdAt).fromNow()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ADD COMMENT */}
        <div className="my-14">
          <h2 className="text-lg font-semibold mb-4">Add Comment</h2>

          <form onSubmit={addComment} className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your comment..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl h-28 md:h-32 outline-none focus:ring-2 focus:ring-primary/20"
            />

            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition w-full md:w-auto"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
