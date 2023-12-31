import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native"; // Import necessary components from react-native
import Colors from "../color";
import CartEmpty from "../Components/CartEmpty";
import CartItem from "../Components/Carttem";
import Btn from "../Components/Btn";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCart } from "../contexts/cartContext";
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import { NAME_API } from '../config/ApiConfig';
function CartScreen() {
    const [cartItems, setCartItems] = useState(null);
    const navigation = useNavigation();
    const [totalPrice, setTotalPrice] = useState(0);
    const { quantityInCart } = useCart();
    const { userId } = useAuth();
    const getCarts = () => {
        axios.get(NAME_API.LOCALHOST + `/carts/${userId}`)
            .then(response => {
                setCartItems(response.data.carts);
                // console.log(cartItems);
            })
            .catch(err => {
                console.log("Error get carts " + err);
            })
    }
    
    useEffect(() => {
        getCarts();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getCarts();
        }, [])
      );
    return (
        quantityInCart === 0 ? 
        <CartEmpty /> :
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.subGreen }}>
            <View
                style={{
                    alignItems: "center",
                    paddingVertical: 5,
                }}
            >
                <Text style={{ color: Colors.black, fontSize: 30, fontWeight: "bold" }}>
                    Cart
                </Text>
            </View>
            <CartItem setTotalPrice={setTotalPrice} setCartItems={setCartItems}/>
            <View
                style={{
                    marginTop: 5,
                    marginHorizontal: "5%",
                    borderRadius: 50,
                    justifyContent: "space-between",
                    backgroundColor: Colors.white,
                    elevation: 2,
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Text>Total</Text>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 10,
                        height: 45,
                        borderRadius: 50,
                        backgroundColor: Colors.main,
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            color: Colors.white,
                            fontWeight: "bold",
                        }}
                    >
                        ${totalPrice.toFixed(2)}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{
                paddingHorizontal: 5,
                marginTop: 10,
                paddingVertical: 10,
                alignItems: "center",
                // marginBottom: 25,
            }}
            >
                <Btn bgColor={Colors.black} color={Colors.white} text='CHECKOUT' onPress={() => navigation.navigate("ShippingScreen", {data: cartItems})} />
            </View>
        </SafeAreaView>
    );
}

export default CartScreen;
