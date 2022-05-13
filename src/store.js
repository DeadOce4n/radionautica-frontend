import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/themeSlice'

const createStore = () => configureStore({
  reducer: {
    theme: themeReducer
  }
})

export default createStore
