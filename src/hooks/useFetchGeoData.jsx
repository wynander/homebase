import { useEffect, useState } from 'react'
import { fetchCityBoundaryData } from '@/api/fetchCityBoundaryData'
import { addPropertiesToCityJSON } from '@/data/addPropertiesToCityJSON'
import { useStore } from '@/store/store'

const useFetchGeoData = (zillowData) => {
  const { addToLoadingStack, removeFromLoadingStack, stateChoices } = useStore()
  
  const [geoJsonData, setGeoJsonData] = useState({
    type: 'FeatureCollection',
    features: [],
  })

  useEffect(() => {
    if (zillowData === null) return
    if (stateChoices.length === 0) {
      setGeoJsonData({
        type: 'FeatureCollection',
        features: [],
      })
      return
    }
    addToLoadingStack('fetchingCityBoundaryData')

    fetchCityBoundaryData(stateChoices).then((boundaries) => {
      const geoDataUpdate = addPropertiesToCityJSON(boundaries, zillowData)
      setGeoJsonData(geoDataUpdate)
      removeFromLoadingStack('fetchingCityBoundaryData')
    })
  }, [stateChoices, zillowData])

  return geoJsonData
}

export default useFetchGeoData
