import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const VerseManagement = () => {
    const [verses, setVerses] = useState([]);
    const token = localStorage.getItem('authToken')
    // Fetch all verses
    const fetchVerses = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/admin/verses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setVerses(response.data);
        } catch (error) {
            console.error("Error fetching verses:", error);
            toast.error("Failed to fetch verses.");
        }
    };

    const deleteVerse = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/verses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            fetchVerses();
            toast.success("Verse deleted successfully!");
        } catch (error) {
            console.error("Error deleting verse:", error);
            toast.error("Failed to delete verse.");
        }
    };

    useEffect(() => {
        fetchVerses();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Verse Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {verses.map((verse) => (
                    <div key={verse._id} className="bg-olive rounded-lg shadow-lg p-4">
                        <h3 className="text-xl font-semibold text-white">
                            Chapter : {verse.chapter}
                        </h3>
                        <h3 className="text-xl font-semibold text-white">
                            Verse : {verse.verse}
                        </h3>
                        <p className="text-white">{verse.text}</p>
                        <p className="text-white">{verse.translation}</p>
                        <button
                            onClick={() => deleteVerse(verse._id)}
                            className="text-red-500 mt-4"
                        >
                            Delete Verse
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerseManagement;
