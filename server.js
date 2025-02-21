require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routes
const adminRoomRoutes = require("./routes/admin/adminRoomRoutes");
const customerRoomRoutes = require("./routes/customer/customerRoomRoutes");
const adminFoodMenuRoutes = require("./routes/admin/adminFoodMenuRoutes");
const customerFoodMenuRoutes = require("./routes/customer/customerFoodMenuRoutes");
const adminOrderRoutes = require("./routes/admin/adminOrderRoutes");
const customerOrderRoutes = require("./routes/customer/customerOrderRoutes");
const adminBookingRoutes = require("./routes/admin/adminBookingRoutes");
const authRoutes = require("./routes/authRoutes");
const adminUserRoutes = require("./routes/admin/adminUserRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, { dbName: "hotel_management" })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("🏨 Hotel Management System API is running...");
});

// Use Routes
app.use("/api/admin/rooms", adminRoomRoutes);
app.use("/api/customer/rooms", customerRoomRoutes);
app.use("/api/admin/food", adminFoodMenuRoutes);
app.use("/api/customer/food", customerFoodMenuRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/customer/orders", customerOrderRoutes);
app.use("/api/admin/bookings", adminBookingRoutes); //Admin Route to view booking history
app.use("/api/auth", authRoutes);
app.use("/api/admin/users", adminUserRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});