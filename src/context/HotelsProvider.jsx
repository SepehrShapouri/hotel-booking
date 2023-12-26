import { createContext, useContext, useReducer, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const BASE_URL = "https://hotel-json-server.vercel.app/hotels";
const HotelContext = createContext();
const initialState = {
  currentHotel: {},
  isLoadingCurrentHotel: false,
};
function hotelReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoadingCurrentHotel: true,
      };
    case "hotel/loaded":
      return {
        ...state,
        currentHotel: action.payload,
        isLoadingCurrentHotel: false,
      };
    case "rejected":
      return {
        ...state,
        isLoadingCurrentHotel: false,
      };
  }
}
export function HotelProvider({ children }) {
  const [{ currentHotel, isLoadingCurrentHotel }, dispatch] = useReducer(
    hotelReducer,
    initialState
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { isLoading, data } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
console.log(data);
  async function getHotel(id) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      console.log(data);
      dispatch({ type: "hotel/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected" });
    }
  }
  return (
    <HotelContext.Provider
      value={{ data, isLoading, currentHotel, getHotel, isLoadingCurrentHotel }}
    >
      {children}
    </HotelContext.Provider>
  );
}
export function useHotelContext() {
  const context = useContext(HotelContext);
  return context;
}
