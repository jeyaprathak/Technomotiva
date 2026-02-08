import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../API/service";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";


export default function Products() {
  const [products, setProducts] = useState([]);

  const load = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">Products</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white border rounded-xl shadow-sm overflow-hidden"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-gray-600 mb-3">₹{p.price}</p>

                <div className="flex gap-2">
                  <Link
                    to={`/edit-product/${p._id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(p._id).then(load)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
