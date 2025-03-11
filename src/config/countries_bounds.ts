import { Continent } from './continents'

export type Bounds = [number, number, number, number]

export interface CountryData {
  name: string
  bounds: Bounds
  continent: Continent
}

export interface CountryMap {
  [countryCode: string]: CountryData
}

export const countries: CountryMap = {
  AX: {
    name: 'Åland',
    bounds: [19.37, 59.79, 21.36, 60.48],
    continent: 'Europe',
  },
  AL: {
    name: 'Albania',
    bounds: [19.3, 39.62, 21.02, 42.69],
    continent: 'Europe',
  },
  AS: {
    name: 'American Samoa',
    bounds: [-170.83, -14.55, -169.44, -14.16],
    continent: 'Australasia',
  },
  AD: {
    name: 'Andorra',
    bounds: [1.41, 42.43, 1.78, 42.65],
    continent: 'Micro State',
  },
  AR: {
    name: 'Argentina',
    bounds: [-73.42, -55.25, -53.63, -21.83],
    continent: 'South America',
  },
  AU: {
    name: 'Australia',
    bounds: [113.34, -43.63, 153.57, -10.67],
    continent: 'Australasia',
  },
  AT: {
    name: 'Austria',
    bounds: [9.48, 46.43, 16.98, 49.04],
    continent: 'Europe',
  },
  BD: {
    name: 'Bangladesh',
    bounds: [88.08, 20.67, 92.67, 26.45],
    continent: 'Asia',
  },
  BE: {
    name: 'Belgium',
    bounds: [2.51, 49.53, 6.16, 51.48],
    continent: 'Europe',
  },
  BM: {
    name: 'Bermudas',
    bounds: [-64.89, 32.25, -64.65, 32.39],
    continent: 'North America',
  },
  BT: {
    name: 'Bhutan',
    bounds: [88.81, 26.72, 92.1, 28.3],
    continent: 'Asia',
  },
  BO: {
    name: 'Bolivia',
    bounds: [-69.59, -22.87, -57.5, -9.76],
    continent: 'South America',
  },
  BW: {
    name: 'Botswana',
    bounds: [19.9, -26.83, 29.43, -17.66],
    continent: 'Africa',
  },
  BR: {
    name: 'Brazil',
    bounds: [-73.99, -33.77, -34.73, 5.24],
    continent: 'South America',
  },
  BG: {
    name: 'Bulgaria',
    bounds: [22.38, 41.23, 28.56, 44.23],
    continent: 'Europe',
  },
  KH: {
    name: 'Cambodia',
    bounds: [102.35, 10.49, 107.61, 14.57],
    continent: 'Asia',
  },
  CA: {
    name: 'Canada',
    bounds: [-141.0, 41.68, -52.65, 73.23],
    continent: 'North America',
  },
  CL: {
    name: 'Chile',
    bounds: [-75.64, -55.61, -66.96, -17.58],
    continent: 'South America',
  },
  CX: {
    name: 'Christmas Island',
    bounds: [105.53, -10.57, 105.71, -10.41],
    continent: 'Australasia',
  },
  CC: {
    name: 'Cocos Islands',
    bounds: [96.81, -12.21, 96.94, -12.05],
    continent: 'Australasia',
  },
  CO: {
    name: 'Colombia',
    bounds: [-78.99, -4.3, -66.88, 12.44],
    continent: 'South America',
  },
  CR: {
    name: 'Costa Rica',
    bounds: [-85.94, 8.23, -82.55, 11.22],
    continent: 'Central America',
  },
  HR: {
    name: 'Croatia',
    bounds: [13.66, 42.48, 19.39, 46.5],
    continent: 'Europe',
  },
  CW: {
    name: 'Curaçao',
    bounds: [-69.16, 12.03, -68.73, 12.39],
    continent: 'Central America',
  },
  CZ: {
    name: 'Czech Republic',
    bounds: [12.24, 48.56, 18.85, 51.12],
    continent: 'Europe',
  },
  DK: {
    name: 'Denmark',
    bounds: [8.09, 54.8, 12.69, 57.73],
    continent: 'Europe',
  },
  DO: {
    name: 'Dominican Republic',
    bounds: [-71.95, 17.6, -68.32, 19.88],
    continent: 'Central America',
  },
  EC: {
    name: 'Ecuador',
    bounds: [-80.97, -4.96, -75.23, 1.38],
    continent: 'South America',
  },
  EE: {
    name: 'Estonia',
    bounds: [23.34, 57.47, 28.13, 59.61],
    continent: 'Europe',
  },
  SZ: {
    name: 'Eswatini',
    bounds: [30.68, -27.29, 32.07, -25.66],
    continent: 'Africa',
  },
  FO: {
    name: 'Faroe Islands',
    bounds: [-7.69, 61.39, -6.4, 62.39],
    continent: 'Europe',
  },
  FI: {
    name: 'Finland',
    bounds: [20.65, 59.85, 31.52, 70.16],
    continent: 'Europe',
  },
  FR: {
    name: 'France',
    bounds: [-5.0, 42.5, 9.56, 51.15],
    continent: 'Europe',
  },
  DE: {
    name: 'Germany',
    bounds: [5.99, 47.3, 15.02, 54.98],
    continent: 'Europe',
  },
  GH: {
    name: 'Ghana',
    bounds: [-3.24, 4.71, 1.06, 11.1],
    continent: 'Africa',
  },
  GI: {
    name: 'Gibraltar',
    bounds: [-5.36, 36.11, -5.34, 36.16],
    continent: 'Micro State',
  },
  GR: {
    name: 'Greece',
    bounds: [20.15, 34.92, 26.6, 41.83],
    continent: 'Europe',
  },
  GL: {
    name: 'Greenland',
    bounds: [-73.3, 60.04, -12.21, 83.65],
    continent: 'North America',
  },
  GU: {
    name: 'Guam',
    bounds: [144.62, 13.23, 144.96, 13.65],
    continent: 'Australasia',
  },
  GT: {
    name: 'Guatemala',
    bounds: [-92.23, 13.74, -88.23, 17.82],
    continent: 'Central America',
  },
  HK: {
    name: 'Hong Kong',
    bounds: [113.84, 22.15, 114.44, 22.56],
    continent: 'Asia',
  },
  HU: {
    name: 'Hungary',
    bounds: [16.2, 45.76, 22.71, 48.62],
    continent: 'Europe',
  },
  IS: {
    name: 'Iceland',
    bounds: [-24.33, 63.5, -13.61, 66.53],
    continent: 'Europe',
  },
  IN: {
    name: 'India',
    bounds: [68.18, 7.97, 97.4, 35.49],
    continent: 'Asia',
  },
  ID: {
    name: 'Indonesia',
    bounds: [95.29, -10.36, 141.03, 5.48],
    continent: 'Asia',
  },
  IE: {
    name: 'Ireland',
    bounds: [-9.98, 51.67, -6.03, 55.13],
    continent: 'Europe',
  },
  IM: {
    name: 'Isle of Man',
    bounds: [-4.83, 54.05, -4.37, 54.42],
    continent: 'Europe',
  },
  IL: {
    name: 'Israel',
    bounds: [34.27, 29.5, 35.84, 33.28],
    continent: 'Asia',
  },
  IT: {
    name: 'Italy',
    bounds: [6.75, 36.62, 18.48, 47.12],
    continent: 'Europe',
  },
  JP: {
    name: 'Japan',
    bounds: [129.41, 31.03, 145.54, 45.55],
    continent: 'Asia',
  },
  JE: {
    name: 'Jersey',
    bounds: [-2.25, 49.16, -2.01, 49.26],
    continent: 'Europe',
  },
  JO: {
    name: 'Jordan',
    bounds: [34.92, 29.2, 39.2, 33.38],
    continent: 'Asia',
  },
  KZ: {
    name: 'Kazakhstan',
    bounds: [46.47, 40.66, 87.36, 55.39],
    continent: 'Asia',
  },
  KE: {
    name: 'Kenya',
    bounds: [33.89, -4.68, 41.86, 5.51],
    continent: 'Africa',
  },
  KG: {
    name: 'Kyrgyzstan',
    bounds: [69.46, 39.28, 80.26, 43.3],
    continent: 'Asia',
  },
  LA: {
    name: 'Laos',
    bounds: [100.12, 13.88, 107.56, 22.46],
    continent: 'Asia',
  },
  LV: {
    name: 'Latvia',
    bounds: [21.06, 55.62, 28.18, 57.97],
    continent: 'Europe',
  },
  LB: {
    name: 'Lebanon',
    bounds: [35.13, 33.09, 36.61, 34.64],
    continent: 'Asia',
  },
  LS: {
    name: 'Lesotho',
    bounds: [27.0, -30.65, 29.33, -28.65],
    continent: 'Africa',
  },
  LI: {
    name: 'Liechtenstein',
    bounds: [9.48, 47.06, 9.63, 47.27],
    continent: 'Micro State',
  },
  LT: {
    name: 'Lithuania',
    bounds: [21.06, 53.91, 26.59, 56.37],
    continent: 'Europe',
  },
  LU: {
    name: 'Luxembourg',
    bounds: [5.67, 49.44, 6.24, 50.13],
    continent: 'Micro State',
  },
  MO: {
    name: 'Macau',
    bounds: [113.53, 22.11, 113.59, 22.22],
    continent: 'Asia',
  },
  MY: {
    name: 'Malaysia',
    bounds: [100.09, 0.77, 119.18, 6.93],
    continent: 'Asia',
  },
  MT: {
    name: 'Malta',
    bounds: [14.18, 35.81, 14.58, 36.08],
    continent: 'Micro State',
  },
  MX: {
    name: 'Mexico',
    bounds: [-117.13, 14.54, -86.81, 32.72],
    continent: 'North America',
  },
  MC: {
    name: 'Monaco',
    bounds: [7.41, 43.73, 7.44, 43.75],
    continent: 'Micro State',
  },
  MN: {
    name: 'Mongolia',
    bounds: [87.75, 41.6, 119.77, 52.05],
    continent: 'Asia',
  },
  ME: {
    name: 'Montenegro',
    bounds: [18.45, 41.88, 20.34, 43.52],
    continent: 'Europe',
  },
  NL: {
    name: 'Netherlands',
    bounds: [3.31, 50.8, 7.09, 53.51],
    continent: 'Europe',
  },
  NZ: {
    name: 'New Zealand',
    bounds: [166.51, -46.64, 178.52, -34.45],
    continent: 'Australasia',
  },
  NG: {
    name: 'Nigeria',
    bounds: [2.69, 4.24, 14.58, 13.87],
    continent: 'Africa',
  },
  MK: {
    name: 'North Macedonia',
    bounds: [20.46, 40.84, 22.95, 42.32],
    continent: 'Europe',
  },
  MP: {
    name: 'Northern Mariana Islands',
    bounds: [145.06, 14.11, 145.89, 20.55],
    continent: 'Australasia',
  },
  NO: {
    name: 'Norway',
    bounds: [4.99, 58.08, 31.29, 70.92],
    continent: 'Europe',
  },
  OM: {
    name: 'Oman',
    bounds: [52.0, 16.65, 59.81, 26.4],
    continent: 'Asia',
  },
  PS: {
    name: 'Palestine',
    bounds: [34.93, 31.35, 35.55, 32.53],
    continent: 'Asia',
  },
  PA: {
    name: 'Panama',
    bounds: [-82.97, 7.22, -77.24, 9.61],
    continent: 'Central America',
  },
  PE: {
    name: 'Peru',
    bounds: [-81.41, -18.35, -68.67, -0.06],
    continent: 'South America',
  },
  PH: {
    name: 'Philippines',
    bounds: [117.17, 5.58, 126.54, 18.51],
    continent: 'Asia',
  },
  PN: {
    name: 'Pitcairn Islands',
    bounds: [-130.75, -25.09, -124.77, -23.92],
    continent: 'Australasia',
  },
  PL: {
    name: 'Poland',
    bounds: [14.07, 49.03, 24.03, 54.85],
    continent: 'Europe',
  },
  PT: {
    name: 'Portugal',
    bounds: [-9.53, 36.84, -6.39, 42.28],
    continent: 'Europe',
  },
  PR: {
    name: 'Puerto Rico',
    bounds: [-67.24, 17.95, -65.59, 18.52],
    continent: 'Central America',
  },
  QA: {
    name: 'Qatar',
    bounds: [50.74, 24.56, 51.61, 26.11],
    continent: 'Asia',
  },
  RE: {
    name: 'Reunion',
    bounds: [55.22, -21.39, 55.84, -20.87],
    continent: 'Africa',
  },
  RO: {
    name: 'Romania',
    bounds: [20.22, 43.69, 29.63, 48.22],
    continent: 'Europe',
  },
  RU: {
    name: 'Russia',
    bounds: [-180.0, 41.15, 180.0, 81.25],
    continent: 'Europe',
  },
  RW: {
    name: 'Rwanda',
    bounds: [29.02, -2.92, 30.82, -1.13],
    continent: 'Africa',
  },
  SM: {
    name: 'San Marino',
    bounds: [12.4, 43.9, 12.52, 43.99],
    continent: 'Micro State',
  },
  ST: {
    name: 'Sao Tomé & Principé',
    bounds: [6.46, -0.05, 7.46, 1.7],
    continent: 'Africa',
  },
  SN: {
    name: 'Senegal',
    bounds: [-17.63, 12.33, -11.47, 16.6],
    continent: 'Africa',
  },
  RS: {
    name: 'Serbia',
    bounds: [18.83, 42.25, 22.99, 46.17],
    continent: 'Europe',
  },
  SG: {
    name: 'Singapore',
    bounds: [103.62, 1.26, 104.01, 1.47],
    continent: 'Asia',
  },
  SK: {
    name: 'Slovakia',
    bounds: [16.88, 47.76, 22.56, 49.57],
    continent: 'Europe',
  },
  SI: {
    name: 'Slovenia',
    bounds: [13.7, 45.45, 16.56, 46.85],
    continent: 'Europe',
  },
  ZA: {
    name: 'South Africa',
    bounds: [16.34, -34.82, 32.83, -22.09],
    continent: 'Africa',
  },
  KR: {
    name: 'South Korea',
    bounds: [126.12, 34.39, 129.47, 38.61],
    continent: 'Asia',
  },
  ES: {
    name: 'Spain',
    bounds: [-9.39, 35.95, 3.04, 43.75],
    continent: 'Europe',
  },
  LK: {
    name: 'Sri Lanka',
    bounds: [79.7, 5.97, 81.79, 9.82],
    continent: 'Asia',
  },
  SE: {
    name: 'Sweden',
    bounds: [11.03, 55.36, 23.9, 69.11],
    continent: 'Europe',
  },
  CH: {
    name: 'Switzerland',
    bounds: [6.02, 45.78, 10.44, 47.83],
    continent: 'Europe',
  },
  TW: {
    name: 'Taiwan',
    bounds: [120.11, 21.97, 121.95, 25.3],
    continent: 'Asia',
  },
  TH: {
    name: 'Thailand',
    bounds: [97.38, 5.69, 105.59, 20.42],
    continent: 'Asia',
  },
  TN: {
    name: 'Tunisia',
    bounds: [7.52, 30.31, 11.49, 37.35],
    continent: 'Africa',
  },
  TR: {
    name: 'Türkiye',
    bounds: [26.04, 35.82, 44.79, 42.14],
    continent: 'Asia',
  },
  UG: {
    name: 'Uganda',
    bounds: [29.58, -1.44, 35.04, 4.25],
    continent: 'Africa',
  },
  UA: {
    name: 'Ukraine',
    bounds: [22.09, 44.36, 40.08, 52.34],
    continent: 'Europe',
  },
  AE: {
    name: 'United Arab Emirates',
    bounds: [51.58, 22.5, 56.4, 26.06],
    continent: 'Asia',
  },
  GB: {
    name: 'United Kingdom',
    bounds: [-7.57, 49.96, 1.68, 58.64],
    continent: 'Europe',
  },
  VI: {
    name: 'United States Virgin Islands',
    bounds: [-64.98, 17.67, -64.56, 18.41],
    continent: 'Central America',
  },
  UY: {
    name: 'Uruguay',
    bounds: [-58.43, -34.95, -53.21, -30.11],
    continent: 'South America',
  },
  US: {
    name: 'USA',
    bounds: [-125.0, 25.0, -66.96, 49.5],
    continent: 'North America',
  },
}
