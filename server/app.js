const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cookieParser = require("cookie-parser");

const products = require("./models/productsSchema");
const DefaultData = require("./defaultdata");
const cors = require("cors");
const router = require("./routes/router");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://cloudamazon.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(router);

const port = 8005;

app.get("*", (req, res, next) => {
  res.status(200).json({
    message: "Connected to vercel app",
  });
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

DefaultData();
