import React from 'react'
import FilterModule from './FilterModule'
import { PropertiesSliders } from './PropertiesSliders'

export default function Overview() {
  return (
    <>
      <PropertiesSliders />
      <div className='spacer'></div>
      <FilterModule />
    </>
  )
}
