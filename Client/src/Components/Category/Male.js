import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, ScrollView, Pressable, Image, View } from 'react-native';
import Colors from '../../color';
import ProductList from "../ProductList";
import Products from "../../data/Products";
import axios from "axios";
import { NAME_API } from "../../config/ApiConfig"

export default function Male() {
    const [products, setProducts] = useState(null);
    
    const getProducts = () => {
        axios.get(NAME_API.LOCALHOST + '/products')
            .then((response) => {
                const classifiedProducts = response.data.products.filter(item => item.category === 'Nam');
                setProducts(classifiedProducts);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getProducts();
    }, [])
    return (
        <ScrollView style={styles.productListContainer}>
            <ProductList products={products || []} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    productListContainer: {
        flex: 1,
        padding: 10,
    },
})