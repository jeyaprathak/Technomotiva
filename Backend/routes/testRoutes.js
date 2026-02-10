const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { sendPushNotification } = require("../services/push.service");

router.get("/push", async (req, res) => {
  const user = await User.findOne({ expoPushToken: { $ne: null } });

  if (!user) {
    return res.json({ message: "❌ No user with push token" });
  }

  await sendPushNotification(
    user.expoPushToken,
    "🔥 Test Notification",
    "If you see this, push is working!",
    { type: "TEST" }
  );

  res.json({ success: true, token: user.expoPushToken });
});

module.exports = router;
