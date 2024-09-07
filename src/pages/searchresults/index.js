import React, { useState, useEffect, useCallback } from "react";
import { DatePicker, notification, Input, Rate } from "antd";
import LocationSearch from "../../components/LocationOptions";
import RoomPicker from "../../components/RoomPicker";
import { checkInputBooking } from "../../utils/validation";
import extractLocationDetails from "../../utils/addressFormat";
import { get } from "../../utils/index";
import moment from "moment";

const { RangePicker } = DatePicker;

const useQueryParams = () => {
  const query = new URLSearchParams(window.location.search);

  return {
    location: {
      geometry: { lat: query.get("lat"), lng: query.get("lng") },
      city: query.get("city"),
      country: query.get("country"),
    },
    booking: {
      startDate: query.get("startDate"),
      endDate: query.get("endDate"),
      adults: query.get("adults"),
      children: query.get("children"),
      rooms: query.get("rooms"),
    },
  };
};

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const showError = (message, description) => {
    api.error({
      message,
      description,
      duration: 5,
      showProgress: true,
      pauseOnHover: true,
    });
  };

  return { showError, contextHolder };
};

const SearchResult = () => {
  const { location: initialLocation, booking: initialBooking } =
    useQueryParams();
  const { showError, contextHolder } = useNotification();

  const [hotels, setHotels] = useState([]);
  const [location, setLocation] = useState(initialLocation);
  const [booking, setBooking] = useState(initialBooking);

  const handleDateChange = useCallback((dates, dateString) => {
    const [startDate, endDate] = dateString;
    setBooking((prev) => ({ ...prev, startDate, endDate }));
  }, []);

  const handleSearch = useCallback(async () => {
    const requestBody = {
      coordinates: { ...location.geometry },
      location: extractLocationDetails(location),
      booking: { ...booking },
    };

    const errors = checkInputBooking(requestBody);
    if (Object.keys(errors).length > 0) {
      showError("Input Validation Error", Object.values(errors).join("! \n"));
      return;
    }

    const searchParams = new URLSearchParams({
      city: location.city,
      country: location.country,
      startDate: booking.startDate,
      endDate: booking.endDate,
      adults: booking.adults,
      children: booking.children,
      rooms: booking.rooms,
      lat: location.geometry.lat,
      lng: location.geometry.lng,
    }).toString();

    window.location.href = `/searchresult?${searchParams}`;
  }, [location, booking, showError]);

  const getListHotel = useCallback(async () => {
    try {
      const response = await get(
        `/hotel/search?city=${location.city}&country=${location.country}&lat=${location.geometry.lat}&lng=${location.geometry.lng}&startDate=${booking.startDate}&endDate=${booking.endDate}&adults=${booking.adults}&children=${booking.children}&rooms=${booking.rooms}`
      );

      if (response.status === 200) {
        setHotels(response.data);
      } else {
        showError("Error", response.message);
      }
    } catch (error) {
      showError("Error", "Failed to fetch hotel data.");
    }
  }, [location, booking, showError]);

  useEffect(() => {
    getListHotel();
  }, []);

  return (
    <>
      <div className="search-result__header">
        {contextHolder}
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
            <button
              className="search-result__submit-btn"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="search-result__content">
        <div className="search-result__sidetab">
          <div className="search-result__sidetab-item">
            <div className="search-result__sidetab-header">
              <h3 className="search-result__sidetab-title">
                Search by properties name
              </h3>
              <Input
                className="search-result__input"
                placeholder="Search by hotel name"
              />
            </div>
          </div>
          {/* value range */}
          <div className="search-result__sidetab-item">
            <div className="search-result__sidetab-header">
              <h3 className="search-result__sidetab-title">Filters</h3>
            </div>
            <div className="search-result__sidetab-body">
              <Input
                className="search-result__input"
                placeholder="Search by hotel name"
              />
            </div>
          </div>
        </div>

        <div className="search-result__main">
          <div className="search-result__main-display">
            <h3 className="search-result__main-title">
              {location.city !== "undefined" ? (
                <>
                  {location.city}, {location.country}: {hotels.length}{" "}
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
                  key={hotel.id}
                  className="search-result__main-itemList-item"
                >
                  <div className="search-result__main-itemList-img">
                    <img
                      src={hotel.images[0].imgSource}
                      alt={hotel.HotelName}
                      className="search-result__hotel-img"
                    />
                  </div>
                  <div className="search-result__main-itemList-content">
                    <h4 className="search-result__hotel-name">
                      {hotel.HotelName}
                    </h4>
                    <div className="search-result__hotel-rating">
                      <Rate disabled allowHalf defaultValue={hotel.Rating} />
                      <p>{hotel.Rating}</p>
                    </div>
                    <p className="search-result__hotel-location">
                      {location.city !== "undefined" ? (
                        <>
                          {location.city}, {location.country}
                        </>
                      ) : (
                        <>{location.country}</>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
