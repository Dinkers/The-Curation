import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './screens/home/homeSlice'

export default configureStore({
  reducer: {
    home: homeReducer
  },
})
