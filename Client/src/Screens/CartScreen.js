// import { Box, Button, Center, HStack, ScrollView, Text, View } from "native-base"; 
// import React from "react";
// import Colors from "../color";
// import CartEmpty from "../Components/CartEmpty";
// import CartItem from "../Components/CartItem";

// function CartScreen() {
//     return (
//         <Box flex={1} safeAreaTop bg={Colors.subGreen}>
//             {/* Header */}
//             <Center w="full" py={5}>
//                 <Text color={Colors.black} fontSize={20} bold>
//                     Cart 
//                 </Text>
//             </Center>
//             {/* IF CART IS EMPTY */}
//             {/* <CartEmpty /> */}
//             {/* CART ITEMS */}
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 <CartItem />
//                 {/* Total */}
//                 <Center mt={5}>
//                     <HStack 
//                         rounded={50} 
//                         justifyContent="space-between" 
//                         bg={Colors.white} 
//                         shadow={2}
//                         w="90%"
//                         pl={5}
//                         h={45}
//                         alignItems="center"
//                     >
//                         <Text>Total</Text>
//                         <Button 
//                             px={10} 
//                             h={45} 
//                             rounded={50} 
//                             bg={Colors.main} 
//                             _text={{
//                                 color: Colors.white,
//                                 fontWeight: "semibold",
//                             }}
//                             _pressed={{
//                                 bg: Colors.main,
//                             }}
//                         >
//                             $356
//                         </Button>
//                     </HStack>
//                 </Center>

//                 {/* Checkout */}
//                 <Center px={5} >
//                     <Button 
//                         bg={Colors.black}
//                         color={Colors.main}
//                         mt={10}
//                     >
//                         CHECKOUT
//                     </Button>
//                 </Center>
//             </ScrollView>
//         </Box>
//     );
// }
// export default CartScreen;

// import React from "react";
// import { View, Text } from "react-native"; 
// import Colors from "../color";


import React from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native"; // Import necessary components from react-native
import Colors from "../color";
import CartEmpty from "../Components/CartEmpty";
import CartItem from "../Components/Carttem";
import Btn from "../Components/Btn";
import { useNavigation } from "@react-navigation/native";

function CartScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.subGreen }}>
            {/* Header */}
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
            {/* IF CART IS EMPTY */}
            {/* <CartEmpty /> */}
            {/* CART ITEMS */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <CartItem />
                {/* Total */}
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
                            $356
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Checkout */}
                <View style={{ 
                        paddingHorizontal: 5, 
                        marginTop: 10,
                        paddingVertical: 10,
                        alignItems: "center",
                        marginBottom: 25,
                    }}
                >
                    {/* <TouchableOpacity
                        style={{
                            backgroundColor: Colors.black,
                            borderRadius: 50,
                            paddingVertical: 10,
                            alignItems: "center",
                            marginBottom: 31,
                        }}
                    >
                        <Text style={{ color: Colors.main }}>CHECKOUT</Text>
                    </TouchableOpacity> */}
                    <Btn bgColor={Colors.black} color={Colors.white} text='CHECKOUT'  onPress={() => navigation.navigate("ShippingScreen")}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default CartScreen;
