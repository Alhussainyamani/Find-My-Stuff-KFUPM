const express = require("express");
const {
    addComment,
    getComments,
    editComment,
    deleteComment,
} = require("../controllers/commentController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Add a new comment to an item post
router.post("/:itemId", verifyToken, addComment);

// Get all comments for a specific item post
router.get("/:itemId", getComments);

// Edit a specific comment
router.put("/:commentId", verifyToken, editComment);

// Delete a specific comment
router.delete("/:commentId", verifyToken, deleteComment);

module.exports = router;
