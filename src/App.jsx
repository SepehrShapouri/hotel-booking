import React from "react";
import Header from "./components/Header/Header";
import "./App.css";
import { Toaster } from "react-hot-toast";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import Bookmark from "./components/Bookmark/Bookmark";
function App() {
  return (
    <div className="container">
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels/>} />
          <Route path=":id" element={<SingleHotel/>} />
        </Route>
        <Route path="/bookmarks" element={<Bookmark/>}/>
      </Routes>
    </div>
  );
}

export default App;
