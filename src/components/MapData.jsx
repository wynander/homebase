import React, { useEffect, useState } from 'react'
import Map from './Map'
import { addPropertiesToCityJSON } from './DataConditioning'
import { GeoJsonLayer } from '@deck.gl/layers'
import { HexagonLayer } from '@deck.gl/aggregation-layers'
import { colorScale, colorRange, colorDomain } from './colorScales'
import { useStore } from './store'
import { convertZillowCSVtoArray } from './DataConditioning'
import { fetchZillowData, fetchCityBoundaryData, fetchCityPointData } from '../hooks/api'

export default function MapData({}) {
  const stateChoices = useStore((state) => state.stateChoices)
  const layerChoice = useStore((state) => state.layerChoice)
  const addToLoadingStack = useStore((state) => state.addToLoadingStack)
  const removeFromLoadingStack = useStore((state) => state.removeFromLoadingStack)
  const radius = useStore((state) => state.radius)
  const elevationScale = useStore((state) => state.elevationScale)

  const [zillowData, setZillowData] = useState(null)
  const [geoJsonData, setGeoJsonData] = useState({
    type: 'FeatureCollection',
    features: [],
  })
  const [hexData, setHexData] = useState({
    type: 'FeatureCollection',
    features: [],
  })

  useEffect(() => {
    addToLoadingStack('fetchingZillowData')
    fetchZillowData().then((data) => {
      setZillowData(convertZillowCSVtoArray(data))
      removeFromLoadingStack('fetchingZillowData')
    })
  }, [])

  //Hexagon layer spatial join side effect
  useEffect(() => {
    if (zillowData === null) return
    addToLoadingStack('fetchingCityPointData')
    fetchCityPointData().then((coordinates) => {
      const hexDataUpdate = addPropertiesToCityJSON(coordinates, zillowData)
      setHexData(hexDataUpdate)
      removeFromLoadingStack('fetchingCityPointData')
    })
  }, [zillowData])

  //GeoJSON layer spatial join side effect
  useEffect(() => {
    if (zillowData === null) return
    addToLoadingStack('fetchingCityBoundaryData')
    fetchCityBoundaryData(stateChoices).then((boundaries) => {
      const geoDataUpdate = addPropertiesToCityJSON(boundaries, zillowData)
      setGeoJsonData(geoDataUpdate)
      removeFromLoadingStack('fetchingCityBoundaryData')
    })
  }, [stateChoices, zillowData])

  const getMean2yr = (points) => {
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

  const getElevation = (points) => {
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

  const isVisible = layerChoice === 'overview' ? true : false
  const detailedElevation = false

  const layers = [
    new HexagonLayer({
      id: 'heatmap',
      opacity: 0.2,
      colorRange,
      colorDomain,
      coverage: 1,
      data: hexData.features,
      elevationRange: [0, 1000000],
      extruded: true,
      getPosition: (d) => d.COORDINATES,
      getElevationValue: getElevation,
      getColorValue: getMean2yr,
      pickable: true,
      radius,
      upperPercentile: 100,
      elevationScale: elevationScale / 2,
      visible: isVisible,
      updateTriggers: {
        getElevationValue: { radius },
        getColorValue: { radius },
      },
    }),
    new GeoJsonLayer({
      id: 'geojson',
      data: geoJsonData,
      opacity: 0.2,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      getFillColor: (city) => colorScale(city.properties.houseAppreciation2yr),
      getLineColor: (city) => colorScale(city.properties.houseAppreciation2yr),
      getElevation: (city) => {
        if (detailedElevation === false || city.properties.currentTypicalHousePrice === '$NaN')
          return 0
        return parseFloat(city.properties.currentTypicalHousePrice.replace(/[^0-9.-]+/g, '')) / 20
      },
      pickable: true,
      visible: !isVisible,
    }),
  ]

  return (
    <div>
      <Map layers={layers} />
    </div>
  )
}
