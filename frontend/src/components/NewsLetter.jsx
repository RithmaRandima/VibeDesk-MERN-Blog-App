import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    // fake loading (simulate real API)
    setStatus("loading");
    setMessage("");

    setTimeout(() => {
      setStatus("success");
      setMessage("Subscribed successfully 🎉");
      setEmail("");
    }, 1200);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center my-24 px-4">
      <h1 className="md:text-4xl text-2xl font-semibold text-gray-800">
        Never Miss a Blog
      </h1>

      <p className="md:text-lg text-gray-500/70 mt-3 mb-10 max-w-xl leading-relaxed">
        Subscribe to get the latest blogs, tech updates, and exclusive content.
      </p>

      {/* Form container */}
      <form onSubmit={onSubmitHandler} className="w-full max-w-xl">
        <div className="flex h-12 md:h-14 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-primary/30 transition">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 outline-none text-gray-700"
            required
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 md:px-10 bg-primary text-white font-medium hover:bg-primary/90 transition disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Subscribe"}
          </button>
        </div>

        {/* Message (better UX placement) */}
        {message && (
          <p
            className={`mt-4 text-sm font-medium ${
              status === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default NewsLetter;
