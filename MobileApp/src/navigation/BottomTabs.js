import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import OrderScreen from "../screens/OrderScreen";
import LogoutScreen from "../screens/LogoutScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const context = useContext(CartContext);

 
  const cart = context?.cart ?? [];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let icon = "home-outline";
          if (route.name === "Cart") icon = "cart-outline";
          if (route.name === "Orders") icon = "receipt-outline";
          if (route.name === "Logout") icon = "log-out-outline";
          return <Ionicons name={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ff3d00",
      })}
    >
      <Tab.Screen name="Home" component={ProductScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: cart.length > 0 ? cart.length : undefined,
        }}
      />
      <Tab.Screen name="Orders" component={OrderScreen} />
      <Tab.Screen name="Logout" component={LogoutScreen} />
    </Tab.Navigator>
  );
}
