const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register a new user
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: role || "participant", // Default role is participant
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user" });
    }
};

// Log in an existing user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1d", // Token expires in 1 day
        });

        res.status(200).json({
        message: "Logged in successfully",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in user" });
    }
};

// Get the current logged-in user (Profile)
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password from the response
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user profile" });
    }
};

// Middleware: Verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user info to the request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
    };

    // Middleware: Restrict to Admins
    const restrictToAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
    };

    // Logout (Client-side handles token removal, no need for server action)
    const logout = (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
    register,
    login,
    getProfile,
    verifyToken,
    restrictToAdmin,
    logout,
};
