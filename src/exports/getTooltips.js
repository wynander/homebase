export function getTooltipHex({ object }) {
  return (
    object && {
      html: `\
      <div>YoY return (2 Year Average): ${object.colorValue.toFixed(2)}%</div>
      <div>Typical Home Price: ${object.elevationValue.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })}</div>

      ${object.points
        .map((point) => {
          return `<div class="tooltip-city">${point.source.properties.NAME}</div>`
        })
        .join('')}    
      `,
    }
  )
}

export function getTooltipGeo({ object }) {
  return (
    object && {
      html: `\
  <div><b>${object.properties.NAME}</b></div>
  <div>Typical Home Price: ${
    object.properties.currentTypicalHousePrice === '$NaN'
      ? 'Not Available from Zillow'
      : object.properties.currentTypicalHousePrice
  }</div>
  <div>2 Year Average YoY Growth: ${
    !isNaN(object.properties.houseAppreciation2yr)
      ? object.properties.houseAppreciation2yr + '%'
      : 'Not Available from Zillow'
  }</div>
  <div>5 Year Average YoY Growth: ${
    !isNaN(object.properties.houseAppreciation5yr)
      ? object.properties.houseAppreciation5yr + '%'
      : 'Not Available from Zillow'
  }</div>
  `,
    }
  )
}
