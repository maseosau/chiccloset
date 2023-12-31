import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker"
import TabComponent from "../Components/Profile/Tabs";
import Colors from "../color";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { NAME_API } from "../config/ApiConfig";
import { useAuth } from "../contexts/authContext";
import Loading from "../Components/Loading";

export default function ProfileScreen() {
    const navigation = useNavigation();
    const { userId } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [img, setImg] = useState(null);
    const [userData, setUserData] = useState({
        image: '',
        fullname: '',
        created_at: '',
    });

    const uploadImage = async (mode) => {
        try {
            let result = {};
            if (mode === 'gallery') {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                })
            }
            else {
                await ImagePicker.requestCameraPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.front,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                })

            }
            if (!result.canceled) {
                await postAvatar(result.assets[0].uri);
            }
        }
        catch (err) {
            console.log("Uploading image failed " + err);
        }
    }

    // const saveImage = async (image) => {
    //     try {
    //         setImg(image);
    //         setModalVisible(false);
    //     }
    //     catch (err) {
    //         console.log("Save image fail " + err);
    //     }
    // }

    const removeImage = async () => {
        try {
            postAvatar();
        }
        catch (err) {
            console.log("Remove image fail " + err);
        }
    }

    const postAvatar = async (image) => {
        setModalVisible(false);
        try {
            const response = await axios.put(NAME_API.LOCALHOST + `/update/${userId}`, {
                image: image ? image : '',
            });
            // console.log(response.data.message);
        } catch (err) {
            console.log("Error update avatar " + err);
        }
    }

    const getInformation = async () => {
        try {
            const response = await axios.get(`${NAME_API.LOCALHOST}/getInformation/${userId}`);
            const user = response.data.user;

            const dateTime = new Date(user.create_at);
            const formattedDate = dateTime.getDate() + '-' + (dateTime.getMonth() + 1) + '-' + dateTime.getFullYear();
            setUserData(prevUserData => ({
                ...prevUserData,
                image: user.image !== '' ? { uri: user.image } : require('../../assets/images/user.png'),
                fullname: user.fullname,
                created_at: formattedDate,
            }));
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    useEffect(() => {
        getInformation();
    }, [userData])

    return (
        <>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Icon name="close" style={styles.modalCloseIcon}
                            onPress={() => setModalVisible(false)}
                        />
                        <Text style={styles.modalText}>
                            Profile Photo
                        </Text>
                        <View style={styles.btnFlex}>
                            <TouchableOpacity onPress={() => uploadImage('gallery')} style={styles.btnContainer}>
                                <Icon name="image-outline" style={styles.btnIcon} />
                                <Text>
                                    Gallery
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => uploadImage()} style={styles.btnContainer}>
                                <Icon name="camera-outline" style={styles.btnIcon} />
                                <Text>
                                    Camera
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => removeImage()} style={styles.btnContainer}>
                                <Icon name="trash-outline" style={styles.btnIcon} />
                                <Text>
                                    Remove
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {
                userData.fullname !== '' ?
                    <>
                        <View style={styles.profileContainer}>
                            <View style={styles.profileInfomation}>
                                <Image source={userData.image} style={styles.profileAvatar} />
                                <TouchableOpacity style={styles.editAvatar} onPress={() => setModalVisible(true)}>
                                    <Icon name="camera-outline" style={styles.iconEditAvatar} />
                                </TouchableOpacity>
                                <View style={styles.profileBox}>
                                    <Text style={styles.profileName}>
                                        {userData.fullname}
                                    </Text>
                                    <Text style={styles.profileJoin}>
                                        Joined {userData.created_at}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                                <Icon name="settings-outline" style={styles.iconSettings} />
                            </TouchableOpacity>
                        </View>
                        <TabComponent />
                    </>
                    : <Loading />
            }
        </>
    )
};

const styles = StyleSheet.create({
    profileContainer: {
        backgroundColor: Colors.main,
        padding: 10,
        // flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 30,
    },
    profileInfomation: {
        // width: "100%",
        // height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        flexDirection: 'row',
    },
    profileBox: {
        marginLeft: 10,
    },
    profileOrder: {
        flexDirection: 'row',
        // justifyContent: 'space-evenly',
        // // width: "100%",
        backgroundColor: Colors.white,
        // margin: 10,
        // padding: 10,
        // borderRadius: 12,
    },
    profileAvatar: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 50,
        backgroundColor: Colors.white,
        borderWidth: 2,
        borderColor: Colors.lightBlack,
    },
    profileName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 5,
        color: Colors.white,
    },
    profileJoin: {
        fontStyle: 'italic',
        fontSize: 13,
        color: Colors.white,
    },
    delivered: {
        color: Colors.main,
        fontSize: 16,
    },
    inprogress: {
        color: Colors.paypal,
        fontSize: 16,
    },
    canceled: {
        color: Colors.red,
        fontSize: 16,
    },
    iconSettings: {
        color: Colors.white,
        fontSize: 30,
    },
    editAvatar: {
        position: 'absolute',
        bottom: 10,
        left: 80,
        backgroundColor: Colors.gray,
        borderRadius: 11,
    },
    iconEditAvatar: {
        color: Colors.blue,
        fontSize: 22,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: "90%",
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
    btnFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        width: "100%",
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.gray,
        padding: 15,
        borderRadius: 10,
    },
    btnIcon: {
        color: Colors.main,
        fontSize: 40,
    },
    modalCloseIcon: {
        position: 'absolute',
        fontSize: 30,
        top: 10,
        right: 10,
    }
})
