import React, { useState, useEffect } from "react";
import { Image, View, Text, ScrollView, StyleSheet, ToastAndroid } from "react-native";
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
import { useAuth } from "../contexts/authContext";
import { useCart } from "../contexts/cartContext";

export default function ProductDetail() {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = useAuth();
    const { setQuantityInCart } = useCart();
    const [product, setProduct] = useState(null);
    const SIZES = ['S', 'M', 'L'];
    const [size, setSize] = useState('S');
    const [quantity, setQuantity] = useState(1);
    const [similarProducts, setSimilarProducts] = useState(null);

    const getSimilarProducts = async () => {
        try {
            const response = await axios.get(NAME_API.LOCALHOST + `/products/${product.category}`);
            const items = response.data.products.filter(prd => prd._id !== product._id);
            // console.log(response.data)
            
            // Shuffle the items array
            const shuffledItems = items.sort(() => Math.random() - 0.5);

            // Select the first 6 items from the shuffled array
            const randomProducts = shuffledItems.slice(0, 6);
            setSimilarProducts(randomProducts);
        }
        catch (err) {
            console.log("Error get Similar Products " + err);
        }
    }

    const addToCart = (product) => {
        axios.post(NAME_API.LOCALHOST + '/addToCart', {
            userId: userId,
            productId: product._id,
            quantity: quantity,
            totalPrice: product.price * quantity,
            size: size
        })
            .then(response => {
                setQuantityInCart(prev => prev + 1);
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.data && err.response.data.message) {
                    // If there's a meaningful error message in the response from the server
                    ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
                } else {
                    // If the error object doesn't contain a specific message, display a generic error
                    ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
                }
            });
    }

    const getProduct = (productId) => {
        axios.get(NAME_API.LOCALHOST + `/product/${productId}`)
            .then((response) => {
                // console.log(response.data.product.rating.rate)
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

    useEffect(() => {
        if (product) {
            getSimilarProducts();
        }
    }, [product])


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
                    <View style={styles.modalFlex}>
                        <Text style={styles.modalText}>
                            Size:
                        </Text>
                        {
                            SIZES.map((s, index) => (
                                <Btn
                                    text={s}
                                    key={index}
                                    onPress={() => setSize(s)}
                                    bgColor={s === size ? Colors.main : Colors.lightBlack}
                                    color={s === size ? Colors.white : Colors.black}
                                />
                            ))
                        }
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
                    {
                        similarProducts ? <ProductList products={similarProducts} /> : <Loading />
                    }
                </ScrollView>
                <Btn text="ADD TO CART" width="100%" onPress={() => addToCart(product)} />
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
    },
    modalFlex: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
})