import { HexagonLayer } from '@deck.gl/aggregation-layers'
import { GeoJsonLayer } from '@deck.gl/layers'
import React from 'react'
import { colorDomain, colorRange, colorScale } from '@/exports/colorScales'
import useFetchGeoData from '@/hooks/useFetchGeoData'
import useFetchHexData from '@/hooks/useFetchHexData'
import useFetchZillowData from '@/hooks/useFetchZillowData'
import { useStore } from '@/store/store'
import Deck from './components/Deck'
import { getColorValue, getElevationValue } from '@/exports/getAttributes'

export default function Map({}) {
  const layerChoice = useStore((state) => state.layerChoice)
  const radius = useStore((state) => state.radius)
  const elevationScale = useStore((state) => state.elevationScale)

  const zillowData = useFetchZillowData()
  const hexData = useFetchHexData(zillowData)
  const geoJsonData = useFetchGeoData(zillowData)

  const isVisible = layerChoice === 'overview' ? true : false

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
      data: geoJsonData,
      opacity: 0.2,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      getFillColor: (city) => colorScale(city.properties.houseAppreciation2yr),
      getLineColor: (city) => colorScale(city.properties.houseAppreciation2yr),
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
