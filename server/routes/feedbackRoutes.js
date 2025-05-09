const express = require("express");
const router = express.Router();
const { createFeedback, getAllFeedback, getFeedbackById } = require("../controllers/feedbackController");

// Routes for feedback
router.post("/add", createFeedback); // Submit feedback
router.get("/getAllfeeds", getAllFeedback); // Get all feedback
router.get("/getFeedsById/:id", getFeedbackById); // Get feedback by ID

module.exports = router;
