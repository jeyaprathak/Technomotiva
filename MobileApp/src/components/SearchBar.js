import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({ value, onChange }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color="#999" />
      <TextInput
        placeholder="Search products"
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignItems: "center",
    elevation: 2,
  },
  input: {
    marginLeft: 8,
    flex: 1,
    height: 44,
  },
});
