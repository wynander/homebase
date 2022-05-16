import { lowercaseStateAbbreviations } from '../data/US_State_keys'

export const useFetchCityBoundaries = async (stateChoices) => {
  console.log(stateChoices)
  const promises = []
  lowercaseStateAbbreviations.forEach((state) => {
    if (stateChoices.includes(state)) {
      const cityDataUrl = `https://raw.githubusercontent.com/wynander/geojson-us-city-boundaries/master/states/${state}.json`
      promises.push(fetch(cityDataUrl))
    }
  })
  let cityBoundaries = {}

  const res = await Promise.all(promises)
  const data = await Promise.all(res.map((r) => r.json()))
  data.forEach((d) => {
    if (cityBoundaries.features) {
      cityBoundaries.features.push(...d.features)
    } else {
      cityBoundaries = d
    }
  })
  return cityBoundaries
}
