import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthResponse, InitStateType } from '../types'
import { fetchAuth, fetchLogin, fetchLogout, fetchRegister } from '../thunks'

const initialState:InitStateType = {
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.fulfilled, (state, action:PayloadAction<AuthResponse>) => {
      state.user = action.payload.user
    }),
    builder.addCase(fetchRegister.fulfilled, (state, action:PayloadAction<AuthResponse>) => {
      state.user = action.payload.user
    }),
    builder.addCase(fetchLogin.fulfilled, (state, action:PayloadAction<AuthResponse>) => {
      state.user = action.payload.user
    }),
    builder.addCase(fetchLogout.fulfilled, (state, action) => {
      if (action.payload.success === true) {
        state.user = null
      }
    })
  },
})


export const { actions: authActions } = authSlice
export const { reducer: authReducer } = authSlice