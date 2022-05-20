import { FIPSCodes } from '@/exports/US_State_FIPS_Codes'
import { getHouseAppreciation } from './getHouseAppreciation'

export function addPropertiesToCityJSON(cityData, zillowDataArray) {
  //hash map of 'city names + state abbreviations': index  -> to avoid nested loops, instead using O(1) lookup
  let zillowHash = {}
  let undefinedCities = []

  zillowDataArray.forEach((row, index) => {
    zillowHash[row[2] + ' ' + row[4]] = index
  })

  cityData.features.forEach((city, index) => {
    //look up corresponding state abbreviation based on stateFP code
    let cityState = city.properties.NAME + ' ' + FIPSCodes[city.properties.STATEFP]
    let zillowIdx = zillowHash[cityState]

    if (zillowIdx !== undefined) {
      city.properties.houseAppreciation2yr = getHouseAppreciation(zillowDataArray[zillowIdx], 2)
      city.properties.houseAppreciation5yr = getHouseAppreciation(zillowDataArray[zillowIdx], 5)
      city.properties.currentTypicalHousePrice = parseFloat(
        zillowDataArray[zillowIdx][zillowDataArray[zillowIdx].length - 1]
      ).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
    } else {
      undefinedCities.push(index)
    }
  })
  //sort ascending index order of undefined cities
  undefinedCities.sort((a, b) => {
    return a - b
  })
  //remove descending index order so splice does not affect indexing of remaining cities
  for (let i = undefinedCities.length - 1; i >= 0; i--) {
    cityData.features.splice(undefinedCities[i], 1)
  }

  return cityData
}
