import React from 'react';
import { View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';
import LoginScreen from './src/screens/LoginScreen';

const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: [
                    {
                        display: "flex"
                    },
                    null
                ]
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 2 }}>
                            <Image
                                source={require('./assets/images/home.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#353535' : '#ACACAC'
                                }} />
                        </View>
                    )
                }} />
            <Tab.Screen name="Restaurants" component={RestaurantScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 2 }}>
                            <Image
                                source={require('./assets/images/restaurant.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#353535' : '#ACACAC'
                                }} />
                        </View>
                    )
                }} />
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={() => ({
                        headerShown: false,
                    })}
                />
                <Stack.Screen
                    name="HomeScreen"
                    component={Tabs}
                    options={() => ({
                        headerShown: false,
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;