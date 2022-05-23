import React from 'react'
import AddStateInput from './AddStateInput'
import FilterModule from './FilterModule'
import StatesAddedList from './StatesAddedList'

export default function DetailedCitiesView() {
  return (
    <>
      <AddStateInput />
      <StatesAddedList />
      <FilterModule />
    </>
  )
}
