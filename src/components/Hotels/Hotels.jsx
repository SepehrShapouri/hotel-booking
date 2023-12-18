import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { CircularProgress } from "@mui/material";
import NotFound from "../NotFound/NotFound";
import SearchList from "../SearchList/SearchList";
import { useHotelContext } from "../../context/HotelsProvider";

function Hotels() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const destination = searchParams.get("destination");
//   const room = JSON.parse(searchParams.get("options")).room;
//   const { isLoading, data } = useFetch(
//     "http://localhost:5000/hotels",
//     `q=${destination || ""}&accommodates_gte=${room || 1}`
//   );
const {isLoading,data} = useHotelContext()
  if (isLoading) return <CircularProgress style={{ color: "#0c4a6e" }} />;
  if (!data.length) return <NotFound />;
  return (
    <SearchList data={data}/>
  );
}

export default Hotels;
