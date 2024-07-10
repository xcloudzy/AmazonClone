const express = require("express");
const router = new express.Router();
const products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");

// get productsdata api
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await products.find();
    res.status(201).json(productsdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

//get individual data
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const individualdata = await products.findOne({ id: id });
    res.status(201).json(individualdata);
  } catch (error) {
    res.status(400).json(individualdata);
    console.log("error" + error.message);
  }
});

// register data

router.post("/register", async (req, res) => {
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "fill all the data" });
    console.log("No data available");
  }

  try {
    const preuser = await USER.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: "This user is already present" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "Password and cpassword doesn't match" });
    } else {
      const finalUser = new USER({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      // password hashing process

      const storedata = await finalUser.save();
      console.log(storedata);
      res.status(201).json(storedata);
    }
  } catch (error) {
    console.log(error);
  }
});

// Login user api
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "fill all the data" });
  }

  try {
    const userlogin = await USER.findOne({ email: email });
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);

      // token generate
      const token = await userlogin.generateAuthToken();
      console.log(token);

      if (!isMatch) {
        res.status(400).json({ error: "invalid password" });
      } else {
        res.status(201).json(userlogin);
      }
    } else {
      res.status(400).json({ error: "invalid details" });
    }
  } catch (error) {
    res.status(400).json({ error: "invalid details" });
  }
});

module.exports = router;
