// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'participant', 'guest'], default: 'guest' },
  points: { type: Number, default: 0 },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

// Define the User model
const User = mongoose.model('User', userSchema);

// Export the model for use in other files
module.exports = User;