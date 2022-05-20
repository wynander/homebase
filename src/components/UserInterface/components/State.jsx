import React from 'react'
import { useStore } from '@/store/store'

export default function State({ stateName, index, className }) {
  const setStateChoices = useStore((state) => state.setStateChoices)
  const stateChoices = useStore((state) => state.stateChoices)

  const handleClick = () => {
    let temp = [...stateChoices]
    temp.splice(index, 1)
    setStateChoices(temp)
  }

  return (
    <button onClick={handleClick} className={className}>
      {stateName}
    </button>
  )
}
