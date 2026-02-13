import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ onSearch }) {
  const { count, loadCart } = useContext(CartContext);
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (onSearch) {
      onSearch(query);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };


  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-8">

          {/* Logo */}
          <Link to="/products" className="text-2xl font-bold text-orange-600">
            ShopJ
          </Link>

          {/* Search */}
          <form onSubmit={(e) => e.preventDefault()} className="flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            />
          </form>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link to="/orders" className={isActive("/orders") ? "text-orange-600" : ""}>
              Orders
            </Link>

            <Link to="/cart" className={isActive("/cart") ? "text-orange-600" : ""}>
              Cart ({count})
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
