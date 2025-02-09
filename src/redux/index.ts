import { configureStore } from '@reduxjs/toolkit'
import { modalsReducer } from './slices/Modals/slice/modalsSlice'
import { authReducer } from './slices/AuthSlice/slice/authSlice'
import { gameConfigReducer } from './slices/GameConfig/slice/GameConfigSlice'
import { miniGamegReducer } from './slices/MiniGame/slice/MiniGame'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modals: modalsReducer,
    gameConfig: gameConfigReducer,
    miniGame: miniGamegReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
