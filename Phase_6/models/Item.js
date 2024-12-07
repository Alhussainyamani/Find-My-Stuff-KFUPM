const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    type: { type: String, enum: ["lost", "found"], required: true },
    description: String,
    location: String,
    imageUrl: String,
    status: { type: String, enum: ["active", "resolved"], default: "active" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Comment references
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Item", itemSchema);
