const Feedback = require('../models/Feedback');

// --- Create Feedback ---
const createFeedback = async (req, res) => {
    try {
        const { userId, rating, comments } = req.body; // Change 'comment' to 'comments'

        // Create a new Feedback document
        const newFeedback = new Feedback({
            userId,
            rating,
            comments,  // Using 'comments' to match the schema
        });

        // Save feedback to the database
        await newFeedback.save();

        res.status(201).json({
            success: true,
            message: "Feedback submitted successfully",
            feedback: newFeedback,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// --- Get all Feedback ---
const getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find().populate("userId", "username email");
        res.status(200).json(feedback);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- Get Feedback by ID ---
const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id).populate("userId", "username email");
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        res.status(200).json(feedback);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createFeedback, getAllFeedback, getFeedbackById };
