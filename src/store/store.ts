import { configureStore } from '@reduxjs/toolkit'
import messagesSlice from './messagesSlice'

const store = configureStore({
  reducer: {
    messages: messagesSlice
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch