const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const User = require("../models/User");
const { sendPushNotification } = require("../services/push.service");

router.put(
  "/orders/:orderId/status",
  authMiddleware,
  async (req, res) => {
    console.log("📥 ADMIN STATUS UPDATE HIT");

    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    const user = await User.findById(order.user);
    console.log("📱 USER PUSH TOKEN:", user?.expoPushToken);

    if (user?.expoPushToken) {
      await sendPushNotification(
        user.expoPushToken,
        "📦 Order Update",
        `Your order is now ${status}`,
        {
          type: "ORDER_STATUS",
          orderId: order._id.toString(),
          status,
        }
      );
    }

    res.json({ success: true, order });
  }
);

module.exports = router;
