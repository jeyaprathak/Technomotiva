const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/orderController");

// USER
router.post("/", auth, createOrder);
router.get("/my", auth, getMyOrders);

// ADMIN
router.get("/", auth, getAllOrders); 
router.put("/:id/status", auth, updateOrderStatus);

module.exports = router;
