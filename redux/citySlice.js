import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cities: [
    {
      name: 'Toronto',
      country: 'Canada',
      localtime: '2024-12-12 21:40',
      weather: {
        observation_time: '02:40 AM',
        temperature: -6,
        weather_code: 113,
        weather_icons: [
          'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png',
        ],
        weather_descriptions: ['Clear'],
        wind_speed: 27,
        wind_degree: 260,
        wind_dir: 'W',
        pressure: 1027,
        precip: 0,
        humidity: 62,
        cloudcover: 0,
        feelslike: -13,
        uv_index: 0,
        visibility: 14,
        is_day: 'no',
      },
    },
  ],
  loading: false,
}

// Create the slice
const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    addCity: (state, action) => {
      const existingCityIndex = state.cities.findIndex(
        (city) => city.name === action.payload.name
      )

      if (existingCityIndex !== -1) {
        // Update existing city
        state.cities[existingCityIndex] = action.payload
      } else {
        // Add new city
        state.cities.push(action.payload)
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload)
    },
  },
})

// Export actions
export const { addCity, removeCity, setCurrentCity, setLoading } =
  citySlice.actions

// Export reducer
export default citySlice.reducer
