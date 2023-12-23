import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Colors from '../color';
import { SwipeListView } from 'react-native-swipe-list-view';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Loading from './Loading';
import { useCart } from '../contexts/cartContext';
import { useAuth } from '../contexts/authContext';
import { NAME_API } from '../config/ApiConfig';

const CartItem = () => {
    const [items, setItems] = useState(null);
    const [products, setProducts] = useState([]);
    const { userId } = useAuth();
    const { quantityInCart } = useCart();
    const getCarts = () => {
        axios.get(NAME_API.LOCALHOST + `/carts/${userId}`)
            .then(response => {
                setItems(response.data.carts)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const updateQuantity = (index, newQuantity) => {
        const updatedItems = [...items];
        updatedItems[index].quantity = newQuantity;
        setItems(updatedItems);
    };

    const renderItem = ({ item, index }) => {
        return (
            <Pressable>
                <View style={styles.itemContainer}>
                    <View style={styles.item}>
                        <View style={styles.cartItemImageContainer}>
                            <Image
                                source={{ uri: item.product.thumbnail }}
                                alt={item.product.title}
                                style={styles.cartItemImage}
                            />
                        </View>
                        <View style={styles.cartItemContent}>
                            <Text style={styles.cartItemName} numberOfLines={2} ellipsizeMode='tail'>
                                {item.product.title}
                            </Text>
                            <Text style={styles.cartItemPrice}>
                                ${item.product.price}
                            </Text>
                            <NumericInput
                                value={item.quantity}
                                onChange={(value) => updateQuantity(index, value)}
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
                            <Text style={styles.totalPrice}>
                                Total: ${item.product.price * item.quantity}
                            </Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        )
    };

    const renderHiddenItem = () => {
        return (
            <TouchableOpacity style={styles.iconDeleteContainer}>
                <View style={styles.iconDeletePosition}>
                    <Icon name='trash-outline' style={styles.iconDelete} />
                </View>
            </TouchableOpacity>
        )
    };

    useEffect(() => {
        getCarts();
    }, [quantityInCart]);

    useEffect(() => {
        if (items) {
            const productIds = items.map(item => item.product);
    
            Promise.all(
                productIds.map(productId =>
                    axios.get(`${NAME_API.LOCALHOST}/product/${productId}`)
                )
            )
            .then(responses => {
                const productsData = responses.map((response, index) => ({
                    product: response.data.product,
                    quantity: items[index].quantity,
                    size: items[index].size,
                    // totalPrice: items[index].totalPrice
                }));
                setProducts(productsData);
            })
            .catch(err => console.log(err));
        }
    }, [items]);


    return (
        products ? <SwipeListView
            rightOpenValue={-50}
            previewRowKey='0'
            previewOpenValue={-40}
            previewOpenDelay={3000}
            data={products}
            keyExtractor={item => item.product._id}
            renderHiddenItem={renderHiddenItem}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
        /> : <Loading />
    )
};

export default CartItem;

// Các phần styles và các phần code khác không thay đổi


const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 10,
        marginBottom: 15,
    },
    item: {
        backgroundColor: Colors.white,
        shadowOffset: 1,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cartItemImageContainer: {
        width: '25%',
        backgroundColor: Colors.deepGray,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        height: 120,
    },
    cartItemImage: {
        width: '80%', // Giả sử hình ảnh chiếm 80% chiều rộng của cartItemImageContainer
        resizeMode: 'contain',
        height: "100%",
    },
    cartItemContent: {
        width: '70%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'column',
        gap: 5,
    },
    cartItemName: {
        color: Colors.black,
        fontWeight: 'bold',
        fontSize: 14,
    },
    cartItemPrice: {
        color: Colors.red,
        fontWeight: 'bold',
    },
    iconDeleteContainer: {
        backgroundColor: Colors.red,
        width: 50,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        height: 120,
        marginLeft: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    iconDeletePosition: {
        alignItems: 'center',
    },
    iconDelete: {
        fontSize: 24,
        color: Colors.white,
    },
    cartItemContainer: {
        marginRight: 10,
    },
    totalPrice: {
        position: 'absolute',
        right: 10,
        top: 70,
        fontSize: 16,
        fontWeight: 'bold',
    }
})