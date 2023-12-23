import React, { useState, useEffect } from "react";
import { Image, View, Text, ScrollView, StyleSheet } from "react-native";
import Colors from "../color";
import NumericInput from "react-native-numeric-input";
import Btn from "../Components/Btn";
import Message from "../Components/Message";
import ProductList from "../Components/ProductList";
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "axios";
import { NAME_API } from "../config/ApiConfig";
import Rating from "../Components/Rating";
import Loading from "../Components/Loading";

export default function ProductDetail() {
    const navigation = useNavigation();
    const route = useRoute();
    const [product, setProduct] = useState(null);

    const [similarProducts, setSimilarProducts] = useState([
        {
            id: 1,
            image: require('../../assets/favicon.png'),
            name: "Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text",
            price: 111,
        },
        {
            id: 2,
            image: require('../../assets/favicon.png'),
            name: "Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text",
            price: 111,
        },
        {
            id: 3,
            image: require('../../assets/favicon.png'),
            name: "Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text",
            price: 111,
        },
        {
            id: 4,
            image: require('../../assets/favicon.png'),
            name: "Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text",
            price: 111,
        },
    ]);

    const getProduct = (productId) => {
        axios.get(NAME_API.LOCALHOST + `/product/${productId}`)
            .then((response) => {
                setProduct(response.data.product);
                navigation.setOptions({
                    title: response.data.product.title,
                });
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        const { productId } = route.params;
        getProduct(productId);
    }, [route.params.productId])

    const [quantity, setQuantity] = useState(1);

    return (
        product ?
            <View style={styles.productDetailContainer}>
                <ScrollView >
                    <Image style={styles.productDetailImage} source={{ uri: product.thumbnail }} />
                    <Text style={styles.productDetailTitle}>
                        {product.title}
                    </Text>
                    <Rating value={product.rating.rate} text={product.rating.rate + " " + `(${product.rating.count} reviews)`} />
                    <View style={styles.flexContainer}>
                        <Text style={styles.productDetailPrice}>
                            Price: ${product.price}
                        </Text>
                        <NumericInput
                            value={quantity}
                            onChange={(value) => setQuantity(value)}
                            totalWidth={100}
                            totalHeight={40}
                            iconSize={40}
                            step={1}
                            minValue={1}
                            maxValue={99}
                            valueType='integer'
                            rounded
                            textColor={Colors.black}
                            iconStyle={{ color: Colors.white }}
                            rightButtonBackgroundColor={Colors.main}
                            leftButtonBackgroundColor={Colors.main} />
                    </View>
                    <Text style={styles.productDetailDescription}>
                        {product.description}
                    </Text>
                    <View style={styles.messageContainer}>
                        <Text style={styles.similarProducts}>Reviews</Text>
                        <View style={styles.messageUser}>
                            <View style={styles.messageProfile}>
                                <Image style={styles.messageUserImage} source={require('../../assets/images/men.png')} />
                                <Text style={styles.messageUsername}>
                                    John Doe
                                </Text>
                            </View>
                            <Rating value={4} />
                            <Text style={styles.messageTime}>
                                11-12-2023
                            </Text>
                        </View>
                        <Message text="Product is very beautiful" />
                    </View>
                    <View style={styles.similarProductContainer}>
                        <Text style={styles.similarProducts}>Similar products</Text>
                    </View>
                    <ProductList products={similarProducts} />
                </ScrollView>
                <Btn text="Add to Cart" width="100%" />
            </View>
            : <Loading />
    )
}

const styles = StyleSheet.create({
    productDetailContainer: {
        flex: 1,
        paddingHorizontal: 10,
        marginBottom: 5,
        backgroundColor: Colors.white,
    },
    productDetailImage: {
        width: "100%",
        height: 300,
        resizeMode: 'contain'
    },
    productDetailTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    flexContainer: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    productDetailPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.red,
    },
    productDetailDescription: {
        lineHeight: 20,
        marginVertical: 10,
    },
    similarProductContainer: {
        backgroundColor: Colors.subGreen,
        marginTop: 15,
    },
    similarProducts: {
        fontSize: 18,
        color: Colors.main,
        paddingVertical: 15,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    messageContainer: {
        backgroundColor: Colors.subGreen,
        padding: 10,

    },
    messageUserImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    messageUsername: {
        fontWeight: 'bold',
    },
    messageUser: {
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center',
        marginBottom: 10,
        width: "90%",
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    messageTime: {
        fontStyle: 'italic',
        marginVertical: 10,
    },
    messageProfile: {
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center',
    }
})