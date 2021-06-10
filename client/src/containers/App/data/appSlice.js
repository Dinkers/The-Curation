import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',

  initialState: {
    currentScreen: 'Home',
    selectedPlaceId: null
  },

  reducers: {
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload
    },

    setSelectedPlaceId: (state, action) => {
      state.selectedPlaceId = action.payload
    }
  }
})

export const {
  setCurrentScreen,
  setSelectedPlaceId
} = appSlice.actions

export default appSlice.reducer
