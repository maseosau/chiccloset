import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator, TouchableOpacity } from "react-native";
import Colors from "../../color";
import { useAuth } from "../../contexts/authContext";
import axios from "axios";
import { NAME_API } from "../../config/ApiConfig";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

// Hàm chuyển đổi và định dạng ngày tháng
const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return dateObject.toLocaleDateString(undefined, options);
};

const Orders = () => {
    const navigation = useNavigation(); 
    const { userId } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const getOrderInfomation = async () => {
        try {
            const response = await axios.get(`${NAME_API.LOCALHOST}/getOrderInformation/${userId}`);
            setOrders(response.data.orders);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            throw error; // Xử lý lỗi ở mức component hoặc nơi gọi hàm getInfomation
        }
    };
    useEffect(() => {
        getOrderInfomation();
    }, []);
    useFocusEffect(
        React.useCallback(() => {
            getOrderInfomation();
        }, [])
      );
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.main} />
            </View>
        );
    }

    return (
        <View style={{ height: "100%", backgroundColor: Colors.white, paddingVertical: 30, paddingHorizontal: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    orders.reverse().map((order, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate("Order Detail",{order})}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    // justifyContent: "space-between",
                                    alignItems: "center",
                                    backgroundColor: order.paid ? Colors.deepGray : Colors.white, // Thay đổi màu nền dựa trên trạng thái paid
                                    paddingVertical: 10,
                                    paddingHorizontal: 5,
                                    marginBottom: 5,
                                    borderRadius: 5,
                                }}
                            >
                                <Text style={{ fontSize: 12, color: Colors.blue, width: '20%', paddingHorizontal: 2 }} numberOfLines={1}>
                                    {order._id}
                                </Text>
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: order.paid ? Colors.main : Colors.red, width: '25%', paddingHorizontal: 2 }} numberOfLines={1}>
                                    {order.paid ? "PAID" : "NOT PAID"}
                                </Text>
                                <Text style={{ fontSize: 13, fontStyle: "italic", color: Colors.black, width: '25%', paddingHorizontal: 2 }} numberOfLines={1}>
                                    {formatDate(order.orderDate)}
                                </Text>
                                <View
                                    style={{
                                        paddingHorizontal: 7,
                                        paddingVertical: 2,
                                        borderRadius: 50,
                                        backgroundColor: order.paid ? Colors.main : Colors.red,
                                        width: '30%',
                                        paddingHorizontal: 2
                                    }}
                                >
                                    <Text style={{ color: Colors.white, textAlign: 'center' }}>${order.totalPrice.toFixed(2)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    );
};

export default Orders;
