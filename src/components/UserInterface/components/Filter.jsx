import React from 'react'
import { useStore } from '@/store/store'

export default function Filter({ dataToFilterName, min, max, step, title }) {
  const dataToFilter = useStore((state) => state[dataToFilterName])
  const setDataToFilter = useStore((state) => state['set' + dataToFilterName.split(' ').join('')])

  const handleChange = (e, i) => {
    let temp = [...dataToFilter]
    if (e.target.value === '') {
      temp[i] = -1 * (-1) ** i * Infinity
    } else {
      temp[i] = +e.target.value
    }
    setDataToFilter(temp)
  }

  return (
    <div className='filter-attribute'>
      <div className='filter-attribute-name'>{title}</div>
      <form className='min-to-max' autoComplete='off'>
        <input
          className='filter-input'
          type='number'
          value={dataToFilter[0] === -Infinity ? '' : dataToFilter[0]}
          name='min'
          placeholder='min'
          min={min}
          max={max}
          onChange={(e) => handleChange(e, 0)}
          step={step}
        />
        <div id='min-to-max-middle'>- to -</div>
        <input
          className='filter-input'
          type='number'
          value={dataToFilter[1] === Infinity ? '' : dataToFilter[1]}
          name='max'
          min={min}
          max={max}
          placeholder='max'
          step={step}
          onChange={(e) => handleChange(e, 1)}
        />
      </form>
    </div>
  )
}
