import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  if (!req.url.includes("/auth/login") && !req.url.includes("/auth/register")) {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// AUTH
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getProfile = () => API.get("/auth/me");

// PRODUCTS
export const getProducts = () => API.get("/products");

// CART
export const addToCartApi = (data) => API.post("/cart/add", data);
export const getCartApi = () => API.get("/cart");
export const updateCartApi = (data) => API.put("/cart/update", data);
export const removeCartApi = (id) => API.delete(`/cart/remove/${id}`);

// ORDERS
export const createOrder = () => API.post("/orders");
export const getMyOrders = () => API.get("/orders/my");

export default API;
