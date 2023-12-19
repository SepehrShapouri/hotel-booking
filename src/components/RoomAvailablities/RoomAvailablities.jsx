import React from 'react'
import { MdBathroom, MdBedroomChild, MdOutlinePriceChange } from 'react-icons/md'

function RoomAvailablities({data}) {
  return (
    <div className="roomAvailabilities">
    <span style={{ display: "flex", alignItems: "center" }}>
      <MdOutlinePriceChange
        style={{ color: "#0c4a6e", marginRight: "10px" }}
      />
      <p>{`$ ${data.price}`}</p>
    </span>
    <span style={{ display: "flex", alignItems: "center" }}>
      <MdBedroomChild style={{ color: "#0c4a6e", marginRight: "10px" }} />
      <p>{data.bedrooms}</p>&nbsp;&bull;&nbsp; <p>{data.bed_type}</p>
    </span>
    <span style={{ display: "flex", alignItems: "center" }}>
      <MdBathroom style={{ color: "#0c4a6e", marginRight: "10px" }} />
      <p>{`${data.bathrooms} ${
        data.bathrooms > 1 ? "bathrooms" : "bathroom"
      }`}</p>
    </span>
  </div>
  )
}

export default RoomAvailablities