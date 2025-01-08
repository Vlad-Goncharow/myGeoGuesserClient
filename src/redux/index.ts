import { configureStore } from '@reduxjs/toolkit'
import { modalsReducer } from './slices/Modals/slice/modalsSlice'
import { authReducer } from './slices/AuthSlice/slice/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modals: modalsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
