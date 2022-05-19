import React from 'react'

//13 colors
//  ;[65, 182, 196],
//    [127, 205, 187],
//    [199, 233, 180],
//    [237, 248, 177],
//    [255, 255, 204],
//    [255, 237, 160],
//    [254, 217, 118],
//    [254, 178, 76],
//    [253, 141, 60],
//    [252, 78, 42],
//    [227, 26, 28],
//    [189, 0, 38],
//    [128, 0, 38],

function Legend() {
  return (
    <div className="legend-container">
        <div>Appreciation Rate (%)</div>
        <div className='legend'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className='legend-labels'>
            <div>-5</div>
            <div>20</div>
            <div>45</div>
        </div>
    </div>
  )
}

export default Legend
