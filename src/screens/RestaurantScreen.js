import React, {useState} from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { fetchRestaurants } from '../utils/api';

const RestaurantScreen = () => {
    const [restaurants, setRestaurants] = useState([]);

    const getRestaurants = async() => {
        try {
            Geolocation.getCurrentPosition(location => {
                console.log(location)
                fetchRestaurants(location.latitude, location.longitude).then(response => {
                    setRestaurants(response);
                });    
            });
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                loadingEnabled={true}
				toolbarEnabled={false}
				userLocationUpdateInterval={1000}
            >
                {/* {restaurants?.map((restaurant, index) => (
                <Marker
                  key={index}
                  coordinate={restaurant?.latlng}
                  title={restaurant?.title}
                  description={restaurant?.description}
                />
              ))} */}

            </MapView>
            <Button title='Show Restaurants' onPress={() => getRestaurants()}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
})

export default RestaurantScreen;