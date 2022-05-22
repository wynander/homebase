import { useStore } from '@/store/store'
import React, { useEffect } from 'react'

export default function useFilterHexData(hexData) {
  const [filteredHexData, setFilteredHexData] = React.useState(hexData)
  const { 'Typical House Price': housePriceFilter, 'Appreciation Rate': appreciationRateFilter } =
    useStore()

  useEffect(() => {
    if (hexData) {
      setFilteredHexData(
        hexData.features.filter((data) => {
          const housePrice = data.properties.currentTypicalHousePrice.replace(/[^0-9-.]/g, '')
          const appreciationRate = data.properties.houseAppreciation2yr

          if (
            +housePrice >= housePriceFilter[0] &&
            +housePrice <= housePriceFilter[1] &&
            +appreciationRate >= appreciationRateFilter[0] &&
            +appreciationRate <= appreciationRateFilter[1]
          ) {
            return true
          }
          return false
        })
      )
    }
  }, [hexData, housePriceFilter, appreciationRateFilter])

  return filteredHexData
}
