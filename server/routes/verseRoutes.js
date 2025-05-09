const express = require("express");
const {
    createVerse,
    getAllVerses,
    getVerseById,
    updateVerse,
    deleteVerse
} = require("../controllers/verseController");

const router = express.Router();

router.post("/", createVerse);       // Add a new verse
router.get("/", getAllVerses);       // Get all verses
router.get("/:id", getVerseById);    // Get a specific verse by ID
router.put("/:id", updateVerse);     // Update a verse by ID
router.delete("/:id", deleteVerse);  // Delete a verse by ID

module.exports = router;
