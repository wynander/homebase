import { useStore } from '@/store/store'
import React, { useEffect } from 'react'

const useFilterData = (data) => {
  const [filteredData, setFilteredData] = React.useState(data)
  const { 'Typical House Price': housePriceFilter, 'Appreciation Rate': appreciationRateFilter } =
    useStore()

  useEffect(() => {
    if (data) {
      setFilteredData(
        data.features.filter((data) => {
          const housePrice = data.properties.currentTypicalHousePrice.replace(/[^0-9-.]/g, '')
          const appreciationRate = data.properties.houseAppreciation2yr

          return (
            +housePrice >= housePriceFilter[0] &&
            +housePrice <= housePriceFilter[1] &&
            +appreciationRate >= appreciationRateFilter[0] &&
            +appreciationRate <= appreciationRateFilter[1]
          )
        })
      )
    }
  }, [data, housePriceFilter, appreciationRateFilter])

  return filteredData
}

export default useFilterData