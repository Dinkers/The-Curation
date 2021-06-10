import { createSelector } from 'reselect'

export const getCurrentScreen = (state) => state.app.currentScreen
export const getSelectedPlaceId = (state) => state.app.selectedPlaceId

export const getAppData = createSelector(
  getCurrentScreen,
  getSelectedPlaceId,
  (currentScreen, selectedPlaceId) => ({
    currentScreen,
    selectedPlaceId
  })
)
