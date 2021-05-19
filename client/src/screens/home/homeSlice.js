import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import http from '../../modules/http'

const citiesStub = [
  {
    name: 'Seattle',
    imageURL: 'https://images.unsplash.com/photo-1495726569656-8b8886143e6a',
    imageAlt: 'downtown Seattle'
  },
  {
    name: 'San Francisco',
    imageURL: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
    imageAlt: 'Golden Gate Bridge'
  },
  {
    name: 'New York City',
    imageURL: 'https://images.unsplash.com/photo-1522083165195-3424ed129620',
    imageAlt: 'Brooklyn Bridge with NYC skyline in the background'
  }
] // This will be replaced with a response from the API

const filtersStub = [
  'Vegan',
  'Locally sourced',
  'Farm'
]

export const getCities = createAsyncThunk(
  'home/fetchCities',
  async () => await http.get('cities/')
)

export const homeSlice = createSlice({
  name: 'home',

  initialState: {
    cities: citiesStub,
    citiesRequest: 'initial',
    selectedCity: citiesStub[0],

    filters: filtersStub,
    selectedFilters: [],

    places: [],
  },

  reducers: {
    setSelectedCity: (state, action) => { state.selectedCity = action.payload },
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
    [getCities.pending]: (state) => {
      state.citiesRequest = 'pending'
    },

    [getCities.fulfilled]: (state, action) => {
      state.cities = action.payload
      state.citiesRequest = 'completed'
    },

    [getCities.rejected]: (state) => {
      state.citiesRequest = 'failed'
    }
  }
})

export const { setSelectedCity, setSelectedFilter } = homeSlice.actions

export default homeSlice.reducer
