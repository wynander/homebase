import React, { useState } from 'react'
import { useStore } from './store'

export default function UserInterface({}) {
  const setStateChoices = useStore((state) => state.setStateChoices)
  const stateChoices = useStore((state) => state.stateChoices)
  const setLayerChoice = useStore((state) => state.setLayerChoice)
  const layerChoice = useStore((state) => state.layerChoice)
  const [inputText, setInputText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!stateChoices.includes(inputText)) {
      setStateChoices([...stateChoices, inputText])
    }
    setInputText('')
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    setInputText(e.target.value)
  }

  const handleClick = (view) => {
    setLayerChoice(view)
  }
  
  //implement fuse.js for abbreviation / state name matching

  return (
    <div className='ui-container'>
      <h4 className='ui-header'>Market Maker Options</h4>
      <div className='layer-options'>
        <div className='view-choice overview'>
          <button onClick={()=>handleClick('overview')}></button>Overview
        </div>
        <div className='view-choice stateview'>
          <button onClick={()=>handleClick('stateview')}></button>Detailed Cities
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter state by name or abbreviation'
          value={inputText}
          onChange={handleChange}
        />
        <button>Add</button>
      </form>
    </div>
  )
}
