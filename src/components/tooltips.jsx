//need to implement edge case handling for not available data
export function getTooltipHex({ object }) {
  return (
    object && {
      html: `\
      <div></div>
      `,
    }
  )
}
export function getTooltipGeo({ object }) {
  return (
    object && {
      html: `\
  <div><b>Name and County</b></div>
  <div>${object.properties.NAME}</div>
  <div>Typical Home Price: ${
    object.properties.currentTypicalHousePrice === '$NaN'
      ? 'Not Available from Zillow'
      : object.properties.currentTypicalHousePrice
  }</div>
  <div>2 Year YoY Growth: ${
    !isNaN(object.properties.houseAppreciation2yr)
      ? object.properties.houseAppreciation2yr + '%'
      : 'Not Available from Zillow'
  }</div>
  <div>5 Year YoY Growth: ${
    !isNaN(object.properties.houseAppreciation5yr)
      ? object.properties.houseAppreciation5yr + '%'
      : 'Not Available from Zillow'
  }</div>
  `,
    }
  )
}
