import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white text-gray-800 gap-4">
      <div className="relative">
        {/* spinner */}
        <div className="w-14 h-14 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>

        {/* soft glow */}
        <div className="absolute inset-0 rounded-full blur-md bg-blue-400 opacity-20 animate-pulse"></div>
      </div>

      {/* text */}
      <p className="text-lg font-semibold tracking-wide">Loading Article...</p>
      <p className="text-sm text-gray-400">Fetching fresh content for you ✍️</p>
    </div>
  );
};

export default Loader;
