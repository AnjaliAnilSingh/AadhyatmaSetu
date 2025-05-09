const mongoose = require("mongoose");

// Define the Feedback schema
const feedbackSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Assuming you're using a User model to reference the user
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5, // Rating between 1 and 5
        },
        comments: {
            type: String,
            required: false, // Comments are optional
            trim: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Create the Feedback model
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
