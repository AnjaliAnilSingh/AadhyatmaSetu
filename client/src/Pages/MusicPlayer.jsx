import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import Header from '../Components/Header';
import Footer from '../Components/Footer'

const MusicPlayer = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Header/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-brown to-olive text-white pt-8 px-8">
      <button
        className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-yellow-300"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftCircle size={32} />
        <span>Back</span>
      </button>

      <h1 className="text-3xl font-bold mb-12 mt-[100px]">Now Playing</h1>

      <div className="w-full max-w-4xl">
        <iframe
          src={`https://open.spotify.com/embed/track/${trackId}`}
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-lg shadow-xl"
        ></iframe>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default MusicPlayer;
