const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const { authenticate, authorizeAdmin } = require("../../middleware/authMiddleware");

// Get all users (Admin only)
router.get("/", authenticate, authorizeAdmin, async (req, res) => {
    try {
        // Exclude admin users from the list and don't send password
        const users = await User.find({ role: "customer" }).select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete user (Admin only)
router.delete("/:id", authenticate, authorizeAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        // Prevent deletion of admin users
        if (user.role === "admin") {
            return res.status(403).json({ message: "Cannot delete admin users" });
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 