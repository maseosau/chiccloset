import React from "react";
import { View, ScrollView, Text } from "react-native";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Colors from "../color";
import OrderInfo from "../Components/OrderInfo";
import OrderItem from "../Components/OrderItem";
import PlaceOrderModel from "../Components/PlaceOrderModel";

function PlaceOrderScreen() {
    return (
        <View style={{ backgroundColor: Colors.subGreen, flex: 1, paddingTop: 20 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingRight: 20,}} >
                <OrderInfo
                    title="CUSTOMER"
                    subTitle="Admin Doe"
                    text="admin@example.com"
                    icon={<FontAwesome name="user" size={30} color={Colors.white} />}
                />
                <OrderInfo
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
                />
                <OrderInfo
                    title="DELIVER TO"
                    subTitle="Address:"
                    text="Phường Linh Trung, Thành phố Thủ Đức, Tp.Hồ Chí Minh"
                    icon={
                        <Ionicons
                            name="location-sharp"
                            size={30}
                            color={Colors.white}
                        />
                    }
                />
            </ScrollView>
            {/* Order Item */}
            <View style={{ paddingHorizontal: 6, flex: 1, paddingBottom: 3 }}>
                <Text style={{ fontWeight: "bold", fontSize: 15, marginBottom: 4 }}>
                    PRODUCTS
                </Text>
                <OrderItem />
                {/* Total */}
                <PlaceOrderModel />
            </View>
        </View>
    );
}

export default PlaceOrderScreen;
