const express = require("express");
const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/OrderController");

const { protect } = require("../middleware/AuthMiddleware");
const isAdmin = require("../middleware/isAdmin");

// USER ROUTES
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getUserOrders);

// ADMIN ROUTES
router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id", protect, isAdmin, updateOrderStatus);

module.exports = router;
