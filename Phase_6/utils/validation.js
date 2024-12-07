const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
  
const validateRequiredFields = (fields, data) => {
    const missing = fields.filter((field) => !data[field]);
    if (missing.length > 0) {
        return { valid: false, message: `Missing required fields: ${missing.join(", ")}` };
    }
    return { valid: true };
};
  
module.exports = { validateEmail, validateRequiredFields };
  