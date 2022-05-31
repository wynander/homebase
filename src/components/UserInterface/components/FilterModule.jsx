import React from 'react'
import Filter from './Filter'

const FilterModule = () => (
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

export default FilterModule
