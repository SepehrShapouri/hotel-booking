import React from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import { useHotelContext } from '../../context/HotelsProvider'
import Map from '../Map/Map'
import { useBookmark } from '../../context/BookmarksProvider'
function BookmarkLayout() {
  const {bookmarks} = useBookmark()
    return (
        <div className="appLayout">
        <div className="sidebar">
          <Outlet/>
        </div>
        <div className="mapWrapper">
          <Map markerLocation={bookmarks}/>
        </div>
      </div>
  )
}

export default BookmarkLayout