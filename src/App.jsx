import { Banner } from './components/Banner'
import React from 'react'
import DeckGL from '@deck.gl/react'
import { HeatmapLayer } from '@deck.gl/aggregation-layers'
import './App.css'
import MapData from './components/MapData'

export default function App() {
  const stateChoices = ['ca', 'tx', 'ny']

  return (
    <>
      <Banner />
      <MapData stateChoices={stateChoices} />
    </>
  )
}
