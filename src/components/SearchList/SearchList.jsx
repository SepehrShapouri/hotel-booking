import React from 'react'
import { Link } from 'react-router-dom';
import ResultDesc from '../ResultDesc/ResultDesc';

function SearchList({data,currentHotel}) {
  return (
    <div className="searchList">
    <h3>Search Result : {data.length}</h3>
    {data.map((item) => {
      return (
        <Link
          key={item.id}
          to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
        >
          <div className={`searchItem ${item.id === currentHotel?.id ? "current-hotel" : ""}`}>
            <img src={item.picture_url.url} alt="" />
            <ResultDesc className={"searchItemDesc"} item={item}/>
          </div>
        </Link>
      );
    })}
  </div>
  )
}

export default SearchList