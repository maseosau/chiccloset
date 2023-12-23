import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./src/contexts/authContext";
import AppNavigation from "./src/Navigations/AppNavigation";
import HomeCarousel from "./src/Components/HomeCarousel";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
        {/* <StatusBar hidden={true} /> */}
        <StatusBar />
        <AppNavigation />
    </AuthProvider>
  );
}
