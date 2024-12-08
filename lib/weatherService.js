import axios from 'axios';

const API_KEY =  process.env.EXPO_PUBLIC_WEATHERSTACK_API_KEY;
const BASE_URL = 'http://api.weatherstack.com/current';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        access_key: API_KEY,
        query: city
      }
    });
    // console.log(response)
    await delay(500);
    
    return response.data;
  } catch (error) {
    console.error('Weather API Error:', error);
    throw error;
  }
};