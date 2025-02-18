import { GAMEMODS, POINPOINTINGDIFFICULTIES } from '@/config/constants'
import { RootState } from '@/redux'
import { createSelector } from '@reduxjs/toolkit'

export const getGameConfig = (state: RootState) => state.gameConfig

export const checkIsPoinpointingMedium = createSelector(
  [getGameConfig],
  (config) =>
    config.settings.gameMode === GAMEMODS.POINPOINTING &&
    config.settings.gameDiffcult === POINPOINTINGDIFFICULTIES.MEDIUM
)
export const checkIsPoinpointingHard = createSelector(
  [getGameConfig],
  (config) =>
    config.settings.gameMode === GAMEMODS.POINPOINTING &&
    config.settings.gameDiffcult === POINPOINTINGDIFFICULTIES.HARD
)
