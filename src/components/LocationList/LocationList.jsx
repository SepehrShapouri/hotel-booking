import React from "react";
import useFetch from "../../hooks/useFetch";
import { CircularProgress } from "@mui/material";
import ResultDesc from "../ResultDesc/ResultDesc";
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
            <div className="locationItem" key={item.id}>
              <img src={item.picture_url.url} alt={item.name} />
              <ResultDesc className={"locationItemDesc"} item={item}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
