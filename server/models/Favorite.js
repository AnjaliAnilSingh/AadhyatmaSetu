const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    type: {
      type: String,
      enum: ['song', 'meditation', 'book'],
      required: true
    },
    trackId: { type: String }, // For song or meditation
    trackName: { type: String }, // For song or meditation
    artist: { type: String }, // For song or meditation
    albumImage: { type: String }, // For song or meditation
    bookId: { type: String }, // For spiritual books
    bookTitle: { type: String }, // For spiritual books
    bookDescription: { type: String }, // For spiritual books
    bookImage: { type: String }, // For spiritual books
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", FavoriteSchema);
