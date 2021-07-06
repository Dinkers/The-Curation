import { createSelector } from 'reselect' 

const weekMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

// Place data
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

// Vital info data
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

// USP data
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

// Opening hours data
export const getOpeningHours = (state) => state.place.openingHours

export const getSortedOpeningHours = (state) => {
  const unsortedOpeningHours = state.place.openingHours
  
  return weekMap.map((day, index) => {
    const isOpen = unsortedOpeningHours.find(
      (openingHour) => openingHour.weekday === day
    )

    if (isOpen) {
      return isOpen
    } else {
      return ({
        'weekday': day,
        'closed': 'Closed'
      })
    }
  })
}

export const getOpeningHoursRequest = (state) => state.place.openingHoursRequest

export const getOpeningHoursData = createSelector(
  getOpeningHours,
  getSortedOpeningHours,
  getOpeningHoursRequest,
  (openingHours, sortedOpeningHours, openingHoursRequest) => ({
    openingHours,
    sortedOpeningHours,
    openingHoursRequest
  })
)
