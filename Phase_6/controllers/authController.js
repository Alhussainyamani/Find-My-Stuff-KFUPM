const expressRateLimit = require("express-rate-limit");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const failedLogins = {}; // Temporary in-memory store for failed login attempts

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password with stronger salt rounds
    const salt = await bcrypt.genSalt(12);
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

// Rate limiting for login route
const loginRateLimiter = expressRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per window
  message: "Too many login attempts. Please try again later.",
});

// Log in an existing user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Implement account lockout mechanism
    if (failedLogins[email] && failedLogins[email].locked) {
      const remainingLockTime =
        (failedLogins[email].unlockAt - Date.now()) / 1000;
      return res.status(403).json({
        message: `Account locked. Try again in ${Math.ceil(
          remainingLockTime
        )} seconds.`,
      });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Track failed login attempts
      if (!failedLogins[email]) {
        failedLogins[email] = { attempts: 1, locked: false };
      } else {
        failedLogins[email].attempts += 1;
        if (failedLogins[email].attempts >= 3) {
          failedLogins[email].locked = true;
          failedLogins[email].unlockAt = Date.now() + 15 * 60 * 1000; // Lock account for 15 minutes
        }
      }
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Reset failed login attempts on success
    delete failedLogins[email];

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d", // Token expires in 1 day
      }
    );

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
  loginRateLimiter,
  getProfile: verifyToken,
  restrictToAdmin,
  logout,
};
