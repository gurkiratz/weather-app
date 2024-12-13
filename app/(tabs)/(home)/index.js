import { Link, router } from 'expo-router'
import {
  Alert,
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import { useCallback, useEffect, useRef, useState } from 'react'
import { addCity } from '../../../redux/citySlice'
import {
  fetchWeatherByCity,
  fetchWeatherByCityImperial,
} from '../../../lib/weatherService'
import Search from '../search'
import WeatherListCard from '../../../components/WeatherListCard'
import * as Location from 'expo-location'

const { width: screenWidth } = Dimensions.get('window')

export default function Home() {
  // const [location, setLocation] = useState(null)
  // const [errorMsg, setErrorMsg] = useState(null)
  // console.log(location)
  const unit = useSelector((state) => state.city.unit)

  const dispatch = useDispatch()
  const { cities, loading } = useSelector((state) => state.city)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refreshCitiesWeather()
    setRefreshing(false)
  }, [])

  const refreshCitiesWeather = async () => {
    if (cities.length > 0) {
      for (let city of cities) {
        try {
          const weatherData =
            unit === 'F'
              ? await fetchWeatherByCityImperial(city.name)
              : await fetchWeatherByCity(city.name)

          const cityData = {
            name: weatherData?.location.name,
            country: weatherData?.location.country,
            localtime: weatherData?.location.localtime,
            weather: weatherData?.current,
          }
          console.log('updated data', weatherData)
          dispatch(addCity(cityData))
        } catch (error) {
          console.error(`Error refreshing ${city.name}:`, error)
          Alert.alert('Error', `Failed to refresh weather for ${city.name}`)
        }
      }
    }
  }

  // useEffect(() => {
  //   async function getCurrentLocation() {
  //     let { status } = await Location.requestForegroundPermissionsAsync()
  //     if (status !== 'granted') {
  //       Alert.alert('Warning', 'Permission to access location was denied')
  //       setErrorMsg('Permission to access location was denied')
  //       return
  //     }

  //     let location = await Location.getCurrentPositionAsync({})
  //     const { coords } = location
  //     const locObj = {
  //       latitude: coords.latitude,
  //       longitude: coords.longitude,
  //     }
  //     const obj = await Location.reverseGeocodeAsync(locObj)
  //     console.log(JSON.parse(obj))
  //     setLocation(obj.city)
  //   }

  //   getCurrentLocation()
  // }, [])

  return (
    <View style={{ flex: 1 }}>
      <Search />
      {loading ? (
        <Loader />
      ) : cities.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {cities.map((city, index) => (
            <Pressable
              key={index}
              onPress={() => router.push(`weather/${city.name}`)}
            >
              <WeatherListCard city={city} />
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            Add cities to see weather information
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: '#888',
  },
})
