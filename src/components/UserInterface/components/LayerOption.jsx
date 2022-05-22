import React from 'react'
import { useStore } from '@/store/store'

export default function LayerOption({ layer, layerName, children }) {
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
