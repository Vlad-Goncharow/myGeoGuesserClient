import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  TemporaryUserInitState,
  TemporaryUserType,
} from '../types/TemporaryUserTypes'

const initialState: TemporaryUserInitState = {
  temporaryUser: null,
}

const TemporaryUserSlice = createSlice({
  name: 'temporary-user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TemporaryUserType>) => {
      state.temporaryUser = action.payload
    },
    clearTempUser: (state) => {
      state.temporaryUser = null
    },
  },
})

export const { actions: TemporaryUserActions } = TemporaryUserSlice
export const { reducer: TemporaryUserReducer } = TemporaryUserSlice
