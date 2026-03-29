import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { blogCategories } from "../../assets/assets";

const AddBlog = () => {
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {};
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <div>
          <p> Upload thumbnail</p>
          <label
            htmlFor="image"
            className="bg-gray-50 border border-dashed border-gray-500/30 h-20 mt-3 w-30 cursor-pointer flex flex-col items-center justify-center rounded overflow-hidden"
          >
            {image === false ? (
              <FaUpload />
            ) : (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-full h-full object-cover"
              />
            )}
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </label>
        </div>

        <div>
          <p className="mt-4">BLog Title</p>
          <input
            type="text"
            className="w-full m ax-w-lg mt-2 p-2 border border-gray-300 out;ine-none rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Type here"
          />
        </div>

        <div>
          <p className="mt-4">Sub Title</p>
          <input
            type="text"
            className="w-full m ax-w-lg mt-2 p-2 border border-gray-300 out;ine-none rounded"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            required
            placeholder="Type here"
          />
        </div>

        <div>
          <p className="mt-4">Blog Description</p>
          <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
            <div></div>
            <button
              type="button"
              onClick={generateContent}
              className="absolute bottom-1 right-3 ml-2 text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
            >
              Generate With AI
            </button>
          </div>
        </div>

        <div>
          <p className="mt-4">Blog Category</p>
          <select
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
          >
            <option value="">Select Category</option>
            {blogCategories.map((item, i) => (
              <option value={item} key={i}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
        >
          Add Blog
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
