import React from 'react'

const Loading = ({className}) => {
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

export default Loading