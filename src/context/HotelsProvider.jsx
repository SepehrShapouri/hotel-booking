import { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const BASE_URL = "http://localhost:5000/hotels";
const HotelContext = createContext();
export function HotelProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentHotel, setCurrentHotel] = useState({});
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { isLoading, data } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  async function getHotel(id) {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrentHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrentHotel(false);
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
