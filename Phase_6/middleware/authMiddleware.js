const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware: Verify JWT token
const verifyToken = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.replace("Bearer ", "");

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user details to the request
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
    };

    // Middleware: Restrict to Admins
    const restrictToAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
};

// Middleware: Restrict to Specific Roles
const restrictToRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: `Access denied: ${roles.join(", ")} only` });
        }
        next();
    };
};

module.exports = {
    verifyToken,
    restrictToAdmin,
    restrictToRoles,
};
