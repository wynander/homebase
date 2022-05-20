import React from 'react'
import { useStore } from '@/store/store'

export default function LayerOption({ layer, layerName, children }) {
  const setLayerChoice = useStore((state) => state.setLayerChoice)
  const layerChoice = useStore((state) => state.layerChoice)

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
