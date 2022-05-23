import React from 'react'
import FilterModule from '@/components/UserInterface/components/FilterModule'
import { PropertiesSliders } from './components/PropertiesSliders'

export default function Overview() {
  return (
    <>
      <PropertiesSliders />
      <div className='spacer'></div>
      <FilterModule />
    </>
  )
}
