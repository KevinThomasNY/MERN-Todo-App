const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = new User({
      email,
      password,
    });
    newUser.save().then((user) => {
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.json({ token });
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = jwt.sign({ user }, process.env.JWT_SECRET);
        res.json({ token });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    });
  });
});

module.exports = router;
