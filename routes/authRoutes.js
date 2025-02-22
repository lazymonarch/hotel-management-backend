const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose"); // Import mongoose
const User = require("../models/User"); // Assuming you create a User model

// Registration Route
router.post("/register", async (req, res) => {
  console.log("Backend Acessed");
  const { username, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // For security, you might want to restrict admin registration
    if (role === 'admin') {
      // Optional: Add an admin secret key check
      const adminSecret = req.headers['admin-secret'];
      if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ message: "Unauthorized admin registration" });
      }
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10); // 10 is the salt rounds

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || "customer", //Default role is customer
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

module.exports = router;