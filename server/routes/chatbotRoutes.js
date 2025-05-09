const express = require("express");
const { getGitaResponse } = require("../controllers/chatbotController");

const router = express.Router();

router.post("/ask", getGitaResponse);

module.exports = router;
