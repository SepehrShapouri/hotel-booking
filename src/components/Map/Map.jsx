import React from "react";
import { useHotelContext } from "../../context/HotelsProvider";

function Map() {
  const { isLoading, data } = useHotelContext();
  return <div className="mapCOn"></div>;
}

export default Map;
