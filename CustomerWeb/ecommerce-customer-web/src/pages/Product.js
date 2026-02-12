import { useEffect, useState, useContext } from "react";
import { getProducts } from "../api/api";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function Products({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priceRange === "under500") {
      result = result.filter((p) => p.price < 500);
    } else if (priceRange === "500-1000") {
      result = result.filter((p) => p.price >= 500 && p.price <= 1000);
    } else if (priceRange === "1000-5000") {
      result = result.filter((p) => p.price >= 1000 && p.price <= 5000);
    } else if (priceRange === "above5000") {
      result = result.filter((p) => p.price > 5000);
    }

    if (sortBy === "priceLowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighToLow") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(result);
  }, [searchQuery, sortBy, priceRange, products]);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">Discover Amazing Products</h1>
          <p className="text-orange-100 text-lg">
            Shop the best deals and latest trends
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        <p className="mb-4 text-gray-600">
          Showing {filteredProducts.length} products
          {searchQuery && (
            <span className="text-orange-600"> for "{searchQuery}"</span>
          )}
        </p>

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
      </div>
    </div>
  );
}
