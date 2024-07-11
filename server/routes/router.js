const express = require("express");
const router = new express.Router();
const products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

// get productsdata api
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await products.find();
    res.status(201).json(productsdata);
  } catch (error) {
    console.log(error);
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
  // console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "fill the details" });
  }

  try {
    const userlogin = await USER.findOne({ email: email });

    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "invalid crediential pass" });
      } else {
        const token = await userlogin.generateAuthToken();

        res.cookie("Amazonweb", token, {
          expires: new Date(Date.now() + 2589000),
          httpOnly: true,
        });
        res.status(201).json(userlogin);
      }
    } else {
      res.status(400).json({ error: "user not exist" });
    }
  } catch (error) {
    res.status(400).json({ error: "invalid crediential pass" });
  }
});

//get individual data
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const individualdata = await products.findOne({ id: id });
    res.status(201).json(individualdata);
  } catch (error) {
    res.status(400).json(error);
  }
});

// adding the data into cart
router.post("/addcart/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await products.findOne({ id: id });
    console.log(cart + "cart value");

    const UserContact = await USER.findOne({ _id: req.userID });
    console.log(UserContact);

    if (UserContact) {
      const cartData = await UserContact.addcartdata(cart);
      await UserContact.save();
      console.log(cartData);
      res.status(200).json(UserContact);
    }
  } catch (error) {
    console.log(error);
  }
});

// get cart details
router.get("/cartdetails", authenticate, async (req, res) => {
  try {
    const buyuser = await USER.findOne({ _id: req.userID });
    res.status(201).json(buyuser);
  } catch (error) {
    console.log(error);
  }
});

// get valid user

router.get("/validuser", authenticate, async (req, res) => {
  try {
    const validuserone = await USER.findOne({ _id: req.userID });
    res.status(201).json(validuserone);
  } catch (error) {
    console.log(error);
  }
});

// remove router from cart
router.delete("/remove:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    req.rootUser.carts = req.rootUser.carts.filter((cruval) => {
      return cruval.id != id;
    });

    req.rootUser.save();
    res.status(201).json(req.rootUser);
    console.log("item removed");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
