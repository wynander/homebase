import React from 'react'
import { useStore } from '@/store/store'

export function PropertiesSliders() {
  const radius = useStore((state) => state.radius)
  const setRadius = useStore((state) => state.setRadius)
  const elevationScale = useStore((state) => state.elevationScale)
  const setElevationScale = useStore((state) => state.setElevationScale)

  const handleChange = (e, type) => {
    if (type === 'rad') {
      setRadius(e.target.value)
    } else if (type === 'el') {
      setElevationScale(e.target.value)
    }
  }

  return (
    <div className='sliders'>
      <div className='slider'>
        <label>Hex Radius</label>
        <div className='tooltip'>Radius: {radius}m</div>
        <input
          name='radius'
          type='range'
          step='100'
          min='500'
          max='20000'
          defaultValue={radius}
          onChange={(e) => handleChange(e, 'rad')}
        />
      </div>
      <div className='slider'>
        <label>Extrusion Scale</label>
        <div className='tooltip'>Extrusion Scale: {elevationScale / 2}x</div>
        <input
          name='upperPercentile'
          type='range'
          step='1'
          min='0'
          max='4'
          defaultValue={elevationScale / 2}
          onChange={(e) => handleChange(e, 'el')}
        />
      </div>
    </div>
  )
}
