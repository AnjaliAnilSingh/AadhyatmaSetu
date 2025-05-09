const mongoose = require("mongoose");

const verseSchema = new mongoose.Schema({
    chapter: Number,
    verse: Number,
    text: String,
    translation: String,
    keywords: [String]  // Add keywords for matching questions
});

const Verse = mongoose.model("Verse", verseSchema);
module.exports = Verse;
