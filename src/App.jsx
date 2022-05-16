import React, { useState } from 'react'
import './App.css'
import Banner from './components/Banner'
import MapData from './components/MapData'
import UserInterface from './components/UserInterface'
import {useStore} from './components/store'
export default function App() {

  return (
    <>
      <Banner />
      <UserInterface />
      <MapData />
    </>
  )
}
