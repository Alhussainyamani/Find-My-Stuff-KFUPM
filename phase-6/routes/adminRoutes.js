const express = require("express");
const {
  approveItem,
  rejectItem,
  editPost,
  deletePost,
  deleteComment,
  generateReport,
} = require("../controllers/adminController");
const {
  verifyToken,
  restrictToAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Apply common middleware globally
router.use(verifyToken, restrictToAdmin);

// Approve an item post
router.put("/items/:itemId/approve", approveItem);

// Reject an item post
router.put("/items/:itemId/reject", rejectItem);

// Edit an item post
router.put("/items/:itemId", editPost);

// Delete an item post
router.delete("/items/:itemId", deletePost);

// Delete a comment
router.delete("/comments/:commentId", deleteComment);

// Generate a report (dashboard stats)
router.get("/dashboard/report", generateReport);

module.exports = router;
