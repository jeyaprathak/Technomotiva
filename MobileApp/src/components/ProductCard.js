import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ProductCard({ product, onAdd }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text numberOfLines={1} style={styles.name}>
        {product.name}
      </Text>

      <Text style={styles.price}>₹ {product.price}</Text>

      <TouchableOpacity onPress={onAdd}>
        <LinearGradient
          colors={["#ff3d00", "#ff6f91"]}
          style={styles.button}
        >
          <Text style={styles.buttonText}>ADD TO CART</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 16,
    padding: 10,
    width: "47%",
    elevation: 3,
  },
  image: {
    height: 130,
    borderRadius: 12,
  },
  name: {
    fontWeight: "600",
    marginTop: 8,
  },
  price: {
    color: "#ff3d00",
    fontWeight: "bold",
    marginVertical: 4,
  },
  button: {
    marginTop: 6,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
