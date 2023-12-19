import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { CircularProgress } from "@mui/material";
import NotFound from "../NotFound/NotFound";
import SearchList from "../SearchList/SearchList";
import { useHotelContext } from "../../context/HotelsProvider";

function Hotels() {
const {isLoading,data,currentHotel} = useHotelContext()
  if (isLoading) return <CircularProgress style={{ color: "#0c4a6e" }} />;
  if (!data.length) return <NotFound />;
  return (
    <SearchList data={data} currentHotel={currentHotel}/>
  );
}

export default Hotels;
