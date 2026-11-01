
const express = require("express");
const cors = require("cors");

const schemeRoutes = require("./routes/schemeRoutes");
const matchRoutes = require("./routes/matchRoutes");

const app = express();

// Render provides PORT automatically.
// Locally, the backend will run on port 5000.
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check / Home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "YojanaSathi AI Backend is running 🚀",
    status: "OK"
  });
});

// Scheme API routes
app.use("/api/schemes", schemeRoutes);

// AI-style scheme matching API routes
app.use("/api/match", matchRoutes);

// Handle unknown API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`YojanaSathi AI Backend running on port ${PORT}`);
});
