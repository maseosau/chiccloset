import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { useMap } from "../contexts/mapContext";

export default function PickMapScreen() {
    const {location, setLocation} = useMap();
    const [nameLocation, setNameLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState({
        latitude: location ? location.latitude : 10.8690162,
        longitude: location ? location.longitude : 106.80339559,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const handleMapPress = (event) => {
        setLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
        });
    };

    useEffect(() => {
        const getAddressFromCoordinates = async () => {
            try {
                const api = 'AIzaSyDOONue1Xr4ihkImIMKQH4y2E5rnvtlPJ8';
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${api}`
                );
                const data = await response.json();
                if (data.status === 'OK') {
                    setNameLocation(data.results[0].formatted_address);
                }
            } catch (error) {
                console.error('Error fetching location details:', error);
            }
        };

        location && getAddressFromCoordinates();
    }, [location]);


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                onPress={handleMapPress}
                initialRegion={initialRegion}
                showsUserLocation
                showsMyLocationButton
            >
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title={nameLocation}
                    />
                )}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
