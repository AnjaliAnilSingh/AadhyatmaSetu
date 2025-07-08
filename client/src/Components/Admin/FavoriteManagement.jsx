import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import client from "../../lib/axios";

const FavoriteManagement = () => {
    const [favorites, setFavorites] = useState({
        songs: [],
        books: [],
        meditation: [],
    });
    const token = localStorage.getItem('authToken')
    const fetchFavorites = async () => {
        try {
            const response = await client.get("/admin/favorites", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
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

            setFavorites(sortedFavorites);
        } catch (error) {
            console.error("Error fetching favorites:", error);
            toast.error("Failed to fetch favorites.");
        }
    };

    const deleteFavorite = async (id) => {
        try {
            await client.delete(`/admin/favorites/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            fetchFavorites();
            toast.success("Favorite deleted successfully!");
        } catch (error) {
            console.error("Error deleting favorite:", error);
            toast.error("Failed to delete favorite.");
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Favorite Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {favorites.songs.length > 0 &&
                    favorites.songs.map((favorite) => (
                        <div key={favorite._id} className="bg-olive rounded-lg shadow-lg p-4">
                            <h3 className="text-xl font-semibold text-white">{favorite.trackName}</h3>
                            <button
                                onClick={() => deleteFavorite(favorite._id)}
                                className="text-red-500 mt-4"
                            >
                                Delete Favorite
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default FavoriteManagement;
