import React, { useState, useEffect } from "react";
import { getBooking } from "../../service/bookingService";
import { getRoom, getHotel } from "../../service/hotelService";
import { getPrefixes } from "../../service/userService";
import { CheckOutlined } from "@ant-design/icons";
import { Steps, Input } from "antd";
import { formatDateTime, getDateDifference } from "../../utils/timeFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faChildren } from "@fortawesome/free-solid-svg-icons";
import PriceSummary from "./price";
import AddToYourStay from "./AddToYourStay";
import pluralize from "../../utils/pluralize";
import ArrivalTime from "./ArrivalTime";
import "./style.scss";

const Checkout = () => {
  const bookingId = window.location.pathname.split("/").pop();
  const [booking, setBooking] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [prefixes, setPrefixes] = useState([]);
  const [arrivalTime, setArrivalTime] = useState("I don't know");
  const [airportShuttle, setAirportShuttle] = useState(false);
  const [rentalCar, setRentalCar] = useState(false);
  const [taxiShuttle, setTaxiShuttle] = useState(false);
  const [specialRequest, setSpecialRequest] = useState("");

  const handleCheckboxChange = (e, type) => {
    const isChecked = e.target.checked;

    switch (type) {
      case "airportShuttle":
        setAirportShuttle(isChecked);
        break;
      case "rentalCar":
        setRentalCar(isChecked);
        break;
      case "taxiShuttle":
        setTaxiShuttle(isChecked);
        break;
      default:
        break;
    }
  };

  const handleSpecialRequestChange = (e) => {
    setSpecialRequest(e.target.value);
  };

  const handleTimeChange = (e) => {
    setArrivalTime(e.target.value);
  };

  // State to handle form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    phoneNo: "",
    phonePrefix: "84",
  });

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const fetchedBooking = await getBooking(bookingId);
        setBooking(fetchedBooking);

        if (fetchedBooking?.rooms?.length) {
          const roomDetails = await Promise.all(
            fetchedBooking.rooms.map(async (room) => {
              try {
                const response = await getRoom(room.roomId);
                return response;
              } catch (error) {
                console.error(
                  `Error fetching room details for roomId ${room.roomId}:`,
                  error
                );
                return null;
              }
            })
          );
          setRooms(roomDetails.filter((room) => room !== null));
        }

        try {
          const hotelDetails = await getHotel(fetchedBooking.hotelId);
          setHotel(hotelDetails);
        } catch (error) {
          console.error(
            `Error fetching hotel details for hotelId ${fetchedBooking.hotelId}:`,
            error
          );
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    const fetchPrefixes = async () => {
      try {
        const fetchedPrefixes = await getPrefixes();
        setPrefixes(fetchedPrefixes.data);
      } catch (error) {
        console.error("Error fetching prefixes:", error);
      }
    };

    fetchPrefixes();
    fetchBookingData();
  }, [bookingId]);

  let duration = null;

  if (booking?.checkInDate && booking?.checkOutDate) {
    try {
      duration = getDateDifference(booking.checkInDate, booking.checkOutDate);
    } catch (error) {
      console.error("Error calculating duration:", error);
    }
  } else {
    duration = "N/A";
  }

  //handle price
  const VAT = 8;
  const originalPrice = rooms.reduce((acc, room) => acc + room.BaseRate, 0);
  const finalPrice = parseFloat(
    originalPrice * (1 + parseFloat(VAT / 100))
  ).toFixed(2);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle booking
  const handleBooking = () => {
    const requestBody = {
      ...formData,
      phoneNo: `${formData.phonePrefix}${formData.phoneNo}`,
      finalPrice,
      arrivalTime,
      airportShuttle,
      rentalCar,
      taxiShuttle,
      specialRequest: specialRequest.trim(),
      bookingId,
    };
    const updateBooking = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/booking/${bookingId}/update`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
        const data = await response.json();
        if (data.status === 200) {
          window.location.href = `/booking/${bookingId}/final`;
        } else if (data.status === 404) {
          alert("Booking not found.");
        } else {
          alert("Error updating booking.");
        }
      } catch (error) {
        console.error("Error updating booking:", error);
      }
    };
    updateBooking();
  };

  const selectBefore = (
    <select defaultValue="84" name="phonePrefix" onChange={handleInputChange}>
      {prefixes.map((prefix) => (
        <option key={prefix.code} value={prefix.dial_code}>
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
              <input
                type="text"
                name="fullName"
                placeholder="Ex: Le Tien Dat"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="checkout__guest-Email">
              <label>Email * </label>
              <input
                type="email"
                name="email"
                placeholder="Ex: abc@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="checkout__guest-Country">
              <label>Country/region </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                {prefixes.map((prefix) => (
                  <option key={prefix.code} value={prefix.name}>
                    {prefix.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="checkout__guest-dial">
              <label>Phone No </label>
              <div className="checkout__guest-dial-inp">
                {selectBefore}
                <input
                  type="text"
                  name="phoneNo"
                  placeholder="Enter phone number"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const hotelDetails = () => {
    return (
      <div className="checkout__hotel-Details">
        <div className="checkout__hotel-img">
          <img src={hotel?.images?.imgSource} alt="hotel" />
        </div>
        <div className="checkout__hotel-body">
          <div className="checkout__hotel-Name">{hotel?.HotelName}</div>
          <div className="checkout__hotel-Address">
            <FontAwesomeIcon icon={faLocationDot} />{" "}
            {hotel?.Address?.StreetAddress}
            <br />
            {hotel?.Address?.City}, {hotel?.Address?.Country}
          </div>
        </div>
      </div>
    );
  };

  const bookingDetail = () => {
    return (
      <div className="checkout__booking-Details">
        <div className="checkout__booking-title">Your Booking Information</div>
        <div className="checkout__booking-Body">
          <div className="checkout__booking-time">
            <div className="checkout__booking-Checkin">
              <label>Check-in</label>
              <div>
                {booking?.checkInDate
                  ? formatDateTime(booking.checkInDate)
                  : "N/A"}
              </div>
            </div>
            <div className="checkout__booking-Checkout">
              <label>Check-out</label>
              <div>
                {booking?.checkOutDate
                  ? formatDateTime(booking.checkOutDate)
                  : "N/A"}
              </div>
            </div>
          </div>
          <div className="checkout__booking-Room">
            {booking?.rooms?.length > 0 ? (
              <div>
                You booked {booking.rooms.length}{" "}
                {pluralize(booking.rooms.length, "room", "rooms")} for{" "}
                {duration} {pluralize(duration, "night", "nights")}
              </div>
            ) : (
              "No rooms booked"
            )}
          </div>
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
            { title: "Choose Room" },
            { title: "Fill Information" },
            { title: "Final" },
          ]}
        />
      </div>
      <section className="checkout">
        <div className="sider-display">
          <div className="checkout__hotel">{hotelDetails()}</div>
          <div className="checkout__booking">{bookingDetail()}</div>
          <PriceSummary
            originalPrice={originalPrice}
            finalPrice={0}
            VAT={0.08}
          />
        </div>
        <div className="main-display">
          <div className="checkout__guest">{checkoutInformation()}</div>
          <div className="checkout__room">{renderRoomDetails()}</div>
          <ArrivalTime
            arrivalTime={arrivalTime}
            handleTimeChange={handleTimeChange}
          />
          <AddToYourStay
            airportShuttle={airportShuttle}
            rentalCar={rentalCar}
            taxiShuttle={taxiShuttle}
            specialRequest={specialRequest}
            handleCheckboxChange={handleCheckboxChange}
            handleSpecialRequestChange={handleSpecialRequestChange}
          />
          <div className="checkout__btn">
            <button onClick={handleBooking}>Complete Booking</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
