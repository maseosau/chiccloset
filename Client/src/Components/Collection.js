import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, Pressable, StyleSheet, ToastAndroid, Alert, Modal, TouchableOpacity } from "react-native";
import axios from "axios";
import NumericInput from 'react-native-numeric-input';
import { Picker } from '@react-native-picker/picker';
import Btn from "./Btn";
import ProductList from "./ProductList";
import Loading from "./Loading";
import Colors from "../color";
import { AntDesign } from '@expo/vector-icons';
import { NAME_API } from "../config/ApiConfig";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import { useCart } from "../contexts/cartContext";
import Icon from "react-native-vector-icons/Ionicons"
//21520766 -  Đặng Quốc Duy
export default function Collection({ title, sort, icon }) {
    const [products, setProducts] = useState(null);
    const { userId } = useAuth();
    const { setQuantityInCart } = useCart();
    const [modalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const navigation = useNavigation();
    const [selectedProduct, setSelectedProduct] = useState(null);

    const SIZES = ['S', 'M', 'L'];
    const [size, setSize] = useState('S');

    const handleProductPress = (productId) => {
        navigation.navigate('Product Details', { productId });
    };

    const openModal = (productId) => {
        setSelectedProduct(productId);
        setModalVisible(true);
    };

    const handleAddToCart = () => {
        if (selectedProduct) {
            const selectedItem = products.find(item => item._id === selectedProduct);
            if (selectedItem) {
                addToCart(selectedItem);
                setModalVisible(false);
            }
        }
    };

    const getProducts = () => {
        axios.get(NAME_API.LOCALHOST + '/products')
            .then((response) => {
                const sortedProducts = [...response.data.products].sort(sort);
                const firstSixProducts = sortedProducts.slice(0, 6);
                setProducts(firstSixProducts);
            })
            .catch(err => console.log(err));
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

    useEffect(() => {
        getProducts();
    }, [])

    return (
        products ? <View style={styles.productListContainer}>
            <View style={styles.collectionHeaderContainer}>
                <Text style={styles.collectionHeader}>
                    {title}
                </Text>
                <Image style={styles.iconImage} source={icon} />
            </View>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.bottomView}>
                    <View style={styles.modalView}>
                        <Icon name="close" style={styles.modalCloseIcon}
                            onPress={() => setModalVisible(false)}
                        />
                        <View style={styles.modalFlex}>
                            <Text style={styles.modalText}>
                                Quantity:
                            </Text>
                            <NumericInput
                                value={quantity}
                                onChange={(value) => setQuantity(value)}
                                totalWidth={100}
                                totalHeight={30}
                                iconSize={25}
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
                        <Btn text="ADD TO CART" onPress={() => handleAddToCart()} />
                    </View>
                </View>
            </Modal>
            <FlatList
                data={products}
                nestedScrollEnabled
                keyExtractor={item => item._id.toString()}
                scrollEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <>
                        <Pressable key={item._id} style={styles.product} onPress={() => handleProductPress(item._id)}>
                            <Image source={{ uri: item.thumbnail }} alt={item.title} style={styles.productImage} />
                            <View style={styles.productContent}>
                                <Text style={styles.productName}
                                    numberOfLines={2}
                                    ellipsizeMode='tail'
                                >
                                    {item.title}
                                </Text>
                                <View style={styles.smallContainer}>
                                    <View style={styles.priceAndRating}>
                                        <Text style={styles.productPrices}>
                                            ${item.price}
                                        </Text>
                                        <Rating value={item.rating.rate} text={`(${item.rating.rate})`} />
                                    </View>
                                    <Pressable style={styles.addToCart}
                                        onPress={() => openModal(item._id)}
                                    >
                                        <AntDesign name="pluscircle" size={30} color={Colors.paypal} />
                                    </Pressable>
                                </View>
                            </View>

                        </Pressable>
                    </>
                )}
            />

        </View> : <Loading />

    )

}


const styles = StyleSheet.create({
    product: {
        width: 200,
        backgroundColor: Colors.white,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginVertical: 10,
        marginHorizontal: 5,
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
    },
    collectionHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        margin: 10,
    },
    collectionHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'red'
    },
    iconImage: {
        width: 30,
        height: 30,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    bottomView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 22,
        width: '100%',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    btnFlex: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
        fontSize: 18,
    },
    modalFlex: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    modalCloseIcon: {
        position: 'absolute',
        fontSize: 30,
        top: 10,
        right: 10,
        // margin: 10,
    }
})