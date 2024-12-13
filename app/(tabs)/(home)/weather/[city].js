import { useLocalSearchParams } from 'expo-router'
import { Link } from 'expo-router'
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../../components/Loader'
import { useRef, useState } from 'react'
import WeatherCard from '../../../../components/WeatherCard'

const { width: screenWidth } = Dimensions.get('window')

export default function CityWeather() {
  const dispatch = useDispatch()
  const { cities, loading } = useSelector((state) => state.city)
  const carouselRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const { city } = useLocalSearchParams()
  console.log('city:', city)

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Loader />
      ) : cities.length > 0 ? (
        <>
          <Carousel
            ref={carouselRef}
            data={cities}
            renderItem={({ item }) => <WeatherCard city={item} />}
            sliderWidth={screenWidth}
            itemWidth={screenWidth * 0.9}
            layout="default"
            loop={false}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={cities.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.dot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </>
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
