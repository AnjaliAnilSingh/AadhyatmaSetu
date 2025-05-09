const User = require('../models/User');
const Verse = require("../models/Verse");
const Favorite = require("../models/Favorite");
const Chat = require("../models/Chat");

// --- User CRUD Operations ---
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error("Error fetching users from MongoDB:", err);
        res.status(500).json({ error: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- Verse CRUD Operations ---
const getAllVerses = async (req, res) => {
    try {
        const verses = await Verse.find();
        res.json(verses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getVerseById = async (req, res) => {
    try {
        const verse = await Verse.findById(req.params.id);
        if (!verse) return res.status(404).json({ message: "Verse not found" });
        res.json(verse);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createVerse = async (req, res) => {
    try {
        const newVerse = new Verse(req.body);
        await newVerse.save();
        res.status(201).json(newVerse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateVerse = async (req, res) => {
    try {
        const updatedVerse = await Verse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVerse) return res.status(404).json({ message: "Verse not found" });
        res.json(updatedVerse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteVerse = async (req, res) => {
    try {
        const deletedVerse = await Verse.findByIdAndDelete(req.params.id);
        if (!deletedVerse) return res.status(404).json({ message: "Verse not found" });
        res.json({ message: "Verse deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- Favorite CRUD Operations ---
const getAllFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find();
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getFavoriteById = async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);
        if (!favorite) return res.status(404).json({ message: "Favorite not found" });
        res.json(favorite);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFavorite = async (req, res) => {
    try {
        const newFavorite = new Favorite(req.body);
        await newFavorite.save();
        res.status(201).json(newFavorite);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateFavorite = async (req, res) => {
    try {
        const updatedFavorite = await Favorite.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFavorite) return res.status(404).json({ message: "Favorite not found" });
        res.json(updatedFavorite);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteFavorite = async (req, res) => {
    try {
        const deletedFavorite = await Favorite.findByIdAndDelete(req.params.id);
        if (!deletedFavorite) return res.status(404).json({ message: "Favorite not found" });
        res.json({ message: "Favorite deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- Chat CRUD Operations ---
const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find().populate("userId", "username email");  // Populate userId to get user info
        res.json(chats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getChatById = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id).populate("userId", "username email");
        if (!chat) return res.status(404).json({ message: "Chat not found" });
        res.json(chat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createChat = async (req, res) => {
    try {
        const newChat = new Chat(req.body);
        await newChat.save();
        res.status(201).json(newChat);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateChat = async (req, res) => {
    try {
        const updatedChat = await Chat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedChat) return res.status(404).json({ message: "Chat not found" });
        res.json(updatedChat);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteChat = async (req, res) => {
    try {
        const deletedChat = await Chat.findByIdAndDelete(req.params.id);
        if (!deletedChat) return res.status(404).json({ message: "Chat not found" });
        res.json({ message: "Chat deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Exporting all functions
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getAllVerses,
    getVerseById,
    createVerse,
    updateVerse,
    deleteVerse,
    getAllFavorites,
    getFavoriteById,
    createFavorite,
    updateFavorite,
    deleteFavorite,
    getAllChats,
    getChatById,
    createChat,
    updateChat,
    deleteChat
};
