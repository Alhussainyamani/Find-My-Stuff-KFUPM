const express = require("express");
const {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    resolveItem,
    approveItem,
    getItemsGuest,
} = require("../controllers/itemController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new item post (lost or found)
router.post("/", verifyToken, createItem);

// Get all items (with optional filtering and sorting)
router.get("/", verifyToken, getItems);

router.get("/guest", getItemsGuest);


// Get a single item by its ID
router.get("/:itemId", getItemById);

// Update an item post (requires authentication)
router.put("/:itemId", verifyToken, updateItem);

// Delete an item post (requires authentication)
router.put("/:itemId/delete", verifyToken, deleteItem);

// Mark an item as resolved
router.put("/:itemId/resolve", verifyToken, resolveItem);

// Mark an item as resolved
router.put("/:itemId/approve", verifyToken, approveItem);

module.exports = router;
