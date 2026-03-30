import React, { useRef } from "react";
import { FaStar } from "react-icons/fa";
import bg_img from "../assets/aa.jpeg";
import { useAppContext } from "../../context/AppContext";
const Header = () => {
  const { setInput, input } = useAppContext();

  const inputRef = useRef();

  const onSubmitHandeler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New: AI feature integrated</p>
          <FaStar className="" />
        </div>
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
          Your own <span className="text-primary">blogging</span> <br />{" "}
          platform
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs">
          This is your space to think out loud, to share what matters, and to
          write without filters. whether is's one word or thousand, your story
          starts right here.
        </p>
      </div>

      <form
        onSubmit={onSubmitHandeler}
        className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for blogs"
          className="w-full pl-4 outline-none"
        />
        {input === "" ? (
          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
          >
            Search
          </button>
        ) : (
          <button
            onClick={onClear}
            className="bg-primary w-[200px] text-[15px] text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </form>
      <img
        src={bg_img}
        alt=""
        className="absolute -top-50 -z-1 opacity-50 left-0 right-0 bg-red-200 object-cover"
      />
    </div>
  );
};

export default Header;
