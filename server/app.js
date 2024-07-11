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

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);

const port = 8005;

// CORS configuration
const corsOptions = {
  origin: "https://cloudamazon.vercel.app", // Specific origin
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Handle preflight requests
app.options("*", cors(corsOptions));

app.get("*", (req, res, next) => {
  res.status(200).json({
    message: "Connected to vercel app",
  });
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

DefaultData();
