import React, { useState } from "react";
import { DatePicker, notification } from "antd";
import RoomPicker from "../../components/RoomPicker";
import LocationSearch from "../../components/LocationOptions";
import { post } from "../../utils/index";
import { checkInputBooking } from "../../utils/validation";
import extractLocationDetails from "../../utils/addressFormat";

function Search() {
  const { RangePicker } = DatePicker;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState({
    address: "",
    geometry: {
      lat: null,
      lng: null,
    },
    city: "",
    country: "",
    district: "",
  });
  const [guestInfo, setGuestInfo] = useState({
    adults: 0,
    children: 0,
    rooms: 0,
  });

  const [api, contextHolder] = notification.useNotification();

  const handleDateChange = (date, dateString) => {
    const [start, end] = dateString;
    setStartDate(start);
    setEndDate(end);
  };

  const handleSearch = async () => {
    const requestBody = {
      coordinates: {
        lat: location.geometry.lat,
        lng: location.geometry.lng,
      },
      location: {
        city: location.city,
        address: location.address,
        country: location.country,
        district: location.district,
        state: location.state,
      },
      booking: {
        startDate: startDate,
        endDate: endDate,
        adults: guestInfo.adults,
        children: guestInfo.children,
        rooms: guestInfo.rooms,
      },
    };
    const formattedLocation = extractLocationDetails(requestBody.location);
    requestBody.location = formattedLocation;
    const errors = checkInputBooking(requestBody);
    if (Object.keys(errors).length > 0) {
      // Trigger a notification if there are errors
      api.error({
        message: "Input Validation Error",
        description:
          `${errors.location ? errors.location + "! \n" : ""}` +
          `${errors.date ? errors.date + "! \n" : ""}` +
          `${errors.adults ? errors.adults + "! \n" : ""}` +
          `${errors.rooms ? errors.rooms + "!" : ""}`,
        duration: 5,
        showProgress: true,
        pauseOnHover: true,
      });

      return;
    }
    const link = `/searchresult?&city=${location.city}&country=${location.country}&startDate=${startDate}&endDate=${endDate}&adults=${guestInfo.adults}&children=${guestInfo.children}&rooms=${guestInfo.rooms}&lat=${location.geometry.lat}&lng=${location.geometry.lng}`;
    window.location.href = link;
  };

  return (
    <section className="search">
      {contextHolder}
      <div className="search__container">
        <div className="search__background">
          <img
            src="https://res.cloudinary.com/dodip3vc2/image/upload/v1724756026/slider1_mvzh1s.jpg"
            alt="Background"
            className="search__background-image"
          />
        </div>
        <div className="search__content">
          <h1 className="search__title">Find Your Ideal Hotel</h1>
          <p className="search__description">
            Discover the perfect hotel for your next trip. From luxury resorts
            to budget-friendly stays, book now for the best rates and comfort.
          </p>

          <div className="search__bar">
            {/* Location */}
            <div className="search__bar-item">
              <LocationSearch setLocation={setLocation} />
            </div>
            {/* Guest Info */}
            <div className="search__bar-item">
              <RoomPicker guestInfo={guestInfo} setGuestInfo={setGuestInfo} />
            </div>
            {/* Date Picker */}
            <div className="search__bar-item">
              <RangePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                onChange={handleDateChange}
              />
            </div>
            <div className="search__bar-item search__bar-item--submit">
              <button className="search__submit-btn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Search;
