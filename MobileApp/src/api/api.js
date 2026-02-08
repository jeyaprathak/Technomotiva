import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: "http://10.137.177.115:5000/api",
});


API.interceptors.request.use(async (req) => {
  if (!req.url.includes("/auth/login")) {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

// AUTH
export const loginAdmin = (data) => API.post("/auth/login", data);

// PRODUCTS
export const getProducts = () => API.get("/products");

// CART
export const addToCartApi = (data) => API.post("/cart", data);
export const getCartApi = () => API.get("/cart");
export const updateCartApi = (id, data) => API.put(`/cart/${id}`, data);
export const removeCartApi = (id) => API.delete(`/cart/${id}`);

// ORDERS
export const createOrder = () => API.post("/orders");
export const getMyOrders = () => API.get("/orders/my-orders");

export default API;
