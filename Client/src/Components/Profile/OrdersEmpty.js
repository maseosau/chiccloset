import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Entypo, AntDesign, FontAwesome, Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from '../../color';
import Btn from '../Btn';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function OrdersEmpty() {
    const navigation = useNavigation();
    return (
        <View style={styles.OrdersEmptyContainer}>
            <View style={styles.OrdersEmpty}>
                <View style={styles.ordersIconBackground}>
                    <FontAwesome5 name='shopping-basket' style={styles.ordersIcon} />
                </View>
                <Text style={styles.OrdersEmptyText}>
                    You have no orders
                </Text>
            </View>
            <Btn bgColor={Colors.black} color={Colors.white} text='START SHOPPING' onPress={() => navigation.navigate("HomeScreen")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    OrdersEmptyContainer: {
        flex: 1,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    OrdersEmpty: {
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ordersIconBackground: {
        width: 200,
        height: 200,
        backgroundColor: Colors.white,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ordersIcon: {
        fontSize: 100,
        color: Colors.main,
    },
    OrdersEmptyText: {
        fontWeight: 'bold',
        marginTop: 20,
        color: Colors.main,
        textTransform: 'uppercase',
    }
})