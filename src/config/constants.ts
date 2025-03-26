export const GAMESETTINGS = {
  MINROUNDS: 1,
  MAXROUNDS: 50,
  MAXTIME: 600,
  MINTIME: 5,
  MAXPLAYERS: 10,
}

export const USERFIELDSCONSTS = {
  MAX_NICKNAME_LENGTH: 17,
  MIN_NICKNAME_LENGTH: 10,
  MAX_PASSWORD_LENGTH: 50,
  MIN_PASSWORD_LENGTH: 10,
}

export enum GAMEMODS {
  PINPOINTING = 'Pinpointing',
  COUNTRYGUESSR = 'Country guessr',
}

export enum PINPOINTINGDIFFICULTIES {
  STANDART = 'Standard Pinpointing',
  MEDIUM = 'Advanced Pinpointing',
  HARD = 'Ultra Instinct Pinpointing',
}
