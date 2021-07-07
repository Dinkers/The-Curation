import { createSelector } from 'reselect'

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

// Derived Place Type data
export const getPlaceTypeImages = (state) => state.home.placeTypeImageMap
export const getSelectedPlaceType = (state) => state.home.selectedPlaceType

export const getPlacesImagesRequest = (state) => state.home.placesImagesRequest
export const getPlacesImages = (state) => state.home.placesImages

export const getPlacesImagesData = createSelector(
  getPlacesImagesRequest,
  getPlacesImages,
  (placesImagesRequest, placesImages) => ({
    placesImagesRequest,
    placesImages
  })
)
