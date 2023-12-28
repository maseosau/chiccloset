import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../color';
import Btn from './Btn';

export default function SeachNoResult() {
    return (
        <View style={styles.cartEmptyContainer}>
            <View style={styles.cartEmpty}>
                <View style={styles.cartIconBackground}>
                    <Icon name='search' style={styles.cartIcon} />
                </View>
                <Text style={styles.cartEmptyText}>
                    No results found
                </Text>
            </View>
            <Btn bgColor={Colors.black} color={Colors.white} text='START SHOPPING'/>
        </View>
    )
}

const styles = StyleSheet.create({
    cartEmptyContainer: {
        flex: 1,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartEmpty: {
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartIconBackground: {
        width: 200,
        height: 200,
        backgroundColor: Colors.white,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartIcon: {
        fontSize: 100,
        color: Colors.main,
    },
    cartEmptyText: {
        fontWeight: 'bold',
        marginTop: 20,
        color: Colors.main,
        textTransform: 'uppercase',
    }
})