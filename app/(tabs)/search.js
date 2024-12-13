import axios from 'axios'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addCity, setLoading } from '../../redux/citySlice'
import { Link, router } from 'expo-router'
import SearchBar from '../../components/SearchBar'
import {
  fetchWeatherByCity,
  fetchWeatherByCityImperial,
} from '../../lib/weatherService'

const Search = () => {
  const [city, setCity] = useState('')
  const dispatch = useDispatch()
  const cities = useSelector((state) => state.city.cities)
  const unit = useSelector((state) => state.city.unit)

  const fetchWeather = async () => {
    if (!city) return Alert.alert('Error', 'Please enter a city name.')
    dispatch(setLoading(true))

    try {
      const weatherData =
        unit === 'F'
          ? await fetchWeatherByCityImperial(city)
          : await fetchWeatherByCity(city)

      if (weatherData.success === false) {
        console.log(weatherData)
        Alert.alert('Error', 'City not found. Please try again.')
      } else {
        const cityData = {
          name: weatherData.location.name,
          country: weatherData.location.country,
          localtime: weatherData.location.localtime,
          weather: weatherData.current,
        }
        dispatch(addCity(cityData))
        console.log(cities)
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.')
    } finally {
      setCity('')
      router.push('/')
      dispatch(setLoading(false))
    }
  }

  return (
    // <View style={{ flex: 1, justifyContent: 'center' }}>
    //   <SearchBar value={city} onChangeText={setCity} onSubmit={fetchWeather} />
    // </View>
    <SearchBar value={city} onChangeText={setCity} onSubmit={fetchWeather} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
})

export default Search
