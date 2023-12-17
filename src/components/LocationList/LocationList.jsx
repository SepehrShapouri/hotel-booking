import React from "react";
import useFetch from "../../hooks/useFetch";
import { CircularProgress } from "@mui/material";
function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");
  if (isLoading)
    return (
      <div className="progressBar">
        <CircularProgress
          style={{ color: "#0c4a6e" }}
          className="circularProgressBar"
        />
      </div>
    );
  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div className="locationItem">
              <img src={item.picture_url.url} alt={item.name} />
              <div className="locationItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  &euro;&nbsp;{item.price}&nbsp;<span>night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
