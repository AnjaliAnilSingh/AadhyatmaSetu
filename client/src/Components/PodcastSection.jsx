import React from "react";
import { useNavigate } from "react-router-dom";

const PodcastCard = ({ title, duration, views, videoId }) => {
  return (
    <div className="bg-olive rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <iframe
        className="w-full h-40"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allowFullScreen
      ></iframe>

      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="flex justify-between text-sm">
          <span>{views}</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
};

const PodcastSection = () => {
  const navigate = useNavigate(); // 🆕 Create navigate function

  const podcasts = [
    {
      videoId: "EVcVr2asVzI",
      title: "JAYA KISHORI",
      duration: "1:00:52",
      views: "47 LAKHS+ VIEWS",
    },
    {
      videoId: "vMcOhaEMIWI",
      title: "HINDU HONE KA MATLAB",
      duration: "1:27:28",
      views: "14 LAKHS+ VIEWS",
    },
    {
      videoId: "H2kk3DwScAg",
      title: "DWARKA THE LOST CITY",
      duration: "10:40",
      views: "4M+ VIEWS",
    },
  ];

  return (
    <div className="bg-brown my-10 py-8 px-4">
      <h2 className="text-center text-2xl text-creme font-serif mb-6">Podcasts</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {podcasts.map((podcast, index) => (
          <PodcastCard key={index} {...podcast} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/podcasts")}
          className="bg-[#7c4136] text-white py-2 px-6 rounded-full hover:bg-[#5a2d26] transition duration-300"
        >
          View more
        </button>
      </div>
    </div>
  );
};

export default PodcastSection;
