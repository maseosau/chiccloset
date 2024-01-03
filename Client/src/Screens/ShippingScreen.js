import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import Colors from "../color";
import { useNavigation, useRoute } from "@react-navigation/native";
import Btn from "../Components/Btn";
import { useAuth } from "../contexts/authContext";
import axios from "axios";
import { NAME_API } from "../config/ApiConfig";
import { useMap } from "../contexts/mapContext";
import * as Location from 'expo-location';

const ShippingInputs = [
  {
    label: "Consignee Name",
    type: "default",
  },
  {
    label: "Phone Number",
    type: "numeric",
  },
  {
    label: "Address",
    type: "default",
  },
];



function ShippingScreen() {
  const route = useRoute();
  const { location, setLocation } = useMap();
  const { userId } = useAuth();
  const [consignee, setConsignee] = useState({});
  consignee.products = route.params.data;
  const navigation = useNavigation();
  const getInformation = async () => {
    try {
      const response = await axios.get(`${NAME_API.LOCALHOST}/getInformation/${userId}`);
      setConsignee(response.data.user);
    }
    catch {
      console.error(error);
      throw error; // Xử lý lỗi ở mức component hoặc nơi gọi hàm getInfomation
    }
  }



  const handleInputChange = (index, text, defaultValue) => {
    if (index === 0) {
      consignee.fullname = text;
      if (text === "") consignee.fullname = defaultValue.fullname;
    }
    else if (index === 1) {
      consignee.phoneNumber = text;
      if (text === "") consignee.phoneNumber = defaultValue.phoneNumber;
    }
    else {
      consignee.address = text;
      if (text === "") consignee.address = defaultValue.address;
    }
  }
  const handleSubmit = (consignee) => {
    if (consignee.phoneNumber === '') {
      Alert.alert('Invalid phone number', 'Please enter a phone number')
    }
    else if (consignee.phoneNumber.length < 10) {
      Alert.alert('Invalid address', 'Please enter a valid phone number')
    }
    else if (consignee.address === '') {
      Alert.alert('Invalid address', 'Please enter a address')
    }
    else {
      navigation.navigate("PlaceorderScreen", { consignee })
    }
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
          setConsignee(prevConsignee => ({
            ...prevConsignee,
            address: data.results[0].formatted_address
          }));
        }
      } catch (error) {
        console.error('Error fetching location details:', error);
      }
    };

    location && getAddressFromCoordinates();
  }, [location]);

  useEffect(() => {
    setLocation(null);
    getInformation();
  }, [])

  return (
    <View style={{ flex: 1, paddingTop: 40, backgroundColor: Colors.main }}>
      {/* Header */}
      <View style={{ alignItems: "center", paddingBottom: 15 }}>
        <Text style={{ color: Colors.white, fontSize: 20, fontWeight: "bold" }}>
          DELIVERY ADDRESS
        </Text>
      </View>
      {/* Inputs */}
      <View style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: 15 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 5 }}>
            {ShippingInputs.map((input, index) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{input.label}</Text>
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
                  keyboardType={input.type}
                  underlineColorAndroid="transparent" // for Android
                  value={index === 0 ? consignee.fullname : (index === 1 ? consignee.phoneNumber : consignee.address)}
                  onChangeText={(text) => handleInputChange(index, text, consignee)}
                  // multiline={false}
                  required
                />
                {
                  input.label === "Address" &&
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 10,
                  }}>
                    <Btn
                      icon="location"
                      bgColor={Colors.blue}
                      text='Current'
                      width='37%'
                      onPress={() => handleLocateUser()}
                    />
                    <Btn
                      icon="map"
                      bgColor={Colors.blue}
                      text='Pick'
                      width='37%'
                      onPress={() => navigation.navigate('Map')}
                    />
                  </View>
                }
              </View>
            ))}
            <Btn text='CONTINUE' bgColor={Colors.main} color={Colors.white}
              onPress={() => { handleSubmit(consignee) }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ShippingScreen;
