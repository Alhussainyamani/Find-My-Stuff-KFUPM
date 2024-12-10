const express = require("express");
const {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    resolveItem,
    approveItem,
} = require("../controllers/itemController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new item post (lost or found)
router.post("/", verifyToken, createItem);

// Get all items (with optional filtering and sorting)
router.get("/", verifyToken, getItems);

// Get a single item by its ID
router.get("/:itemId", getItemById);

// Update an item post (requires authentication)
router.put("/:itemId", verifyToken, updateItem);

// Delete an item post (requires authentication)
router.delete("/:itemId", verifyToken, deleteItem);

// Mark an item as resolved
router.put("/:itemId/resolve", verifyToken, resolveItem);

// Mark an item as resolved
router.put("/:itemId/resolve", verifyToken, approveItem);

module.exports = router;
