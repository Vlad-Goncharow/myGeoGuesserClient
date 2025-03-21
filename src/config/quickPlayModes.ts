import PinpointingImage from '@/assets/img/pinpointing.jpg'
import PinpointingBg from '@/assets/img/pinpointingBg.jpg'
import CountryImage from '@/assets/img/country.webp'
import CountryBg from '@/assets/img/countryBg.jpg'
import { GAMEMODS } from './constants'

export type quickPlayModesType = {
  name: GAMEMODS
  description: string
  image: string
  bg: string
}

export const quickPlayModes: quickPlayModesType[] = [
  {
    name: GAMEMODS.PINPOINTING,
    description:
      'Guess the position as best as you can in the given time limit with locations all around the world',
    image: PinpointingImage,
    bg: PinpointingBg,
  },
  {
    name: GAMEMODS.COUNTRYGUESSR,
    description:
      "How quick can you identify the country you're in? Use your three lives to your advantage.",
    image: CountryImage,
    bg: CountryBg,
  },
]
