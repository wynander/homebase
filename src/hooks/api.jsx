import { lowercaseStateAbbreviations } from '../data/US_State_keys'

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

export const fetchCityPointData = async () => {
  const cityRes = await fetch(
    'https://raw.githubusercontent.com/wynander/market-maker/master/src/data/US_City_points_geojson.json'
  )
  const cityPoints = await cityRes.json()
  let coordinates = { features: [] }
  cityPoints.features.forEach((city) => {
    coordinates.features.push({
      COORDINATES: city.geometry.coordinates,
      properties: { NAME: city.properties.name, STATEFP: city.properties.state_fips },
    })
  })

  return coordinates
}

export const fetchZillowData = async () => {
  // //With zillow API key this would be fetched from their API and then modified the same way
  let zillowRes = await fetch('/data/Zillow_Home_Value_By_City_May_2022.csv', {
    headers: {
      'content-type': 'text/csv;charset=UTF-8',
    },
  })
  return await zillowRes.text()
}
