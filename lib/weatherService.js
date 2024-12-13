import axios from 'axios'

const API_KEY = process.env.EXPO_PUBLIC_WEATHERSTACK_API_KEY
const BASE_URL = 'http://api.weatherstack.com/current'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        access_key: API_KEY,
        query: city,
      },
    })
    // console.log(response)
    await delay(500)

    return response.data
  } catch (error) {
    console.error('Weather API Error:', error)
    throw error
  }
}

export const fetchTorontoWeather = async (city) => {
  return {
    request: {
      type: 'City',
      query: 'San Jose, United States of America',
      language: 'en',
      unit: 'm',
    },
    location: {
      name: `San Jose ${city + 1}`,
      country: 'United States of America',
      region: 'California',
      lat: '37.339',
      lon: '-121.894',
      timezone_id: 'America/Los_Angeles',
      localtime: '2024-12-12 11:59',
      localtime_epoch: 1734004740,
      utc_offset: '-8.0',
    },
    current: {
      observation_time: '07:59 PM',
      temperature: 13,
      weather_code: 116,
      weather_icons: [
        'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png',
      ],
      weather_descriptions: ['Partly cloudy'],
      wind_speed: 9,
      wind_degree: 264,
      wind_dir: 'W',
      pressure: 1015,
      precip: 0,
      humidity: 72,
      cloudcover: 75,
      feelslike: 13,
      uv_index: 2,
      visibility: 16,
      is_day: 'yes',
    },
  }
}
