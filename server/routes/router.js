const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");

// get productsdata api
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    res.status(201).json(productsdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

module.exports = router;
