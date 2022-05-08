import axios from "axios";
import { MapAPIKey, WeatherAPIKey } from "../config/config";

export const fetchWeatherData = async() => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=6.974120&lon=79.916687&exclude=alerts,minutely,current,hourly&appid=${WeatherAPIKey}`;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return;
    }
}

export const fetchRestaurants = async( latitude, longitude ) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=restaurant&key=${MapAPIKey}`;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return;
    }
}