import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import http from 'modules/http'

export const requestGetPlace = createAsyncThunk(
  'place/reqPlace',
  async (placeId) => await http.get('places', placeId, true)
)

export const placeSlice = createSlice({
  name: 'place',

  initialState: {
    placeId: null,
    place: null,
    placeRequest: 'initial'
  },

  reducers: {
    resetPlaceRequest: (state) => {
      state.placeRequest = 'initial'
    }
  },

  extraReducers: {
    [requestGetPlace.pending]: (state) => {
      state.placeRequest = 'pending'
    },

    [requestGetPlace.fulfilled]: (state, action) => {
      state.placeRequest = 'completed'
      state.place = action.payload 
    },

    [requestGetPlace.rejected]: (state) => {
      state.placeRequest = 'failed'
    }
  }
})

export const { resetPlaceRequest } = placeSlice.actions

export default placeSlice.reducer
