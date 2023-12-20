import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { CircularProgress } from "@mui/material";
import {
  MdOutlineMyLocation,
  MdBedroomChild,
  MdBathroom,
  MdOutlinePriceChange,
} from "react-icons/md";
import { useHotelContext } from "../../context/HotelsProvider";
import RoomAvailablities from "../RoomAvailablities/RoomAvailablities";
import Loader from "../Loader/Loader";

function SingleHotel() {
  const { id } = useParams();
  const {
    currentHotel: data,
    isLoadingCurrentHotel: isLoading,
    getHotel,
  } = useHotelContext();
  useEffect(() => {
    getHotel(id);
  }, [id]);
  if (isLoading) return <Loader/>;
  return (
    <div className="room">
      <div className="roomDetail">
        <img src={data.xl_picture_url} alt={data.name} />
        <h2>{data.name}</h2>
        <span style={{ display: "flex", alignItems: "center" }}>
          <MdOutlineMyLocation
            style={{ color: "#0c4a6e", marginRight: "10px" }}
          />
          <p>{data.smart_location}</p>
        </span>
        <RoomAvailablities data={data} />
      </div>
    </div>
  );
}

export default SingleHotel;
