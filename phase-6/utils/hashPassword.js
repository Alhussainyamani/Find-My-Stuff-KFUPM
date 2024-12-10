const bcrypt = require("bcrypt");

// Hashes a plain text password using bcrypt
const hashPassword = async (password) => {
  // Ensure the password is a valid non-empty string
  if (typeof password !== "string" || password.trim() === "") {
    throw new Error("Invalid password. It must be a non-empty string.");
  }

  // Generate a salt for hashing
  const salt = await bcrypt.genSalt(10);

  // Hash the password with the generated salt
  return bcrypt.hash(password, salt);
};

// Compares a plain text password with a hashed password
const comparePassword = async (password, hashedPassword) => {
  // Ensure the password and hashed password are valid strings
  if (typeof password !== "string" || password.trim() === "") {
    throw new Error("Invalid password. It must be a non-empty string.");
  }
  if (typeof hashedPassword !== "string" || hashedPassword.trim() === "") {
    throw new Error("Invalid hashed password. It must be a non-empty string.");
  }

  // Compare the plain text password with the hashed password
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword }; // Export the functions for reuse
