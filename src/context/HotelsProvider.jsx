import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";

const HotelContext = createContext();
export function HotelProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options")).room;
  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  return (
    <HotelContext.Provider value={{ data, isLoading }}>
      {children}
    </HotelContext.Provider>
  );
}
export function useHotelContext() {
  const context = useContext(HotelContext);
  return context;
}
