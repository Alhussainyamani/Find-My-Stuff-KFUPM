const Comment = require("../models/Comment");
const Item = require("../models/Item");

// Add a new comment to a post
const addComment = async (req, res) => {
    try {
        const { itemId } = req.params; // Post ID from the route
        const { text } = req.body; // Comment content

        // Check if the post exists
        const item = await Item.findById(itemId);
        if (!item) {
        return res.status(404).json({ message: "Post not found" });
        }

        // Create a new comment
        const comment = new Comment({
        text,
        createdBy: req.user.id, // Assuming `req.user` is set by authentication middleware
        itemId,
        });

        // Save the comment to the database
        const savedComment = await comment.save();

        // Optionally, you can add the comment to the Item's comments array
        item.comments.push(savedComment._id);
        await item.save();

        res.status(201).json({
        message: "Comment added successfully",
        comment: savedComment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding comment" });
    }
};

// Get all comments for a specific post
const getComments = async (req, res) => {
    try {
        const { itemId } = req.params;

        // Check if the post exists
        const item = await Item.findById(itemId);
        if (!item) {
        return res.status(404).json({ message: "Post not found" });
        }

        // Retrieve all comments related to the post
        const comments = await Comment.find({ itemId }).populate("createdBy", "name email");

        res.status(200).json({ comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving comments" });
    }
};

// Edit a comment
const editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;

        // Find the comment and ensure the user is the owner
        const comment = await Comment.findById(commentId);
        if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: "You are not authorized to edit this comment" });
        }

        // Update the comment
        comment.text = text;
        const updatedComment = await comment.save();

        res.status(200).json({
        message: "Comment updated successfully",
        comment: updatedComment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating comment" });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        // Find the comment and ensure the user is the owner or admin
        const comment = await Comment.findById(commentId);
        if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to delete this comment" });
        }

        // Delete the comment
        await comment.remove();

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting comment" });
    }
};

module.exports = {
    addComment,
    getComments,
    editComment,
    deleteComment,
};
