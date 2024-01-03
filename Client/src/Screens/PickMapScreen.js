import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { useMap } from "../contexts/mapContext";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Colors from "../color";

export default function PickMapScreen() {
    const mapViewRef = useRef(null);
    const { location, setLocation } = useMap();
    const [nameLocation, setNameLocation] = useState(null);
    const handleMapPress = (event) => {
        setLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
        });
    };

    const moveToLocation = (lat, lng) => {
        const newRegion = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
        };
        mapViewRef.current.animateToRegion(newRegion, 2000)
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
            <View style={styles.searchBar}>
                <GooglePlacesAutocomplete
                    fetchDetails
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        const { lat, lng } = details.geometry.location;
                        setLocation({
                            latitude: lat,
                            longitude: lng
                        })
                        moveToLocation(lat, lng);
                    }}
                    query={{
                        key: 'AIzaSyDOONue1Xr4ihkImIMKQH4y2E5rnvtlPJ8',
                        language: 'vi',
                    }}
                    onFail={err => console.log(err)}
                />
            </View>
            <View>
                <MapView
                    style={styles.map}
                    ref={mapViewRef}
                    onPress={handleMapPress}
                    initialRegion={{
                        latitude: location ? location.latitude : 10.8690162,
                        longitude: location ? location.longitude : 106.80339559,
                        latitudeDelta: 0.0122,
                        longitudeDelta: 0.0121,
                    }}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    searchBar: {
        position: 'absolute',
        top: 0,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
        zIndex: 1000
    }
});
