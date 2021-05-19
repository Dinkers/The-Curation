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

export const getCities = createAsyncThunk(
  'home/fetchCities',
  async () => {
    const response = await http.get('cities/')
    return response.data
  }
)

export const homeSlice = createSlice({
  name: 'home',

  initialState: {
    cities: citiesStub,
    filters: [],
    places: [],
    selectedCity: citiesStub[0]
  },

  reducers: {
    setSelectedCity: (state, action) => { state.selectedCity = action.payload },
  },
  extraReducers: {
    [getCities.fulfilled]: (state, action) => {
      console.log(action.payload)
    }
  }
})

export const { setSelectedCity } = homeSlice.actions

export default homeSlice.reducer
