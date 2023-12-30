import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Colors from "../color";
import HomeProducts from "../Components/HomeProducts";
import HomeSearch from "../Components/HomeSearch";
import Collection from "../Components/Collection";
import HomeCarousel from "../Components/HomeCarousel";
import { useAuth } from "../contexts/authContext";
import { useCart } from "../contexts/cartContext";
import axios from "axios";
import { NAME_API } from "../config/ApiConfig";
import ProductList from "../Components/ProductList";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const { userId } = useAuth();
  const { setQuantityInCart } = useCart();
  const collections = [
    {
      title: "Hot Deals",
      sort: (a, b) => a.price - b.price,
      icon: require("../../assets/images/fire.png")
    },
    {
      title: "New Arrivals",
      sort: (a, b) => b.rating.rate - a.rating.rate,
      icon: require("../../assets/images/medal.png")
    },
  ];

  const getCarts = () => {
    axios.get(NAME_API.LOCALHOST + `/carts/${userId}`)
      .then(response => {
        setQuantityInCart(response.data.carts.length);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const renderCollectionItem = ({ item }) => (
    <Collection title={item.title} sort={item.sort} icon={item.icon} />
  );


  useEffect(() => {
    getCarts();
  }, [])

  return (
    <View style={styles.homeContainer}>
      <HomeSearch />
      <FlatList
        data={collections}
        renderItem={renderCollectionItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<HomeCarousel />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: Colors.subGreen,
  }
})

export default HomeScreen;