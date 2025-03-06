import { GAMEMODS, PINPOINTINGDIFFICULTIES } from '@/config/constants'
import { RootState } from '@/redux'
import { createSelector } from '@reduxjs/toolkit'

export const getGameConfig = (state: RootState) => state.gameConfig

export const isGameModeCountries = createSelector(
  [getGameConfig],
  (config) => config.settings.gameMode === GAMEMODS.COUNTRYGUESSR
)
export const isGameModePinpointing = createSelector(
  [getGameConfig],
  (config) => config.settings.gameMode === GAMEMODS.PINPOINTING
)

export const checkIsPinpointingMedium = createSelector(
  [getGameConfig],
  (config) =>
    config.settings.gameMode === GAMEMODS.PINPOINTING &&
    config.settings.gameDiffcult === PINPOINTINGDIFFICULTIES.MEDIUM
)
export const checkIsPinpointingHard = createSelector(
  [getGameConfig],
  (config) =>
    config.settings.gameMode === GAMEMODS.PINPOINTING &&
    config.settings.gameDiffcult === PINPOINTINGDIFFICULTIES.HARD
)
