import React, { useState, useEffect } from "react";
import { getBooking } from "../../service/bookingService";
import { getRoom, getHotel } from "../../service/hotelService";
import { getPrefixes } from "../../service/userService";
import { CheckOutlined } from "@ant-design/icons";
import { Steps, Input } from "antd";
import { getCountriesList } from "../../service/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faChildren } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const Checkout = () => {
  const bookingId = window.location.pathname.split("/").pop();
  const [booking, setBooking] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [prefixes, setPrefixes] = useState([]);

  useEffect(() => {
    const fetchPrefixes = async () => {
      const fetchedPrefixes = await getPrefixes();
      setPrefixes(fetchedPrefixes.data);
    };
    fetchPrefixes();

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

      // Fetch hotel details
      const hotelDetails = await getHotel(fetchedBooking.hotelId);
      setHotel(hotelDetails);
    };

    fetchBookingData();
  }, [bookingId]);

  const handleBooking = () => {
    // Booking logic here
    console.log("Booking completed!");
  };

  const selectBefore = (
    <select defaultValue="84">
      {prefixes.map((prefix) => (
        <option key={prefix.code + 1} value={prefix.dial_code}>
          {prefix.name} {prefix.dial_code}
        </option>
      ))}
    </select>
  );

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
                {
                  // Fetch countries list here
                  prefixes.map((prefix) => (
                    <option key={prefix.code} value={prefix.name}>
                      {prefix.name}
                    </option>
                  ))
                }
              </select>
            </div>
            {/* dial_code */}
            <div className="checkout__guest-dial">
              <label>Phone No </label>
              <div className="checkout__guest-dial-inp">
                {selectBefore}
                <input type="text" placeholder="" required />
              </div>
            </div>
            {/* end dial_code */}
          </div>
        </div>
      </div>
    );
  };

  const hotelDetails = () => {
    return (
      <div className="checkout__hotel-Details">
        <div className="checkout__hotel-img">
          <img src={hotel?.images.imgSource} alt="hotel" />
        </div>
        <div className="checkout__hotel-body">
          <div className="checkout__hotel-Name">{hotel?.HotelName}</div>
          <div className="checkout__hotel-Address">
            {hotel?.Address.StreetAddress}
          </div>
          <div className="checkout__hotel-rating">{hotel?.Rating}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="progress">
        <Steps
          size="small"
          current={1}
          items={[
            {
              title: "Choose Room",
            },
            {
              title: "Fill Information",
            },
            {
              title: "Final",
            },
          ]}
        />
      </div>
      <section className="checkout">
        <div className="sider-display">
          <div className="checkout__hotel">{hotelDetails()}</div>
        </div>
        <div className="main-display">
          <div className="checkout__guest">{checkoutInformation()}</div>
          <div className="checkout__room">{renderRoomDetails()}</div>
          <button onClick={handleBooking}>Complete Booking</button>
        </div>
      </section>
    </>
  );
};

export default Checkout;
