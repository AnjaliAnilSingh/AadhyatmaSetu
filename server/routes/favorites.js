const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const { addFavorite, getFavorites, removeFavorite } = require("../controllers/favoritesController");

// Route to add a favorite (Ensure authentication)
router.post("/", authenticate, addFavorite);

// Route to get all favorites for a user
router.get("/:userId", authenticate, getFavorites);

// Route to remove a favorite
router.delete("/:id", authenticate, removeFavorite);

router.post("/", (req, res) => {
    console.log("Received POST request to /api/v1/favorites", req.body);
    addFavorite(req, res);
  });
  

module.exports = router;
