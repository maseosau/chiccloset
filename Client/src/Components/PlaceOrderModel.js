import React, { useState } from "react";
import { Modal, View, Text, Pressable } from "react-native";
import Colors from "../color";
import Btn from "./Btn";
import { useNavigation } from "@react-navigation/native";

const OrdersInfos = [
  {
    title: "Products",
    price: 125.77,
    color: "black",
  },
  {
    title: "Shipping",
    price: 34.00,
    color: "black",
  },
  {
    title: "Tax",
    price: 23.34,
    color: "black",
  },
  {
    title: "Total Amount",
    price: 3458.00,
    color: "main",
  },
];

const PlaceOrderModel = () => {
  const [showModel, setShowModel] = useState(false);

  const navigation = useNavigation();
  return (
    <View>
      <Btn
        bgColor={Colors.main}
        color= {Colors.white}
        text= "SHOW TOTAL"
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
            <Text>Order</Text>
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
                    ${i.price}
                  </Text>
                </View>
              ))}
            </View>

            <Btn
              bgColor={Colors.main}
              color= {Colors.white}
              text= "PLACE AN ORDER"
              // onPress={() => }
              onPress={() => {
                setShowModel(false);
                navigation.navigate("OrderScreen");
              }}
            />
            <Btn
              bgColor={Colors.paypal}
              color= {Colors.white}
              text= "CANCEL"
              // onPress={() => }
              onPress={() => {
                setShowModel(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PlaceOrderModel;
