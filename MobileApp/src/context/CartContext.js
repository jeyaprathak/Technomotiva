import { createContext, useState } from "react";
import {
  addToCartApi,
  getCartApi,
  updateCartApi,
  removeCartApi,
} from "../api/api";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const res = await getCartApi();
    setCart(res.data?.items || []);
  };

  const addToCart = async (productId) => {
    await addToCartApi({ productId, quantity: 1 });
    loadCart();
  };

  const increase = async (productId, qty) => {
    await updateCartApi({ productId, quantity: qty + 1 });
    loadCart();
  };

  const decrease = async (productId, qty) => {
    if (qty <= 1) await removeCartApi(productId);
    else await updateCartApi({ productId, quantity: qty - 1 });
    loadCart();
  };

  const removeItem = async (productId) => {
    await removeCartApi(productId);
    loadCart();
  };

  const total = cart.reduce(
    (sum, i) => sum + i.quantity * i.product.price,
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
