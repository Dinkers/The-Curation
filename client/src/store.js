import { configureStore } from '@reduxjs/toolkit'
import homeReducer from 'screens/Home/homeSlice'

export default configureStore({
  reducer: {
    home: homeReducer
  },
})
