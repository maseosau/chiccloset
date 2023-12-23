import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native';
import UnauthenticatedNavigation from './UnauthenticatedNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, AntDesign, FontAwesome, Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from '../Screens/HomeScreen';
import ShippingScreen from "../Screens/ShippingScreen";
import PaymentScreen from "../Screens/PaymentScreen";
import PlaceOrderScreen from "../Screens/PlaceOrderScreen";
import ProductDetail from "../Screens/ProductDetail";
import OrderScreen from "../Screens/OrderScreen";
import CartScreen from "../Screens/CartScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import SettingScreen from '../Screens/SettingScreen';
import Colors from '../color';
import { useAuth } from '../contexts/authContext';
import ChangePasswordScreen from '../Screens/ChangePasswordScreen';
import CategoryScreen from '../Screens/CategoryScreen';

const Tab = createBottomTabNavigator();

// const retrieveToken = async () => {
//     try {
//         const userToken = await AsyncStorage.getItem('userToken');
//         if (userToken !== null) {
//             // Đã tìm thấy token, bạn có thể sử dụng nó ở đây
//             return true;
//         } else {
//             // Nếu không tìm thấy token
//             console.log('Token không tồn tại.');
//             return false;
//         }
//     } catch (error) {
//         console.error('Lỗi khi lấy token từ AsyncStorage:', error);
//         return false;
//     }
// };

function HomeBottom() {
    return (
        <Tab.Navigator
            backBehavior="HomeBottom"
            initialRouteName="HomeBottom"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: { ...styles.tab },
                headerShown: false,
                tabBarHideOnKeyboard: true,
            }}
        >
            {/* Main */}
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.center}>
                            {focused ? (
                                <Entypo name="home" size={30} color={Colors.main} />
                            ) : (
                                <AntDesign name="home" size={24} color={Colors.black} />
                            )}
                        </View>
                    ),
                }}
            />
            {/* Category */}
            <Tab.Screen
                name="Category"
                component={CategoryScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.center}>
                            {focused ? (
                                <AntDesign name="appstore1" size={30} color={Colors.main} />
                            ) : (
                                <AntDesign name="appstore-o" size={24} color={Colors.black} />
                            )}
                        </View>
                    ),
                }}
            />
            {/* Cart */}
            <Tab.Screen
                name="CartScreen"
                component={CartScreen}
                options={{
                    // tabBarButton: (props) => <CustomTab {...props} />,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.center}>
                            {focused ? (
                                <Ionicons name="cart" size={30} color={Colors.main} />
                            ) : (
                                <Ionicons name="cart-outline" size={24} color={Colors.black} />
                            )}
                        </View>
                    ),
                }}
            />
            {/* Profile */}
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.center}>
                            {focused ? (
                                <FontAwesome name="user" size={30} color={Colors.main} />
                            ) : (
                                <AntDesign name="user" size={24} color={Colors.black} />
                            )}
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
const Stack = createStackNavigator();

function StackNavigation() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="HomeStack" component={HomeBottom} 
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen name="Product Details" component={ProductDetail} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            <Stack.Screen name="ShippingScreen" component={ShippingScreen} />
            <Stack.Screen name="PlaceorderScreen" component={PlaceOrderScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen name="Settings" component={SettingScreen} />
            <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
        </Stack.Navigator>
    )
}

export default function AppNavigation() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                {
                    isLoggedIn ?
                        <Stack.Screen name="Home" component={StackNavigation} /> :
                        <Stack.Screen name="Auth" component={UnauthenticatedNavigation} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    tab: {
        elevation: 0,
        backgroundColor: Colors.white,
        height: 60,
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
});