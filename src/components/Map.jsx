import React from 'react'
import { Map as Mapbox } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import { cityData } from './DataConditioning'
import { scaleThreshold } from 'd3-scale'

const mapBoxApiKey = import.meta.env.VITE_MAPBOX_API_KEY

const INITIAL_VIEW_STATE = {
  longitude: -120.4,
  latitude: 38,
  zoom: 5.5,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
}

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json'

export const COLOR_SCALE = scaleThreshold()
  .domain([-5, 0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40])
  .range([
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [189, 0, 38],
    [128, 0, 38],
  ])

//need to implement edge case handling for not available data
function getTooltip({ object }) {
  return (
    object && {
      html: `\
  <div><b>Name and County</b></div>
  <div>${object.properties.name}</div>
  <div>${object.properties.county}</div>
  <div>${object.properties.currentTypicalHousePrice}</div>
  <div>${object.properties.houseAppreciation2yr}% YoY Growth (2 Year)</div>
  <div>${object.properties.houseAppreciation5yr}% YoY Growth (5 Year)</div>
  <div>${object.properties.houseAppreciation10yr}% YoY Growth (10 Year)</div>
  `,
    }
  )
}

export default function Map({ data = cityData, mapStyle = MAP_STYLE }) {
  const layers = [
    new GeoJsonLayer({
      id: 'geojson',
      data,
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      getFillColor: (city) => COLOR_SCALE(city.properties.houseAppreciation2yr),
      getLineColor: [255, 255, 255, 200],
      getElevation: 0,
      pickable: true,
    }),
  ]

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      getTooltip={getTooltip}
    >
      <Mapbox
        mapboxAccessToken={mapBoxApiKey}
        reuseMaps
        mapStyle={mapStyle}
        preventStyleDiffing={true}
      />
    </DeckGL>
  )
}
