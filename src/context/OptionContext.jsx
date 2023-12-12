import { createContext, useContext, useState } from "react";

const optionContext = createContext();

export function OptionProvider({ children }) {
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  return (
    <optionContext.Provider value={{ options, setOptions }}>
      {children}
    </optionContext.Provider>
  );
}

export function useOptions() {
  const context = useContext(optionContext);
  return context;
}
