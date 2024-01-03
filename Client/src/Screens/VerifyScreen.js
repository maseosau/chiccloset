import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../color";
import Btn from "../Components/Btn";
import axios from "axios";
import { NAME_API } from "../config/ApiConfig";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function VerifyScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params;
    const [userOTP, setUserOTP] = useState('');

    const handleOTPChange = (otp) => {
        setUserOTP(otp);
    };

    const verifyEmail = () => {
        axios.post(NAME_API.LOCALHOST + '/verifyOTP', {
            email: email,
            userOTP: userOTP,
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
                Alert.alert('Failed', 'Something went wrong');
            })
    }

    const getOTP = () => {
        axios.post(NAME_API.LOCALHOST + '/getOTP', {
            email: email
        })
            .then(response => {
                if (response.status === 200) {
                    Alert.alert('Successfully ', response.data.message)
                } else {
                    Alert.alert('Failed', response.data.message || 'Unknown error occurred');
                }
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Failed', 'Something went wrong');
            })
    }

    return (
        <View style={styles.container}>
            <Image style={styles.registerLogo} source={require('../../assets/small_logo_official.png')} />
            <Text style={styles.headerText}>
                Verify Email
            </Text>
            <Text style={styles.contentText}>
                We have sent you a six-digit verification code to the email address {' '}
                <Text style={styles.email}>
                    {email}.
                </Text>
            </Text>
            <Text style={styles.contentText}>
                Didn't receive the code? {' '}
                    <Text style={styles.btnText} onPress={() => getOTP()}>
                        Resend code.
                    </Text>
            </Text>
            <Text style={styles.codeText}>
                Enter code
            </Text>
            <OTPTextInput
                handleTextChange={handleOTPChange}
                inputCount={6}
                containerStyle={{ marginBottom: 15 }}
            />
            <Btn text="VERIFY" onPress={() => verifyEmail()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.subGreen,
        margin: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 10,
    },
    contentText: {
        fontSize: 14,
        color: Colors.black,
        textAlign: 'center',
        marginBottom: 10,
    },
    registerLogo: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    codeText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    btnText: {
        fontWeight: 'bold',
        color: Colors.blue,
        fontSize: 16,
    },
    btn: {
        margin: 0,
        padding: 0,
    }
});
