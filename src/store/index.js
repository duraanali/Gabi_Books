import { configureStore } from '@reduxjs/toolkit'
import BookReducer from './api/BookSlice'

export const store = configureStore({
  reducer: {
    book: BookReducer
    }
})