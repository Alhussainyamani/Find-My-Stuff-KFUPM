const express = require("express");
const {
    approveItem,
    rejectItem,
    editPost,
    deletePost,
    deleteComment,
    generateReport,
} = require("../controllers/adminController");
const { verifyToken, restrictToAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Approve an item post
router.put("/items/:itemId/approve", verifyToken, restrictToAdmin, approveItem);

// Reject an item post
router.put("/items/:itemId/reject", verifyToken, restrictToAdmin, rejectItem);

// Edit an item post
router.put("/items/:itemId", verifyToken, restrictToAdmin, editPost);

// Delete an item post
router.delete("/items/:itemId", verifyToken, restrictToAdmin, deletePost);

// Delete a comment
router.delete("/comments/:commentId", verifyToken, restrictToAdmin, deleteComment);

// Generate a report (dashboard stats)
router.get("/dashboard/report", verifyToken, restrictToAdmin, generateReport);

module.exports = router;
