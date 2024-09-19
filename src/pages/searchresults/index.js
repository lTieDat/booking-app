import React, { useState, useEffect, useCallback } from "react";
import { DatePicker, notification, Input, Rate } from "antd";
import LocationSearch from "../../components/LocationOptions";
import RoomPicker from "../../components/RoomPicker";
import { checkInputBooking } from "../../utils/validation";
import extractLocationDetails from "../../utils/addressFormat";
import { get } from "../../utils/index";
import moment from "moment";
import shortenParagraph from "../../utils/shortenParagraph";
import { StarTwoTone } from "@ant-design/icons";
import { getTwoToneColor, setTwoToneColor } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
setTwoToneColor("yellow");

const { RangePicker } = DatePicker;

const SearchResult = () => {
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

  const { location: initialLocation, booking: initialBooking } =
    useQueryParams();
  const { showError, contextHolder } = useNotification();

  const [hotels, setHotels] = useState([]);
  const [location, setLocation] = useState(initialLocation);
  const [booking, setBooking] = useState(initialBooking);
  const [selectedItems, setSelectedItems] = useState([]);
  const [rangeValue, setRangeValue] = useState([]);
  const [propertyName, setPropertyName] = useState(""); // For property name search
  const [rating, setRating] = useState(0);
  const handleDateChange = useCallback((dates, dateString) => {
    const [startDate, endDate] = dateString;
    setBooking((prev) => ({ ...prev, startDate, endDate }));
  }, []);
  const Navigate = useNavigate();
  const items = [
    "In-room dining",
    "Complimentary Wi-Fi",
    "Coffee maker",
    "Refrigerator",
  ];

  const handleCheckboxChange = (item) => {
    if (Array.isArray(item)) {
      // Handle range value
      setRangeValue((prevRange) =>
        prevRange.some((range) => range[0] === item[0] && range[1] === item[1])
          ? prevRange.filter(
              (range) => range[0] !== item[0] || range[1] !== item[1]
            )
          : [...prevRange, item]
      );
    } else {
      // Handle room service checkboxes
      setSelectedItems((prevSelected) =>
        prevSelected.includes(item)
          ? prevSelected.filter((i) => i !== item)
          : [...prevSelected, item]
      );
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
    console.log(value);
  };

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
      roomTags: selectedItems.join(","),
      propertyName: propertyName, // Pass the property name to the search
    }).toString();

    window.location.href = `/searchresult?${searchParams}`;
  }, [location, booking, showError, selectedItems, propertyName]);

  const getListHotel = useCallback(async () => {
    try {
      const query = new URLSearchParams(window.location.search);
      const roomTags = query.get("roomTags");
      const response = await get(
        `/hotel/search?city=${location.city}&country=${location.country}&lat=${location.geometry.lat}&lng=${location.geometry.lng}&startDate=${booking.startDate}&endDate=${booking.endDate}&adults=${booking.adults}&children=${booking.children}&rooms=${booking.rooms}&roomTags=${roomTags}&propertyName=${propertyName}`
      );

      if (response.status === 200) {
        setHotels(response.data);
      } else {
        showError("Error", response.message);
      }
    } catch (error) {
      showError("Error", "Failed to fetch hotel data.");
    }
  }, [location, booking, showError, propertyName]);

  useEffect(() => {
    getListHotel();
  }, []);

  // Handle Enter key press for property name search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      console.log(propertyName);
      // handleSearch();
    }
  };

  const handleHotelDetail = (hotelId) => () => {
    Navigate(
      `/hotelDetail/${hotelId}?startDate=${booking.startDate}&endDate=${booking.endDate}&adults=${booking.adults}&children=${booking.children}&rooms=${booking.rooms}`
    );
  };

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
      {/* side tab */}
      <div className="search-result__content">
        <div className="search-result__sidetab">
          {/* Property name search */}
          <div className="search-result__sidetab-item">
            <div className="search-result__sidetab-header">
              <h3 className="search-result__sidetab-title">
                Search by properties name
              </h3>
              <Input
                className="search-result__input"
                placeholder="Search by hotel name"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                onKeyUp={handleKeyPress}
              />
            </div>
          </div>
          {/* Room services */}
          <div className="search-result__sidetab-item">
            <div className="search-result__sidetab-header">
              <h3 className="search-result__sidetab-title">Room services</h3>
            </div>
            <div className="search-result__sidetab-body">
              <div className="search-result__checkbox-group">
                {items.map((item) => (
                  <div key={item} className="search-result__checkbox-item">
                    <input
                      type="checkbox"
                      id={item}
                      checked={selectedItems.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                    <label htmlFor={item}>{item}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Budget per day */}
          <div className="search-result__sidetab-item">
            <div className="search-result__sidetab-header">
              <h3 className="search-result__sidetab-title">
                Your budget per day
              </h3>
            </div>
            <div className="search-result__sidetab-body">
              <div className="search-result__checkbox-group">
                {[
                  { label: "0-200$", range: [0, 200] },
                  { label: "200$-500$", range: [200, 500] },
                  { label: "500$-1000$", range: [500, 1000] },
                ].map(({ label, range }) => (
                  <div key={label} className="search-result__checkbox-item">
                    <input
                      type="checkbox"
                      id={label}
                      checked={rangeValue.some(
                        (item) => item[0] === range[0] && item[1] === range[1]
                      )}
                      onChange={() => handleCheckboxChange(range)}
                    />
                    <label htmlFor={label}>{label}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* end budget per day */}
          {/* filter by rating star */}
          <div className="search-result__sidetab-item">
            <div className="search-result__sidetab-header">
              <h3 className="search-result__sidetab-title">Rating star</h3>
            </div>
            <div className="search-result__sidetab-body">
              <div className="search-result__checkbox-groupStar">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div
                    key={rating}
                    className="search-result__checkbox-itemStar"
                    onClick={() => handleRatingChange(rating)}
                  >
                    <label>
                      <p>
                        {rating} <StarTwoTone />
                      </p>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* end filter by rating star */}
        </div>
        {/* main content */}
        <div className="search-result__main">
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
                  {/* rooms left */}
                  <div className="search-result__main-itemList-rooms">
                    {hotel.NumberOfRooms}{" "}
                    {hotel.NumberOfRooms > 1 ? "rooms" : "room"} left !
                  </div>
                  {/* end rooms left */}
                  <div className="search-result__main-itemList-img">
                    <img
                      src={hotel.images.imgSource}
                      alt={hotel.HotelName}
                      className="search-result__hotel-img"
                    />
                  </div>
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
                      From <b>${hotel.LowestPrice}</b> to{" "}
                      <b>${hotel.HighestPrice}</b>
                    </p>
                  </div>
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
        </div>
        {/* end main content */}
      </div>
    </>
  );
};

export default SearchResult;
