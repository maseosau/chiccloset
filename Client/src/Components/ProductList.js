import React, {useState} from 'react';
import { StyleSheet, Text, Pressable, Image, View, Alert, Modal, ToastAndroid } from 'react-native';
import Colors from '../color';
import { useNavigation } from "@react-navigation/native";
import Rating from './Rating';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import NumericInput from 'react-native-numeric-input';
import { useCart } from '../contexts/cartContext';
import { useAuth } from '../contexts/authContext';
import Btn from './Btn';
import axios from 'axios';
import { NAME_API } from '../config/ApiConfig';

export default function ProductList({ products }) {
    const navigation = useNavigation();
    const { setQuantityInCart } = useCart();
    const [modalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const SIZES = ['S', 'M', 'L'];
    const [size, setSize] = useState('S');
    const { userId } = useAuth();
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

    return (
        <View style={styles.productList}>
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
                                <Pressable style={styles.addToCart} onPress={() => openModal(product._id)}>
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
        height: 160,
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