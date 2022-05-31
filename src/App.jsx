import React, { useState } from 'react'
import './App.css'
import Banner from './components/Banner/Banner'
import Map from './components/Map/Map'
import UserInterface from './components/UserInterface/UserInterface'
import Legend from './components/Legend/Legend'

const App = () => (
  <>
    <Banner />
    <Legend />
    <UserInterface />
    <Map />
  </>
)

export default App
