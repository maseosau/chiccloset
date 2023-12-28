import React from "react";
import { FlatList, Pressable, Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Products from "../data/Products";
import Colors from "../color";

const OrderItem = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={Products.slice(0, 3)}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <View style={styles.container}>
            <View
              style={styles.productContainer}
            >
              <View style={styles.imageBox}>
                <Image
                  source={item.image}
                  alt={item.name}
                  style={styles.imageStyles}
                />
              </View>
              <View style={styles.productInfo}>
                <Text
                  numberOfLines={1}
                  style={styles.productName}
                >
                  {item.name}
                </Text>
                <Text style={styles.productPrice}>
                  ${item.price}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.quantityBox}
                >
                  <Text style={styles.quantity}>5</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 3,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 10,
    overflow: "hidden",
    height: 100,
  },
  imageBox: {
    width: "25%",
    height: "100%", 
    backgroundColor: Colors.deepGray,
  },
  imageStyles: { 
    width: "80%", 
    height: "80%", 
    resizeMode: "contain" 
  },
  productInfo: { 
    width: "60%", 
    paddingHorizontal: 2 
  },
  productName: { 
    color: Colors.black, 
    fontWeight: "bold", 
    fontSize: 12 
  },
  productPrice: { 
    color: Colors.lightBlack, 
    marginTop: 2, 
    fontWeight: "bold" 
  },
  quantityBox: {
    backgroundColor: Colors.main,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  quantity: { 
    color: Colors.white 
  },
})