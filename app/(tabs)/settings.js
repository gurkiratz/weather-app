import React from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchWeatherByCity,
  fetchWeatherByCityImperial,
} from '../../lib/weatherService'
import { addCity, setUnit } from '../../redux/citySlice'

const SettingsScreen = () => {
  const dispatch = useDispatch()
  const unit = useSelector((state) => state.city.unit)
  const cities = useSelector((state) => state.city.cities)

  const handleToggle = async () => {
    const newUnit = unit === 'C' ? 'F' : 'C'
    dispatch(setUnit(newUnit))

    // Refresh all cities with new unit
    if (cities.length > 0) {
      for (let city of cities) {
        try {
          const weatherData =
            newUnit === 'F'
              ? await fetchWeatherByCityImperial(city.name)
              : await fetchWeatherByCity(city.name)

          const cityData = {
            name: weatherData?.location.name,
            country: weatherData?.location.country,
            localtime: weatherData?.location.localtime,
            weather: weatherData?.current,
          }
          dispatch(addCity(cityData))
        } catch (error) {
          console.error(`Error refreshing ${city.name}:`, error)
          Alert.alert('Error', `Failed to refresh weather for ${city.name}`)
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Temperature Unit</Text>
        <View style={styles.toggleContainer}>
          <Text style={styles.unitLabel}>°C</Text>
          <Switch
            value={unit === 'F'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={unit === 'F' ? '#f4f3f4' : '#f4f3f4'}
            onValueChange={handleToggle}
          />
          <Text style={styles.unitLabel}>°F</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitLabel: {
    fontSize: 16,
    marginHorizontal: 8,
  },
})

export default SettingsScreen
