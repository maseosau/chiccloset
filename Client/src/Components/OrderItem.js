import React from "react";
import { FlatList, Pressable, Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
// import Products from "../data/Products";
import Colors from "../color";

const OrderItem = ({Products}) => {
  // console.log(Products.product)
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      // data={Products.slice(0, 3)}
      data={Products}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        // <TouchableOpacity>
        //   <View style={styles.container}>
        //     <View
        //       style={styles.productContainer}
        //     >
        //       <View style={styles.imageBox}>
        //         <Image
        //           source={{ uri: item.product.thumbnail }}
        //           alt={item.product.title}
        //           style={styles.imageStyles}
        //         />
        //       </View>
        //       <View style={styles.productInfo}>
        //         <Text
        //           numberOfLines={1}
        //           style={styles.productName}
        //         >
        //           {item.product.title}
        //         </Text>
        //         <Text style={styles.productPrice}>
        //           Total: ${item.product.price*item.quantity}
        //         </Text>
        //       </View>
        //       <View>
        //         <TouchableOpacity
        //           style={styles.quantityBox}
        //         >
        //           <Text style={styles.quantity}>{item.quantity}</Text>
        //         </TouchableOpacity>
        //       </View>
        //     </View>
        //   </View>
        // </TouchableOpacity>
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
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  // container: {
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