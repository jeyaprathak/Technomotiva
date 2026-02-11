const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");
const { sendPushNotification } = require("../services/push.service");


/**
 * CREATE ORDER
 */
const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const items = cart.items.map((i) => ({
      product: i.product._id,
      quantity: i.quantity,
      price: i.product.price,
    }));

    const totalAmount = items.reduce(
      (sum, i) => sum + i.quantity * i.price,
      0
    );

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      status: "Placed",
    });

    // CLEAR CART
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    res.status(500).json({ message: "Order creation failed" });
  }
};
 
// All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("GET ALL ORDERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
/**
 * GET MY ORDERS (USER)
 */
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("GET MY ORDERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/**
 * UPDATE ORDER STATUS (ADMIN)
 */
const updateOrderStatus = async (req, res) => {
  try {
    console.log("📥 STATUS UPDATE API HIT");
    console.log("📦 Order ID:", req.params.id);
    console.log("📝 New Status:", req.body.status);

    const { status } = req.body;

    const order = await Order.findById(req.params.id).populate("user");

    if (!order) {
      console.log("❌ Order not found");
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    console.log("✅ Order updated in DB");

    // 🔔 SEND PUSH
    if (order.user?.expoPushToken) {
      console.log("📱 Sending push to:", order.user.expoPushToken);

      const pushResponse = await sendPushNotification(
        order.user.expoPushToken,
        "📦 Order Update",
        `Your order is now ${status}`,
        {
          type: "ORDER_STATUS",
          orderId: order._id.toString(),
          status,
        }
      );

      console.log("📤 Push response:", pushResponse);
    } else {
      console.log("⚠ No expoPushToken found for user");
    }

    res.json({ success: true, order });
  } catch (err) {
    console.error("❌ STATUS UPDATE ERROR:", err);
    res.status(500).json({ message: "Status update failed" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
};
