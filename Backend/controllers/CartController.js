const Cart = require("../models/Cart");

// GET CART
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    "items.product"
  );
  res.json(cart || { items: [] });
};

// ADD TO CART
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (item) item.quantity += quantity;
    else cart.items.push({ product: productId, quantity });

    await cart.save();
  }

  res.json(cart);
};

// UPDATE QUANTITY
exports.updateCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });
  const item = cart.items.find(
    (i) => i.product.toString() === productId
  );

  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity = quantity;
  await cart.save();

  res.json(cart);
};

// REMOVE ITEM
exports.removeItem = async (req, res) => {
  const { id } = req.params;

  const cart = await Cart.findOne({ user: req.user.id });
  cart.items = cart.items.filter(
    (i) => i.product.toString() !== id
  );

  await cart.save();
  res.json(cart);
};
