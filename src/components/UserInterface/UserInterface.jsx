import React from 'react'
import useLoadingStatus from '@/hooks/useLoadingStatus'
import { useStore } from '@/store/store'
import CityBoundariesView from './components/CityBoundariesView/CityBoundariesView'
import LayerOptions from './components/LayerOptions.jsx'
import Loading from './components/Loading'
import HexagonalView from './components/HexagonalView/HexagonalView'

const UserInterface = () => {
  const { layerChoice } = useStore()
  const isLoading = useLoadingStatus()

  return (
    <div className='ui-container'>
      <div>Choose a view type:</div>
      <LayerOptions />

      {layerChoice === 'stateview' && <CityBoundariesView />}
      {layerChoice === 'overview' && <HexagonalView />}
      <div className='loading'>
        <Loading className={isLoading ? 'on' : 'off'} />
      </div>
    </div>
  )
}

export default UserInterface