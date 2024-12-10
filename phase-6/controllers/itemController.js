const Item = require("../models/Item");

// Create a new lost or found item post
const createItem = async (req, res) => {
    try {

        const { type, description, location, imageUrl, information, name, approviness} = req.body;

        // Validate type (lost or found)
        if (!["lost", "found"].includes(type)) {
        return res.status(400).json({ message: "Invalid item type. Must be 'lost' or 'found'." });
        }

        // Create the item
        const newItem = new Item({
        type,
        description,
        location,
        imageUrl,
        information,
        name,
        approviness,
        createdBy: req.user.id, // Assuming `req.user` is set by authentication middleware
        });

        const savedItem = await newItem.save();
        res.status(201).json({
        message: `${type === "lost" ? "Lost" : "Found"} item posted successfully`,
        item: savedItem,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating item post" });
    }
};

// Get all items (with optional filtering and sorting)
// In ItemController.js
const getItems = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { type, status, sort, search } = req.query;
        const userId = req.user.id;  // Assuming the user ID is available in req.user

        const query = {};

        if (req.user.role !== "admin") {
            // If the user is not an admin, filter by user ID
            query.createdBy = userId; 
        }

        // Add the filtering by 'approviness' here
        if (status) query.approviness = status;  // This will filter for 'approved' or 'unapproved' items

        if (type) query.type = type; // Filter by type (lost/found)
        if (search) query.description = { $regex: search, $options: "i" }; // Search by description (case-insensitive)

        const sortOptions = {};
        if (sort === "newest") sortOptions.createdAt = -1;
        if (sort === "oldest") sortOptions.createdAt = 1;

        // Fetch the items from the database based on the query
        const items = await Item.find(query).sort(sortOptions).populate("createdBy", "name email");
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching items" });
    }
};

const getItemsGuest = async (req, res) => {
    try {
        const { type, status, sort, search } = req.query;
        const query = {};

        // If the user is not admin, filter by createdBy (only authenticated users have req.user)
        if (req.user && req.user.role !== "admin") {
            query.createdBy = req.user.id; 
        }

        // Add the filtering by 'approviness' here
        if (status) query.approviness = status;  // Filter for approved/unapproved items

        if (type) query.type = type; // Filter by type (lost/found)
        if (search) query.description = { $regex: search, $options: "i" }; // Search by description

        const sortOptions = {};
        if (sort === "newest") sortOptions.createdAt = -1;
        if (sort === "oldest") sortOptions.createdAt = 1;

        // Fetch the items from the database based on the query
        const items = await Item.find(query).sort(sortOptions).populate("createdBy", "name email");
        res.status(200).json(items); // Send the items back
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching items" });
    }
};




// Get a single item by ID
const getItemById = async (req, res) => {
    try {
        const { itemId } = req.params;

        const item = await Item.findById(itemId).populate("createdBy", "name email");
        if (!item) {
        return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching item" });
    }
};

// Update an existing item post
const updateItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const updates = req.body;

        // Find and update the item
        const item = await Item.findById(itemId);
        if (!item) {
        return res.status(404).json({ message: "Item not found" });
        }

        // Ensure only the creator or an admin can update the item
        if (item.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to update this item" });
        }

        console.log(updates)
        Object.assign(item, updates); // Apply updates
        const updatedItem = await item.save();

        res.status(200).json({
        message: "Item updated successfully",
        item: updatedItem,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating item" });
    }
};

// Delete an item post
const deleteItem = async (req, res) => {
    try {
        const { itemId } = req.params;

        const item = await Item.findById(itemId);
        if (!item) {
        return res.status(404).json({ message: "Item not found" });
        }

        // Ensure only the creator or an admin can delete the item
        if (item.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to delete this item" });
        }

        await Item.findByIdAndDelete(itemId);

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting item" });
    }
};

// Mark an item as resolved
const resolveItem = async (req, res) => {
    try {
        const { itemId } = req.params;

        const item = await Item.findById(itemId);
        if (!item) {
        return res.status(404).json({ message: "Item not found" });
        }

        // Ensure only the creator or an admin can mark the item as resolved
        if (item.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to resolve this item" });
        }

        item.status = "resolved";
        const resolvedItem = await item.save();

        res.status(200).json({
        message: "Item marked as resolved",
        item: resolvedItem,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error resolving item" });
    }
};

const approveItem = async (req, res) => {
    try {
        const { itemId } = req.params; // Get the item ID from the request parameters

        // Find the item by its ID
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Ensure only an admin can approve an item
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to approve this item" });
        }

        // Check if the item is already approved
        if (item.approviness === "approved") {
            return res.status(400).json({ message: "This item is already approved" });
        }

        // Update the 'approviness' field to 'approved'
        item.approviness = "approved";
        const updatedItem = await item.save();

        res.status(200).json({
            message: "Item approved successfully",
            item: updatedItem,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error approving item" });
    }
};


module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    resolveItem,
    approveItem,
    getItemsGuest
};
