import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export async function registerForPushNotifications() {
  if (!Device.isDevice) return null;

  await Notifications.requestPermissionsAsync();

  const token = await Notifications.getExpoPushTokenAsync({
    projectId: "b8b1711c-5310-4195-81a0-dee24e34924a",
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
