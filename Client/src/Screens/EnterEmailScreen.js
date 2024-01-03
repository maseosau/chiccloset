import React, { useState, useEffect } from "react";
import Colors from "../color";
import InputField from "../Components/InputField";
import Btn from "../Components/Btn";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from "react-native"
import * as SecureStore from 'expo-secure-store';
import CheckBox from "expo-checkbox";
import { useAuth } from "../contexts/authContext";
import axios from 'axios';
import { NAME_API } from "../config/ApiConfig";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

export default function EnterEmailScreen() {
    const { setUserId, setIsLoggedIn } = useAuth();
    const [email, setEmail] = useState('')
    const navigation = useNavigation();

    const sendEmail = () => {
        axios.post(NAME_API.LOCALHOST + '/sendPassword', {
            email: email,
        })
            .then(response => {
                if (response.status === 200) {
                    Alert.alert('Successfully ', response.data.message, [
                        { text: 'OK', onPress: () => navigation.navigate('LoginScreen') }
                    ])
                } else {
                    Alert.alert('Failed', response.data.message || 'Unknown error occurred');
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.data && err.response.data.message) {
                    // If there's a meaningful error message in the response from the server
                    Alert.alert("Send email failed", err.response.data.message)
                } else {
                    // If the error object doesn't contain a specific message, display a generic error
                    Alert.alert("Send email failed", "Something went wrong")
                }
            })
    }

    return (
        <View style={styles.loginContainer}>
            <Image style={styles.loginLogo} source={require('../../assets/small_logo_official.png')} />
            <Text style={styles.loginHeader}>
                Forgot Password
            </Text>
            <Text style={styles.text}>
                Please enter your email to receive the OTP code
            </Text>
            <InputField icon="mail"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail} />
            <Btn text="SEND EMAIL" width="100%" onPress={() => sendEmail()} />
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: Colors.subGreen
    },
    loginLogo: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    loginHeader: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    text: {
        textAlign: 'center',
        fontSize: 14,
    }
})
