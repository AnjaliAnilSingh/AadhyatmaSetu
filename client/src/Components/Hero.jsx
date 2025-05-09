import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleExploreClick = () => {
    // Navigate to the login page when the Explore button is clicked
    navigate("/login");
  };

  return (
    <div className="relative h-screen flex items-center justify-start px-8 md:px-16">
      {/* Left Section with Tagline */}
      <div className="relative z-10">
        <h1 className="text-white font-bold text-3xl md:text-3xl lg:text-4xl leading-tight animate-slide-up">
          Feel free to ask our AI <br /> questions about inner life, guided by Bhagavad Gita wisdom.
        </h1>
        <button
          onClick={handleExploreClick} // Add the onClick handler here
          type="submit"
          className="relative z-10 flex items-center gap-16 mt-10 px-6 py-3 lg:px-8 lg:py-4 ml-4 lg:ml-10 text-sm md:text-base lg:text-lg font-medium lg:font-semibold bg-gray-50 text-gray-800 backdrop-blur-md  isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-olive hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 overflow-hidden border-2 rounded-full group transition-transform animate-slide-up animation-delay-200"
        >
          Aadhyatmic AI
          <svg
            className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
            viewBox="0 0 16 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
              className="fill-gray-800 group-hover:fill-gray-800"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Hero;