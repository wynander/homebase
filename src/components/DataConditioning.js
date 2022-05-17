import { FIPSCodes } from '../data/US_State_FIPS_Codes'

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
      ).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })
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

export function convertZillowCSVtoArray(data) {
  const zillowDataArray = []
  const rows = data.split('\n')
  rows.forEach((row) => {
    const columns = row.split(',')
    zillowDataArray.push(columns)
  })
  return zillowDataArray
}

function getHouseAppreciation(row, year) {
  let yearIdx = row.length - 12 * year - 1
  if (row[yearIdx] === '') {
    let leftOffset = 1
    let rightOffset = 1
    let left = row[yearIdx - leftOffset]
    let right = row[yearIdx + rightOffset]
    if (left === '') {
      while (left === '') {
        leftOffset++
        left = row[yearIdx - leftOffset]
      }
    }
    if (right === '') {
      while (right === '') {
        rightOffset++
        right = row[yearIdx + rightOffset]
      }
    }
    if ((leftOffset > 6 || rightOffset > 6) && row[row.length - 1] !== '') {
      return 'Not Available'
    }
    let yearVal = ((right - left) / (leftOffset + rightOffset)) * leftOffset + left
    return ((100 * (row[row.length - 1] - yearVal)) / year / yearVal).toFixed(2)
  }
  return ((100 * (row[row.length - 1] - row[yearIdx])) / year / row[yearIdx]).toFixed(2)
}
