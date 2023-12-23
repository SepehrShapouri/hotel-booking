import React, { useEffect } from "react";
import { useBookmark } from "../../context/BookmarksProvider";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { IoReturnDownBackOutline } from "react-icons/io5";
import ReactCountryFlag from "react-country-flag";
import { PiAirplaneTakeoffThin } from "react-icons/pi";
import { FaTrash } from "react-icons/fa"
function SingleBookmark() {
  const { id } = useParams();
  const {
    getCurrentBookmark,
    isLoading,
    currentBookmark: data,
    deleteBookmark
  } = useBookmark();
  console.log(data);
  useEffect(() => {
    getCurrentBookmark(id);
  }, [id]);
  const navigate = useNavigate();
  const deleteBookmarkHandler= async ()=>{
     await deleteBookmark(data.id)
    navigate("/bookmarks")
  }
  if (isLoading) return <Loader />;
  return (
    <div className="singleBookmark">
      <h2>
        <span>
          {
            <ReactCountryFlag
              style={{ marginBottom: "3px" }}
              svg
              countryCode={data.countryCode}
            />
          }
        </span>{" "}
        &nbsp;{data.host_location}
      </h2>
      <p>{data.cityName}</p>
      <div>
      <p style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <PiAirplaneTakeoffThin
          style={{ fontSize: "32px", marginRight: "10px" }}
        />{" "}
        geographical coordinates :
      </p>
      <span className="singleBookmarkDetail">
        {data.latitude} &bull; {data.longitude}
      </span>
      </div>
      <button className="delete-btn" onClick={()=>deleteBookmarkHandler()}><FaTrash/></button>
      <button className="back-btn" onClick={() => navigate(-1)}>
        <IoReturnDownBackOutline />
      </button>
    </div>
  );
}

export default SingleBookmark;
