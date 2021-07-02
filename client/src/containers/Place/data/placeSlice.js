import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import http from 'modules/http'

const initialState = {
  place: null,
  placeRequest: 'initial',
  placeImages: [],
  vitalInfos: [],
  vitalInfoRequest: 'initial',
  usps: [],
  uspsRequest: 'initial'
}

export const requestGetPlace = createAsyncThunk(
  'place/reqPlace',
  async (placeId) => await http.get('places', placeId, true)
)

export const getAllUsps = createAsyncThunk(
  'place/getAllUsps',
  async (usps) => await Promise.all(
    usps.map((usp) => http.get('place-usps', usp, true))
  )
)

export const getAllVitalInfos = createAsyncThunk(
  'place/getAllVitalInfos',
  async (vital_infos) => await Promise.all(
    vital_infos.map((vital_info) => http.get('place-vital-infos', vital_info, true))
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
    [getAllVitalInfos.fulfilled]: (state, action) => {
      state.vitalInfoRequest = 'completed'
      state.vitalInfos = action.payload
    },

    [getAllVitalInfos.rejected]: (state) => {
      state.vitalInfoRequest = 'failed'
    },

    // USPS requests
    [getAllUsps.fulfilled]: (state, action) => {
      state.uspsRequest = 'completed'
      state.usps = action.payload
    },

    [getAllUsps.rejected]: (state) => {
      state.uspsRequest = 'failed'
    },
  }
})

export const { resetPlaceData } = placeSlice.actions

export default placeSlice.reducer
