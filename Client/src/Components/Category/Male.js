import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, ScrollView, Pressable, Image, View, ActivityIndicator } from 'react-native';
import Colors from '../../color';
import ProductList from "../ProductList";
import Products from "../../data/Products";
import axios from "axios";
import { NAME_API } from "../../config/ApiConfig"

export default function Male() {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const getProducts = () => {
        axios.get(NAME_API.LOCALHOST + '/products')
            .then((response) => {
                const classifiedProducts = response.data.products.filter(item => item.category === 'Nam');
                setProducts(classifiedProducts);
            })
            .catch(err => console.log(err))
            .finally(() => {
              setLoading(false);
            });
    }

    useEffect(() => {
        getProducts();
    }, [])
    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={Colors.main} />
          </View>
        );
    } 
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