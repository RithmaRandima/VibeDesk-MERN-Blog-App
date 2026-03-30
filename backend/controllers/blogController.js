import Blog from "../models/BlogModel.js";
import fs from "fs/promises";
import path from "path";

// addBlog Function
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = req.body;
    const imageFile = req.file.filename;

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing Required Fields" });
    }

    const blog = new Blog({
      title,
      subTitle,
      description,
      category,
      isPublished,
      image: imageFile,
    });

    await blog.save();
    res.json({ success: true, message: "Blog added Successfully" });
    console.log({
      title,
      subTitle,
      description,
      category,
      isPublished,
      image: imageFile,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log("Error on addBlog function", error);
  }
};
// getAllBlogs Function
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log("Error on getAllBlogs function", error);
  }
};
// getBlogByid Function
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(200)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log("Error on getBlogById function", error);
  }
};

// deleteBlog Function
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.body;
    // 1️⃣ Find the blog by ID
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    // 2️⃣ Delete the image file if it exists
    if (blog.image) {
      const filePath = path.join("uploads", blog.image);
      try {
        await fs.unlink(filePath);
      } catch (err) {
        console.log("Image delete error:", err);
      }
    }

    // 3️⃣ Delete the blog document from DB
    await blog.deleteOne();

    // Delete All Comments Associated with the blog
    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log("Error on deleteBlog function:", error);
  }
};

// togglePublish Function
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    blog.isPublished = !blog.isPublished;

    await blog.save();
    res.json({ success: true, message: "Blog status updated" });
  } catch (error) {
    console.log("Error on toggleFunction function:", error);
    res.json({ success: false, message: error.message });
  }
};
