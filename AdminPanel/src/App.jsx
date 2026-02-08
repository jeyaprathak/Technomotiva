import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/login";
import Products from "./Pages/product/products";
import AddProduct from "./Pages/product/AddProduct";
import Orders from "./Pages/Orders";
import ProtectedRoute from "./components/productedRoute";
import EditProduct from "./Pages/product/EditProduct";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/products" element={
          <ProtectedRoute><Products /></ProtectedRoute>
        } />

        <Route path="/add-product" element={
          <ProtectedRoute><AddProduct /></ProtectedRoute>
        } />
         
         <Route path="/edit-product/:id" element={
    <ProtectedRoute><EditProduct /></ProtectedRoute>
  }
/>

        <Route path="/orders" element={
          <ProtectedRoute><Orders /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
