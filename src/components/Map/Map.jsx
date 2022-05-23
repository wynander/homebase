import { HexagonLayer } from '@deck.gl/aggregation-layers'
import { GeoJsonLayer } from '@deck.gl/layers'
import React, { useEffect } from 'react'
import { colorDomain, colorRange, colorScale } from '@/exports/colorScales'
import useFetchGeoData from '@/hooks/useFetchGeoData'
import useFetchHexData from '@/hooks/useFetchHexData'
import useFetchZillowData from '@/hooks/useFetchZillowData'
import { useStore } from '@/store/store'
import Deck from './components/Deck'
import { getColorValue, getElevationValue } from '@/exports/getAttributes'
import useFilterData from '@/hooks/useFilterData'

export default function Map({}) {
  const { layerChoice, radius, elevationScale } = useStore()

  const zillowData = useFetchZillowData()
  const hexData = useFetchHexData(zillowData)
  const geoJsonData = useFetchGeoData(zillowData)

  const filteredHexData = useFilterData(hexData)
  const filteredGeoData = useFilterData(geoJsonData)

  const isVisible = layerChoice === 'overview' ? true : false

  const layers = [
    new HexagonLayer({
      id: 'heatmap',
      opacity: 0.2,
      colorRange,
      colorDomain,
      coverage: 1,
      data: filteredHexData,
      elevationRange: [0, 1000000],
      extruded: true,
      getPosition: (d) => d.COORDINATES,
      getElevationValue: getElevationValue,
      getColorValue: getColorValue,
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
      data: filteredGeoData,
      opacity: 0.2,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      getFillColor: (city) =>
        !isNaN(city.properties.houseAppreciation2yr)
          ? colorScale(city.properties.houseAppreciation2yr)
          : [0, 0, 0, 255],
      getLineColor: (city) =>
        !isNaN(city.properties.houseAppreciation2yr)
          ? colorScale(city.properties.houseAppreciation2yr)
          : [0, 0, 0, 255],
      pickable: true,
      visible: !isVisible,
    }),
  ]

  return (
    <div>
      <Deck layers={layers} />
    </div>
  )
}
