import React from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";
import Btn from "../Components/Btn";

const ShippingInputs = [
  {
    label: "ENTER CITY",
    type: "text",
  },
  {
    label: "ENTER COUNTRY",
    type: "text",
  },
  {
    label: "ENTER POSTAL CODE",
    type: "text",
  },
  {
    label: "ENTER ADDRESS",
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
                    borderWidth: 0.2,
                    borderColor: Colors.main,
                    backgroundColor: Colors.subGreen,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    color: Colors.main,
                    marginTop: 5,
                  }}
                  keyboardType={input.type}
                  underlineColorAndroid="transparent" // for Android
                />
              </View>
            ))}
            <TouchableOpacity
              style={{
                backgroundColor: Colors.main,
                paddingVertical: 10,
                alignItems: "center",
                marginTop: 10,
              }} 
              onPress={() => navigation.navigate("PaymentScreen")}
            >
              <Text style={{ color: Colors.white }}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ShippingScreen;
