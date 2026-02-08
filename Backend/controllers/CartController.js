const Cart = require("../models/Cart");

// ADD TO CART
exports.addToCart = async (req, res) => {
  const { product, quantity } = req.body;

  const item = await Cart.findOne({
    user: req.user.id,
    product,
  });

  if (item) {
    item.quantity += quantity || 1;
    await item.save();
    return res.json(item);
  }

  const cartItem = await Cart.create({
    user: req.user.id,
    product,
    quantity: quantity || 1,
  });

  res.status(201).json(cartItem);
};

// GET CART
exports.getCartItems = async (req, res) => {
  const items = await Cart.find({ user: req.user.id }).populate("product");
  res.json(items);
};

// UPDATE QUANTITY
exports.updateCartItem = async (req, res) => {
  const item = await Cart.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(item);
};

// REMOVE ITEM
exports.removeCartItem = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed from cart" });
};
