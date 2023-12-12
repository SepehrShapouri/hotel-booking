import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useOptions } from "../../context/OptionContext";
function Header() {
  const [destination, setDestionation] = useState("");
  const [openOption, setOpenOption] = useState(false);
  const { options, setOptions } = useOptions();
  const handleOptionChange = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
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
          <div className="dateDropDown">2023/06/8</div>
          <span className="headerSeperator"></span>
        </div>
        <div className="headerSearchItems">
          <div
            className="optionDropDown"
            onClick={() => setOpenOption(!openOption)}
          >
            {options.adult} adult &bull; {options.children} children &bull;{" "}
            {options.room} room
          </div>
          {openOption && (
            <GuestOption handleOptionChange={handleOptionChange} />
          )}
          <span className="headerSeperator"></span>
        </div>
        <div className="headerSearchItems">
          <HiSearch className="headerIcon headerSearchBtn" />
          <span className="headerSeperator"></span>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOption({ handleOptionChange }) {
  const { options } = useOptions();
  return (
    <div className="guestOptions">
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
