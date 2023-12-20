import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import toast from "react-hot-toast";
import axios from "axios";
const BASE_URL = "http://localhost:5000";
const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);
  const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`);
  async function getBookmark(id) {
    setIsLoadingCurrentBookmark(true);
    setCurrentBookmark(null)
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsLoadingCurrentBookmark(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrentBookmark(false);
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        currentBookmark,
        isLoadingCurrentBookmark,
        getBookmark,
        isLoading,
        bookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmark() {
  const context = useContext(BookmarkContext);
  return context;
}
