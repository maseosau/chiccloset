import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./src/contexts/authContext";
import AppNavigation from "./src/Navigations/AppNavigation";
import HomeCarousel from "./src/Components/HomeCarousel";
import { CartProvider } from "./src/contexts/cartContext";
import VerifyScreen from "./src/Screens/VerifyScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import { MapProvider } from "./src/contexts/mapContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MapProvider>
          <StatusBar />
          <AppNavigation />
        </MapProvider>
      </CartProvider>
    </AuthProvider>
  );
}
