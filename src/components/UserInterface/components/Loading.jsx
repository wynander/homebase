import React from 'react'

export default function Loading({className}) {
  return (
    <div className={'loading-container ' + className}>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      Loading...
    </div>
  )
}
