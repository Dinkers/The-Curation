import { createSlice } from '@reduxjs/toolkit';

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
  }
]; // This will be replaced with a response from the API

export const homeSlice = createSlice({
  name: 'home',

  initialState: {
    cities: citiesStub,
    filters: [],
    places: [],
    selectedCity: citiesStub[0]
  },

  reducers: {
    setSelectedCity: (state, action) => { state.selectedCity = action.payload }
  }
});

export const { setSelectedCity } = homeSlice.actions;

export default homeSlice.reducer;
