import React from 'react'
import { useStore } from '@/store/store'

export default function Filter({ dataToFilterName, min, max }) {
  const dataToFilter = useStore((state) => state[dataToFilterName])
  const setDataToFilter = useStore((state) => state['set' + dataToFilterName.split(' ').join('')])

  const handleChange = (e, i) => {
    let temp = [...dataToFilter]
    if (e.target.value < min) {
      temp[i] = min
    }
    if (e.target.value > max) {
      temp[i] = max
    }
    if(e.target.value >= min && e.target.value <= (max || Infinity)) {
      temp[i] = +e.target.value
    }
    setDataToFilter(temp)
  }

  return (
    <div className='filter-attribute'>
      <div className='filter-attribute-name'>{dataToFilterName}</div>
      <form className='min-to-max' autoComplete='off'>
        <input
          className='filter-input'
          type='number'
          value={dataToFilter[0] || ''}
          name='min'
          placeholder='min'
          onChange={(e) => handleChange(e, 0)}
        />
        <div id='min-to-max-middle'>- to -</div>
        <input
          className='filter-input'
          type='number'
          value={dataToFilter[1] || ''}
          name='min'
          placeholder='max'
          onChange={(e) => handleChange(e, 1)}
        />
      </form>
    </div>
  )
}
