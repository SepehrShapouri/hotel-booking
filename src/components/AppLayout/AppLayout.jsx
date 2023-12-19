import React from "react";
import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotelContext } from "../../context/HotelsProvider";

function AppLayout() {
const {data}= useHotelContext()
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet/>
      </div>
      <div className="mapWrapper">
        <Map markerLocation={data}/>
      </div>
    </div>
  );
}

export default AppLayout;
