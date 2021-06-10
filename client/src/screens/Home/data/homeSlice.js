import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import http from 'modules/http'

import { cityImageMap, filterImageMap } from 'screens/Home/data/homeImageMaps'

export const requestGetCities = createAsyncThunk(
  'home/reqGetCities',
  async () => await http.get('cities')
)

export const requestGetPlaces = createAsyncThunk(
  'home/reqGetPlaces',
  async (cityId) => await http.get('places', `?city=${cityId}`)
)

export const requestGetFilters = createAsyncThunk(
  'home/reqGetFilters',
  async(cityId) => await http.get('filters', `${cityId}`)
)

export const homeSlice = createSlice({
  name: 'home',

  initialState: {
    cities: [],
    citiesImages: cityImageMap,
    citiesRequest: 'initial',
    selectedCity: null,

    filters: [],
    filtersImages: filterImageMap,
    filtersRequest: 'initial',
    selectedFilters: [],

    places: [],
    placesRequest: 'initial'
  },

  reducers: {
    resetRequestStatus: (state, action) => {
      state[action.payload] = 'initial'
    },

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
    },

    // Filters request
    [requestGetFilters.pending]: (state) => {
      state.filtersRequest = 'pending'
    },

    [requestGetFilters.fulfilled]: (state, action) => {
      state.filters = action.payload
      state.filtersRequest = 'completed'
    },

    [requestGetFilters.rejected]: (state) => {
      state.filtersRequest = 'failed'
    }
  }
})

export const { setSelectedCity, setSelectedFilter, resetRequestStatus } = homeSlice.actions

export default homeSlice.reducer
