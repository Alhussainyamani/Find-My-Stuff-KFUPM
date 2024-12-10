const mongoose = require("mongoose");

// Schema for notifications associated with reports
const notificationSchema = new mongoose.Schema({
  // Date of the notification
  date: {
    type: Date,
    default: Date.now, // Automatically set the current date if not provided
    required: true,
  },

  // Description of the notification
  description: {
    type: String,
    trim: true, // Remove unnecessary whitespace
    maxlength: 1000, // Limit description length to 1000 characters for consistency
    required: true,
  },

  // Report number associated with the notification
  reportNumber: {
    type: Number,
    min: 1, // Ensure the report number is a positive integer
    required: true,
  },
});

module.exports = mongoose.model("Notification", notificationSchema); // Export the model
