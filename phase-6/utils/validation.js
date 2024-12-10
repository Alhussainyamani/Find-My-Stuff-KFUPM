const validateEmail = (email) => {
  if (!email || typeof email !== "string") {
    return false; // Safeguard for invalid input types
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateRequiredFields = (fields, data) => {
  if (!data || typeof data !== "object") {
    return { valid: false, message: "Invalid data object provided" }; // Handle non-object data gracefully
  }

  const missing = fields.filter(
    (field) =>
      !(field in data) || data[field] === null || data[field] === undefined
  );
  if (missing.length > 0) {
    return {
      valid: false,
      message: `Missing required fields: ${missing.join(", ")}`,
    };
  }

  return { valid: true };
};

module.exports = { validateEmail, validateRequiredFields };
