import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import BlogList from "../components/BlogList";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import bgImage from "../assets/background.jpg";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Navbar />
      <Header />
      <BlogList />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
