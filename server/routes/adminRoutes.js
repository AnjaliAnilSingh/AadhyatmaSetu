const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {
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
} = require("../controllers/adminController");

const authenticate = require("../middlewares/authMiddleware");

// CRUD Routes for User Model
router.get("/users", authenticate, getAllUsers);
router.get("/users/:id", authenticate, getUserById);
router.post("/users", authenticate, createUser);
router.put("/users/:id", authenticate, updateUser);
router.delete("/users/:id", authenticate, deleteUser);

// CRUD Routes for Verse Model
router.get("/verses", authenticate, getAllVerses);
router.get("/verses/:id", authenticate, getVerseById);
router.post("/verses", authenticate, createVerse);
router.put("/verses/:id", authenticate, updateVerse);
router.delete("/verses/:id", authenticate, deleteVerse);

// CRUD Routes for Favorite Model
router.get("/favorites", authenticate, getAllFavorites);
router.get("/favorites/:id", authenticate, getFavoriteById);
router.post("/favorites", authenticate, createFavorite);
router.put("/favorites/:id", authenticate, updateFavorite);
router.delete("/favorites/:id", authenticate, deleteFavorite);

// CRUD Routes for Chat Model
router.get("/chats", authenticate, getAllChats);
router.get("/chats/:id", getChatById);
router.post("/chats", authenticate, createChat);
router.put("/chats/:id", authenticate, updateChat);
router.delete("/chats/:id", authenticate, deleteChat);

module.exports = router;
