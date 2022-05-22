import React from 'react'
import useLoadingStatus from '@/hooks/useLoadingStatus'
import { useStore } from '@/store/store'
import DetailedCitiesView from './components/DetailedCitiesView'
import LayerOptions from './components/LayerOptions.jsx'
import Loading from './components/Loading'
import Overview from './components/Overview'

export default function UserInterface({}) {
  const {layerChoice} = useStore()
  const isLoading = useLoadingStatus()

  return (
    <div className='ui-container'>
      <LayerOptions />

      {layerChoice === 'stateview' && <DetailedCitiesView />}
      {layerChoice === 'overview' && <Overview />}
      <div className='loading'>
        <Loading className={isLoading ? 'on' : 'off'} />
      </div>
    </div>
  )
}
