import { lowercaseStateAbbreviations } from '../exports/US_State_keys'

export const fetchCityBoundaryData = async (stateChoices) => {
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

  data.forEach((dataPoint) => {
    if (cityBoundaries.features) {
      cityBoundaries.features.push(...dataPoint.features)
    } else {
      cityBoundaries = dataPoint
    }
  })

  return cityBoundaries
}
