import React, { useState } from 'react'
import './App.css'
import Banner from './components/Banner'
import MapData from './components/MapData'
import UserInterface from './components/UserInterface'

export default function App() {
  const stateChoices = ['ca']

  return (
    <>
      <Banner />
      <UserInterface/>
      <MapData stateChoices={stateChoices}/>
    </>
  )
}
