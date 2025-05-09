const Verse = require("../models/Verse");

// Create a new verse
const createVerse = async (req, res) => {
    try {
        const { chapter, verse, text, translation, keywords } = req.body;
        const newVerse = new Verse({ chapter, verse, text, translation, keywords });
        await newVerse.save();
        res.status(201).json({ message: "Verse added successfully!", verse: newVerse });
    } catch (error) {
        res.status(500).json({ message: "Error adding verse", error: error.message });
    }
};

// Get all verses
const getAllVerses = async (req, res) => {
    try {
        const verses = await Verse.find();
        res.json(verses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching verses", error: error.message });
    }
};

// Get a single verse by ID
const getVerseById = async (req, res) => {
    try {
        const verse = await Verse.findById(req.params.id);
        if (!verse) return res.status(404).json({ message: "Verse not found" });
        res.json(verse);
    } catch (error) {
        res.status(500).json({ message: "Error fetching verse", error: error.message });
    }
};

// Update a verse by ID
const updateVerse = async (req, res) => {
    try {
        const { chapter, verse, text, translation } = req.body;
        const updatedVerse = await Verse.findByIdAndUpdate(
            req.params.id,
            { chapter, verse, text, translation },
            { new: true }
        );
        if (!updatedVerse) return res.status(404).json({ message: "Verse not found" });
        res.json({ message: "Verse updated successfully!", verse: updatedVerse });
    } catch (error) {
        res.status(500).json({ message: "Error updating verse", error: error.message });
    }
};

// Delete a verse by ID
const deleteVerse = async (req, res) => {
    try {
        const deletedVerse = await Verse.findByIdAndDelete(req.params.id);
        if (!deletedVerse) return res.status(404).json({ message: "Verse not found" });
        res.json({ message: "Verse deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting verse", error: error.message });
    }
};

module.exports = { createVerse, getAllVerses, getVerseById, updateVerse, deleteVerse };
