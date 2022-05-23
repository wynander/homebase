import React from 'react'
import AddStateInput from './components/AddStateInput'
import FilterModule from '@/components/UserInterface/components/FilterModule'
import StatesAddedList from './components/StatesAddedList'

export default function DetailedCitiesView() {
  return (
    <>
      <AddStateInput />
      <StatesAddedList />
      <FilterModule />
    </>
  )
}
