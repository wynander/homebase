import React, { useState } from 'react'
import './App.css'
import Banner from './components/Banner/Banner'
import Map from './components/Map/Map'
import UserInterface from './components/UserInterface/UserInterface'
import Legend from './components/Legend/Legend'

export default function App() {

  return (
    <>
      <Banner />
      <Legend />
      <UserInterface />
      <Map />
    </>
  )
}
