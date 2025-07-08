// PACKAGES
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

// FILES
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes")
const chatbotRoutes = require("./routes/chatbotRoutes");
const verseRoutes = require("./routes/verseRoutes");
const chatRoutes = require("./routes/chatRoutes");
const favoriteRoutes = require("./routes/favorites.js");
const adminRoutes = require("./routes/adminRoutes.js")
const feedbackRoutes = require("./routes/feedbackRoutes.js")

// DOTENV
dotenv.config();

// MONGODB CONNECTION
connectDB();

// REST OBJECT
const app = express();

// MIDDLEWARES
const corsOptions = {
    origin: 'https://aadhyatma-setu.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
};
app.use(cors(corsOptions));
app.use(cookieParser()); // TO PARSE COOKIE
app.use(express.json());
app.use(morgan("dev")); // TO HAVE CONSOLE LOGS SUCCESS AND ERROR


// MAIN ROUTE
app.get("", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to AadhyatmaSetu Server!!"
    });
});

// API ROUTES
app.use("/api/v1/chatbot", chatbotRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/verses", verseRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/favorites", favoriteRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/feedback", feedbackRoutes);

// PORT
const PORT = process.env.PORT || 5000;

// LISTEN
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`.bgGreen.white);
})