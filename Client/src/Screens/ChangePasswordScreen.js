import { View, Text, StyleSheet, TextInput, Alert, Modal } from "react-native";
import React, { useState } from "react";
import Colors from "../color";
import Icon from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { NAME_API } from "../config/ApiConfig";
import { useAuth } from "../contexts/authContext";
import Btn from "../Components/Btn";
import { useNavigation } from "@react-navigation/native";

export default function ChangePasswordScreen() {
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmNewPassword, setConfirmNewPassword] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [visibleOldPassword, setVisibleOldPassword] = useState(true);
    const [visibleNewPassword, setVisibleNewPassword] = useState(true);
    const [visibleConfirmNewPassword, setVisibleConfirmNewPassword] = useState(true);
    const { userId } = useAuth();
    const navigation = useNavigation();

    function isStrongPassword(password) {
        // Kiểm tra độ dài mật khẩu
        if (password.length < 8) {
            return false;
        }

        // Kiểm tra chứa chữ hoa, chữ thường, số và ký tự đặc biệt
        const uppercaseCharacters = /[A-Z]/;
        const lowercaseCharacters = /[a-z]/;
        const numericCharacters = /[0-9]/;
        const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        if (
            !uppercaseCharacters.test(password) ||
            !lowercaseCharacters.test(password) ||
            !numericCharacters.test(password) ||
            !specialCharacters.test(password)
        ) {
            return false;
        }

        return true;
    }

    const updateProfile = () => {
        setModalVisible(false);
        if (oldPassword.trim() === '' || newPassword.trim() === '' || newPassword.trim() === '') {
            return Alert.alert("Change Password Failed", "These fields cannot be left blank");
        }

        if (newPassword !== confirmNewPassword) {
            return Alert.alert("Change Password Failed", "Password does not match");
        }

        const isStrong = isStrongPassword(newPassword);
        if (!isStrong) {
            return Alert.alert('Register failed', 'Password is not strong');
        }

        axios.put(NAME_API.LOCALHOST + `/update/${userId}`, {
            oldPassword: oldPassword,
            newPassword: newPassword,
        })
            .then(response => {
                if (response.status === 200) {
                    Alert.alert('Updated Successfully', response.data.message, [
                        {text: 'OK', onPress: () => {navigation.navigate('Profile')}}
                    ]);
                }
                else {
                    Alert.alert('Updated Failed', response.data.message);
                }
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Updated Failed', 'Something went wrong');
            })
    }

    return (
        <View style={{ height: "100%", backgroundColor: Colors.white, paddingHorizontal: 5 }}>
            <View style={{ marginTop: 5, paddingBottom: 10 }}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Old Password</Text>
                    <TextInput
                        style={{
                            borderWidth: 0.5,
                            backgroundColor: Colors.subGreen,
                            borderColor: Colors.main,
                            padding: 10,
                            color: Colors.main,
                            fontSize: 17,
                            borderRadius: 10,
                        }}
                        secureTextEntry={visibleOldPassword}
                        placeholder="Enter old password"
                        placeholderTextColor={Colors.lightBlack}
                        underlineColorAndroid="transparent"
                        selectTextOnFocus={true}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        autoCorrect={false}
                        onFocus={() => { }}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                    />
                    {
                        visibleOldPassword ? <Icon name="eye-outline" style={styles.iconEye} onPress={() => setVisibleOldPassword(!visibleOldPassword)} /> :
                            <Icon name="eye-off-outline" style={styles.iconEye} onPress={() => setVisibleOldPassword(!visibleOldPassword)} />
                    }
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>New Password</Text>
                    <TextInput
                        style={{
                            borderWidth: 0.5,
                            backgroundColor: Colors.subGreen,
                            borderColor: Colors.main,
                            padding: 10,
                            color: Colors.main,
                            fontSize: 17,
                            borderRadius: 10,
                        }}
                        secureTextEntry={visibleNewPassword}
                        placeholder="Enter new password"
                        placeholderTextColor={Colors.lightBlack}
                        underlineColorAndroid="transparent"
                        selectTextOnFocus={true}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        autoCorrect={false}
                        onFocus={() => { }}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    {
                        visibleNewPassword ? <Icon name="eye-outline" style={styles.iconEye} onPress={() => setVisibleNewPassword(!visibleNewPassword)} /> :
                            <Icon name="eye-off-outline" style={styles.iconEye} onPress={() => setVisibleNewPassword(!visibleNewPassword)} />
                    }
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Confirm New Password</Text>
                    <TextInput
                        style={{
                            borderWidth: 0.5,
                            backgroundColor: Colors.subGreen,
                            borderColor: Colors.main,
                            padding: 10,
                            color: Colors.main,
                            fontSize: 17,
                            borderRadius: 10,
                        }}
                        secureTextEntry={visibleConfirmNewPassword}
                        placeholder="Confirm new password"
                        placeholderTextColor={Colors.lightBlack}
                        underlineColorAndroid="transparent"
                        selectTextOnFocus={true}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        autoCorrect={false}
                        onFocus={() => { }}
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                    />
                    {
                        visibleConfirmNewPassword ? <Icon name="eye-outline" style={styles.iconEye} onPress={() => setVisibleConfirmNewPassword(!visibleConfirmNewPassword)} /> :
                            <Icon name="eye-off-outline" style={styles.iconEye} onPress={() => setVisibleConfirmNewPassword(!visibleConfirmNewPassword)} />
                    }
                </View>
            </View>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            Are you sure you want to change password?
                        </Text>
                        <View style={styles.btnFlex}>
                            <Btn text='OK' bgColor={Colors.main} color={Colors.white}
                                onPress={() => updateProfile()}
                            />
                            <Btn text='Cancel' bgColor={Colors.gray} color={Colors.black}
                                onPress={() => setModalVisible(!modalVisible)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <Btn
                bgColor={Colors.main}
                color={Colors.white}
                text="CHANGE PASSWORD"
                onPress={() => setModalVisible(true)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    btnFlex: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    iconCheck: {
        position: 'absolute',
        top: 35,
        right: 10,
        fontSize: 20,
        color: Colors.main
    },
    iconCancel: {
        position: 'absolute',
        top: 35,
        right: 10,
        fontSize: 20,
        color: Colors.red
    },
    iconEye: {
        position: 'absolute',
        top: 35,
        right: 10,
        fontSize: 20,
        color: Colors.main
    }
});