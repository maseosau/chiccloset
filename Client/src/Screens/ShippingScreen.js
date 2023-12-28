import React from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";
import Btn from "../Components/Btn";
import { useAuth } from "../contexts/authContext";
import axios from "axios";
import { NAME_API } from "../config/ApiConfig";

const ShippingInputs = [
  {
    label: "Consignee Name",
    type: "text",
  },
  {
    label: "Phone Number",
    type: "text",
  },
  {
    label: "Address",
    type: "text",
  },
];

function ShippingScreen() {
    const navigation = useNavigation();
  return (
    <View style={{ flex: 1, paddingTop: 40, backgroundColor: Colors.main }}>
      {/* Header */}
      <View style={{ alignItems: "center", paddingBottom: 15 }}>
        <Text style={{ color: Colors.white, fontSize: 14, fontWeight: "bold" }}>
          DELIVERY ADDRESS
        </Text>
      </View>
      {/* Inputs */}
      <View style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: 15 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 5 }}>
            {ShippingInputs.map((input, index) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>{input.label}</Text>
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
                />
              </View>
            ))}
            <Btn text='CONTINUE' bgColor={Colors.main} color={Colors.white}
              onPress={() => navigation.navigate("PaymentScreen")}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ShippingScreen;
