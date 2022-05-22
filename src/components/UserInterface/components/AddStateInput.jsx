import React, { useState, useEffect } from 'react'
import { useStore } from '@/store/store'
import { stateFuse } from '@/exports/stateSearchEntries'

export default function AddStateInput() {
  const { stateChoices, setStateChoices } = useStore()

  const [inputText, setInputText] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (inputText) {
      const results = stateFuse.search(inputText)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [inputText])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchResults[0] && !stateChoices.includes(searchResults[0].item.value.toLowerCase())) {
      setStateChoices([...stateChoices, searchResults[0].item.value.toLowerCase()])
    }
    setInputText('')
  }

  const handleChange = (e) => {
    setInputText(e.target.value)
  }

  return (
    <>
      <div className='search-label'>
        <div>Add States to View</div>
        <div className='info-icon'>
          <svg version='1.1' id='info-icon' viewBox='0 0 330 330'>
            <g>
              <path
                d='M165,0.008C74.019,0.008,0,74.024,0,164.999c0,90.977,74.019,164.992,165,164.992s165-74.015,165-164.992
                  C330,74.024,255.981,0.008,165,0.008z M165,299.992c-74.439,0-135-60.557-135-134.992S90.561,30.008,165,30.008
                  s135,60.557,135,134.991C300,239.436,239.439,299.992,165,299.992z'
              />
              <path
                d='M165,130.008c-8.284,0-15,6.716-15,15v99.983c0,8.284,6.716,15,15,15s15-6.716,15-15v-99.983
                  C180,136.725,173.284,130.008,165,130.008z'
              />
              <path
                d='M165,70.011c-3.95,0-7.811,1.6-10.61,4.39c-2.79,2.79-4.39,6.66-4.39,10.61s1.6,7.81,4.39,10.61
                  c2.79,2.79,6.66,4.39,10.61,4.39s7.81-1.6,10.609-4.39c2.79-2.8,4.391-6.66,4.391-10.61s-1.601-7.82-4.391-10.61
                  C172.81,71.61,168.95,70.011,165,70.011z'
              />
            </g>
          </svg>
          <div className='search-tooltip'>
            Search for a state by its abbreviation or its name and the most similar result will
            appear below - Press enter to add the search result
          </div>
        </div>
      </div>

      <form className='state-form' onSubmit={handleSubmit}>
        <input
          className='state-input'
          type='text'
          placeholder='State name or abbreviation'
          value={inputText}
          onChange={handleChange}
        />
        <button className='add-state-button'>
          <svg viewBox='0 0 100 100' aria-hidden='true' role='img'>
            <path d='M44.82 3.066h10.36v13.32H68.5v10.36H55.18v13.32H44.82v-13.32H31.5v-10.36h13.32z'></path>
            <path d='M24.045 29.207L1.383 41.641c-1.847 1.012-1.847 2.655 0 3.668l45.275 24.845c1.846 1.013 4.838 1.013 6.684 0L98.617 45.31c1.847-1.013 1.847-2.656 0-3.668L75.99 29.225l-.013.048l-4.588 4.76l17.207 9.442L50 64.655l-38.594-21.18l17.13-9.4zM4.727 52.857l-3.344 1.834c-1.847 1.013-1.847 2.656 0 3.668l45.275 24.846c1.846 1.013 4.838 1.013 6.684 0L98.617 58.36c1.846-1.013 1.845-2.655-.002-3.668l-3.342-1.834l-6.683 3.666l.004.002L50 77.705l-38.596-21.18l.004-.002z'></path>
          </svg>
        </button>
      </form>
      <button
        className={searchResults[0] ? 'search-result' : 'search-result no-results'}
        onClick={handleSubmit}
      >
        {(searchResults[0] && searchResults[0].item.label) || 'No results'}
      </button>
    </>
  )
}
