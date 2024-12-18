const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
        expiresIn: "1d", // Token expires in 1 day
    });
};

module.exports = generateToken;
