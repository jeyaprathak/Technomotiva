import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export async function registerForPushNotifications() {
  if (!Device.isDevice) return null;

  await Notifications.requestPermissionsAsync();

  const token = await Notifications.getExpoPushTokenAsync({
    projectId: "7ee1d949-f35e-44ce-93d2-86a42daf28c1",
  });

  // 🔔 NEW CHANNEL (name changed)
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("order_updates", {
      name: "Order Updates",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
      vibrationPattern: [0, 250, 250, 250],
      lockscreenVisibility:
        Notifications.AndroidNotificationVisibility.PUBLIC,
    });
  }

  console.log("🔥 EXPO PUSH TOKEN:", token.data);
  return token.data;
}
