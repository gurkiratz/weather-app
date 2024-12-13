import { Link, router } from 'expo-router'
import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useDispatch, useSelector } from 'react-redux'
import WeatherCard from '../../../components/WeatherCard'
import Loader from '../../../components/Loader'
import { useEffect, useRef, useState } from 'react'
import { addCity } from '../../../redux/citySlice'
import { fetchWeatherByCity } from '../../../lib/weatherService'
import Search from '../search'
import WeatherListCard from '../../../components/WeatherListCard'

const { width: screenWidth } = Dimensions.get('window')

export default function Home() {
  const dispatch = useDispatch()
  const { cities, loading } = useSelector((state) => state.city)
  const carouselRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)

  // useEffect(() => {
  //   // Refresh weather for all stored cities when home screen loads
  //   const refreshCitiesWeather = async () => {
  //     for (let city of cities) {
  //       try {
  //         const updatedWeather = await fetchWeatherByCity(city.name)
  //         dispatch(addCity(updatedWeather))
  //       } catch (error) {
  //         console.error(`Error refreshing ${city.name}:`, error)
  //         Alert.alert('Error', `Failed to refresh weather for ${city.name}`)
  //       }
  //     }
  //   }

  //   refreshCitiesWeather()
  // }, []) // Empty dependency array means this runs once when screen loads

  return (
    <View style={{ flex: 1 }}>
      <Search />
      {loading ? (
        <Loader />
      ) : cities.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
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
