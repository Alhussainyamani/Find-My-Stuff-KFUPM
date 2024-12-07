const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

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

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
