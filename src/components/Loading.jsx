import React from 'react'

export default function Loading() {
  return (
    <div className='loading-container'>
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
