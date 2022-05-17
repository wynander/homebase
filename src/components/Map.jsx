import React from 'react'
import { Map as Mapbox } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { useStore } from './store'
import { getTooltipHex, getTooltipGeo } from './tooltips'

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

export default function Map({ mapStyle = MAP_STYLE, layers }) {
  const layerChoice = useStore((state) => state.layerChoice)

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
      getTooltip={(object) => {
        if (layerChoice === 'stateview') {
          return getTooltipGeo(object)
        } else {
          return getTooltipHex(object)
        }
      }}
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
