import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  fetchAuth,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  updateAvatar,
  updateNickname,
  updatePatch,
} from '../thunks'
import { AuthResponse, InitStateType, UpdateUserFieldsResponse } from '../types'

const initialState: InitStateType = {
  user: null,
  isLoading: false,
  isUserLoaded: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      fetchAuth.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user
        state.isLoading = false
        state.isUserLoaded = true
      }
    )
    builder.addCase(fetchAuth.rejected, (state) => {
      state.isLoading = false
      state.isUserLoaded = true
    })
    builder.addCase(
      fetchRegister.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user
      }
    )
    builder.addCase(
      fetchLogin.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user
      }
    )
    builder.addCase(fetchLogout.fulfilled, (state, action) => {
      if (action.payload.success === true) {
        state.user = null
      }
    })
    builder.addCase(
      updatePatch.fulfilled,
      (state, action: PayloadAction<UpdateUserFieldsResponse>) => {
        state.user = action.payload.user
      }
    )
    builder.addCase(
      updateNickname.fulfilled,
      (state, action: PayloadAction<UpdateUserFieldsResponse>) => {
        state.user = action.payload.user
      }
    )
    builder.addCase(
      updateAvatar.fulfilled,
      (state, action: PayloadAction<UpdateUserFieldsResponse>) => {
        state.user = action.payload.user
      }
    )
  },
})

export const { actions: authActions } = authSlice
export const { reducer: authReducer } = authSlice
