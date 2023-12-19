import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useHotelContext } from '../../context/HotelsProvider'
import Map from '../Map/Map'

function Bookmark() {
    const {data} = useHotelContext()
    return (
        <div className="appLayout">
        <div className="sidebar">
        </div>
        <div className="mapWrapper">
          <Map markerLocation={data}/>
        </div>
      </div>
  )
}

export default Bookmark