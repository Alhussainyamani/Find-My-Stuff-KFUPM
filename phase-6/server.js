const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorHandler"); // Updated import to include notFound

// Import Routes
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const commentRoutes = require("./routes/commentRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Log HTTP requests in development mode

// API Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/items", itemRoutes); // Lost & found item routes
app.use("/api/comments", commentRoutes); // Comment routes
app.use("/api/admin", adminRoutes); // Admin-specific actions

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running..." });
});

// 404 Not Found Middleware
app.use(notFound); // Handles undefined routes

// Error handling middleware
app.use(errorHandler);

// Export the app for Vercel
module.exports = app;