import { PropertiesSliders } from './PropertiesSliders';
import React, { useState } from 'react'
import { useStore } from '../store/store'
import useLoadingStatus from '../hooks/useLoadingStatus'
import Loading from './Loading'

export default function UserInterface({}) {
  const setStateChoices = useStore((state) => state.setStateChoices)
  const stateChoices = useStore((state) => state.stateChoices)
  const setLayerChoice = useStore((state) => state.setLayerChoice)
  const layerChoice = useStore((state) => state.layerChoice)
  const [inputText, setInputText] = useState('')
  const isLoading = useLoadingStatus()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!stateChoices.includes(inputText)) {
      setStateChoices([...stateChoices, inputText])
    }
    setInputText('')
  }

  const handleChange = (e) => {
    setInputText(e.target.value)
  }

  const handleClick = (view) => {
    setLayerChoice(view)
  }

  //implement fuse.js for abbreviation / state name matching

  return (
    <div className='ui-container'>
      <div className='layer-options'>
        <div className='layer-choice overview'>
          <button onClick={() => handleClick('overview')}>
            <svg version='1.1' id='Layer_1' x='0px' y='0px' viewBox='0 0 512.004 512.004'>
              <g>
                <path
                  d='M128.038,228.352l123.586,70.621c1.359,0.777,2.869,1.165,4.378,1.165c1.51,0,3.028-0.388,4.387-1.165l123.401-70.621
				c2.745-1.571,4.44-4.493,4.44-7.654l0.185-141.241c0-3.169-1.695-6.1-4.449-7.671L260.382,1.165
				c-2.719-1.554-6.038-1.554-8.757,0L128.038,71.786c-2.754,1.571-4.449,4.502-4.449,7.662V220.69
				C123.589,223.85,125.284,226.781,128.038,228.352z M158.9,97.103c0-3.107,1.624-5.976,4.281-7.565l88.276-52.966
				c4.175-2.516,9.604-1.156,12.111,3.019c2.516,4.184,1.156,9.604-3.019,12.111L176.555,102.1v100.935
				c0,4.882-3.955,8.828-8.828,8.828c-4.873,0-8.828-3.946-8.828-8.828V97.103z'
                />
                <path
                  d='M507.555,283.646l-102.276-58.439c-1.351,7.671-5.844,14.539-12.729,18.476l-110.08,62.994l-0.168,143.554
				c-0.009,6.762-2.595,13.074-6.983,17.858l100.793,43.193c1.112,0.486,2.295,0.715,3.478,0.715c1.518,0,3.028-0.388,4.378-1.165
				l123.401-70.621c2.754-1.563,4.44-4.484,4.449-7.654l0.185-141.241C512.004,288.148,510.309,285.218,507.555,283.646z'
                />
                <path
                  d='M242.865,314.302l-101.782-58.156c-0.053,2.94-1.412,5.8-4.122,7.424l-83.994,50.397v100.935
				c0,4.873-3.946,8.828-8.828,8.828c-4.873,0-8.828-3.955-8.828-8.828V308.97c0-3.107,1.624-5.976,4.29-7.574l88.135-52.886
				l-8.457-4.829c-6.859-3.911-11.352-10.734-12.729-18.379L4.45,283.644C1.704,285.215,0,288.146,0,291.315v141.241
				c0,3.16,1.704,6.091,4.449,7.662l123.586,70.621c1.359,0.777,2.86,1.165,4.378,1.165c1.183,0,2.366-0.247,3.487-0.724
				l123.401-52.966c3.24-1.386,5.341-4.573,5.341-8.104l0.159-134.126c-2.834,1.006-5.773,1.713-8.801,1.713
				C251.401,317.797,246.864,316.588,242.865,314.302z'
                />
              </g>
            </svg>
            Overview
          </button>
        </div>

        <div className='layer-choice stateview'>
          <button onClick={() => handleClick('stateview')}>
            <svg viewBox='0 0 100 100' aria-hidden='true' role='img'>
              <path
                d='M32.5 10.95c-6.89 0-12.55 5.66-12.55 12.55c0 4.02 1.935 7.613 4.91 9.916L14.815 54.172a12.354 12.354 0 0 0-2.316-.223C5.61 53.95-.05 59.61-.05 66.5c0 6.89 5.66 12.55 12.55 12.55c5.13 0 9.54-3.151 11.463-7.603l51.277 7.71c1.232 5.629 6.281 9.894 12.26 9.894c6.656 0 12.114-5.297 12.48-11.867a3.5 3.5 0 0 0 .07-.684a3.5 3.5 0 0 0-.071-.7c-.375-6.562-5.829-11.85-12.479-11.85c-.134 0-.264.015-.396.019L80.242 43.05c3.275-2.127 5.509-5.746 5.738-9.867a3.5 3.5 0 0 0 .07-.684a3.5 3.5 0 0 0-.071-.7c-.375-6.562-5.829-11.85-12.479-11.85c-5.062 0-9.452 3.06-11.43 7.415l-17.082-4.517a3.5 3.5 0 0 0-.01-.047c-.374-6.563-5.828-11.852-12.478-11.852zm0 7c3.107 0 5.55 2.443 5.55 5.55c0 3.107-2.443 5.55-5.55 5.55c-3.107 0-5.55-2.443-5.55-5.55c0-3.107 2.443-5.55 5.55-5.55zm41 9c3.107 0 5.55 2.443 5.55 5.55c0 3.107-2.443 5.55-5.55 5.55c-3.107 0-5.55-2.443-5.55-5.55c0-3.107 2.443-5.55 5.55-5.55zm-30.137 2.708l17.739 4.69C62.007 40.37 67.239 45.05 73.5 45.05l.033-.002l6.92 21.092a12.688 12.688 0 0 0-4.705 6.015l-50.916-7.654a12.611 12.611 0 0 0-3.787-7.13l10.342-21.378c.368.033.737.057 1.113.057c4.652 0 8.71-2.592 10.863-6.393zM12.5 60.95c3.107 0 5.55 2.444 5.55 5.551s-2.443 5.55-5.55 5.55c-3.107 0-5.55-2.443-5.55-5.55c0-3.107 2.443-5.55 5.55-5.55zm75 10c3.107 0 5.55 2.444 5.55 5.551s-2.443 5.55-5.55 5.55c-3.107 0-5.55-2.443-5.55-5.55c0-3.107 2.443-5.55 5.55-5.55z'
                fill='currentColor'
              ></path>
            </svg>
            Detailed Cities
          </button>
        </div>
      </div>

      {layerChoice === 'stateview' && (
        <form className='state-form' onSubmit={handleSubmit}>
          <input
            className='state-input'
            type='text'
            placeholder='Add state by abbreviation'
            value={inputText}
            onChange={handleChange}
          />
          <button className='state-button'>
            <svg viewBox='0 0 100 100' aria-hidden='true' role='img'>
              <path d='M44.82 3.066h10.36v13.32H68.5v10.36H55.18v13.32H44.82v-13.32H31.5v-10.36h13.32z'></path>
              <path d='M24.045 29.207L1.383 41.641c-1.847 1.012-1.847 2.655 0 3.668l45.275 24.845c1.846 1.013 4.838 1.013 6.684 0L98.617 45.31c1.847-1.013 1.847-2.656 0-3.668L75.99 29.225l-.013.048l-4.588 4.76l17.207 9.442L50 64.655l-38.594-21.18l17.13-9.4zM4.727 52.857l-3.344 1.834c-1.847 1.013-1.847 2.656 0 3.668l45.275 24.846c1.846 1.013 4.838 1.013 6.684 0L98.617 58.36c1.846-1.013 1.845-2.655-.002-3.668l-3.342-1.834l-6.683 3.666l.004.002L50 77.705l-38.596-21.18l.004-.002z'></path>
            </svg>
          </button>
        </form>
      )}
      {layerChoice === 'overview' && (
        <PropertiesSliders/>
      )}
      <div className='loading'>{isLoading && <Loading />}</div>
    </div>
  )
}
