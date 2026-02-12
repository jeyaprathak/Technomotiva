const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// SAVE EXPO PUSH TOKEN
router.post("/push-token", authMiddleware, async (req, res) => {
  try {
    const { expoPushToken } = req.body;

    if (!expoPushToken) {
      return res.status(400).json({ message: "Expo token required" });
    }

    // 1️⃣ Remove this token from any other user
    await User.updateMany(
      { expoPushToken: expoPushToken },
      { $unset: { expoPushToken: "" } }
    );

    // 2️⃣ Assign token to current logged-in user
    await User.findByIdAndUpdate(req.user.id, {
      expoPushToken: expoPushToken,
    });

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save push token" });
  }
});

module.exports = router;
