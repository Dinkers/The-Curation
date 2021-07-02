import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect' 

export const getPlace = (state) => state.place.place
export const getPlaceId = (state) => state.place.placeId
export const getPlaceRequest = (state) => state.place.placeRequest

export const getPlaceData = createSelector(
  getPlace,
  getPlaceId,
  getPlaceRequest,
  (place, placeId, placeRequest, getPlaceVitalInfos, vitalInfoRequest) => ({
    place,
    placeId,
    placeRequest,
    getPlaceVitalInfos,
    vitalInfoRequest
  })
)

export const getVitalInfos = (state) => state.place.vitalInfos
export const getVitalInfoRequest = (state) => state.place.vitalInfoRequest

export const getVitalInfoData = createSelector(
  getVitalInfos,
  getVitalInfoRequest,
  (vitalInfos, vitalInfoRequest) => ({
    vitalInfos,
    vitalInfoRequest
  })
)

export const getUsps = (state) => state.place.usps
export const getUspsRequest = (state) => state.place.uspsRequest

export const getUspsData = createSelector(
  getUsps,
  getUspsRequest,
  (usps, uspsRequest) => ({
    usps,
    uspsRequest
  })
)
