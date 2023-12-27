import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, StatusBar, FlatList } from "react-native";
import HomeSearch from "../Components/HomeSearch";
import axios from "axios";
import { NAME_API } from "../config/ApiConfig";
import ProductList from "../Components/ProductList";
import { useRoute } from "@react-navigation/native";
import Loading from "../Components/Loading";
import SeachNoResult from "../Components/SearchNoResult";

export default function SearchScreen() {
    const route = useRoute();
    const { keyword } = route.params;
    const [products, setProducts] = useState(null);

    useEffect(() => {
        axios.get(NAME_API.LOCALHOST + `/search/${keyword}`)
            .then(response => {
                if (response.status === 200) {
                    setProducts(response.data.products);
                }
                else {
                    console.log("Error");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [keyword]);

    return (
        <>
            <HomeSearch />
            <Text style={styles.searchKeyword}>
                Result for search: {keyword}
            </Text>
            {products ? (products.length ?
                <ScrollView>
                    <ProductList products={products} />
                </ScrollView>
                :
                <SeachNoResult />
            ) :
                <Loading />
            }
        </>
    )
}

const styles = StyleSheet.create({
    searchKeyword: {
        fontSize: 14,
        marginTop: 10,
        marginLeft: 10,
    }
})