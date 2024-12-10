const multer = require("multer");
const path = require("path");

// Set up storage configuration for multer
const storage = multer.diskStorage({
  // Define the destination folder for uploaded files
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the "uploads" folder
  },
  // Define the file naming convention for uploaded files
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Prepend timestamp to the original file name
  },
});

// File filter to validate the type of uploaded files
const fileFilter = (req, file, cb) => {
  // Allowed MIME types for image uploads
  const allowedTypes = ["image/jpeg", "image/png"];

  // Reject files with invalid MIME types
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPEG and PNG images are allowed"), false);
  }

  // Accept the file
  cb(null, true);
};

// Initialize multer with the defined storage and file filter
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024, // file size limit to 15 MB
  },
});

module.exports = upload; // Export the configured multer instance
