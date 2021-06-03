import { configureStore } from '@reduxjs/toolkit'
import homeReducer from 'screens/Home/data/homeSlice'

export default configureStore({
  reducer: {
    home: homeReducer
  },
})
