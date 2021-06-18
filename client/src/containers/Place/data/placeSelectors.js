import { createSelector } from 'reselect' 

export const getPlace = (state) => state.place.place
export const getPlaceId = (state) => state.place.placeId
export const getPlaceRequest = (state) => state.place.placeRequest

export const getPlaceData = createSelector(
  getPlace,
  getPlaceId,
  getPlaceRequest,
  (place, placeId, placeRequest) => ({
    place,
    placeId,
    placeRequest
  })
)
