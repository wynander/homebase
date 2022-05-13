import { Banner } from './components/Banner'
import React from 'react'
import DeckGL from '@deck.gl/react'
import { HeatmapLayer } from '@deck.gl/aggregation-layers'
import './App.css'
import Map from './components/Map'

export default function App() {
  return (
    <>
      <Banner />
      <Map />
    </>
  )
}
