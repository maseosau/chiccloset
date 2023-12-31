import React, {useState} from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, ToastAndroid } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Colors from "../color";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NAME_API } from "../config/ApiConfig";
import axios from "axios";

const paymentMethods = [
  {
    image: require("../../assets/images/paypal.png"),
    alt: "paypal",
    icon: "Ionicons",
    checked: 1,
  },
  {
    image: require("../../assets/images/momo.png"),
    alt: "momo",
    icon: "FontAwesome",
    checked: 0,
  },
  {
    image: require("../../assets/images/zalopay.png"),
    alt: "zalopay",
    icon: "FontAwesome",
    checked: 0,
  },
];

export default function PaymentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const order = route.params.order;
  const [checkedMethod, setCheckedMethod] = useState('paypal');
  // console.log(order._id);
  const [selectedMethod, setSelectedMethod] = useState(null);
  // paymentMethods[0].checked = 1;
  const handleChangeMethod = (index) => {
    paymentMethods.map((method, index) => (
      method.checked = 0
    ))
    paymentMethods[index].checked = 1;
    setSelectedMethod(index);
    setCheckedMethod(paymentMethods[index].alt);
    // console.log(checkedMethod);
  }
  const payOrder = (OrderInfo) => {
    if (OrderInfo) {
      axios.post(`${NAME_API.LOCALHOST}/payOrder/${OrderInfo._id}`, {
        paymentMethod: checkedMethod,
        orderId: OrderInfo._id
      })
        .then(response => {
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          // Cập nhật lại phương thức thanh toán mặc định sau khi thành công
          handleChangeMethod(0);
        })
        .catch(err => {
          console.log(err);
          if (err.response && err.response.data && err.response.data.message) {
            // If there's a meaningful error message in the response from the server
            ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
          } else {
            // If the error object doesn't contain a specific message, display a generic error
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
          }
        });
    }
  }
  return (
    <View style={{ flex: 1, paddingTop: 40, backgroundColor: Colors.main }}>
      {/* Header */}
      <View style={{ alignItems: "center", paddingBottom: 15 }}>
        <Text style={{ color: Colors.white, fontSize: 14, fontWeight: "bold" }}>
          PAYMENT METHOD
        </Text>
      </View>
      {/* Selection */}
      <View style={{ flex: 1, backgroundColor: Colors.subGreen, paddingHorizontal: 15 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 5 }}>
            {paymentMethods.map((method, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: Colors.white,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  justifyContent: "space-between",
                  borderRadius: 10,
                  marginBottom: 10,
                }}
                onPress={() => handleChangeMethod(index)}
              >
                <View>
                  <Image
                    source={method.image}
                    resizeMode="contain"
                    style={{ width: 60, height: 50 }}
                  />
                </View>
                {method.checked === 1 ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={30}
                    color={Colors.main}
                  />
                ) : (
                  <FontAwesome
                    name="circle-thin"
                    size={30}
                    color={Colors.main}
                  />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={{
                backgroundColor: Colors.main,
                paddingVertical: 10,
                alignItems: "center",
                marginTop: 10,
                borderRadius: 50,
              }}
              onPress={() => {
                payOrder(order);
                // navigation.navigate("Order Detail",{order});
                navigation.navigate("Profile");
              }}
            >
              <Text style={{ color: Colors.white }}>PAY</Text>
            </TouchableOpacity>
            <Text style={{ fontStyle: "italic", textAlign: "center", marginTop: 10 }}>
              Payment method is <Text style={{ fontWeight: "bold" }}>Paypal</Text> by default
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
