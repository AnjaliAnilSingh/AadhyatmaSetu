const Chat = require("../models/Chat");

// Get all chat history for a user
const getUserChats = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        const chats = await Chat.find({ userId }).sort({ timestamp: -1 });
        res.json({ chats });
    } catch (error) {
        console.error("Error fetching chat history:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { getUserChats };
