import { createSlice } from '@reduxjs/toolkit'
import { InitModalState } from '../types'

const initialState: InitModalState = {
  loginModaL: false,
  registerModal: false,
  gameSettingsModal: false,
  gameCountriesModal: false,
  apiKeyModal: false,
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
    toggleGameSettingsModal(state) {
      state.gameSettingsModal = !state.gameSettingsModal
    },
    toggleGameCountriesModal(state) {
      state.gameCountriesModal = !state.gameCountriesModal
    },
    toggleApiKeyModal(state) {
      state.apiKeyModal = !state.apiKeyModal
    },
    closeSettingsModals(state) {
      state.gameSettingsModal = false
      state.gameCountriesModal = false
    },
    closeAllModals(state) {
      state.gameSettingsModal = false
      state.gameCountriesModal = false
      state.registerModal = false
      state.loginModaL = false
      state.apiKeyModal = false
    },
  },
})

export const { actions: modalsActions } = modalsSlice
export const { reducer: modalsReducer } = modalsSlice
