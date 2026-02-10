// routes/testRoutes.js
const express = require("express");
const router = express.Router();
const { sendPushNotification } = require("../services/push.service");
const User = require("../models/User");

router.get("/push", async (req, res) => {
  const user = await User.findOne({ expoPushToken: { $ne: null } });

  if (!user) {
    return res.json({ message: "No token found" });
  }

  await sendPushNotification(
    user.expoPushToken,
    "🔥 Test Push",
    "If you see this, push works!",
    {}
  );

  res.json({ success: true });
});

module.exports = router;
