import React from 'react'
import AddStateInput from './components/AddStateInput'
import FilterModule from '@/components/UserInterface/components/FilterModule'
import StatesAddedList from './components/StatesAddedList'

const DetailedCitiesView = () => (
  <>
    <AddStateInput />
    <StatesAddedList />
    <FilterModule />
  </>
)

export default DetailedCitiesView
