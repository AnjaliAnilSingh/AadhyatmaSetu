import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Header";
import { AiOutlineUser, AiOutlineHeart, AiOutlineBook, AiOutlinePlayCircle } from "react-icons/ai"; // Icons
import UserManagement from "../../Components/Admin/UserManagement";
import VerseManagement from "../../Components/Admin/VerseManagement";
import FavoriteManagement from "../../Components/Admin/FavoriteManagement";
import ChatManagement from "../../Components/Admin/ChatManagement";
import FeedbackManagement from "../../Components/Admin/FeedbackManagement";

const AdminDashboard = () => {
    const [selectedCategory, setSelectedCategory] = useState("users");

    return (
        <div className="min-h-screen bg-gradient-to-b from-brown to-olive text-white pt-8 px-8">
            <Header />

            <div className="flex flex-col md:flex-row">
                <div className="w-full h-[1200px] md:w-1/4 bg-olive p-4">
                    <h2 className="text-xl font-bold text-white mb-6 mt-20">Admin Dashboard</h2>
                    <div className="flex flex-col">
                        <button
                            onClick={() => setSelectedCategory("users")}
                            className={`text-lg text-white py-2 px-4 rounded-lg hover:bg-olive-600 ${selectedCategory === 'users' ? 'bg-olive-600' : ''}`}
                        >
                            <AiOutlineUser className="inline-block mr-2" /> Users
                        </button>
                        <button
                            onClick={() => setSelectedCategory("verses")}
                            className={`text-lg text-white py-2 px-4 rounded-lg hover:bg-olive-600 ${selectedCategory === 'verses' ? 'bg-olive-600' : ''}`}
                        >
                            <AiOutlineBook className="inline-block mr-2" /> Verses
                        </button>
                        <button
                            onClick={() => setSelectedCategory("favorites")}
                            className={`text-lg text-white py-2 px-4 rounded-lg hover:bg-olive-600 ${selectedCategory === 'favorites' ? 'bg-olive-600' : ''}`}
                        >
                            <AiOutlineHeart className="inline-block mr-2" /> Favorites
                        </button>
                        <button
                            onClick={() => setSelectedCategory("chats")}
                            className={`text-lg text-white py-2 px-4 rounded-lg hover:bg-olive-600 ${selectedCategory === 'chats' ? 'bg-olive-600' : ''}`}
                        >
                            <AiOutlinePlayCircle className="inline-block mr-2" /> Chats
                        </button>
                        <button
                            onClick={() => setSelectedCategory("feedbacks")}
                            className={`text-lg text-white py-2 px-4 rounded-lg hover:bg-olive-600 ${selectedCategory === 'chats' ? 'bg-olive-600' : ''}`}
                        >
                            <AiOutlinePlayCircle className="inline-block mr-2" /> Feedbacks
                        </button>
                    </div>
                </div>

                <div className="w-full md:w-3/4 p-8">
                    <h1 className="text-4xl font-bold text-center mb-8 mt-20">Admin Dashboard</h1>
                    {selectedCategory === "users" && <UserManagement />}
                    {selectedCategory === "verses" && <VerseManagement />}
                    {selectedCategory === "favorites" && <FavoriteManagement />}
                    {selectedCategory === "chats" && <ChatManagement />}
                    {selectedCategory === "feedbacks" && <FeedbackManagement />}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
