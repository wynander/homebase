import React from 'react'
import { useStore } from '@/store/store'

export default function State({ stateName, index, className }) {
  const {stateChoices, setStateChoices} = useStore()

  const handleClick = () => {
    let temp = [...stateChoices]
    temp.splice(index, 1)
    setStateChoices(temp)
  }

  return (
    <div className={className}>
      {stateName}
      <button className='remove-state' onClick={handleClick}>
        &#10060;
      </button>
    </div>
  )
}
