import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectFavorites, toggleFavorite } from "../redux/features/auth/authSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Import heart icons
import toast from 'react-hot-toast'; // Importing toast notification
import client from "../lib/axios";

const SongSection = () => {
  const [tracks, setTracks] = useState([]);
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
              Authorization: `Basic ${btoa(import.meta.env.VITE_SPOTIFY)}`,
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
            limit: 10,
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

  const handleFavoriteToggle = async (track) => {  // Accept track as parameter
    if (!user._id) return alert("Please log in to save favorites.");

    dispatch(toggleFavorite(track.id));

    try {
      // Sending the favorite data to the backend with the `type` field set to 'song'
      await client.post("/favorites", {
        userId: user._id,
        type: 'song',  // Type is now 'song'
        trackId: track.id,
        trackName: track.name,
        artist: track.artists.map(a => a.name).join(", "),
        albumImage: track.album.images[0]?.url,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      // Show success notification after adding to favorites
      toast.success("Added to favorites!");

    } catch (error) {
      console.error("Error saving favorite: ", error);
      // Show error notification if something goes wrong
      toast.error("Error adding to favorites.");
    }
  };

  return (
    <div className="my-10 py-8 px-4">
      <h2 className="text-center text-2xl font-serif mb-6">Meditation Music</h2>
      <div className="overflow-hidden">
        <motion.div className="flex gap-6" drag="x" dragConstraints={{ right: 0, left: -1500 }}>
          {tracks.map((track) => (
            <div
              key={track.id}
              className="relative min-w-[250px] bg-olive rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            >
              <img
                src={track.album.images[0].url}
                alt={track.name}
                className="w-full h-40 object-cover"
                onClick={() => handleCardClick(track.id)}
              />
              <div className="p-4 text-white">
                <h3 className="text-lg font-semibold mb-2">{track.name}</h3>
                <p className="text-sm">{track.artists.map(artist => artist.name).join(", ")}</p>
              </div>

              {/* Favorite Button - Visible when logged in */}
              {user._id && (
                <button
                  onClick={() => handleFavoriteToggle(track)}
                  className="absolute top-2 right-2 text-2xl text-white"
                >
                  {favorites.includes(track.id) ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
                </button>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SongSection;
