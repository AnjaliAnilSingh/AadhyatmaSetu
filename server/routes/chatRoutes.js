const express = require("express");
const { getUserChats } = require("../controllers/chatController");

const router = express.Router();

// Get chat history for a user
router.get("/history/:userId", getUserChats);

module.exports = router;
