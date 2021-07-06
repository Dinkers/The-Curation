import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import http from 'modules/http'

const initialState = {
  place: null,
  placeRequest: 'initial',
  placeImages: [],
  placeImagesRequest: 'initial',
  openingHours: [],
  openingHoursRequest: 'initial',
  vitalInfos: [],
  vitalInfoRequest: 'initial',
  usps: [],
  uspsRequest: 'initial'
}

export const requestGetPlace = createAsyncThunk(
  'place/reqPlace',
  async (placeId) => await http.get('places', placeId, true)
)

export const requestAllUsps = createAsyncThunk(
  'place/reqAllUsps',
  async (usps) => await Promise.all(
    usps.map((usp) => http.get('place-usps', usp, true))
  )
)

export const requestAllVitalInfos = createAsyncThunk(
  'place/reqAllVitalInfos',
  async (vitalInfos) => await Promise.all(
    vitalInfos.map((vitalInfo) => http.get('place-vital-infos', vitalInfo, true))
  )
)

export const requestAllOpeningHours = createAsyncThunk(
  'place/reqAllOpeningHours',
  async (openingHours) => await Promise.all(
    openingHours.map((openingHour) => http.get('place-opening-hours', openingHour, true))
  )
)

export const requestAllPlaceImages = createAsyncThunk(
  'place/reqAllPlaceImages',
  async (images) => await Promise.all(
    images.map((image) => http.get('place-images', image, true))
  )
)

export const placeSlice = createSlice({
  name: 'place',

  initialState,

  reducers: {
    resetPlaceData: () => initialState
  },

  extraReducers: {
    // Place request
    [requestGetPlace.pending]: (state) => {
      state.placeRequest = 'pending'
    },

    [requestGetPlace.fulfilled]: (state, action) => {
      state.placeRequest = 'completed'
      state.place = action.payload
    },

    [requestGetPlace.rejected]: (state) => {
      state.placeRequest = 'failed'
    },

    //Vital Info requests
    [requestAllVitalInfos.fulfilled]: (state, action) => {
      state.vitalInfoRequest = 'completed'
      state.vitalInfos = action.payload
    },

    [requestAllVitalInfos.rejected]: (state) => {
      state.vitalInfoRequest = 'failed'
    },

    // USPs requests
    [requestAllUsps.fulfilled]: (state, action) => {
      state.uspsRequest = 'completed'
      state.usps = action.payload
    },

    [requestAllUsps.rejected]: (state) => {
      state.uspsRequest = 'failed'
    },

    // Opening hours requests
    [requestAllOpeningHours.fulfilled]: (state, action) => {
      state.openingHoursRequest = 'completed'
      state.openingHours = action.payload
    },

    // Place images requests
    [requestAllPlaceImages.fulfilled]: (state, action) => {
      state.placeImagesRequest = 'completed'
      state.placeImages = action.payload
    }
  }
})

export const { resetPlaceData } = placeSlice.actions

export default placeSlice.reducer
