import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogoutScreen({ navigation }) {
  useEffect(() => {
    AsyncStorage.removeItem("token");
    navigation.replace("Login");
  }, []);

  return null;
}
