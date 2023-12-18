import React from "react";
import { OptionProvider } from "../context/OptionContext";
import { HotelProvider } from "../context/HotelsProvider";

function AppProvider({ children }) {
  return (
    <HotelProvider>
      <OptionProvider>{children}</OptionProvider>
    </HotelProvider>
  );
}

export default AppProvider;
