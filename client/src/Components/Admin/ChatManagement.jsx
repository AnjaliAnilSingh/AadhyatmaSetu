import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ChatManagement = () => {
    const [chats, setChats] = useState([]);
    const token = localStorage.getItem('authToken')

    // Fetch all chats
    const fetchChats = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/admin/chats", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setChats(response.data);

        } catch (error) {
            console.error("Error fetching chats:", error);
            toast.error("Failed to fetch chats.");
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Chat Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {chats.map((chat) => (
                    <div key={chat._id} className="bg-olive rounded-lg shadow-lg p-4">
                        <h3 className="text-xl font-semibold text-white">{chat.userId.username}</h3>
                        <p className="text-white font-bold">{chat.question}</p>
                        <p className="text-white">{chat.response}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatManagement;
