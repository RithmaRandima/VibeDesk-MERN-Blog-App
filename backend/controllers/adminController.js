import jwt from "jsonwebtoken";
import Blog from "../models/BlogModel.js";
import Comment from "../models/CommentModel.js";

// adminLogin Function
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log("Error on adminLogin function", error);
  }
};

// getAllBlogsAdmin Function
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log("Error on getAllBlogsAdmin function", error);
  }
};

// getAllCommnets Function
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log("Error on getAllComments function", error);
  }
};

// getDashboard Function
export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);

    const recentComments = await Comment.find({})
      .populate("blog") // gives blog title + data
      .sort({ createdAt: -1 })
      .limit(5);

    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
      recentComments, // ✅ FIXED
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log("Error on getDashboard function", error);
    res.json({ success: false, message: error.message });
  }
};

// deleteCommentByID Function
export const deleteCommentByID = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);

    res.json({ success: true, message: "Comment deleted Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log("Error on deleteCommentByID function", error);
  }
};

// approveCommentById Function
export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Comment approved Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log("Error on approveCommentById function", error);
  }
};
