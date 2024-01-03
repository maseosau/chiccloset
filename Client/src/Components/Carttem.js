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
import { useFocusEffect } from "@react-navigation/native";

const CartItem = ({setTotalPrice, setCartItems}) => {
    const [items, setItems] = useState(null);
    const { userId } = useAuth();
    const { quantityInCart, setQuantityInCart } = useCart();
    const getCarts = () => {
        axios.get(NAME_API.LOCALHOST + `/carts/${userId}`)
            .then(response => {
                setItems(response.data.carts)
                // console.log(response.data.carts[0].product);
                setCartItems(response.data.carts);
            })
            .catch(err => {
                console.log("Error get carts " + err);
            })
    }

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        items.forEach(item => {
            totalPrice += item.product.price * item.quantity 
        })
        setTotalPrice(totalPrice);
    }

    const saveUpdateQuantity = (cartId, newQuantity) => {
        axios.post(NAME_API.LOCALHOST + `/updateQuantity/${cartId}`, {
            quantity: newQuantity
        })
        .then(response => {
            console.log(response.data.message);
            // setQuantityInCart(prev => prev - 1);
            // getCarts();
        })
        .catch(err => {
            console.log("Error update quantity" + err)
        })
    }

    const updateQuantity = (index, newQuantity) => {
        if (typeof newQuantity == 'string' || newQuantity == '' || newQuantity === 0) {
            const updatedItems = [...items];
            const quantityDefault = 1;
            updatedItems[index].quantity = quantityDefault;
            setItems(updatedItems);
            setCartItems(items);
            saveUpdateQuantity(updatedItems[index]._id,quantityDefault);
        }
        else {
            const updatedItems = [...items];
            updatedItems[index].quantity = newQuantity;
            setItems(updatedItems);
            setCartItems(items);
            saveUpdateQuantity(updatedItems[index]._id,newQuantity);
        }
    };

    const deleteCart = (productId) => {
        axios.delete(NAME_API.LOCALHOST + '/deleteCart', {
            params: {
                userId: userId,
                productId: productId
            }
        })
            .then(response => {
                console.log(response.data.message);
                setQuantityInCart(prev => prev - 1);
                getCarts();
            })
            .catch(err => {
                console.log("Error delete cart" + err)
            })
    }

    const renderItem = ({ item, index }) => {
        const quantityInStock = item.product.sizes.find(sizeInCart => sizeInCart.size == item.size)
        // console.log(quantityInStock.quantity);
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
                            <Text style={styles.cartItemSize}>
                                Size: {item.size}
                            </Text>
                            <NumericInput
                                value={item.quantity}
                                onChange={(value) => updateQuantity(index, value)}
                                totalWidth={100}
                                totalHeight={30}
                                iconSize={25}
                                step={1} 
                                minValue={1}
                                maxValue={quantityInStock ? quantityInStock.quantity : 99}
                                valueType='integer'
                                rounded
                                textColor={Colors.black}
                                iconStyle={{ color: Colors.white }}
                                rightButtonBackgroundColor={Colors.main}
                                leftButtonBackgroundColor={Colors.main} />
                            <Text style={styles.totalPrice}>
                                Total: ${(item.product.price * item.quantity).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        )
    };

    const renderHiddenItem = (productId) => {
        return (
            <TouchableOpacity
                style={styles.iconDeleteContainer}
                onPress={() => deleteCart(productId)}
            >
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
        if (items)
            calculateTotalPrice();
    }, [items]);
    
    useFocusEffect(
        React.useCallback(() => {
            getCarts();
        }, [])
      );

    return (
        items ? <SwipeListView
            rightOpenValue={-50}
            previewRowKey='0'
            previewOpenValue={-40}
            previewOpenDelay={3000}
            data={items}
            keyExtractor={item => item.product._id}
            renderHiddenItem={({ item }) => renderHiddenItem(item.product._id)}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
        /> : <Loading />
    )
};

export default CartItem;


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
        backgroundColor: "#E5E6E8",
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        height: 130,
    },
    cartItemImage: {
        width: '100%',
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