// 404 Not Found Middleware
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};

// Custom error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(`[Error]: ${err.message}`); // Log the error for debugging

  // Set default status code and message
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || "Internal Server Error";

  // Return a JSON response with error details
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // Hide stack trace in production
  });
};

module.exports = { notFound, errorHandler };
