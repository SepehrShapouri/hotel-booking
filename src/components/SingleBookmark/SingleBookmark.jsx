import React, { useEffect } from "react";
import { useBookmark } from "../../context/BookmarksProvider";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { IoReturnDownBackOutline } from "react-icons/io5";
import ReactCountryFlag from "react-country-flag";
function SingleBookmark() {
  const { id } = useParams();
  const {
    getBookmark,
    isLoadingCurrentBookmark,
    currentBookmark: data,
  } = useBookmark();
  console.log(data);
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  const navigate = useNavigate()
  if (isLoadingCurrentBookmark) return <Loader />;
  return (
    <div>
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

      <button className="back-btn" onClick={()=>navigate(-1)}><IoReturnDownBackOutline/></button>
    </div>
  );
}

export default SingleBookmark;
