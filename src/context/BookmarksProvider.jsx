import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import toast from "react-hot-toast";
import axios from "axios";
const BASE_URL = "http://localhost:5000";
const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  // const { data: bookmarks,  } = useFetch(`${BASE_URL}/bookmarks`);
  useEffect(() => {
    async function getBookmark() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        setBookmarks(data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    }
    getBookmark();
  }, []);

  async function getCurrentBookmark(id) {
    setIsLoading(true);
    setCurrentBookmark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  }
  async function createBookmark(newBookmark) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`,newBookmark);
      setBookmarks((prev) => [...prev, data]);
      setCurrentBookmark(data)
      console.log(data)
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        currentBookmark,
        isLoading,
        getCurrentBookmark,
        isLoading,
        bookmarks,
        createBookmark
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
