const Favorite = require("../models/Favorite");

// Add a favorite (song, meditation, or book)
const addFavorite = async (req, res) => {
  try {
    console.log("Received favorite data:", req.body); // Debugging line

    const { userId, type, trackId, trackName, artist, albumImage, bookId, bookTitle, bookDescription, bookImage } = req.body;

    // Ensure required fields are provided
    if (!userId || !type) {
      return res.status(400).json({ message: "User ID and type are required" });
    }

    // Validate the favorite type
    if (!['song', 'meditation', 'book'].includes(type)) {
      return res.status(400).json({ message: "Invalid favorite type." });
    }

    // Check if favorite already exists based on userId and type (song/meditation/book)
    let existingFavorite;
    if (type === 'song' || type === 'meditation') {
      existingFavorite = await Favorite.findOne({ userId, trackId, type });
    } else if (type === 'book') {
      existingFavorite = await Favorite.findOne({ userId, bookId, type });
    }

    if (existingFavorite) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    // Create a new favorite document
    const favorite = new Favorite({
      userId,
      type,
      trackId: type === 'song' || type === 'meditation' ? trackId : undefined,
      trackName: type === 'song' || type === 'meditation' ? trackName : undefined,
      artist: type === 'song' || type === 'meditation' ? artist : undefined,
      albumImage: type === 'song' || type === 'meditation' ? albumImage : undefined,
      bookId: type === 'book' ? bookId : undefined,
      bookTitle: type === 'book' ? bookTitle : undefined,
      bookDescription: type === 'book' ? bookDescription : undefined,
      bookImage: type === 'book' ? bookImage : undefined,
    });

    // Save the favorite to the database
    await favorite.save();

    res.status(201).json({ success: true, favorite });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: "Error adding favorite", error });
  }
};

// Get all favorites for a user
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites", error });
  }
};

// Remove a favorite by its ID
const removeFavorite = async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing favorite", error });
  }
};

module.exports = { addFavorite, getFavorites, removeFavorite };
