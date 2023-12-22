import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlLocations from "../../hooks/useUrlLocations";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../../context/BookmarksProvider";
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function AddNewBookmark() {
  const navigate = useNavigate();
  const { lat, lng } = useUrlLocations();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState();
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const {createBookmark} = useBookmark()
  useEffect(() => {
    async function getLocation() {
      setIsLoadingGeoCoding(true);
      try {
        const { data } = await axios.get(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "this place is not a city,please choose somewhere else!"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setCountryCode(data.countryCode);
        setIsLoadingGeoCoding(false);
      } catch (error) {
        toast.error(error.message);
        setIsLoadingGeoCoding(false);
      }
    }
    getLocation();
  }, [lat, lng]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;

const newBookmark = {
    cityName,
    country,
    countryCode,
    latitude: lat,
    longitude: lng,
    host_location: cityName + " " + country,
};
   await createBookmark(newBookmark)
   navigate("/bookmarks")
  };
  if (isLoadingGeoCoding) return <Loader />;
  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>Bookmark a new location</h2>
      <form action="" className="form">
        <div className="formControl">
          <label htmlFor="cityname">City Name</label>
          <input
            type="text"
            name="cityname"
            id="cityname"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <span className="flag">
            <ReactCountryFlag
              className="flag"
              style={{ marginTop: "2px" }}
              svg
              countryCode={countryCode}
            />
          </span>
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr;back
          </button>
          <button className="btn btn--primary" onClick={(e)=>handleSubmit(e)}>add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
