// @ts-nocheck

import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'

const WeatherListCard = ({ city }) => {
  const unit = useSelector((state) => state.city.unit)

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.city}>{city.name}</Text>
          <Text style={styles.detailText}>{city.country}</Text>
          <Text style={styles.detailText}>{city.localtime?.split(' ')[1]}</Text>
        </View>
        <Image
          source={{ uri: city.weather?.weather_icons[0] }}
          style={styles.icon}
        />
        <Text style={styles.temperature}>
          {city.weather?.temperature}°{unit}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  icon: {
    width: 60,
    height: 60,
  },
  temperature: {
    fontSize: 40,
    fontWeight: '200',
    color: '#333',
    marginVertical: 10,
  },
  feelsLike: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailText: {
    marginTop: 5,
    color: '#666',
    fontSize: 14,
  },
})

export default WeatherListCard
