import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  if (!req.url.includes("/auth/login")) {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});


export const loginAdmin = (data) =>
  API.post("/auth/login", data);

// PRODUCTS
export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data);
export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);


// ORDERS (FIXED)
export const getOrders = () => API.get("/orders"); // admin
export const updateOrderStatus = (orderId, status) =>
  API.put(`/orders/${orderId}/status`, { status });


export default API;
