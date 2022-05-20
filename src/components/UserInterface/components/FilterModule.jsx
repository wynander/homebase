import React from 'react'
import Filter from './Filter'

export default function FilterModule() {
  return (
    <div className='filter-module'>
      <div>Filters</div>
      <Filter dataToFilterName='Typical House Price' min={0} />
      <Filter dataToFilterName='Appreciation Rate' max={50} min={-20} />
    </div>
  )
}
