import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
const Stack = createStackNavigator();

export default function UnauthenticatedNavigation() {
    return (
        <Stack.Navigator
        initialRouteName='Unauthenticated'
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
    )
}
