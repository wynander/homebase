const cityDataUrl =
  'https://raw.githubusercontent.com/wynander/market-maker/9f290fe64a0b986a33dd3caa027a7e10d3c87118/src/data/california-city-geo.json'
const response = await fetch(cityDataUrl)
const cityData = await response.json()
console.log(cityData.features)
//With zillow API key this would be fetched from their API and then conditioned the same way
let zillowData = await fetch('../src/data/City_zhvi.csv', {
  headers: {
    'content-type': 'text/csv;charset=UTF-8',
  },
})
const data = await zillowData.text()

const DATA_ARRAY = []
const rows = data.split('\n')

const currentState = 'CA'

rows.forEach((row) => {
  const columns = row.split(',')
  if (columns[5] === currentState) {
    DATA_ARRAY.push(columns)
  }
})

cityData.features.forEach((city) => {
  let idx = DATA_ARRAY.findIndex((cityZillow) => cityZillow[2] === city.properties.name)
  if (idx !== -1) {
    city.properties.houseAppreciation2yr = getHouseAppreciation(DATA_ARRAY[idx], 2)
    city.properties.houseAppreciation5yr = getHouseAppreciation(DATA_ARRAY[idx], 5)
    city.properties.houseAppreciation10yr = getHouseAppreciation(DATA_ARRAY[idx], 10)
    city.properties.currentTypicalHousePrice = parseFloat(
      DATA_ARRAY[idx][DATA_ARRAY[idx].length - 1]
    ).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })
  }
  if (idx === -1) {
    city.properties.houseAppreciation2yr = 'Not Available'
    city.properties.houseAppreciation5yr = 'Not Available'
    city.properties.houseAppreciation10yr = 'Not Available'
    city.properties.currentTypicalHousePrice = 'Not Available'
  }
})

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

export { cityData }
