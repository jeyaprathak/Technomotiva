import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ onSearch }) {
  const { count, loadCart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadCart();
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Only search on products page
    if (location.pathname === "/products" && onSearch) {
      onSearch(query);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to products page if not already there
    if (location.pathname !== "/products") {
      navigate("/products");
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/products" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              ShopJ
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-2.5 pl-12 pr-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 flex-shrink-0">
            {/* <Link
              to="/profile"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive("/profile")
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">Profile</span>
            </Link> */}

            <Link
              to="/orders"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive("/orders")
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="font-medium">Orders</span>
            </Link>

            <Link
              to="/cart"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors relative ${
                isActive("/cart")
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {count}
                  </span>
                )}
              </div>
              <span className="font-medium">Cart</span>
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}