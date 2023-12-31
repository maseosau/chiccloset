import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, ToastAndroid } from "react-native";
import Colors from "../color";
import Btn from "./Btn";
import { useNavigation } from "@react-navigation/native";
import { NAME_API } from "../config/ApiConfig";
import axios from "axios";

const OrdersInfos = [
  {
    title: "Products",
    price: 0,
    color: "black",
  },
  {
    title: "Shipping",
    price: 0,
    color: "black",
  },
  {
    title: "Total Amount",
    price: 0,
    color: "main",
  },
];

const PlaceOrderModel = ({ Products, Consignee }) => {
  const [showModel, setShowModel] = useState(false);
  const navigation = useNavigation();
  const [consignee, setConsignee] = useState([]);
  const calTotal = (productsArr) => {
    if (productsArr) {
      OrdersInfos[0].price = 0;
      productsArr.forEach(element => {
        OrdersInfos[0].price += element.product.price * element.quantity;
      });
      OrdersInfos[2].price = OrdersInfos[0].price + OrdersInfos[1].price;
      setConsignee(Consignee);
      consignee.totalPrice = OrdersInfos[2].price;
      consignee.paymentMethod = "";
      // console.log(consignee)
    }
  }
  useEffect(() => {
    calTotal(Products);
  })
  const currentDate = new Date();

  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, cộng thêm 1 để lấy tháng thực tế
  const currentYear = currentDate.getFullYear();

  const formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;

  const placeAnOrder = (OrderInfo) => {
    if (OrderInfo) {
      const productArray = OrderInfo.products.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        size: item.size
      }));
      axios.post(NAME_API.LOCALHOST + '/placeAnOrder', {
        user: OrderInfo._id,
        products: productArray,
        delivered: 0,
        paid: 0,
        orderDate: formattedDate,
        totalPrice: OrderInfo.totalPrice,
        consignee: OrderInfo.fullname,
        consigneePhone: OrderInfo.phoneNumber,
        shippingAddress: OrderInfo.address,
        paymentMethod: OrderInfo.paymentMethod
      })
        .then(response => {
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          navigation.navigate("CartScreen");
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
    <View>
      <Btn
        bgColor={Colors.main}
        color={Colors.white}
        text="SHOW TOTAL"
        onPress={() => setShowModel(true)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModel}
        onRequestClose={() => setShowModel(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: 350,
            }}
          >
            <Text style={{
                  textAlign:'center',
                  fontSize: 25,
                  fontWeight: 'bold',
                  marginBottom: 7,
                  color: Colors.main,
                }}
              >
                ORDER
              </Text>
            <View>
              {OrdersInfos.map((i, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 7,
                  }}
                >
                  <Text style={{ fontWeight: "medium" }}>{i.title}</Text>
                  <Text
                    style={{
                      color: i.color === "main" ? Colors.main : Colors.black,
                      fontWeight: "bold",
                    }}
                  >
                    ${i.price.toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.buttonInTotal}>
              <Btn
                bgColor={Colors.main}
                color={Colors.white}
                text="ORDER"
                // onPress={() => }
                onPress={() => {
                  placeAnOrder(consignee);
                  setShowModel(false);
                  // navigation.navigate("PaymentScreen",{consignee});
                }}
              />
              <Btn
                bgColor={Colors.paypal}
                color={Colors.white}
                text="CANCEL"
                // onPress={() => }
                onPress={() => {
                  setShowModel(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PlaceOrderModel;

const styles = StyleSheet.create({
  buttonInTotal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }
})