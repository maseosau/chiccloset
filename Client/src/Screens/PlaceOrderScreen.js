import React, { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Colors from "../color";
import OrderInfo from "../Components/OrderInfo";
import OrderItem from "../Components/OrderItem";
import PlaceOrderModel from "../Components/PlaceOrderModel";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import axios from "axios";
import { NAME_API } from "../config/ApiConfig";

function PlaceOrderScreen() {
    const route = useRoute();
    const [consignee, setConsignee] = useState([]);
    useEffect(() => {
        setConsignee(route.params.consignee);
    }, [])
    return (
        <View style={{ backgroundColor: Colors.subGreen, flex: 1, paddingTop: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <OrderInfo
                    title="CONSIGNEE"
                    subTitle={consignee.fullname}
                    text={"Phone: " + consignee.phoneNumber}
                    icon={<FontAwesome name="user" size={30} color={Colors.white} />}
                />
                <OrderInfo
                    title="DELIVER TO"
                    subTitle="Address:"
                    text={consignee.address}
                    icon={
                        <Ionicons
                            name="location-sharp"
                            size={30}
                            color={Colors.white}
                        />
                    }
                />
            </View>
            {/* Order Item */}
            <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 4 }}>
                PRODUCTS
            </Text>
            <OrderItem Products={consignee.products} />
            {/* Total */}
            <PlaceOrderModel Products={consignee.products} Consignee={consignee} />
        </View>
    );
}

export default PlaceOrderScreen;
