import React from 'react'

function ResultDesc({className,item}) {
  return (
    <div className={className}>
    <p className="location">{item.smart_location}</p>
    <p className="name">{item.name}</p>
    <p className="price">
      &euro;&nbsp;{item.price}&nbsp;<span>night</span>
    </p>
  </div>
  )
}

export default ResultDesc