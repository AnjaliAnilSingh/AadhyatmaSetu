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

const categoryTrackIds = {
  aarti: [
    "2PRBeMIvSCSJ9felJEfm0q", // Example track ID
    "7CbN6PWesr1uYxwSvI7UHW",
    "4rvn5djkLdm5AT6b58pVS5",
    "2i0kKGdwI7IVNOWTCjGp7E",
    "1L8KNSiw7DR2Mc5lckCxsy",
    "5ncfXLlFoRVS7gFqV0s7dP",
    "5r86iNRLtekcHmNn9ns7jz",
    "04qqkhagSKc592y1b3yHWd",
    "48kTfNniXEDeopYkOfZl7a",
  ],
  bhajans: [
    "1qWBWMCMNd7wIXaknViBvc",
    "0rqxKvWQMF2tlfBrrpxM0l",
    "6t30jr257jN79W0qNPGUFN",
    "1m07K0kxDcmfUfSkD72wzp",
    "6Kvyhe66BItc1Gqfcg8iYr",
    "6YGQPZoc88tllmSenguCbJ",
    "34o9NW2P5VuBEsz795VFI7",
    "3ZF9iTthw2m6w8MsNC0daD",
    "3xgA3KSsd8mt3UjQxNtQy3",
    "3QzSBGFPftglS1dqxcS3Vg",
    "2lyh5kOAC98ZJikzYSZN8n",
    "3Lb8kr691KTgFv50z1sK1q",
    "0zZ86TrgtxtJVrFgBTI6SI",
    "0FHSrJ6ArXQXJEwXKRFXHD",
    "1A8XQ51VVi7Xt6RCvtdVEY",
    "4AkCKZnRkALSCl8zerB1k4",
    "2zmyrhnuYswbblJVzSkVXd",
    "3DdQSNQazfXQO5bbDbMXjU",
    "2HGRManU666g8RqyuOrqKT",
    "58SIEtTjWErr0yEXVBKxvd",
  ],
  stotram: [
    "2jl6Q8JftB6svtHUFCmq21",
    "0ocAln17hTvWL3NZ9MVJ4J",
    "6NFAlpTFpLrYBrsFuiloH3",
    "620OQL1u31pVipOAQcs9yD",
    "0m6yOShTmAE8vmHHs8Ag2H",
    "5sZTfA3GKFbkVShlxvMQTQ",
    "0Oum4Nyg90K5cRmXSqsR3K",
    "5EweUoe14voCJawHLIwWLR",
    "2FtP1MQAwGMA4scHWWmK4o",
    "3krosJNjQTuvks3ykja2VU",
    "3CfnPYeRdFxa2pnjRCawMS",
    "6fw2pK0ELUPhvlIH8Be7Eg",
  ],
  mantras: [
    "1w5pCCdzoLkAHghsPiJh3f",
    "65EM65zWn5oIqwD5VMd6Fq",
    "50RxAXvBs18zquwdwf2ZOV",
    "3pQOhRPdlf1g3o0tek8akx",
    "6pkibLdxlopMUd8E7wnMpW",
    "0k3PruNJu0grDQujlrsnZu",
    "2wP63AEs6BFHH2lYagpiOy",
    "4j6u4LsEi98crgKBrTeqH4",
    "0IEA8xYxStRpXITIXlv1K5",
    "11mDZnG6jfAPgVW9UJu23n",
    "5hjUnakKd3xCFNAuUdvsy1",
    "0xIfJzJuvtL5zvj10AaZzG"
  ],
};

const SongsPage = () => {
  const [tracks, setTracks] = useState([]);
  const [category, setCategory] = useState("aarti");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchTracksByIds = async () => {
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

        const ids = categoryTrackIds[category].join(",");
        const response = await axios.get(`https://api.spotify.com/v1/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: { ids },
        });

        setTracks(response.data.tracks);
      } catch (error) {
        console.error("Error fetching tracks: ", error);
      }
    };

    fetchTracksByIds();
  }, [category]);

  const handleCardClick = (trackId) => {
    navigate(`/player/${trackId}`);
  };

  const handleFavoriteToggle = async (track) => {
    if (!user._id) return alert("Please log in to save favorites.");

    dispatch(toggleFavorite(track.id));

    try {
      await axios.post("http://localhost:5000/api/v1/favorites", {
        userId: user._id,
        type: 'song',
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
        <h1 className="text-4xl font-bold text-center mb-6 mt-[100px]">Devotional Songs</h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search songs or artists..."
            className="w-full max-w-md px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-olive"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {["aarti", "bhajans", "stotram", "mantras"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full text-lg font-medium border border-white transition-all duration-300 ${category === cat ? "bg-white text-olive" : "bg-transparent hover:bg-white hover:text-olive"
                }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Songs Grid */}
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
                className="relative bg-olive rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform cursor-pointer"
                onClick={() => handleCardClick(track.id)}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={track.album.images[0]?.url}
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

export default SongsPage;
