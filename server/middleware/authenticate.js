const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretKey = process.env.KEY;

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.eccomerce;
    if (!token) {
      throw new Error("No token provided");
    }

    const verifyToken = jwt.verify(token, secretKey);

    const rootUser = await USER.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send({ error: "Unauthorized no token provided" });
    console.log(error.message);
  }
};

module.exports = authenticate;
