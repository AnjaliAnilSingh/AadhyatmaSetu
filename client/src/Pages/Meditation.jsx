import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectFavorites, toggleFavorite } from "../redux/features/auth/authSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import toast from 'react-hot-toast';

const Meditation = () => {
  const [tracks, setTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const authResponse = await axios.post(
          "https://accounts.spotify.com/api/token",
          "grant_type=client_credentials",
          {
            headers: {
              Authorization: `Basic ${btoa("process.env.SPOTIFY")}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const accessToken = authResponse.data.access_token;

        const response = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: "meditation songs",
            type: "track",
            limit: 20,
          },
        });

        setTracks(response.data.tracks.items);
      } catch (error) {
        console.error("Error fetching music: ", error);
      }
    };

    fetchMusic();
  }, []);

  const handleCardClick = (trackId) => {
    navigate(`/player/${trackId}`);
  };

  const handleFavoriteToggle = async (track) => {
    if (!user._id) return alert("Please log in to save favorites.");

    dispatch(toggleFavorite(track.id));

    try {
      await axios.post("http://localhost:5000/api/v1/favorites", {
        userId: user._id,
        type: 'meditation',
        trackId: track.id,
        trackName: track.name,
        artist: track.artists.map(a => a.name).join(", "),
        albumImage: track.album.images[0]?.url,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Added to favorites!");
    } catch (error) {
      console.error("Error saving favorite: ", error);
      toast.error("Error adding to favorites.");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-brown to-olive text-white pt-8 px-8">
        <h1 className="text-4xl font-bold text-center mb-8 mt-[100px]">Meditation Music</h1>

        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search songs or artists..."
            className="w-full max-w-md px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-olive"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {tracks
            .filter(
              (track) =>
                track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                track.artists.some((artist) =>
                  artist.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            )
            .map((track) => (
              <motion.div
                key={track.id}
                className="bg-olive rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform cursor-pointer relative"
                onClick={() => handleCardClick(track.id)}
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{track.name}</h3>
                  <p className="text-sm">{track.artists.map(artist => artist.name).join(", ")}</p>
                </div>

                {user._id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteToggle(track);
                    }}
                    className="absolute top-2 right-2 text-2xl text-white"
                  >
                    {favorites.includes(track.id) ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
                  </button>
                )}
              </motion.div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Meditation;
