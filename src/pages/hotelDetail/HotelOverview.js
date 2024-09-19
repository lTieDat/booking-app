import React from "react";
import { Rate } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const HotelOverview = ({ hotel }) => {
  return (
    <div className="hotel-detail__overview">
      <div className="hotel-detail__container">
        <div className="hotel-detail__information">
          <h1>{hotel.HotelName}</h1>
          <div className="hotel-detail__rating">
            <Rate disabled allowHalf defaultValue={hotel.Rating} />
            <p>
              {hotel.Rating} ({hotel.Reviews} Reviews)
            </p>
          </div>
          <div className="hotel-detail__location">
            <FontAwesomeIcon icon={faLocationDot} />
            <p>
              {hotel.Address.StreetAddress}, {hotel.Address.District}{" "}
              {hotel.Address.City}, {hotel.Address.Country}
            </p>
          </div>
          <div className="hotel-detail__desc">
            <h3>Overview</h3>
            <p>{hotel.Description}</p>
          </div>
          <div className="hotel-detail__facilities">
            <h3>Top facilities</h3>
            <ul>
              {hotel.RoomTags.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelOverview;
