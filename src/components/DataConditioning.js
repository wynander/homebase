import React, { useEffect } from 'react'

export function addPropertiesToCityJSON(cityData, data) {
  const zillowDataArray = convertZillowCSVtoArray(data)

  cityData.features.forEach((city, index) => {
    let idx = zillowDataArray.findIndex(
      (cityZillow) =>
        cityZillow[2] === city.properties.NAME || city.properties.NAME.search(cityZillow[2]) !== -1
    )
    if (idx !== -1) {
      city.properties.houseAppreciation2yr = getHouseAppreciation(zillowDataArray[idx], 2)
      city.properties.houseAppreciation5yr = getHouseAppreciation(zillowDataArray[idx], 5)
      city.properties.currentTypicalHousePrice = parseFloat(
        zillowDataArray[idx][zillowDataArray[idx].length - 1]
      ).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })
    } else {
      cityData.features[index].splice(1)
    }
  })
  return cityData
}

function convertZillowCSVtoArray(data) {
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
