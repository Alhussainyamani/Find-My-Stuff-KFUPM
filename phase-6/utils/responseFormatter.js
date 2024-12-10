// Formats a consistent response object for API endpoints.
const formatResponse = (success, message, data = null) => {
  // Check if 'success' is a boolean. If not, throw an error.
  if (typeof success !== "boolean") {
    throw new Error("Invalid value for 'success'. It must be a boolean.");
  }

  // Check if 'message' is a string. If not, throw an error.
  if (typeof message !== "string") {
    throw new Error("Invalid value for 'message'. It must be a string.");
  }

  // Return the formatted response object.
  return {
    success, // Indicates whether the operation was successful.
    message: message.trim(), // Removes unnecessary whitespace from the message.
    data: data ?? null, // Ensures 'data' is explicitly null if it's undefined.
  };
};

module.exports = formatResponse; // Export the function for use in other modules.
