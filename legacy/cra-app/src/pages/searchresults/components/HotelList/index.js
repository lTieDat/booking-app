import React from "react";
import { Rate } from "antd";
import shortenParagraph from "../../../../utils/shortenParagraph";

const HotelList = ({ hotels, location, handleHotelDetail }) => {
  return (
    <div className="search-result__main-display">
      <h3 className="search-result__main-title">
        {location.city !== "undefined" ? (
          <>
            {location.city} {location.country}: {hotels.length}{" "}
            {hotels.length > 1 ? "results" : "result"} found
          </>
        ) : (
          <>
            {location.country}: {hotels.length}{" "}
            {hotels.length > 1 ? "results" : "result"} found
          </>
        )}
      </h3>
      <div className="search-result__main-itemList">
        {hotels.map((hotel) => (
          <div
            key={hotel.HotelId}
            className="search-result__main-itemList-item"
          >
            {/* Rooms left */}
            <div className="search-result__main-itemList-rooms">
              {hotel.NumberOfRooms} {hotel.NumberOfRooms > 1 ? "rooms" : "room"}{" "}
              left!
            </div>

            {/* Hotel image */}
            <div className="search-result__main-itemList-img">
              <img
                src={hotel.images.imgSource}
                alt={hotel.HotelName}
                className="search-result__hotel-img"
              />
            </div>

            {/* Hotel content */}
            <div className="search-result__main-itemList-content">
              <h4 className="search-result__main-itemList-name">
                {hotel.HotelName}
              </h4>
              <div className="search-result__main-itemList-hotelRating">
                <Rate disabled allowHalf defaultValue={hotel.Rating} />
                <p>{hotel.Rating}</p>
              </div>
              <p className="search-result__main-itemList-hotelDesc">
                {shortenParagraph(hotel.Description, 100)}
              </p>
              <p>
                From <b>${hotel.LowestPrice}</b> to <b>${hotel.HighestPrice}</b>
              </p>
            </div>

            {/* View Details button */}
            <div className="search-result__main-itemList-price">
              <button
                className="search-result__main-itemList-btn"
                onClick={handleHotelDetail(hotel.HotelId)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
