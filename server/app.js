require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const cookieParser = require("cookie-parser");

const Products = require("./models/productsSchema");
const DefaultData = require("./defaultdata");
const cors = require("cors");
const router = require("./routes/router");

const port = 8005;

// CORS configuration
const corsOptions = {
  origin: "https://cloudamazon.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(express.json());
app.use(cookieParser(""));
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight requests

// Routes
app.use(router);

// Test route
app.get("*", (req, res) => {
  res.status(200).json({
    message: "Connected to vercel app",
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Initialize default data
DefaultData();
