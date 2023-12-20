import React from "react";
import { OptionProvider } from "../context/OptionContext";
import { HotelProvider } from "../context/HotelsProvider";
import { BookmarkProvider } from "../context/BookmarksProvider";

function AppProvider({ children }) {
  return (
    <BookmarkProvider>
      <HotelProvider>
        <OptionProvider>{children}</OptionProvider>
      </HotelProvider>
    </BookmarkProvider>
  );
}

export default AppProvider;
