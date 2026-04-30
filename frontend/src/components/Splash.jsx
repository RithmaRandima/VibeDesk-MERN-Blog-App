import React, { useEffect, useState } from "react";

const Splash = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5; // speed control
      });
    }, 60); // ~1200ms total (100/5 * 60)

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center transition-colors duration-500 bg-white"
      }`}
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
        My Blog App
      </h1>

      {/* Progress Bar */}
      <div className="w-[130px] h-1 bg-gray-400/30 rounded overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Splash;
