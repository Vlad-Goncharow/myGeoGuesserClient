import AdvancedPintpointing from '@/assets/svgs/AdvancedPintpointing.svg'
import StandartPinpointing from '@/assets/svgs/standartPinpointing.svg'
import UltraPinpointing from '@/assets/svgs/ultraPinpointing.svg'
import CountryBattle from '@/assets/svgs/countryBattle.svg'
import { GameModeType } from '../types/gameMods'
import { GAMEMODS, PINPOINTINGDIFFICULTIES } from './constants'

export const modes: GameModeType[] = [
  {
    difficulties: [
      {
        name: PINPOINTINGDIFFICULTIES.STANDART,
        description:
          'Try to pinpoint the exact drop location as close as possible to earn points.',
        icon: StandartPinpointing,
        difficulty: 'Standard Pinpointing Casual',
      },
      {
        name: PINPOINTINGDIFFICULTIES.MEDIUM,
        description:
          'A more challenging level with limited moves. Test your skills!',
        icon: AdvancedPintpointing,
        difficulty: 'Advanced Pinpointing Demanding',
      },
      {
        name: PINPOINTINGDIFFICULTIES.HARD,
        description:
          'The ultimate challenge! Pinpoint your location from a still image with neither borders nor labels on the map.',
        icon: UltraPinpointing,
        difficulty: 'Ultra Unstinct Pinpointing Challenging',
      },
    ],
    name: GAMEMODS.PINPOINTING,
    description:
      'Try to pinpoint the exact drop location as close as possible to earn points.',
    icon: StandartPinpointing,
  },
  {
    name: GAMEMODS.COUNTRYGUESSR,
    description:
      'Try to identify the target country faster than your opponents!',
    icon: CountryBattle,
  },
]
