import React from 'react'
import { Map as Mapbox } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import { cityData } from './DataConditioning'
import { scaleThreshold } from 'd3-scale'

const mapBoxApiKey = import.meta.env.VITE_MAPBOX_API_KEY

const initialViewState = {
  longitude: -120.4,
  latitude: 38,
  zoom: 5.5,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
}

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json'

export const colorScale = scaleThreshold()
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
  <div>${object.properties.NAME}</div>
  <div>Typical Home Price: ${
    object.properties.currentTypicalHousePrice === '$NaN'
      ? 'Not Available from Zillow'
      : object.properties.currentTypicalHousePrice
  }</div>
  <div>2 Year YoY Growth: ${
    !isNaN(object.properties.houseAppreciation2yr)
      ? object.properties.houseAppreciation2yr + '%'
      : 'Not Available from Zillow'
  }</div>
  <div>5 Year YoY Growth: ${
    !isNaN(object.properties.houseAppreciation5yr)
      ? object.properties.houseAppreciation5yr + '%'
      : 'Not Available from Zillow'
  }</div>
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
      getFillColor: (city) => colorScale(city.properties.houseAppreciation2yr),
      getLineColor: (city) => colorScale(city.properties.houseAppreciation2yr),
      getElevation: 0
      //Code for elevation based on Zillow data
      // (city) => {
      //   if (city.properties.currentTypicalHousePrice === '$NaN') return 0
      //   return parseFloat(city.properties.currentTypicalHousePrice.replace(/[^0-9.-]+/g, '')) / 20
      // }
      ,
      pickable: true,
    }),
  ]

  return (
    <DeckGL
      initialViewState={initialViewState}
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
