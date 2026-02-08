import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../API/service";
import Navbar from "../../components/Navbar";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductById(id).then((res) => setProduct(res.data));
  }, [id]);

  const submit = async () => {
    await updateProduct(id, product);
    alert("Product updated");
    navigate("/products");
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen flex justify-center p-4">
        <div className="bg-white w-full max-w-xl border rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">Edit Product</h2>

          <div className="space-y-4">
            {["name", "price", "image", "category"].map((field) => (
              <input
                key={field}
                className="w-full border rounded-lg px-4 py-3"
                placeholder={field.toUpperCase()}
                value={product[field] || ""}
                onChange={(e) =>
                  setProduct({ ...product, [field]: e.target.value })
                }
              />
            ))}

            <button
              onClick={submit}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
            >
              Update Product
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
