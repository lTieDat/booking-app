import React, { useState, useEffect } from "react";
import { get } from "../../utils/index";
import { DatePicker } from "antd";
import moment from "moment";
import HotelGallery from "./HotelGallery";
import HotelOverview from "./HotelOverview";
import RoomSlider from "./RoomSlider";
import RoomPicker from "../../components/RoomPicker";
import MapComponent from "../../components/MapGeoapify";
import Cookies from "js-cookie";
import "./HotelDetail.scss";
import { createBooking } from "../../service/bookingService";

const HotelDetail = () => {
  const { RangePicker } = DatePicker;
  const [hotel, setHotel] = useState(null);

  // Booking details
  const [booking, setBooking] = useState({
    startDate: new URLSearchParams(window.location.search).get("startDate"),
    endDate: new URLSearchParams(window.location.search).get("endDate"),
    rooms: new URLSearchParams(window.location.search).get("rooms"),
    adults: new URLSearchParams(window.location.search).get("adults"),
    children: new URLSearchParams(window.location.search).get("children"),
  });

  // Selected rooms with quantities
  const [selectedRooms, setSelectedRooms] = useState([]);

  // draftBooking: combines booking and selected rooms
  const hotelId = window.location.pathname.split("/").pop();
  const draftBooking = {
    booking,
    selectedRooms,
    hotelId,
  };

  const handleBookingChange = (newBooking) => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      ...newBooking,
    }));
  };

  const handleSearch = () => {
    const hotelId = window.location.pathname.split("/").pop();
    window.location.href = `/hotelDetail/${hotelId}?startDate=${booking.startDate}&endDate=${booking.endDate}&rooms=${booking.rooms}&adults=${booking.adults}&children=${booking.children}`;
  };

  const handleCheckout = async () => {
    //post draftbooking to server
    const createBook = await createBooking(draftBooking);
    const bookingId = createBook.data;
    //set bookingId to cookie
    Cookies.set("bookingId", bookingId, { expires: 1 });
    window.location.href = `/checkout/${bookingId}`;
  };

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const hotelId = window.location.pathname.split("/").pop();
        const response = await get(
          `/hotel/${hotelId}?startDate=${booking.startDate}&endDate=${booking.endDate}&rooms=${booking.rooms}&adults=${booking.adults}&children=${booking.children}`
        );
        setHotel(response.data);
      } catch (error) {
        console.error("HotelDetail fetchHotel error:", error);
      }
    };

    fetchHotel();
  }, [booking]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hotel-detail">
      <HotelGallery images={hotel.Images} />
      <div className="hotel-detail__header">
        <HotelOverview hotel={hotel} />
        <div className="hotel-detail__map-area">
          <MapComponent
            lat={hotel.Location.coordinates[1]}
            long={hotel.Location.coordinates[0]}
          />
        </div>
      </div>
      <div className="hotel-detail-search">
        <div className="hotel-detail-search__title">
          <h3>Available rooms</h3>
        </div>
        <div className="hotel-detail-search__body">
          <RoomPicker guestInfo={booking} setGuestInfo={handleBookingChange} />
          <RangePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            defaultValue={
              booking.startDate && booking.endDate
                ? [moment(booking.startDate), moment(booking.endDate)]
                : null
            }
            onChange={(dates) => {
              const [startDate, endDate] = dates || [];
              handleBookingChange({
                startDate: startDate
                  ? startDate.format("YYYY-MM-DD HH:mm:ss")
                  : null,
                endDate: endDate ? endDate.format("YYYY-MM-DD HH:mm:ss") : null,
              });
            }}
          />
          <button className="button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <RoomSlider rooms={hotel.Rooms} setSelectedRooms={setSelectedRooms} />
        <button className="button__submit" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default HotelDetail;
