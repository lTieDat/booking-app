import React, { useState, useEffect } from "react";
import { getBooking } from "../../service/bookingService";
import { getRoom } from "../../service/hotelService";
import { CheckOutlined } from "@ant-design/icons";
import { getCountriesList } from "../../service/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faChildren } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

async function getCountries() {
  const responseCountries = await getCountriesList();
  console.log("responseCountries", responseCountries);
  const countries = responseCountries.map((country) => country.name.common);
  return countries;
}

console.log("getCountries", getCountries());

const Checkout = () => {
  const bookingId = window.location.pathname.split("/").pop();
  const [booking, setBooking] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countryList = await getCountries();
      setCountries(countryList);
    };

    fetchCountries();

    const fetchBookingData = async () => {
      const fetchedBooking = await getBooking(bookingId);
      setBooking(fetchedBooking);

      // Fetch room details only if booking has rooms
      if (fetchedBooking?.rooms?.length) {
        const roomDetails = await Promise.all(
          fetchedBooking.rooms.map(async (room) => {
            const response = await getRoom(room.roomId);
            return response;
          })
        );
        setRooms(roomDetails);
      }
    };

    fetchBookingData();
  }, [bookingId]);

  const handleBooking = () => {
    // Booking logic here
    console.log("Booking completed!");
  };

  const renderRoomDetails = () => {
    return rooms.map((room) => (
      <div key={room.id} className="checkout__room-Detail">
        <div className="checkout__room-Title">
          <div className="checkout__name">{room.Description}</div>
          <div className="checkout__room-cancellation">
            <CheckOutlined style={{ color: "green" }} />
            <p>Free cancellation anytime</p>
          </div>
        </div>
        <div className="checkout__room-Body">
          <div className="checkout__room-maxGuest">
            <FontAwesomeIcon icon={faChildren} />
            <p>Max Guests: {room.MaxOccupancy}</p>
          </div>
          <div className="checkout__service">
            <ul>
              {room.RoomTags.map((service, index) => (
                <li key={index} className="checkout__service-item">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ));
  };

  const checkoutInformation = () => {
    return (
      <div className="checkout__guest-Information">
        <h2>Enter your details</h2>
        <div className="checkout__guest-Warning">
          <FontAwesomeIcon icon={faCircleInfo} />
          <div className="checkout__guest-Warning-title">
            Almost done! Just fill in the * fields below
          </div>
        </div>
        <div className="checkout__guest-Contact">
          <h3>Contact Information</h3>
          <div className="checkout__guest-Details">
            <div className="checkout__guest-Name">
              <label>Full name * </label>
              <input type="text" placeholder="Ex: Le Tien Dat" required />
            </div>
            <div className="checkout__guest-Email">
              <label>Email * </label>
              <input type="text" placeholder="Ex: abc@gmail.com" required />
            </div>
            <div className="checkout__guest-Country">
              <label>Country/region </label>
              <select>
                {countries.map((country, index) => (
                  <option key={index}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="checkout">
      <h1>Secure your reservation</h1>
      <div className="main-display">
        <div className="checkout__guest">{checkoutInformation()}</div>
        <div className="checkout__room">{renderRoomDetails()}</div>
      </div>
      <button onClick={handleBooking}>Complete Booking</button>
    </section>
  );
};

export default Checkout;
