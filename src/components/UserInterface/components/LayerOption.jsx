import React from 'react'
import { useStore } from '@/store/store'

const LayerOption = ({ layer, layerName, children }) => {
  const {layerChoice, setLayerChoice} = useStore()

  const handleClick = (view) => {
    setLayerChoice(view)
  }
  return (
    <div className={'layer-choice' + ' ' + layer}>
      <button onClick={() => handleClick(layer)} className={layerChoice === layer ? 'active' : ''}>
        {children}
        {layerName}
      </button>
    </div>
  )
}

export default LayerOption