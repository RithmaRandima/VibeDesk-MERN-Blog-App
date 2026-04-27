import React, { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";

const AddBlog = () => {
  const { axios } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  const generateContent = async () => {
    if (!title) return toast.error("Please enter a Title");

    try {
      setIsLoading(true);

      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });

      if (data.success) {
        quillRef.current.root.innerHTML = data.content;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("AI generation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsAdding(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("subTitle", subTitle);
      formData.append("description", quillRef.current.root.innerHTML);
      formData.append("category", category);
      formData.append("isPublished", isPublished);
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success("Blog created successfully");

        setImage(null);
        setTitle("");
        setSubTitle("");
        setCategory("Startup");
        setIsPublished(false);

        if (quillRef.current) {
          quillRef.current.root.innerHTML = "";
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-gray-50 min-h-screen p-6 md:p-10"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Create New Blog
          </h1>
          <p className="text-sm text-gray-500">
            Write, generate, and publish your content
          </p>
        </div>

        {/* Upload */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">Thumbnail</p>

          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-40 h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary transition overflow-hidden"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <FaUpload className="text-gray-400 mb-1" />
                <p className="text-xs text-gray-400">Upload image</p>
              </>
            )}

            <input
              id="image"
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </label>
        </div>

        {/* Title */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-600">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Enter blog title"
          />
        </div>

        {/* Subtitle */}
        <div className="mt-5">
          <label className="text-sm font-medium text-gray-600">Subtitle</label>
          <input
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Enter subtitle"
          />
        </div>

        {/* Editor */}
        <div className="mt-6 relative">
          <label className="text-sm font-medium text-gray-600">Content</label>

          <div
            ref={editorRef}
            className="mt-2 border border-gray-200 rounded-xl min-h-[200px]"
          />

          {/* AI Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={generateContent}
            className="absolute top-8 right-3 text-xs bg-black text-white px-3 py-1 rounded-full hover:bg-black/80 transition"
          >
            {isLoading ? "Generating..." : "AI Generate"}
          </button>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-xl">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Category */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-600">Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
          >
            {blogCategories.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Publish */}
        <div className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <p className="text-sm text-gray-600">Publish immediately</p>
        </div>

        {/* Submit */}
        <button
          disabled={isAdding}
          className="mt-8 w-full md:w-48 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition disabled:opacity-60"
        >
          {isAdding ? "Publishing..." : "Publish Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
