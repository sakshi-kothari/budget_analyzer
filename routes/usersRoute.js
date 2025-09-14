const express = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const router = express.Router();

router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json("Invalid credentials");

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });

    const safeUser = { _id: user._id, name: user.name, email: user.email };
    // Backward compatible: return the user fields at top-level so existing frontend works,
    // and also include token.
    res.json({ ...safeUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json("Error");
  }
});

router.post("/register", async function (req, res) {
  try {
    const { name, email, password } = req.body;
    const u = new User({ name, email, password });
    await u.save();
    res.send('User Registered Successfully');
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(409).json("Email already in use");
    }
    res.status(500).json("Error");
  }
});

module.exports = router;
