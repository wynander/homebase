import React from 'react'
import { Map as Mapbox } from 'react-map-gl'
import DeckGL from '@deck.gl/react'

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

export default function Map({ mapStyle = MAP_STYLE, layers }) {
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
