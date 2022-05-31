import React from 'react'
import FilterModule from '@/components/UserInterface/components/FilterModule'
import { PropertiesSliders } from './components/PropertiesSliders'

const Overview = () => (
  <>
    <PropertiesSliders />
    <div className='spacer'></div>
    <FilterModule />
  </>
)
export default Overview