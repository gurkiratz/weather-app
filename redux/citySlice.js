import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  cities: [],
  loading: false,
}

// Create the slice
const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    addCity: (state, action) => {
      const existingCityIndex = state.cities.findIndex(
        city => city.name === action.payload.name
      );

      if (existingCityIndex !== -1) {
        // Update existing city
        state.cities[existingCityIndex] = action.payload;
      } else {
        // Add new city
        state.cities.push(action.payload);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload)
    },
  },
})

// Export actions
export const { addCity, removeCity, setCurrentCity, setLoading } = citySlice.actions

// Export reducer
export default citySlice.reducer
