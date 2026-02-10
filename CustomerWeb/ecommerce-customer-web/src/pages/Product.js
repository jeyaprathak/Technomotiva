import { useEffect, useState, useContext } from "react";
import { getProducts } from "../api/api";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState("all");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((res) => {
        const productData = res.data.products || res.data;
        setProducts(productData);
        setFilteredProducts(productData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    if (priceRange === "under500") {
      result = result.filter((p) => p.price < 500);
    } else if (priceRange === "500-1000") {
      result = result.filter((p) => p.price >= 500 && p.price <= 1000);
    } else if (priceRange === "1000-5000") {
      result = result.filter((p) => p.price >= 1000 && p.price <= 5000);
    } else if (priceRange === "above5000") {
      result = result.filter((p) => p.price > 5000);
    }

    // Sort
    if (sortBy === "priceLowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighToLow") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(result);
  }, [searchQuery, sortBy, priceRange, products]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">Discover Amazing Products</h1>
          <p className="text-orange-100 text-lg">Shop the best deals and latest trends</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-semibold text-gray-700">Filters:</span>
              
              {/* Price Filter */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-orange-500 focus:border-orange-500 focus:outline-none transition-colors"
              >
                <option value="all">All Prices</option>
                <option value="under500">Under ₹500</option>
                <option value="500-1000">₹500 - ₹1,000</option>
                <option value="1000-5000">₹1,000 - ₹5,000</option>
                <option value="above5000">Above ₹5,000</option>
              </select>

              {/* Clear Filters */}
              {(priceRange !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setPriceRange("all");
                    setSearchQuery("");
                    setSortBy("relevance");
                  }}
                  className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
            
            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              >
                <option value="relevance">Relevance</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
            {searchQuery && (
              <span> for "<span className="font-semibold text-orange-600">{searchQuery}</span>"</span>
            )}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onAdd={() => addToCart(p._id)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-48 h-48 mx-auto mb-6 opacity-50">
              <svg viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M70 80h60M70 100h40M70 120h50" stroke="#E5E7EB" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No products found</h2>
            <p className="text-gray-600 mb-4">
              {searchQuery ? `No results for "${searchQuery}"` : "Try adjusting your filters"}
            </p>
            <button
              onClick={() => {
                setPriceRange("all");
                setSearchQuery("");
                setSortBy("relevance");
              }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}