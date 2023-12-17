import React, { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useOptions } from "../../context/OptionContext";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestionation] = useState(
    searchParams.get("destination") || ""
  );
  const [openOption, setOpenOption] = useState(false);
  const { options, setOptions } = useOptions();
  const navigate = useNavigate();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const handleOptionChange = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItems">
          <MdLocationOn className="headerIcon headerSearchIcon" />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestionation(e.target.value)}
            placeholder="where to go?"
            name="destination"
            id="destination"
            className="headerSearchInput"
          />
          <span className="headerSeperator"></span>
        </div>
        <div className="headerSearchItems">
          <HiCalendar className="headerIcon headerCalendarIcon" />
          <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              className="date"
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
              rangeColors={["#0c4a6e"]}
            />
          )}
          <span className="headerSeperator"></span>
        </div>
        <div className="headerSearchItems">
          <div
            className="optionDropDown"
            id="optionDropDown"
            onClick={() => setOpenOption(!openOption)}
          >
            {options.adult} adult &bull; {options.children} children &bull;{" "}
            {options.room} room
          </div>
          {openOption && (
            <GuestOption
              setOpenOption={setOpenOption}
              handleOptionChange={handleOptionChange}
            />
          )}
          <span className="headerSeperator"></span>
        </div>
        <div className="headerSearchItems" onClick={handleSearch}>
          <HiSearch className="headerIcon headerSearchBtn" />
          <span className="headerSeperator"></span>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOption({ handleOptionChange, setOpenOption }) {
  const { options } = useOptions();
  const openRef = useRef(null);
  useOutsideClick(openRef, "optionDropDown", () => setOpenOption(false));
  return (
    <div className="guestOptions" ref={openRef}>
      {Object.keys(options).map((key, index) => {
        return (
          <GuestOptionItem
            key={index}
            type={key}
            handleOptionChange={handleOptionChange}
            minLimit={0}
          />
        );
      })}
    </div>
  );
}
function GuestOptionItem({ type, minLimit, handleOptionChange }) {
  const { options } = useOptions();
  return (
    <div className="guestOptionItem">
      <div className="optionText">{type}</div>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
          onClick={() => handleOptionChange(type, "dec")}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOptionChange(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
