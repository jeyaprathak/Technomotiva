import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { CartProvider } from "./src/context/CartContext";
import AppNavigator from "./src/navigation/AppNavigator";

import * as Notifications from 'expo-notifications';
import { registerForPushNotifications } from "./src/utils/pushToken";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,  
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function App() {

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  return (
    <CartProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}
