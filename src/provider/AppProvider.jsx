import React from "react";
import { OptionProvider } from "../context/OptionContext";
import { HotelProvider } from "../context/HotelsProvider";
import { BookmarkProvider } from "../context/BookmarksProvider";
import AuthProvider from "../context/AuthContext";

function AppProvider({ children }) {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <HotelProvider>
          <OptionProvider>{children}</OptionProvider>
        </HotelProvider>
      </BookmarkProvider>
    </AuthProvider>
  );
}

export default AppProvider;
