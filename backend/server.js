const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// Middleware
// If FRONTEND_URL is set (e.g. your Netlify site), only allow that origin.
// Otherwise allow all origins (fine for local dev).
const allowedOrigin = process.env.FRONTEND_URL;
app.use(
  cors(
    allowedOrigin
      ? { origin: allowedOrigin }
      : {}
  )
);
app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);

// Simple health check route
app.get("/", (req, res) => {
  res.send("Employee Registration System API is running...");
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/employeeDB";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
