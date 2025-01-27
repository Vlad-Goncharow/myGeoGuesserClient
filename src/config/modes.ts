import AdvancedPointpointing from '@/assets/svgs/advancedPointpointing.svg'
import StandartPointpointing from '@/assets/svgs/standartPoinpoining.svg'
import UltraPoinpointing from '@/assets/svgs/ultraPoinpointing.svg'
import SityGuessr from '@/assets/svgs/sityguessr.svg'
import { GameModeType } from '../types/gameModes'

export const modes: GameModeType[] = [
  {
    modes: [
      {
        name: 'Standard Pinpointing',
        description:
          "Step up the pinpointing difficulty. You can't move. Let your intuition guide you!",
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
  },
  {
    modes: [
      {
        name: 'City Guesser',
        description:
          "Try to guess the correct city in these worldwide urban drops. Large full score radius, so don't bother pinpointing. Be quick!",
        icon: SityGuessr,
        difficulty: null,
      },
    ],
    name: 'City Guesser',
  },
  {
    modes: [
      {
        name: 'Popular Landmarks',
        description:
          'Pinpoint the location of the most famous landmarks. Earn points with good guesses.',
        difficulty: 'Popular Landmarks Casual',
        icon: SityGuessr,
      },
      {
        name: 'Worldwide Landmarks',
        description:
          'Pinpoint the location of various landmarks around the world. Earn points with good guesses.',
        difficulty: 'Wordlwide Landmarks Demanding',
        icon: SityGuessr,
      },
    ],
    name: 'Popular Landmarks',
  },
]
