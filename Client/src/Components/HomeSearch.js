import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../color";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function HomeSearch() {
    const [keyword, setKeyword] = useState('');
    const navigation = useNavigation();
    const handleSearch = () => {
        if (keyword.trim() !== '')
            navigation.navigate('SearchScreen', { keyword });
    }

    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
                <Icon name="search" style={styles.searchIcon} />
                <TextInput placeholder="Product Name......"
                    style={styles.searchInput}
                    value={keyword}
                    onChangeText={setKeyword}
                    onSubmitEditing={handleSearch}
                />
            </View>
            <TouchableOpacity >
                <Icon name='notifications-outline' style={styles.cartIcon} />
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeContent}>1</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: Colors.main,
        // paddingTop: 50,
        paddingHorizontal: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchBar: {
        width: '85%',
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        paddingVertical: 7,
        borderRadius: 10,
    },
    searchIcon: {
        color: Colors.deepestGray,
        fontSize: 24,
        paddingHorizontal: 10,
    },
    searchInput: {
        height: 24,
        borderWidth: 0,
        width: '77%',
    },
    cartIcon: {
        fontSize: 30,
        color: Colors.white,
    },
    badgeContainer: {
        position: "absolute",
        right: -5,
        top: -5,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "red",
    },
    badgeContent: {
        textAlign: "center",
        color: "#fff",
        fontSize: 12,
    }
})