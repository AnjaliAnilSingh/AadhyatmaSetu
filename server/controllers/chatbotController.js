const Verse = require("../models/Verse");
const Chat = require("../models/Chat");
const { getMostRelevantVerse } = require("../utils/nlp");

// Function to match the user question with the most relevant verse and store chat
const getGitaResponse = async (req, res) => {
    const { question, userId } = req.body;

    if (!question || !userId) {
        return res.status(400).json({ message: "User ID and question are required." });
    }

    try {
        const verses = await Verse.find();
        if (!verses.length) {
            return res.json({ response: "No verse found. Try again!" });
        }

        // Get the best matching verse
        const bestMatch = getMostRelevantVerse(question, verses);

        const responseText = bestMatch
            ? `${bestMatch.text} - ${bestMatch.translation}`
            : "No relevant verse found. Try rephrasing your question!";

        // Store chat in MongoDB
        await Chat.create({ userId, question, response: responseText });

        res.json({ response: responseText });
    } catch (error) {
        console.error("Error fetching verse:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { getGitaResponse };
