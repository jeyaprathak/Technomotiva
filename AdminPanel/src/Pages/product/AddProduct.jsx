import { useState } from "react";
import { createProduct } from "../../API/service";
import Navbar from "../../components/Navbar";

export default function AddProduct() {
  const [product, setProduct] = useState({});

  const submit = async () => {
    await createProduct(product);
    alert("Product added");
    setProduct({});
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen px-4 py-6 flex justify-center">
        <div className="bg-white w-full max-w-xl border rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">Add Product</h2>

          <div className="space-y-4">
            {["name", "price", "image", "category"].map((field) => (
              <input
                key={field}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                placeholder={field.toUpperCase()}
                value={product[field] || ""}
                onChange={(e) =>
                  setProduct({ ...product, [field]: e.target.value })
                }
              />
            ))}

            <button
              onClick={submit}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Save Product
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
