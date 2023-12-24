import React from "react";
import Header from "./components/Header/Header";
import "./App.css";
import { Toaster } from "react-hot-toast";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import Bookmark from "./components/Bookmark/Bookmark";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import Login from "./components/Login/Login";
function App() {
  return (
    <div className="container">
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingleHotel />} />
        </Route>
        <Route path="/bookmarks" element={<BookmarkLayout />}>
          <Route index element={<Bookmark />} />
          <Route path=":id" element={<SingleBookmark/>} />
          <Route path="add" element={<AddNewBookmark/>} />
        </Route>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
