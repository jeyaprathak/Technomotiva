import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { CartProvider } from "./src/context/CartContext";
import AppNavigator from "./src/navigation/AppNavigator";

import * as Notifications from "expo-notifications";
import { registerForPushNotifications } from "./src/utils/pushToken";

// 🔥 Required for foreground notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  useEffect(() => {
    registerForPushNotifications();

    // 📩 Foreground notification
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("📩 Notification received:", notification);
      });

    // 👆 When tapped
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("👉 Notification tapped:", response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(
          responseListener.current
        );
      }
    };
  }, []);

  return (
    <CartProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}
