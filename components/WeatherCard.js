import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WeatherCard = ({ city }) => {

  // const getWeatherBackground = () => {
  //   const weatherDescription = city.weather.weather_descriptions[0].toLowerCase();
    
  //   if (weatherDescription.includes('sunny')) {
  //     return require('./assets/sunny-background.jpg');
  //   } else if (weatherDescription.includes('cloud')) {
  //     return require('./assets/cloudy-background.jpg');
  //   } else if (weatherDescription.includes('rain')) {
  //     return require('./assets/rainy-background.jpg');
  //   } else if (weatherDescription.includes('snow')) {
  //     return require('./assets/snowy-background.jpg');
  //   }
    
  //   // Default background
  //   return require('./assets/default-background.jpg');
  // };

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Text style={styles.city}>{city.name}</Text>
        <Image
          source={{ uri: city.weather.weather_icons[0] }}
          style={styles.icon}
        />
      </View>

      <View style={{display: 'flex', flexDirection: 'row', gap: '6', alignItems: 'center'}}>
          <MaterialCommunityIcons name="clock" size={20} color="#4a90e2" />
          <Text style={styles.detailText}>{city.localtime.split(' ')[1]}</Text>
        </View>
            
      <Text style={styles.temperature}>{city.weather.temperature}°C</Text>
      <Text style={styles.feelsLike}>Feels like {city.weather.feelslike}°C</Text>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="weather-rainy" size={24} color="#4a90e2" />
          <Text style={styles.detailText}>
            {city.weather.precip}mm
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="water-percent" size={24} color="#4a90e2" />
          <Text style={styles.detailText}>
            {city.weather.humidity}%
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="weather-windy" size={24} color="#4a90e2" />
          <Text style={styles.detailText}>
            {city.weather.wind_speed} km/h
          </Text>
        </View>
      </View>
    </View>
  );
};

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
    fontSize: 48,
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
});

export default WeatherCard;