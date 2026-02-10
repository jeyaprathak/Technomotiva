import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, loadCart, increase, decrease, total } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const placeOrder = async () => {
    await createOrder();
    loadCart();
    navigate("/orders");
  };

  // Calculate savings
  const calculateSavings = () => {
    return cart.reduce((acc, item) => {
      const originalPrice = item.product.originalPrice || item.product.price;
      return acc + (originalPrice - item.product.price) * item.quantity;
    }, 0);
  };

  const savings = calculateSavings();
  const deliveryFee = total > 500 ? 0 : 40;
  const finalTotal = total + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-64 h-64 mx-auto mb-6 opacity-50">
            <svg viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="80" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M70 80h60M70 100h40M70 120h50" stroke="#E5E7EB" strokeWidth="3" strokeLinecap="round" />
              <circle cx="85" cy="150" r="8" fill="#E5E7EB" />
              <circle cx="135" cy="150" r="8" fill="#E5E7EB" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty!</h2>
          <p className="text-gray-600 mb-6">Add items to get started</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <p className="text-gray-600 mt-1">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product._id}
                className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
                          {item.product.name}
                        </h3>

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{item.product.price}
                          </span>
                          {item.product.originalPrice && (
                            <>
                              <span className="text-sm text-gray-400 line-through">
                                ₹{item.product.originalPrice}
                              </span>
                              <span className="text-sm text-green-600 font-semibold">
                                {Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)}% off
                              </span>
                            </>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                            <button
                              onClick={() => decrease(item.product._id, item.quantity)}
                              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors font-semibold text-gray-700"
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span className="px-6 py-2 font-bold text-gray-900 bg-white min-w-[60px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increase(item.product._id, item.quantity)}
                              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors font-semibold text-gray-700"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => decrease(item.product._id, 1)}
                            className="text-gray-600 hover:text-red-600 font-medium text-sm transition-colors flex items-center gap-1"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-4 border-b">
                Price Details
              </h2>

              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-gray-700">
                  <span>Price ({cart.length} items)</span>
                  <span className="font-semibold">₹{total + savings}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">− ₹{savings}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charges</span>
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-semibold">FREE</span>
                  ) : (
                    <span className="font-semibold">₹{deliveryFee}</span>
                  )}
                </div>

                {total < 500 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-xs text-orange-800">
                    Add items worth ₹{500 - total} more to get FREE delivery
                  </div>
                )}
              </div>

              <div className="flex justify-between text-lg font-bold text-gray-900 mb-6 pb-4 border-b">
                <span>Total Amount</span>
                <span className="text-2xl text-orange-600">₹{finalTotal}</span>
              </div>

              {savings > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-green-700 font-semibold text-sm">
                    You will save ₹{savings} on this order 🎉
                  </p>
                </div>
              )}

              <button
                onClick={placeOrder}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Place Order
              </button>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}