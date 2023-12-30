import React, { useState, useEffect } from "react";
import Colors from "../color";
import InputField from "../Components/InputField";
import Btn from "../Components/Btn";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import CheckBox from "expo-checkbox";
import { useAuth } from "../contexts/authContext";
import axios from 'axios';
import { NAME_API } from "../config/ApiConfig";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

export default function LoginScreen() {
    const {setUserId, setIsLoggedIn} = useAuth();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [isCheckbox, setIsCheckbox] = useState(false);
    const [isVisiblePassword, setIsVisiblePassword] = useState(true);
    const navigation = useNavigation();

    const errFeature = () => {
        ToastAndroid.show('This feature is under development', ToastAndroid.SHORT);
    }

    useEffect(() => {
        const loadRememberMe = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                if (userToken !== null) {
                    const decode = jwtDecode(userToken);
                    setUserId(decode.userId);
                    setIsLoggedIn(true);
                }
                else {
                    console.log("Token not found");
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error loading token:', error);
            }
        };
        loadRememberMe();
    }, []);

    const login = () => {
        axios.post(NAME_API.LOCALHOST + '/login', {
            username: username, password: password,
        })
            .then(async (response) => {
                if (response.status === 200) {
                    const token = response.data.token;
                    const decode = jwtDecode(token);
                    setUserId(decode.userId);
                    // Lưu token vào AsyncStorage
                    try {
                        if (isCheckbox) {
                            await AsyncStorage.setItem('userToken', token);
                        }
                        setIsLoggedIn(true);
                    } catch (error) {
                        console.error('Error saving token to AsyncStorage:', error);
                    }
                }
                else {
                    Alert.alert("Login failed", "Incorrect username or password")
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.data && err.response.data.message) {
                    // If there's a meaningful error message in the response from the server
                    Alert.alert("Login failed", err.response.data.message)
                } else {
                    // If the error object doesn't contain a specific message, display a generic error
                    Alert.alert("Login failed", "Incorrect username or password")
                }
                
            });
    }


    return (
        <View style={styles.loginContainer}>
            <Image style={styles.loginLogo} source={require('../../assets/small_logo_official.png')} />
            <Text style={styles.loginHeader}>
                Welcome to Chiccloset
            </Text>
            <InputField icon="person"
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername} />
            <InputField
                icon="lock-closed-outline"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword} 
                secureTextEntry={isVisiblePassword}
                setSecureTextEntry={() => setIsVisiblePassword(!isVisiblePassword)}
                />
            <View style={styles.loginOptions}>
                <View style={styles.loginRemember}>
                    <CheckBox
                        disabled={false}
                        value={isCheckbox}
                        onValueChange={() => setIsCheckbox(!isCheckbox)}
                    />
                    <Text>
                        Remember me
                    </Text>
                </View>
                <TouchableOpacity onPress={() => errFeature()}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>

            </View>
            <Btn text="LOGIN" width="100%" onPress={() => login()} />
            <View style={styles.loginAnotherContainer}>
                <Text style={styles.loginAnother}>
                    Or login with
                </Text>
                <View style={styles.loginSocial}>
                    <Btn icon="logo-facebook" text="Facebook" bgColor={Colors.blue} onPress={() => errFeature()}/>
                    <Btn icon="logo-google" text="Google" bgColor={Colors.red} onPress={() => errFeature()}/>
                </View>
            </View>
            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>
                    Do not have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                    <Text style={styles.registerNavigate}>
                        Register now!
                    </Text>
                </TouchableOpacity>
            </View>
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
    loginAnotherContainer: {
        margin: 10,

    },
    loginAnother: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    loginSocial: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    registerContainer: {
        marginTop: 10,
        flexDirection: 'row',
        gap: 2,
    },
    registerText: {
        fontSize: 18,
    },
    registerNavigate: {
        color: Colors.main,
        fontSize: 18,
    },
    loginOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 10,
    },
    loginRemember: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },
    forgotPassword: {
        color: Colors.blue,
    }
})