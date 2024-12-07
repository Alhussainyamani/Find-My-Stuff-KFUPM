const express = require("express");
const {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    resolveItem,
} = require("../controllers/itemController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new item post (lost or found)
router.post("/", verifyToken, createItem);

// Get all items (with optional filtering and sorting)
router.get("/", getItems);

// Get a single item by its ID
router.get("/:itemId", getItemById);

// Update an item post (requires authentication)
router.put("/:itemId", verifyToken, updateItem);

// Delete an item post (requires authentication)
router.delete("/:itemId", verifyToken, deleteItem);

// Mark an item as resolved
router.put("/:itemId/resolve", verifyToken, resolveItem);

module.exports = router;
