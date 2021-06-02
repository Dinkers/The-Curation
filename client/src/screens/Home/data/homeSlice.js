import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import http from 'modules/http'

const filtersStub = [
  'Vegan',
  'Locally sourced',
  'Farm'
]

export const requestGetCities = createAsyncThunk(
  'home/reqGetCities',
  async () => await http.get('cities')
)

export const requestGetPlaces = createAsyncThunk(
  'home/reqGetPlaces',
  async (cityId) => await http.get('places', `city=${cityId}`)
)

export const requestGetFilters = createAsyncThunk(
  'home/reqGetFilters',
  async(cityId) => await http.get('filters', `city=${cityId}`)
)

export const homeSlice = createSlice({
  name: 'home',

  initialState: {
    cities: [],
    citiesRequest: 'initial',
    selectedCity: null,

    filters: filtersStub,
    filtersRequest: 'completed',
    selectedFilters: [],

    places: [],
    placesRequest: 'initial'
  },

  reducers: {
    setSelectedCity: (state, action) => {
      const selectedCity = state.cities.find((city => city.id === action.payload))
      state.selectedCity = selectedCity 
    },

    setSelectedFilter: (state, action) => { 
      if (!state.selectedFilters.includes(action.payload)) {
        state.selectedFilters.push(action.payload)
      } else {
        state.selectedFilters = 
          state.selectedFilters.filter((filter) => filter !== action.payload)
      }
    }
  },

  extraReducers: {
    // Cities Request
    [requestGetCities.pending]: (state) => {
      state.citiesRequest = 'pending'
    },

    [requestGetCities.fulfilled]: (state, action) => {
      state.cities = action.payload
      state.citiesRequest = 'completed'
      state.selectedCity = state.cities[0]
    },

    [requestGetCities.rejected]: (state) => {
      state.citiesRequest = 'failed'
    },

    // Places Request
    [requestGetPlaces.pending]: (state) => {
      state.placesRequest = 'pending'
    },

    [requestGetPlaces.fulfilled]: (state, action) => {
      state.places = action.payload
      state.placesRequest = 'completed'
    },

    [requestGetPlaces.rejected]: (state) => {
      state.placesRequest = 'failed'
    }
  }
})

export const { setSelectedCity, setSelectedFilter, getCities } = homeSlice.actions

export default homeSlice.reducer
