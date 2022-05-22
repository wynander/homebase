import React from 'react'
import Filter from './Filter'

export default function FilterModule() {
  return (
    <div className='filter-module'>
      <div className='title'>Filters</div>
      <Filter dataToFilterName='Typical House Price' step={50000} min={0} />
      <Filter dataToFilterName='Appreciation Rate' step={1} max={50} min={-20} />
    </div>
  )
}
