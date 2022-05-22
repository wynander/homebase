import React from 'react'
import FilterModule from './FilterModule'
import { PropertiesSliders } from './PropertiesSliders'

export default function Overview() {
  return (
    <>
      <PropertiesSliders />
      <FilterModule />
      <div className='spacer'></div>
    </>
  )
}
