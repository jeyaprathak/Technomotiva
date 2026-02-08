import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../API/service";
import Navbar from "../components/Navbar";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const res = await getOrders();
    setOrders(res.data || []);
  };

  const changeStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, status } : o
      )
    );
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">Orders</h2>

        <div className="space-y-4">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white border rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <p className="font-semibold">
                  Order #{o._id.slice(-6)}
                </p>
                <p className="text-gray-500">
                  Total: ₹{o.totalAmount}
                </p>
              </div>

              <select
                value={o.status}
                onChange={(e) =>
                  changeStatus(o._id, e.target.value)
                }
                className="border rounded-lg px-3 py-2 w-full sm:w-40"
              >
                <option value="Placed">Placed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}

          {orders.length === 0 && (
            <p className="text-gray-500 text-center">
              No orders found
            </p>
          )}
        </div>
      </main>
    </>
  );
}
