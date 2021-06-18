import { configureStore } from '@reduxjs/toolkit'

import appReducer from 'containers/App/data/appSlice'
import homeReducer from 'containers/Home/data/homeSlice'
import placeReducer from 'containers/Place/data/placeSlice'

export default configureStore({
  reducer: {
    app: appReducer,
    home: homeReducer,
    place: placeReducer
  },
})
