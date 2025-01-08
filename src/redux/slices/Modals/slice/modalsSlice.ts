import { createSlice } from '@reduxjs/toolkit'
import { InitModalState } from '../types'

const initialState: InitModalState = {
  loginModaL: false,
  registerModal: false,
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState: initialState,
  reducers: {
    toggleRegisterModal(state) {
      state.registerModal = !state.registerModal
    },
    toggleLoginModal(state) {
      state.loginModaL = !state.loginModaL
    },
  },
})

export const { actions: modalsActions } = modalsSlice
export const { reducer: modalsReducer } = modalsSlice
