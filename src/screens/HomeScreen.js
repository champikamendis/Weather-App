import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import COLORS from '../styles/colors';
import { fetchWeatherData } from '../utils/api';

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const HomeScreen = () => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const getWeatherData = async() => {
            const response = await fetchWeatherData();
            setWeatherData(response);
        }
        getWeatherData();
    }, [])

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={weatherData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: COLORS.lightGray,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default HomeScreen;