import AdvancedPointpointing from '@/assets/svgs/advancedPointpointing.svg'
import StandartPointpointing from '@/assets/svgs/standartPoinpoining.svg'
import UltraPoinpointing from '@/assets/svgs/ultraPoinpointing.svg'
import Sityguessr from '@/assets/svgs/sityguessr.svg'
import CountryBattle from '@/assets/svgs/countryBattle.svg'
import Flags from '@/assets/svgs/flags.svg'
import { GameModeType } from '../types/gameMods'

export const modes: GameModeType[] = [
  {
    difficulties: [
      {
        name: 'Standard Pinpointing',
        description:
          'Try to pinpoint the exact drop location as close as possible to earn points.',
        icon: StandartPointpointing,
        difficulty: 'Standard Pinpointing Casual',
      },
      {
        name: 'Advanced Pinpointing',
        description:
          'A more challenging level with limited moves. Test your skills!',
        icon: AdvancedPointpointing,
        difficulty: 'Advanced Pinpointing Demanding',
      },
      {
        name: 'Ultra Instinct Pinpointing',
        description:
          'The ultimate challenge! Pinpoint your location from a still image with neither borders nor labels on the map.',
        icon: UltraPoinpointing,
        difficulty: 'Ultra Unstinct Pinpointing Challenging',
      },
    ],
    name: 'Pinpointing',
    description:
      'Try to pinpoint the exact drop location as close as possible to earn points.',
    icon: StandartPointpointing,
  },
  {
    name: 'City Guesser',
    description:
      "Try to guess the correct city in these worldwide urban drops. Large full score radius, so don't bother pinpointing. Be quick!",
    icon: Sityguessr,
  },
  {
    name: 'Country gueessr',
    description:
      'Try to identify the target country faster than your opponents!',
    icon: CountryBattle,
  },
  {
    name: 'Flags',
    description:
      'Can you casually identify the flag of all countries in the world? Take your time, but you only have one guess!',
    icon: Flags,
  },
  {
    name: 'States',
    description: 'Try to identify the target state faster than your opponents!',
    icon: CountryBattle,
  },
]
