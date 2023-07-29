const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET = "Priyanshuisgood$oy";

const { body, validationResult } = require("express-validator");

//! ROUTE 1:Create a user using: POST "/api/auth/crateuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter A Valid Name").isLength({ min: 3 }),
    body("email", "Enter A Valid Email").isEmail(),
    body("password", "Password Must Be At least 5 Char.").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success= false;
    //If there are errors, return Bad request errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errors = validationResult(req);
      return res.status(400).json({ success, errors: errors.array() });
    }
    // Check weather the user with this email exists already.
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry user with this email alreday exists." });
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //Create New User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
      res.json({ success, authtoken: authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//!ROUTE 2:Authenticate a user using: POST"/api/auth/login". No Login Required

router.post(
  "/login",
  [
    body("email", "Enter A Valid Email").isEmail(),
    body("password", "Password Cannot Be Blank").exists(),
  ],
  async (req, res) => {
    let success= false;
    //If there are errors, return Bad request errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errors = validationResult(req);
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        const success= false;

        return res
          .status(400)
          .json({success,  error: "Please try to login with correct credentials" });
      }
      const comparepassword = await bcrypt.compare(password, user.password);
      if (!comparepassword) {
         success= false;
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
       success= true;

      res.json({ success, authtoken: authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
//!ROUTE 3:Get Logedin User Details using: POST"/api/auth/getuser". Login Required
router.post(
  "/getuser",
  fetchuser, 
  async (req, res) => {
    //If there are errors, return Bad request errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errors = validationResult(req);
      return res.status(400).json({ errors: errors.array() });
    }
  
try{
  const userId=req.user.id;
  const user= await User.findById(userId).select("-password")
res.send(user);

}catch (error) {
  console.log(error.message);
  res.status(500).send("Internal Server Error");
}
}
)

module.exports = router;
