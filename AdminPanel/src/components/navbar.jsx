import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center gap-4">
        <h1 className="text-xl font-bold text-pink-600">
          Admin Dashboard
        </h1>

        <nav className="flex gap-4 text-sm font-medium">
          <Link className="text-gray-600 hover:text-indigo-600" to="/products">
            Products
          </Link>
          <Link className="text-gray-600 hover:text-indigo-600" to="/add-product">
            Add Product
          </Link>
          <Link className="text-gray-600 hover:text-indigo-600" to="/orders">
            Orders
          </Link>
        </nav>

        <button
          onClick={logout}
          className="ml-auto bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
