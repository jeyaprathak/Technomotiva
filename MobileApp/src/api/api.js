import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: "http://10.14.195.115:5000/api",
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


// LOGIN
export const loginAdmin = (data) =>
  API.post("/auth/login", data);

// PRODUCTS
export const getProducts = () => API.get("/products");

// CART (MATCH BACKEND)
export const addToCartApi = (data) => API.post("/cart/add", data);
export const getCartApi = () => API.get("/cart");
export const updateCartApi = (data) => API.put("/cart/update", data);
export const removeCartApi = (id) => API.delete(`/cart/remove/${id}`);



// ORDERS (MATCH BACKEND)
export const createOrder = () => API.post("/orders");
export const getMyOrders = () => API.get("/orders/my");


export default API;
