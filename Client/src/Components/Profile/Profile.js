import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, Modal } from "react-native";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Colors from "../../color";
import Btn from "../Btn";
import { useAuth } from "../../contexts/authContext";
import axios from "axios";
import { NAME_API } from "../../config/ApiConfig";
import Icon from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native";
import { useMap } from "../../contexts/mapContext";

const Inputs = [
  {
    label: "Full Name",
    type: "default",
  },
  {
    label: "Phone Number",
    type: "phone-pad",
  },
  {
    label: "Email",
    type: "email-address",
  },
  {
    label: "Address",
    type: "default",
  },
];

const Profile = () => {
  const [editable, setEditable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { userId } = useAuth();
  const [fullname, setFullname] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const {location, setLocation} = useMap();
  const [formValues, setFormValues] = useState({
    'Full Name': fullname || '',
    'Phone Number': phoneNumber || '',
    'Email': email || '',
    'Address': address || '',
  });
  const navigation = useNavigation();

  // Cập nhật giá trị từ useAuth() khi nó thay đổi
  useEffect(() => {
    setFormValues({
      ...formValues,
      'Full Name': fullname || '',
      'Phone Number': phoneNumber || '',
      'Email': email || '',
      'Address': address || '',
    });
  }, [email, fullname, phoneNumber, address]);


  // Function để cập nhật giá trị khi người dùng nhập
  const handleInputChange = (label, value) => {
    setFormValues({
      ...formValues,
      [label]: value,
    });

    // Cập nhật giá trị tương ứng trong useAuth()
    switch (label) {
      case 'Full Name':
        setFullname(value);
        break;
      case 'Phone Number':
        setPhoneNumber(value);
        break;
      case 'Email':
        setEmail(value);
        break;
      case 'Address':
        setAddress(value);
        break;
      default:
        break;
    }
  };

  function validateEmail(email) {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email);
  }

  const getInfomation = async () => {
    try {
      const response = await axios.get(`${NAME_API.LOCALHOST}/getInformation/${userId}`);
      setFullname(response.data.user.fullname);
      setEmail(response.data.user.email);
      setPhoneNumber(response.data.user.phoneNumber);
      setAddress(response.data.user.address);
    } catch (error) {
      console.error(error);
      throw error; // Xử lý lỗi ở mức component hoặc nơi gọi hàm getInfomation
    }
  };

  const updateProfile = () => {
    setModalVisible(false);
    setEditable(false);

    if (!validateEmail(email)) {
      return Alert.alert("Updated Failed", "Invalid Email")
    }

    axios.put(NAME_API.LOCALHOST + `/update/${userId}`, {
      fullname: fullname,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
    })
      .then(response => {
        if (response.status === 200) {
          Alert.alert('Updated Successfully');
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
  const handleLocateUser = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log(currentLocation);
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  useEffect(() => {
    const getAddressFromCoordinates = async () => {
      try {
        const api = 'AIzaSyDOONue1Xr4ihkImIMKQH4y2E5rnvtlPJ8';
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${api}`
        );
        const data = await response.json();
        if (data.status === 'OK') {
          setAddress(data.results[0].formatted_address);
        }
      } catch (error) {
        console.error('Error fetching location details:', error);
      }
    };

    location && getAddressFromCoordinates();
  }, [location]);

  useEffect(() => {
    setLocation(null);
    getInfomation();
  }, [])

  return (
    <View style={{ height: "100%", backgroundColor: Colors.white, paddingHorizontal: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 30, paddingBottom: 10 }}>
          {Inputs.map((i, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>{i.label}</Text>
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
                // secureTextEntry={i.type === "password" && visiblePassword}
                keyboardType={i.type}
                placeholder={i.label}
                placeholderTextColor={Colors.lightBlack}
                underlineColorAndroid="transparent"
                selectTextOnFocus={true}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                onFocus={() => { }}
                value={formValues[i.label]}
                onChangeText={(text) => handleInputChange(i.label, text)}
                editable={editable}
                multiline // Cho phép nhiều dòng
                numberOfLines={index === 3 ? 2 : 1} // Số dòng tối đa hiển thị khi chưa được thu phóng

              />
              {
                formValues[i.label] !== '' ? null : <Icon name="close-circle" style={styles.iconCancel} />
              }
              {
                i.label === 'Address' && editable &&
                <View style={styles.btnFlex}>
                  <Btn
                    icon="location"
                    bgColor={Colors.blue}
                    text='Current'
                    width='38%'
                    onPress={() => handleLocateUser()}
                  />
                  <Btn
                    icon="map"
                    bgColor={Colors.blue}
                    text='Pick'
                    width='38%'
                    onPress={() => navigation.navigate('Map')}
                  />
                </View>
              }
            </View>
          ))}
        </View>
      </ScrollView>
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
              Are you sure you want to change infomation?
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
      {
        editable ? <View style={styles.btnFlex}>
          <Btn
            bgColor={Colors.red}
            color={Colors.white}
            text="CONFIRM"
            onPress={() => setModalVisible(true)}
            width='45%'
          />
          <Btn
            bgColor={Colors.lightBlack}
            color={Colors.black}
            text="Cancel"
            onPress={() => setEditable(false)}
            width='45%'
          />
        </View>
          :
          <Btn
            bgColor={Colors.main}
            color={Colors.white}
            text="UPDATE PROFILE"
            onPress={() => setEditable(true)}
            
          />
      }


    </View>
  );
};

export default Profile;


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
    marginTop: 10,
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