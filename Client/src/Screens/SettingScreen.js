import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"
import Colors from "../color";
import Btn from "../Components/Btn";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import * as SecureStore from 'expo-secure-store';

export default function SettingScreen() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const removeToken = async () => {
        try {
            await SecureStore.deleteItemAsync('userToken');
            console.log('Token removed successfully.');
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Error removing token from SecureStore:', error);
        }
    };

    return (
        <View style={styles.settingContainer}>
            <View style={styles.optionList}>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Change Password')} >
                    <View style={styles.optionFlex}>
                        <Icon name="lock-closed-outline" style={styles.optionIcon} />
                        <Text style={styles.optionText}>
                            Change Password
                        </Text>
                    </View>
                    <Icon name="chevron-forward" style={styles.forwardIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.optionList}>
                <TouchableOpacity style={styles.option}>
                    <View style={styles.optionFlex}>
                        <Icon name="card-outline" style={styles.optionIcon} />
                        <Text style={styles.optionText}>
                            Payments Method
                        </Text>
                    </View>
                    <Icon name="chevron-forward" style={styles.forwardIcon} />
                </TouchableOpacity>
                <View style={styles.line}></View>
                <TouchableOpacity style={styles.option}>
                    <View style={styles.optionFlex}>
                        <Icon name="pricetag-outline" style={styles.optionIcon} />
                        <Text style={styles.optionText}>
                            Coupons
                        </Text>
                    </View>
                    <Icon name="chevron-forward" style={styles.forwardIcon} />
                </TouchableOpacity>
                <View style={styles.line}></View>
                <TouchableOpacity style={styles.option}>
                    <View style={styles.optionFlex}>
                        <Icon name="pricetag-outline" style={styles.optionIcon} />
                        <Text style={styles.optionText}>
                            My Store
                        </Text>
                    </View>
                    <Icon name="chevron-forward" style={styles.forwardIcon} />
                </TouchableOpacity>

            </View>
            <View style={styles.optionList}>
                <TouchableOpacity style={styles.option}>
                    <View style={styles.optionFlex}>
                        <Icon name="location-outline" style={styles.optionIcon} />
                        <Text style={styles.optionText}>
                            Shipping Address
                        </Text>
                    </View>
                    <Icon name="chevron-forward" style={styles.forwardIcon} />
                </TouchableOpacity>
                <View style={styles.line}></View>
                <TouchableOpacity style={styles.option}>
                    <View style={styles.optionFlex}>
                        <Icon name="help-circle-outline" style={styles.optionIcon} />
                        <Text style={styles.optionText}>
                            Helps
                        </Text>
                    </View>
                    <Icon name="chevron-forward" style={styles.forwardIcon} />
                </TouchableOpacity>
                <View style={styles.line}></View>
                <TouchableOpacity style={styles.option}>
                    <View style={styles.optionFlex}>
                        <Icon name="headset-outline" style={styles.optionIcon} />
                        <Text style={styles.optionText}>
                            Service Center
                        </Text>
                    </View>
                    <Icon name="chevron-forward" style={styles.forwardIcon} />
                </TouchableOpacity>
            </View>
            <Btn
                icon='log-out-outline'
                text='Log Out'
                bgColor={Colors.red}
                color={Colors.white}
                onPress={() => setModalVisible(true)}
            />

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
                            Are you sure you want to log out?
                        </Text>
                        <View style={styles.btnFlex}>
                            <Btn text='OK' bgColor={Colors.red} color={Colors.white}
                                onPress={() => removeToken()}
                            />
                            <Btn text='Cancel' bgColor={Colors.gray} color={Colors.black}
                                onPress={() => setModalVisible(!modalVisible)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    settingContainer: {
        flex: 1,
    },
    line: {
        borderWidth: 0.75,
        borderBlockColor: Colors.lightBlack,
        margin: 3
    },
    optionList: {
        backgroundColor: Colors.white,
        padding: 10,
        marginVertical: 10,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    optionFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 7,
    },
    optionIcon: {
        fontSize: 30,
        color: Colors.main,
    },
    optionText: {
        fontSize: 18,
    },
    forwardIcon: {
        fontSize: 30,
    },
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

})