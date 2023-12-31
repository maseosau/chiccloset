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
    },[])
    return (
        <View style={{ backgroundColor: Colors.subGreen, flex: 1, paddingTop: 20 }}>
            <View style={{ flex:1, flexDirection: "row", justifyContent: "space-around"}}>
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingRight: 20, flex:1}} > */}
                <OrderInfo
                    title="CONSIGNEE"
                    subTitle={consignee.fullname}
                    text={"Phone: " + consignee.phoneNumber}
                    icon={<FontAwesome name="user" size={30} color={Colors.white} />}
                />
                {/* <OrderInfo
                    title="SHIPPING INFO"
                    subTitle="Shipping: Ma Seo Sau"
                    text="Pay Method: PayPal"
                    icon={
                        <FontAwesome5
                            name="shipping-fast"
                            size={30}
                            color={Colors.white}
                        />
                    }
                /> */}
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
            {/* </ScrollView> */}
            </View>
            {/* Order Item */}
            <View style={{ paddingHorizontal: 6, flex: 1, paddingBottom: 3 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 4 }}>
                    PRODUCTS
                </Text>
                <OrderItem Products={consignee.products}/>
                {/* Total */}
                <PlaceOrderModel Products={consignee.products} Consignee={consignee}/>
            </View>
        </View>
    );
}

export default PlaceOrderScreen;
