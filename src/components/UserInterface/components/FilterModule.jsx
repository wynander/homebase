import React from 'react'
import Filter from './Filter'

export default function FilterModule() {
  return (
    <>
      <div className='title'>Filters</div>
      <div className='filter-module'>
        <Filter
          dataToFilterName='Typical House Price'
          title='Typical House Price:  $'
          step={50000}
          min={0}
        />
        <Filter
          dataToFilterName='Appreciation Rate'
          title='Yearly Appreciation Rate:  %'
          step={1}
          max={50}
          min={-20}
        />
      </div>
    </>
  )
}
