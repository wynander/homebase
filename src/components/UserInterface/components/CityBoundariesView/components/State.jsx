import React, { useCallback } from 'react'
import { useStore } from '@/store/store'

export default function State({ stateName, className, abbrev }) {
  const { stateChoices, setStateChoices } = useStore()

  const handleClick = useCallback(() => {
    let temp = [...stateChoices]
    setStateChoices(temp.filter((state) => state !== abbrev))
  }, [stateChoices, setStateChoices, abbrev])

  return (
    <div className={className}>
      {stateName}
      <button className='remove-state' onClick={handleClick}>
        &#10060;
      </button>
    </div>
  )
}
