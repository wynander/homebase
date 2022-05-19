import { useEffect, useState } from 'react'
import { fetchCityBoundaryData } from '../api/fetchCityBoundaryData'
import { addPropertiesToCityJSON } from '../data/addPropertiesToCityJSON'
import { useStore } from '../store/store'

function useFetchGeoData(zillowData) {
  const addToLoadingStack = useStore((state) => state.addToLoadingStack)
  const removeFromLoadingStack = useStore((state) => state.removeFromLoadingStack)
  const stateChoices = useStore((state) => state.stateChoices) 
  const [geoJsonData, setGeoJsonData] = useState({
    type: 'FeatureCollection',
    features: [],
  })
 
  useEffect(() => {
    if (zillowData === null) return
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
