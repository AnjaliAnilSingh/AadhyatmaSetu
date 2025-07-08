import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import client from "../../lib/axios";

const FeedbackManagement = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const token = localStorage.getItem('authToken');

    // Fetch all feedbacks
    const fetchFeedbacks = async () => {
        try {
            const response = await client.get("/feedback/getAllfeeds", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFeedbacks(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
            toast.error("Failed to fetch feedbacks.");
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Feedback Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {feedbacks.map((feedback) => (
                    <div key={feedback._id} className="bg-olive rounded-lg shadow-lg p-4">
                        {/* Check if userId is an object and render its properties */}
                        <h3 className="text-xl font-semibold text-white">
                            User: {feedback.userId && feedback.userId.username ? feedback.userId.username : "Unknown User"}
                        </h3>
                        <p className="text-white">Rating: {feedback.rating}</p>
                        <p className="text-white">Comment: {feedback.comments}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedbackManagement;
