import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// AUTH
export const loginAdmin = (data) => API.post("/auth/login", data);

// PRODUCTS
export const getProducts = () => API.get("/products");
export const createProduct = (data) => API.post("/products", data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const getProductById = (id) =>API.get(`/products/${id}`);
export const updateProduct = (id, data) =>API.put(`/products/${id}`, data);


// ORDERS
export const getOrders = () => API.get("/orders");
export const updateOrderStatus = (id, status) =>
  API.put(`/orders/${id}`, { status });


export default API;
