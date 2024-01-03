import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import HomeSearch from "../Components/HomeSearch";
import axios from "axios";
import { NAME_API } from "../config/ApiConfig";
import ProductList from "../Components/ProductList";
import { useRoute } from "@react-navigation/native";
import Loading from "../Components/Loading";
import SeachNoResult from "../Components/SearchNoResult";
import Colors from "../color";

export default function SearchScreen() {
    const route = useRoute();
    const { keyword } = route.params;
    const { allProducts } = route.params;
    const [products, setProducts] = useState(null);

    const removeAccents = (str) => {
        // Chuẩn hóa và xóa dấu
        const withoutAccents = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        // Chuyển về chữ thường
        return withoutAccents.toLowerCase();
      };

    useEffect(() => {
        // Thực hiện việc lọc sản phẩm khi allProducts thay đổi
        const filteredProducts = allProducts.filter(product => removeAccents(product.title).includes(removeAccents(keyword)));
    
        // Cập nhật state của products với sản phẩm đã lọc
        setProducts(filteredProducts);
      }, [allProducts, keyword]); // useEffect sẽ được gọi lại khi allProducts thay đổi

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