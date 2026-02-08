import { createContext, useState } from "react";
import {
  addToCartApi,
  getCartApi,
  updateCartApi,
  removeCartApi,
} from "../api/api";


export const CartContext = createContext({
  cart: [],
  loadCart: async () => {},
  addToCart: async () => {},
  increase: async () => {},
  decrease: async () => {},
  removeItem: async () => {},
  total: 0,
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const res = await getCartApi();
      setCart(res.data || []);
    } catch (err) {
     
      setCart([]);
    }
  };

  const addToCart = async (productId) => {
    await addToCartApi({ product: productId });
    await loadCart();
  };

  const increase = async (cartId, qty) => {
    await updateCartApi(cartId, { quantity: qty + 1 });
    await loadCart();
  };

  const decrease = async (cartId, qty) => {
    if (qty <= 1) {
      await removeCartApi(cartId);
    } else {
      await updateCartApi(cartId, { quantity: qty - 1 });
    }
    await loadCart();
  };

  const removeItem = async (cartId) => {
    await removeCartApi(cartId);
    await loadCart();
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + (item.product?.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loadCart,
        addToCart,
        increase,
        decrease,
        removeItem,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
