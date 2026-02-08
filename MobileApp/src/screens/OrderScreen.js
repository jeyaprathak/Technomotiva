import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { useState, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { getMyOrders } from "../api/api";

export default function OrderScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      getMyOrders()
        .then(res => setOrders(res.data || []))
        .catch(() => setOrders([]))
        .finally(() => setLoading(false));
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.orderId}>
        Order #{item._id.slice(-6)}
      </Text>

      <Text style={styles.amount}>
        Total: ₹ {item.totalAmount}
      </Text>

      <Text
        style={[
          styles.status,
          item.status === "Delivered" && styles.delivered,
          item.status === "Pending" && styles.pending,
        ]}
      >
        {item.status || "Pending"}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
     
      <LinearGradient
        colors={["#ff3d00", "#ff6f91"]}
        style={styles.header}
      >
        <Text style={styles.headerText}>My Orders</Text>
      </LinearGradient>

      {orders.length === 0 && !loading ? (
        <View style={styles.empty}>
          <Text style={{ color: "#777" }}>
            No orders placed yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
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
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  orderId: {
    fontSize: 14,
    color: "#999",
    marginBottom: 6,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    marginTop: 6,
    fontWeight: "600",
    color: "#ff3d00",
  },
  pending: {
    color: "#ff9800",
  },
  delivered: {
    color: "#4caf50",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
