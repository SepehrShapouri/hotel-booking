import React from "react";
import { useBookmark } from "../../context/BookmarksProvider";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { MdOutlineEventNote } from "react-icons/md";
function Bookmark() {
  const { isLoading, bookmarks, currentBookmark } = useBookmark();
  if (isLoading) return <Loader />;
  if (!bookmarks.length)
    return (
      <h3
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MdOutlineEventNote style={{ marginRight: "10px", fontSize: "3rem" }} />
        No current bookmarks,add some by clicking anywhere on the map!
      </h3>
    );
  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/bookmarks/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                key={item.id}
                className={`bookmarkItem ${
                  item.id === currentBookmark.id ? "current-bookmark" : ""
                }`}
              >
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp; <strong>{item.cityName}</strong> &nbsp;{" "}
                <span>{item.country}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
