import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getProducts } from "../api/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { CartContext } from "../context/CartContext";

export default function ProductScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");


  const cartContext = useContext(CartContext);
  const cart = cartContext?.cart ?? [];
  const addToCart = cartContext?.addToCart;
  const loadCart = cartContext?.loadCart;

  useEffect(() => {
    getProducts().then(res =>
      setProducts(res.data.products || res.data || [])
    );
    loadCart && loadCart();
  }, []);

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filter === "LOW") filtered.sort((a, b) => a.price - b.price);
  if (filter === "HIGH") filtered.sort((a, b) => b.price - a.price);

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
     
      <LinearGradient colors={["#ff3d00", "#ff6f91"]} style={styles.header}>
        <Text style={styles.logo}>ShopJ</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Ionicons name="cart-outline" size={26} color="#fff" />
          {cart.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </LinearGradient>

      <SearchBar value={search} onChange={setSearch} />

     
      <View style={styles.filters}>
        {["ALL", "LOW", "HIGH"].map(type => (
          <TouchableOpacity
            key={type}
            onPress={() => setFilter(type)}
            style={[
              styles.filterBtn,
              filter === type && styles.activeFilter,
            ]}
          >
            <Text style={filter === type && { color: "#fff" }}>
              {type === "ALL"
                ? "All"
                : type === "LOW"
                ? "Low Price"
                : "High Price"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onAdd={() => addToCart && addToCart(item._id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  logo: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  badge: {
    position: "absolute",
    right: -8,
    top: -6,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  badgeText: { color: "#ff3d00", fontWeight: "bold" },
  filters: {
    flexDirection: "row",
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  activeFilter: {
    backgroundColor: "#ff3d00",
    borderColor: "#ff3d00",
  },
});
