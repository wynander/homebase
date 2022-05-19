import { PropertiesSliders } from './PropertiesSliders'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import useLoadingStatus from '../hooks/useLoadingStatus'
import Loading from './Loading'
import LayerOptions from './LayerOptions.jsx'
import AddStateInput from './AddStateInput'

export default function UserInterface({}) {
  const layerChoice = useStore((state) => state.layerChoice)
  const isLoading = useLoadingStatus()

  return (
    <div className='ui-container'>
      <LayerOptions     />

      {layerChoice === 'stateview' && <AddStateInput />}
      {layerChoice === 'overview' && <PropertiesSliders />}
      <div className='loading'>{isLoading && <Loading />}</div>
    </div>
  )
}



