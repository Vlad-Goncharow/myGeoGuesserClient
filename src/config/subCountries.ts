import countries110 from './countries110.json'
import countries50 from './countries50.json'

export const countriesList = countries110.features.map((el) => {
  return {
    name: el.properties.NAME,
    nameLong: el.properties.NAME_LONG,
    code: String(el.properties.ISO_A2),
    id: String(`${el.properties.ISO_A2} ${el.properties.ISO_A3}`),
    checked: true,
  }
})

export const countriesListNames = countries50.features.map((el) => {
  return {
    name: el.properties.NAME,
  }
})
