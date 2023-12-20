import React from "react";
import useFetch from "../../hooks/useFetch";
import { CircularProgress } from "@mui/material";
import ResultDesc from "../ResultDesc/ResultDesc";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");
  if (isLoading)
    return (
      <div className="progressBar">
        <Loader className="circularProgressBar"/>
      </div>
    );
  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <Link to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`} className="locationItem" key={item.id} onClick={()=>console.log(item.id)}>
              <img src={item.picture_url.url} alt={item.name} />
              <ResultDesc className={"locationItemDesc"} item={item}/>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
