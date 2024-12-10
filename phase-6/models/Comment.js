const mongoose = require("mongoose");

// Define the schema for comments
const commentSchema = new mongoose.Schema({
  // Text of the comment
  text: {
    type: String,
    required: [true, "Comment text is required"], // Custom error message
    trim: true, // Removes unnecessary whitespace
    maxlength: 3000, // Limit the length of the comment to 500 characters
  },

  // Reference to the user who created the comment
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "CreatedBy is required"], // Ensures a user is associated with the comment
  },

  // Reference to the item the comment is associated with
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: [true, "ItemId is required"], // Ensures a comment is linked to an item
  },

  // Timestamp for when the comment was created
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation time
    immutable: true, // Prevents modification of the creation date
  },
});

module.exports = mongoose.model("Comment", commentSchema);
