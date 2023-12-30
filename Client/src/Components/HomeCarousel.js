import React from 'react';
import { Dimensions, View, Image, Text, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
// import styles from '../styles';
// 21520766 - Đặng Quốc Duy
function HomeCarousel() {
    const width = Dimensions.get('window').width;
    const images = [
        require('../../assets/images/carousel1.jpg'),
        require('../../assets/images/carousel3.jpg'),
        require('../../assets/images/carousel4.png'),
    ];

    return (
        <View>
            <View style={styles.homeHeader}>
                <Text style={styles.homeHeaderText}>Shop for quality, Shop for style</Text>
            </View>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={images}
                scrollAnimationDuration={3000}
                renderItem={({ item }) => (
                    <Image
                        source={item}
                        style={styles.carousel}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    homeHeader: {
        backgroundColor: "#fff",
    },
    homeHeaderText: {
        fontSize: 24,
        color: "#b50505",
        padding: 10,
        textAlign: "center",
        fontWeight: "bold",
        fontStyle: "italic",
    },
    carousel: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

})

export default HomeCarousel;