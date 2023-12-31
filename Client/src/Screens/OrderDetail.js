import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Modal, View, Text, StyleSheet, ToastAndroid, Image, ActivityIndicator } from "react-native";
import Colors from "../color";
// import Btn from "./Btn";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { NAME_API } from "../config/ApiConfig";
import axios from "axios";
import { useCart } from "../contexts/cartContext";
import OrderItem from "../Components/OrderItem";
import Btn from "../Components/Btn";
import { useAuth } from "../contexts/authContext";

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

const OrderDetail = () => {
  const { userId } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  // const order = route.params.order;
  const [order, setOrder] = useState(route.params.order);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // const getOrderInfomation = async () => {
  //   try {
  //     const response = await axios.get(`${NAME_API.LOCALHOST}/getOrderInformation/${userId}`);
  //     if(response.data.orders){
  //       setOrders(response.data.orders);
  //       setLoading(false);
  //       // setOrder(orders.find(orderItem => orderItem._id === order._id));
  //     }
  //     console.log(orders);
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //     throw error; // Xử lý lỗi ở mức component hoặc nơi gọi hàm getInfomation
  //   }
  // };
  // useEffect(() => {
  //   getOrderInfomation();
  // }, []);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     getOrderInfomation();
  //   }, [])
  // );
  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color={Colors.main} />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <View style={styles.orderInformation}>
        <Text style={styles.information}>Order Id: {order._id}</Text>
        <Text style={styles.information}>Consignee Name: {order.consignee}</Text>
        <Text style={styles.information}>Consignee Phone: {order.consigneePhone}</Text>
        <Text style={styles.information}>Address: {order.shippingAddress}</Text>
        <Text style={styles.information}>Order Date: {order.orderDate}</Text>
        <Text style={styles.information}>
          Payment Method: {order.paid === 1 ? order.paymentMethod : '(not paid)'}
        </Text>
        <Text style={styles.information}>
          Delivery Status: {order.delivered === 1 && order.paid === 1 ? 'Delivered' : 'Not delivery'}
        </Text>
        <View style={styles.orderStatus}>
          <Text style={{
            color: order.paid ? Colors.main : Colors.red,
            // backgroundColor: order.paid ? Colors.main : Colors.red,
            // width: '30%',
            fontSize: 25,
            fontWeight: 'bold',
            // textAlign: 'center',
            // borderRadius: 50,
          }}>
            {order.paid ? 'PAID' : 'NOT PAID'}
          </Text>
          <Text style={{
            color: Colors.white,
            backgroundColor: order.paid ? Colors.main : Colors.red,
            width: 'auto',
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            borderRadius: 50,
            paddingHorizontal: 10,
          }}>
            Total: ${order.totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
      <Text style={styles.productTag}>PRODUCTS</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        // data={Products.slice(0, 3)}
        data={order.products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable>
            <View style={styles.itemContainer}>
              <View style={styles.item}>
                <View style={styles.cartItemImageContainer}>
                  <Image
                    source={{ uri: item.product.thumbnail }}
                    alt={item.product.title}
                    style={styles.cartItemImage}
                  />
                </View>
                <View style={styles.cartItemContent}>
                  <Text style={styles.cartItemName} numberOfLines={2} ellipsizeMode='tail'>
                    {item.product.title}
                  </Text>
                  <Text style={styles.cartItemPrice}>
                    ${item.product.price}
                  </Text>
                  <Text style={styles.cartItemSize}>
                    Size: {item.size}
                  </Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text style={styles.totalPrice}>
                    Total: ${(item.product.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />
      <View style={{
        marginTop: 10,
        display: order.paid ? 'none' : 'flex',
      }}
      >
        <Btn
          text='PAY' bgColor={Colors.main} color={Colors.white}
          onPress={() => navigation.navigate("PaymentScreen", { order })}
        />
      </View>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: Colors.subGreen,
  },
  // orderInformation: {
  //   width: 50,
  //   height: 50,
  // },
  information: {
    fontSize: 15,
    fontWeight: 'bold',
    // color: Colors.main,
  },
  orderStatus: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flex: 1,
  },
  productTag: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  // listContainer: {
  //   marginBottom: 3,
  // },
  // productContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: Colors.white,
  //   shadowColor: Colors.black,
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.8,
  //   shadowRadius: 2,
  //   borderRadius: 10,
  //   overflow: "hidden",
  //   height: 100,
  // },
  // imageBox: {
  //   width: "25%",
  //   height: "100%",
  //   backgroundColor: Colors.deepGray,
  // },
  // imageStyles: {
  //   width: "100%",
  //   height: "100%",
  //   resizeMode: "contain"
  // },
  // productInfo: {
  //   width: "60%",
  //   paddingHorizontal: 2
  // },
  // productName: {
  //   color: Colors.black,
  //   fontWeight: "bold",
  //   fontSize: 12
  // },
  // productPrice: {
  //   color: Colors.red,
  //   marginTop: 2,
  //   fontWeight: "bold"
  // },
  // quantityBox: {
  //   backgroundColor: Colors.main,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   paddingVertical: 5,
  //   paddingHorizontal: 10,
  // },
  // quantity: {
  //   color: Colors.white
  // },
  // buttonBox: {
  //   marginTop: 10,
  //   display: order.paid ? 'flex' : 'none',
  // }

  itemContainer: {
    // marginHorizontal: 10,
    // marginTop: 10,
    marginBottom: 10,
  },
  item: {
    backgroundColor: Colors.white,
    shadowOffset: 1,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartItemImageContainer: {
    width: '25%',
    backgroundColor: Colors.deepGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    height: 120,
  },
  cartItemImage: {
    width: '100%',
    resizeMode: 'contain',
    height: "100%",
  },
  cartItemContent: {
    width: '70%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'column',
    gap: 5,
  },
  cartItemName: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 14,
  },
  cartItemPrice: {
    color: Colors.red,
    fontWeight: 'bold',
  },
  iconDelete: {
    fontSize: 24,
    color: Colors.white,
  },
  cartItemContainer: {
    marginRight: 10,
  },
  totalPrice: {
    position: 'absolute',
    right: 10,
    top: 70,
    fontSize: 16,
    fontWeight: 'bold',
  }
})