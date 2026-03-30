import React from "react";
import { DatePicker } from "antd";
import LocationSearch from "../../../../components/LocationOptions";
import RoomPicker from "../../../../components/RoomPicker";
import moment from "moment";

const { RangePicker } = DatePicker;

const LocationSearchBar = ({
  location,
  setLocation,
  booking,
  setBooking,
  handleDateChange,
  handleSearch,
}) => {
  return (
    <div className="search-result__bar">
      <div className="search-result__bar-item">
        <LocationSearch setLocation={setLocation} location={location} />
      </div>
      <div className="search-result__bar-item">
        <RoomPicker guestInfo={booking} setGuestInfo={setBooking} />
      </div>
      <div className="search-result__bar-item">
        <RangePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          onChange={handleDateChange}
          defaultValue={
            booking.startDate && booking.endDate
              ? [moment(booking.startDate), moment(booking.endDate)]
              : null
          }
        />
      </div>
      <div className="search-result__bar-item search-result__bar-item--submit">
        <button className="search-result__submit-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default LocationSearchBar;
