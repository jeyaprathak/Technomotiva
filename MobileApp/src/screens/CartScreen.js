import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useContext, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../api/api";

export default function CartScreen({ navigation }) {
  const cartContext = useContext(CartContext);
  const cart = cartContext?.cart ?? [];
  const loadCart = cartContext?.loadCart;
  const increase = cartContext?.increase;
  const decrease = cartContext?.decrease;
  const removeItem = cartContext?.removeItem;
  const total = cartContext?.total ?? 0;

  useEffect(() => {
    loadCart && loadCart();
  }, []);

  const placeOrder = async () => {
    if (cart.length === 0) {
      Alert.alert("Cart Empty", "Add products first");
      return;
    }

    try {
      await createOrder(); 
      await loadCart();
      navigation.navigate("Orders");
    } catch (err) {
      Alert.alert("Order Failed", "Please try again");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      {/* HEADER */}
      <LinearGradient colors={["#ff3d00", "#ff6f91"]} style={styles.header}>
        <Text style={styles.headerText}>My Cart</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {cart.map(item => (
          <View key={item._id} style={styles.card}>
            <Image
              source={{ uri: item.product.image }}
              style={styles.image}
            />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.name}>{item.product.name}</Text>
              <Text style={styles.price}>₹ {item.product.price}</Text>

              <View style={styles.qtyRow}>
                <TouchableOpacity
                  onPress={() => decrease(item._id, item.quantity)}
                >
                  <Text style={styles.qtyBtn}>−</Text>
                </TouchableOpacity>

                <Text style={styles.qty}>{item.quantity}</Text>

                <TouchableOpacity
                  onPress={() => increase(item._id, item.quantity)}
                >
                  <Text style={styles.qtyBtn}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => removeItem(item._id)}
                  style={styles.removeBtn}
                >
                  <Text style={{ color: "#ff3d00" }}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* TOTAL */}
        <Text style={styles.total}>Total: ₹ {total}</Text>

        {/* PLACE ORDER */}
        <TouchableOpacity onPress={placeOrder}>
          <LinearGradient
            colors={["#ff3d00", "#ff6f91"]}
            style={styles.checkout}
          >
            <Text style={styles.checkoutText}>PLACE ORDER</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  price: {
    color: "#ff3d00",
    marginVertical: 4,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  qtyBtn: {
    fontSize: 22,
    width: 30,
    textAlign: "center",
  },
  qty: {
    marginHorizontal: 8,
    fontWeight: "bold",
  },
  removeBtn: {
    marginLeft: 12,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  checkout: {
    padding: 14,
    borderRadius: 14,
  },
  checkoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
