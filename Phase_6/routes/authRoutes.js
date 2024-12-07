const express = require("express");
const {
    register,
    login,
    getProfile,
    logout,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login an existing user
router.post("/login", login);

// Get the logged-in user's profile
router.get("/profile", verifyToken, getProfile);

// Logout a user (client-side handles token removal)
router.post("/logout", logout);

module.exports = router;
