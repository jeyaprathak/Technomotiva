import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import API, { loginAdmin } from "../api/api";
import { registerForPushNotifications } from "../utils/pushToken";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  setLoading(true);

  try {
    console.log("➡️ Login started");

    // 1️⃣ LOGIN API
    const res = await loginAdmin({
      email: email.trim().toLowerCase(),
      password: password.trim(),
    });

    console.log("✅ Login API success", res?.data);

    if (!res?.data?.token) {
      throw new Error("Token missing from login response");
    }

    const jwtToken = res.data.token;
    await AsyncStorage.setItem("token", jwtToken);

    console.log("🔐 Token saved");

    // 2️⃣ PUSH TOKEN (BACKGROUND – NEVER BLOCK LOGIN)
    registerForPushNotifications()
      .then(async (expoToken) => {
        if (!expoToken) return;

        console.log("📨 Sending push token to backend");

        await API.post(
          "/user/push-token",
          { expoPushToken: expoToken },
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );

        console.log("✅ Push token saved in DB");
      })
      .catch(() => {
        console.log("⚠️ Push failed (ignored)");
      });

    // 3️ NAVIGATE IMMEDIATELY
    console.log("➡️ Navigating to Main");
    navigation.replace("Main");

  } catch (err) {
    console.log("❌ LOGIN ERROR:", err?.response?.data || err.message);
    Alert.alert("Login Failed", "Invalid credentials or server error");
  } finally {
    setLoading(false);
  }
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Welcome Back 👋</Text>
          <Text style={styles.subtitle}>Login to continue shopping</Text>

          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Logging in..." : "LOGIN"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#111",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 28,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    fontSize: 16,
    color:"black",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ff3d00",
    padding: 16,
    borderRadius: 14,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
