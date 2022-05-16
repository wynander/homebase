import React, { useState } from 'react'
import { useStore } from './store'

export default function UserInterface({}) {
  const setStateChoices = useStore((state) => state.setStateChoices)
  const stateChoices = useStore((state) => state.stateChoices)
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

  //implement fuse.js for abbreviation / state name matching
  return (
    <div className='ui-container'>
      <h4 className='ui-header'>Market Maker Options</h4>
      <div className='layer-option overview'></div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter state by name or abbreviation'
          value={inputText}
          onChange={handleChange}
        />
        <button></button>
      </form>

      <div className='layer-option stateview'></div>
    </div>
  )
}
