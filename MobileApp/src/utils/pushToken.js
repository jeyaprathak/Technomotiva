import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export async function registerForPushNotifications() {
  try {
    if (!Device.isDevice) {
      console.log("❌ Must use physical device");
      return null;
    }

    console.log("📱 Physical device detected");

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("❌ Permission denied");
      return null;
    }

    const token = await Notifications.getExpoPushTokenAsync({
      projectId: "7ee1d949-f35e-44ce-93d2-86a42daf28c1"
    });

    console.log("🔥 EXPO PUSH TOKEN:", token.data);

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    return token.data;
  } catch (err) {
    console.log("❌ PUSH ERROR:", err.message);
    return null;
  }
}
