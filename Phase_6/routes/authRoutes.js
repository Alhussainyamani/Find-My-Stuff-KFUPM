const express = require("express");
const rateLimit = require("express-rate-limit");
const {
  register,
  login,
  getProfile,
  logout,
  addToBookmarks,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Rate limiting middleware for sensitive routes
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests, please try again later.",
});

// Logging middleware to track user actions
const logger = (req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} accessed`
  );
  next();
};

// Apply logging middleware globally
router.use(logger);

// Register a new user
router.post("/register", authRateLimiter, register);

// Login an existing user
router.post("/login", authRateLimiter, login);

// Apply verifyToken middleware for protected routes
router.use(verifyToken);

// Get the logged-in user's profile
router.get("/profile", verifyToken, getProfile);

router.post("/bookmarks", verifyToken, addToBookmarks);

// Logout a user (client-side handles token removal)
router.post("/logout", logout);

module.exports = router;
