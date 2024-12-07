const Item = require("../models/Item");
const Comment = require("../models/Comment");
const AdminLog = require("../models/AdminLog"); // Optional: For tracking admin actions

// Approve a found item post
const approveItem = async (req, res) => {
    try {
    const { itemId } = req.params;

    const item = await Item.findById(itemId);
    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    // Update item's approval status
    item.status = "approved";
    await item.save();

    res.status(200).json({ message: "Item approved successfully", item });
    } 
    catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error approving item" });
    }
};

// Reject a found item post
const rejectItem = async (req, res) => {
    try {
    const { itemId } = req.params;
    const { rejectionReason } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    // Remove the item or mark as rejected
    await Item.findByIdAndDelete(itemId);

    res.status(200).json({
        message: "Item rejected and removed",
        rejectionReason,
    });
    } 
    catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error rejecting item" });
    }
};

// Edit a post (admin-level access)
const editPost = async (req, res) => {
    try {
    const { itemId } = req.params;
    const updates = req.body;

    const item = await Item.findByIdAndUpdate(itemId, updates, {
        new: true,
        runValidators: true,
    });

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item updated successfully", item });
    } 
    catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error editing post" });
    }
};

// Delete a post
const deletePost = async (req, res) => {
    try {
    const { itemId } = req.params;

    const item = await Item.findByIdAndDelete(itemId);
    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
    } 
    catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting post" });
    }
};

// Moderate a comment (delete inappropriate comments)
const deleteComment = async (req, res) => {
    try {
    const { commentId } = req.params;

    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
    } 
    catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting comment" });
    }
};

// Generate a dashboard report
const generateReport = async (req, res) => {
    try {
    const lostItemsCount = await Item.countDocuments({ type: "lost" });
    const foundItemsCount = await Item.countDocuments({ type: "found" });
    const resolvedItemsCount = await Item.countDocuments({ status: "resolved" });

    res.status(200).json({
        lostItemsCount,
        foundItemsCount,
        resolvedItemsCount,
    });
    } 
    catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating report" });
    }
};

// Track admin actions (optional logging)
const logAdminAction = async (actionType, details) => {
    try {
    const log = new AdminLog({
        actionType,
        details,
      performedBy: req.user.id, // Assuming admin's ID is available in `req.user`
    });
    await log.save();
    } 
    catch (error) {
    console.error("Error logging admin action:", error);
    }
};

// Export the functions
module.exports = {
    approveItem,
    rejectItem,
    editPost,
    deletePost,
    deleteComment,
    generateReport,
    logAdminAction,
};
