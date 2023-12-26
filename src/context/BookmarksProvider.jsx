import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import useFetch from "../hooks/useFetch";
import toast from "react-hot-toast";
import axios from "axios";
const BASE_URL = "https://hotel-json-server.vercel.app";
const BookmarkContext = createContext();
const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: [],
  error: null,
};
function bookmarksReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        bookmarks: action.payload,
        isLoading: false,
      };
    case "bookmark/loaded":
      return {
        ...state,
        currentBookmark: action.payload,
        isLoading: false,
      };
    case "bookmark/created":
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
        isLoading: false,
      };
    case "bookmark/deleted":
      return {
        ...state,
        bookmarks: [...state.bookmarks.filter((b) => b.id != action.payload)],
        currentBookmark: [],
        isLoading: false,
      };
    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
  }
}
export function BookmarkProvider({ children }) {
  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarksReducer,
    initialState
  );
  useEffect(() => {
    async function getBookmark() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({ type: "rejected", payload: error });
      }
    }
    getBookmark();
  }, []);
  async function deleteBookmark(bookmarkId) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/bookmarks/${bookmarkId}`
      );
      dispatch({ type: "bookmark/deleted", payload: bookmarkId });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error });
    }
  }
  async function getCurrentBookmark(id) {
    if (Number(id) === currentBookmark?.id) return;
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error });
    }
  }
  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error });
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        currentBookmark,
        isLoading,
        getCurrentBookmark,
        bookmarks,
        createBookmark,
        deleteBookmark,
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
