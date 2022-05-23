import React from 'react'
import { useStore } from '@/store/store'
import State from './State'
import { stateKeyValues } from '@/exports/US_State_keys'

export default function StatesAddedList() {
  const { stateChoices } = useStore()

  return (
    <>
      <div className='list-title'>States in View</div>
      <div className='state-container' id='state-scrollbar'>
        {stateChoices[0] ? (
          stateChoices.map((state, index) => {
            return (
              <State
                key={state}
                className='state'
                stateName={stateKeyValues[state.toUpperCase()]}
                abbrev={state}
              />
            )
          })
        ) : (
          <p className='no-states'>None</p>
        )}
      </div>
    </>
  )
}
