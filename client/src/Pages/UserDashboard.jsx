import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Heart icons
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/authSlice"; // To get user info
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import client from "../lib/axios";

const UserDashboard = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("songs");
    const [favorites, setFavorites] = useState({
        songs: [],
        books: [],
        meditation: [],
    });
    const user = useSelector(selectUser); // Get user from redux
    const token = localStorage.getItem("authToken");
    const [rating, setRating] = useState(0); // State for rating
    const [comment, setComment] = useState(""); // State for comment
    const [isSubmitted, setIsSubmitted] = useState(false); // To manage submission state

    // Fetch favorite data based on the type (song, book, meditation)
    const fetchFavorites = async () => {
        try {
            const response = await client.get(`/favorites/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Initialize favorites object with categories
            const sortedFavorites = {
                songs: [],
                books: [],
                meditation: [],
            };

            response.data.forEach((item) => {
                if (item.type === "song") {
                    sortedFavorites.songs.push(item);
                } else if (item.type === "book") {
                    sortedFavorites.books.push(item);
                } else if (item.type === "meditation") {
                    sortedFavorites.meditation.push(item);
                }
            });

            setFavorites(sortedFavorites); // Update state with categorized favorites
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    // Handle favorite toggle (add or remove item from favorites)
    const handleFavoriteToggle = async (item) => {
        if (!user._id) return alert("Please log in to save favorites.");

        try {
            console.log("Removing from favorites...");
            await client.delete(`/favorites/${item._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchFavorites()
            toast.success("Item removed from favorites!");
        } catch (error) {
            console.error("Error toggling favorite:", error);
            toast.error("There was an error with the favorite toggle.");
        }
    };
    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error("Please select a rating!");
            return;
        }

        // Log the data that will be sent
        console.log("Submitting feedback:", { rating, comments: comment, userId: user._id });

        try {
            // Submit feedback to the API
            await client.post("/feedback/add", {
                rating,
                comments: comment, // Change 'comment' to 'comments' here
                userId: user._id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsSubmitted(true);
            toast.success("Thank you for your feedback!");
        } catch (error) {
            console.error("Error submitting feedback:", error);
            toast.error("There was an error submitting your feedback.");
        }
    };


    const handleCardClick = (trackId) => {
        console.log(trackId)
        navigate(`/player/${trackId}`);
    };

    useEffect(() => {
        if (user._id) {
            fetchFavorites(); // Fetch all favorites on initial load
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-brown to-olive text-white pt-8 px-8">
            <Header />

            <div className="flex flex-col md:flex-row">
                {/* Sidebar (Category Selector) */}
                <div className="w-full md:w-1/4 bg-olive p-4">
                    <h2 className="text-xl font-bold text-white mb-6 mt-20">User Dashboard</h2>
                    <div className="flex flex-col">
                        <button
                            onClick={() => setSelectedCategory("songs")}
                            className={`text-lg text-white py-2 px-4 rounded-lg hover:bg-olive-600 ${selectedCategory === 'songs' ? 'bg-olive-600' : ''}`}
                        >
                            Songs
                        </button>
                        <button
                            onClick={() => setSelectedCategory("books")}
                            className={`text-lg text-white py-2 px-4 rounded-lg hover:bg-olive-600 ${selectedCategory === 'books' ? 'bg-olive-600' : ''}`}
                        >
                            Books
                        </button>
                        <button
                            onClick={() => setSelectedCategory("meditation")}
                            className={`text-lg text-white py-2 px-4 rounded-lg hover:bg-olive-600 ${selectedCategory === 'meditation' ? 'bg-olive-600' : ''}`}
                        >
                            Meditation
                        </button>
                        <button
                            onClick={() => setSelectedCategory("feedback")}
                            className={`text-lg text-white py-2 px-4 rounded-lg hover:bg-olive-600 ${selectedCategory === 'meditation' ? 'bg-olive-600' : ''}`}
                        >
                            Feedback
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-full md:w-3/4 p-8">
                    <h1 className="text-4xl font-bold text-center mb-8 mt-20">My Favorites</h1>

                    {/* Conditional rendering based on selected category */}
                    {selectedCategory === "songs" && (
                        <>
                            <h2 className="text-2xl font-semibold mb-4">Songs</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                                {favorites.songs.length === 0 ? (
                                    <p>No favorite songs found.</p>
                                ) : (
                                    favorites.songs.map((item) => (
                                        <div
                                            key={item._id}
                                            className="bg-olive rounded-lg shadow-lg overflow-hidden pb-4 transition-transform transform hover:scale-105 relative"
                                            onClick={() => handleCardClick(item.trackId)} // Navigate on click
                                        >
                                            <img
                                                src={item.albumImage}
                                                alt={item.trackName}
                                                className="w-full h-60 object-cover rounded"
                                            />
                                            <div className="mt-4 px-4">
                                                <h2 className="text-xl font-semibold text-[#482B19]">{item.trackName}</h2>
                                                <p className="text-[#6D4C41] mt-2">{item.artist}</p>
                                            </div>

                                            {/* Heart Button for favorite toggle */}
                                            {user._id && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent card click navigation
                                                        handleFavoriteToggle(item);
                                                    }}
                                                    className="absolute top-2 right-2 text-2xl text-white"
                                                >
                                                    {favorites.songs.some((fav) => fav._id === item._id) ? (
                                                        <AiFillHeart className="text-red-500" />
                                                    ) : (
                                                        <AiOutlineHeart />
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}

                    {/* Similar logic for books and meditation categories */}
                    {selectedCategory === "books" && (
                        <>
                            <h2 className="text-2xl font-semibold mb-4">Books</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                                {favorites.books.length === 0 ? (
                                    <p>No favorite books found.</p>
                                ) : (
                                    favorites.books.map((item) => (
                                        <div key={item._id} className="bg-olive rounded-lg shadow-lg overflow-hidden pb-4 transition-transform transform hover:scale-105 relative">
                                            <img
                                                src={item.bookImage}
                                                alt={item.bookTitle}
                                                className="w-full h-60 object-cover rounded"
                                            />
                                            <div className="mt-4 px-4">
                                                <h2 className="text-xl font-semibold text-[#482B19]">{item.bookTitle}</h2>
                                                <p className="text-[#6D4C41] mt-2">{item.description}</p>
                                            </div>

                                            {/* Heart Button for favorite toggle */}
                                            {user._id && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleFavoriteToggle(item);
                                                    }}
                                                    className="absolute top-2 right-2 text-2xl text-white"
                                                >
                                                    {favorites.books.some((fav) => fav._id === item._id) ? (
                                                        <AiFillHeart className="text-red-500" />
                                                    ) : (
                                                        <AiOutlineHeart />
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}

                    {/* Repeat similar logic for meditation */}
                    {selectedCategory === "meditation" && (
                        <>
                            <h2 className="text-2xl font-semibold mb-4">Meditation</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {favorites.meditation.length === 0 ? (
                                    <p>No favorite meditation found.</p>
                                ) : (
                                    favorites.meditation.map((item) => (
                                        <div
                                            key={item._id}
                                            className="bg-olive rounded-lg shadow-lg overflow-hidden pb-4 transition-transform transform hover:scale-105 relative"
                                            onClick={() => handleCardClick(item.trackId)} // Navigate on click
                                        >
                                            <img
                                                src={item.albumImage || item.image}
                                                alt={item.trackName || item.name}
                                                className="w-full h-60 object-cover rounded"
                                            />
                                            <div className="mt-4 px-4">
                                                <h2 className="text-xl font-semibold text-[#482B19]">{item.trackName || item.name}</h2>
                                                <p className="text-[#6D4C41] mt-2">{item.artist || item.description}</p>
                                            </div>

                                            {/* Heart Button for favorite toggle */}
                                            {user._id && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent card click navigation
                                                        handleFavoriteToggle(item);
                                                    }}
                                                    className="absolute top-2 right-2 text-2xl text-white"
                                                >
                                                    {favorites.meditation.some((fav) => fav._id === item._id) ? (
                                                        <AiFillHeart className="text-red-500" />
                                                    ) : (
                                                        <AiOutlineHeart />
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                    {/* Feedback Form Section */}
                    {selectedCategory === "feedback" && (
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold mb-4">Submit Feedback</h2>
                            {isSubmitted ? (
                                <p className="text-lg text-center text-green-600">Thank you for your feedback!</p>
                            ) : (
                                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                                    {/* Rating Section */}
                                    <div className="flex justify-center items-center space-x-2">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <div
                                                key={value}
                                                className="cursor-pointer text-3xl"
                                                onClick={() => setRating(value)}
                                            >
                                                {value <= rating ? (
                                                    <FaStar className="text-yellow-400" />
                                                ) : (
                                                    <FaRegStar className="text-gray-300" />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Comment Section */}
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-lg mt-4 text-black bg-white"
                                        placeholder="Leave your comments here..."
                                        rows="4"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />

                                    {/* Submit Button */}
                                    <div className="text-center">
                                        <button type="submit" className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
                                            Submit Feedback
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                    )}


                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UserDashboard;
