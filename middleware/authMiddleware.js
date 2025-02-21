const jwt = require("jsonwebtoken");

// Authentication Middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required: Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user information to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Authorization Middleware (for admin roles)
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // Allow access
  } else {
    return res.status(403).json({ message: "Unauthorized: Admin access required" });
  }
};

//Authorization middleware (for customer)
const authorizeCustomer = (req, res, next) => {
    if (req.user && req.user.role === "customer") {
      next(); // Allow access
    } else {
      return res.status(403).json({ message: "Unauthorized: customer access required" });
    }
  };
module.exports = { authenticate, authorizeAdmin, authorizeCustomer };