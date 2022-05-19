import React, { useState } from 'react'
import './App.css'
import Banner from './components/Banner'
import MapData from './components/MapData'
import UserInterface from './components/UserInterface'
import Legend from './components/Legend'

export default function App() {

  return (
    <>
      <Banner />
      <Legend />
      <UserInterface />
      <MapData />
    </>
  )
}
