import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../color";
import Icon from "react-native-vector-icons/Ionicons";


export default function OrderInfo({icon, title, subTitle, text, success, danger}) {
    const [orderInfo, setOrderInfo] = useState({});
    return (
        <View style={styles.orderInfoContainer}>
            <View style={styles.orderInfoIconContainer}>
                <Icon name={icon} style={styles.orderInfoIcon} />
            </View>
            <Text style={styles.orderInfoTitle}>
                {title}
            </Text>
            <Text style={styles.orderInfoSubTitle}>
                {subTitle}
            </Text>
            <Text style={styles.orderInfoText}>
                {text}
            </Text>
            {
                success && (
                    <View style={styles.successStatus}>
                        <Text style={styles.textStatus}>
                            Paid On Dec 11 2023
                        </Text>
                    </View>
                )
            }
            {
                danger && (
                    <View style={styles.errorStatus}>
                        <Text style={styles.textStatus}>
                            Not Delivered
                        </Text>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    orderInfoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        width: "100%",
        paddingVertical: 10,
        borderRadius: 15,
        marginBottom: 10,
        marginHorizontal: 20,
        paddingHorizontal: 20,
    },
    orderInfoIconContainer: {
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    orderInfoIcon: {
        fontSize: 30,
        color: Colors.white,
    },
    orderInfoTitle: {
        fontWeight: "bold",
        fontSize: 14,
        marginTop: 10,
        marginBottom: 5,
        color: Colors.black,
    },
    orderInfoSubTitle: {
        fontSize: 13,
        color: Colors.black,
    },
    orderInfoText: {
        fontSize: 13,
        color: Colors.black,
        textAlign: 'center'
    },
    successStatus: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 10,
        width: "100%",
        backgroundColor: Colors.main,
    },
    textStatus: {
        fontSize: 14,
        color: Colors.white,
    },  
    errorStatus: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 10,
        width: "100%",
        backgroundColor: Colors.red,
    },
})