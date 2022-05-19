export const getColorValue = (points) => {
  if (points) {
    let sum = 0
    let ct = points.length
    points.forEach((point) => {
      if (!isNaN(point.properties.houseAppreciation2yr)) {
        sum += +point.properties.houseAppreciation2yr
      } else {
        ct--
      }
    })
    return sum / points.length
  }
}

export const getElevationValue = (points) => {
  if (points) {
    let sum = 0
    let ct = points.length
    points.forEach((point) => {
      if (point.properties.currentTypicalHousePrice !== '$NaN') {
        let dollarsAsFloat = parseFloat(
          point.properties.currentTypicalHousePrice.replace(/[^0-9-.]/g, '')
        )
        sum += dollarsAsFloat
      } else {
        ct--
      }
    })
    return sum / ct
  }
}
