const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now, required: true }, // Date of the notification
    description: { type: String, required: true }, // Description of the notification
    reportNumber: { type: Number, required: true }, // Report number associated with the notification
});

module.exports = mongoose.model("Notification", notificationSchema);