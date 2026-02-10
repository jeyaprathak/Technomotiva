const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  updateCart,
  removeItem,
} = require("../controllers/cartController");

router.get("/", auth, getCart);
router.post("/add", auth, addToCart);
router.put("/update", auth, updateCart);
router.delete("/remove/:id", auth, removeItem);

module.exports = router;
