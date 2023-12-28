import React from 'react';
import { StyleSheet, Text, Pressable, Image, View } from 'react-native';
import Colors from '../color';
import { useNavigation } from "@react-navigation/native";
import Rating from './Rating';
import { AntDesign } from '@expo/vector-icons';

export default function ProductList({ products }) {
    const navigation = useNavigation();
    const handleProductPress = (productId) => {
        navigation.navigate('Product Details', { productId });
    };
    return (
        <View style={styles.productList}>
            {
                products.map((product) => (
                    <Pressable key={product._id} style={styles.product} onPress={()=> handleProductPress(product._id)}>
                        <Image source={{uri : product.thumbnail}} alt={product.title} style={styles.productImage} />
                        <View style={styles.productContent}>
                            <Text style={styles.productName}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                            >
                                {product.title}
                            </Text>
                            <View style={styles.smallContainer}>
                                <View style={styles.priceAndRating}>
                                    <Text style={styles.productPrices}>
                                        ${product.price}
                                    </Text>
                                    <Rating value={product.rating.rate} text={`(${product.rating.rate})`}/>
                                </View>
                                <Pressable style={styles.addToCart}>
                                    <AntDesign name="pluscircle" size={30} color={Colors.paypal} />
                                </Pressable>
                            </View>
                        </View>
                    </Pressable>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    productList: {
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingHorizontal: 5,
        backgroundColor: Colors.subGreen,
    },
    product: {
        width: "49%",
        backgroundColor: Colors.white,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    productImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    productContent: {
        paddingHorizontal: 4,
        paddingTop: 1,
    },
    productPrices: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.red,
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: 5,
    },
    smallContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})