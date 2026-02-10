import { useEffect, useState } from "react";
import { getMyOrders } from "../api/api";
import OrderStatusBar from "../components/OrderStatusBar";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMyOrders()
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="flex justify-between mb-4">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-20 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Orders List */}
        {!loading && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Order Placed</p>
                        <p className="font-semibold text-gray-800">
                          {new Date(order.createdAt || Date.now()).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="h-8 w-px bg-gray-300"></div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Total</p>
                        <p className="font-bold text-gray-800">₹{order.totalAmount}</p>
                      </div>
                      <div className="h-8 w-px bg-gray-300"></div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Order ID</p>
                        <p className="font-semibold text-gray-800">#{order._id.slice(-8)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                  {/* Products in Order */}
                  {order.items && order.items.length > 0 && (
                    <div className="space-y-4 mb-6">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <img
                            src={item.product?.image || '/placeholder.png'}
                            alt={item.product?.name || 'Product'}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 mb-1">
                              {item.product?.name || 'Product Name'}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">Qty: {item.quantity}</p>
                            <p className="font-bold text-gray-900">₹{item.product?.price || 0}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Status Bar */}
                  <OrderStatusBar status={order.status || "Placed"} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-48 h-48 mx-auto mb-6 opacity-50">
              <svg viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5" />
                <rect x="70" y="70" width="60" height="60" stroke="#E5E7EB" strokeWidth="3" rx="4" />
                <path d="M85 95h30M85 105h20" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't made any orders yet</p>
            <button
              onClick={() => window.location.href = '/products'}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}