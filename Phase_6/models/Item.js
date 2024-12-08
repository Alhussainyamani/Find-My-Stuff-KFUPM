const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    type: { type: String, enum: ["lost", "found"], required: true }, //whether lost or found
    description: String, // description of the lost/found item
    location: String, // the location of a found/lost item
    imageUrl: String,  // image of the item in url format
    status: { type: String, enum: ["active", "resolved"], default: "active" }, // has the item been resolved? in other words: found.
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // who found a lost item, or who reported a lost/found item
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Comment references (a functionality where the user adds comments to the report entity for further info.
    createdAt: { type: Date, default: Date.now }, // the time when the report was created.
});

module.exports = mongoose.model("Item", itemSchema);
