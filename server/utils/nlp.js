const natural = require("natural");
const cosine = require("cosine-similarity");

// Function to preprocess text (remove special characters, convert to lowercase)
const preprocessText = (text) => {
    return text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, ""); // Remove punctuation
};

// Function to get the most matching verse using semantic similarity
const getMostRelevantVerse = (userQuery, verses) => {
    const processedQuery = preprocessText(userQuery);

    let bestMatch = null;
    let highestScore = -1;

    verses.forEach(verse => {
        const verseText = preprocessText(verse.text + " " + verse.translation + " " + verse.keywords.join(" "));

        // Use NLP-based similarity (TF-IDF or embeddings)
        const tfidf = new natural.TfIdf();
        tfidf.addDocument(processedQuery);
        tfidf.addDocument(verseText);

        const queryVector = [];
        const verseVector = [];

        tfidf.tfidfs(processedQuery, (i, measure) => {
            queryVector[i] = measure || 0; // Handle undefined values
        });

        tfidf.tfidfs(verseText, (i, measure) => {
            verseVector[i] = measure || 0;
        });

        // Compute cosine similarity
        const similarity = cosine(queryVector, verseVector);

        if (similarity > highestScore) {
            highestScore = similarity;
            bestMatch = verse;
        }
    });

    return bestMatch;
};

module.exports = { preprocessText, getMostRelevantVerse };
