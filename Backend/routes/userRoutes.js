const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// SAVE EXPO PUSH TOKEN
router.post("/push-token", authMiddleware, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    expoPushToken: req.body.expoPushToken,
  });
  res.json({ success: true });
});


module.exports = router;
