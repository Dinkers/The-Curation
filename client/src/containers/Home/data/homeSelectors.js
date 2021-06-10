import { createSelector } from 'reselect'

// Derived app data
export const getShouldShowHomeScreen = (state) => state.home.shouldShowHomeScreen
export const getSelectedPlaceId = (state) => state.home.selectedPlaceId

// Derived Cities data
export const getCities = (state) => state.home.cities
export const getCitiesImages = (state) => state.home.citiesImages
export const getCitiesRequest = (state) => state.home.citiesRequest
export const getSelectedCity = (state) => state.home.selectedCity

export const getCitiesData = createSelector(
  getCities,
  getCitiesImages,
  getCitiesRequest,
  getSelectedCity,
  (cities, citiesImages, citiesRequest, selectedCity) => ({
    cities,
    citiesImages,
    citiesRequest,
    selectedCity
  })
)

// Derived Filters data
export const getFilters = (state) => state.home.filters
export const getFiltersImages = (state) => state.home.filtersImages
export const getFiltersRequest = (state) => state.home.filtersRequest
export const getSelectedFilters = (state) => state.home.selectedFilters

export const getFiltersData = createSelector(
  getFilters,
  getFiltersImages,
  getFiltersRequest,
  getSelectedFilters,
  (filters, filtersImages, filtersRequest, selectedFilters) => ({
    filters,
    filtersImages,
    filtersRequest,
    selectedFilters
  })
)

// Derived Places data
export const getPlaces = (state) => state.home.places
export const getPlacesRequest = (state) => state.home.placesRequest

export const getPlacesData = createSelector(
  getPlaces,
  getPlacesRequest,
  (places, placesRequest) => ({
    places,
    placesRequest
  })
)