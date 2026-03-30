import React, { useState, useEffect } from 'react'
import { getBooking } from '../../service/bookingService'
import { getRoom, getHotel } from '../../service/hotelService'
import { getPrefixes } from '../../service/userService'
import { CheckOutlined } from '@ant-design/icons'
import { Steps } from 'antd'
import { formatDateTime, getDateDifference } from '../../utils/timeFormat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faLocationDot, faChildren } from '@fortawesome/free-solid-svg-icons'
import PriceSummary from './price'
import AddToYourStay from './AddToYourStay'
import pluralize from '../../utils/pluralize'
import ArrivalTime from './ArrivalTime'
import useCheckoutForm from '../../components/CustomHook/useCheckoutForm'
import './style.scss'

const Checkout = () => {
  const [bookingId, setBookingId] = useState(localStorage.getItem('bookingId'))
  const [booking, setBooking] = useState(null)
  const [rooms, setRooms] = useState([])
  const [hotel, setHotel] = useState(null)
  const [prefixes, setPrefixes] = useState([
    { code: 'VN', name: 'Vietnam', dial_code: '+84' },
    { code: 'US', name: 'United States', dial_code: '+1' },
    { code: 'JP', name: 'Japan', dial_code: '+81' },
    { code: 'KR', name: 'South Korea', dial_code: '+82' },
    { code: 'FR', name: 'France', dial_code: '+33' },
    { code: 'DE', name: 'Germany', dial_code: '+49' },
    { code: 'CN', name: 'China', dial_code: '+86' },
    { code: 'TH', name: 'Thailand', dial_code: '+66' },
    { code: 'IN', name: 'India', dial_code: '+91' },
    { code: 'BR', name: 'Brazil', dial_code: '+55' },
    { code: 'MX', name: 'Mexico', dial_code: '+52' },
    { code: 'GB', name: 'United Kingdom', dial_code: '+44' },
  ])

  const { handleSubmit, watch, errors, fields } = useCheckoutForm(prefixes)

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const fetchedBooking = await getBooking(bookingId)
        setBooking(fetchedBooking)

        if (fetchedBooking?.rooms?.length) {
          const roomDetails = await Promise.all(
            fetchedBooking.rooms.map(async (room) => {
              try {
                const response = await getRoom(room.roomId)
                return response
              } catch (error) {
                console.error(`Error fetching room details for roomId ${room.roomId}:`, error)
                return null
              }
            })
          )
          setRooms(roomDetails.filter((room) => room !== null))
        }

        try {
          const hotelDetails = await getHotel(fetchedBooking.hotelId)
          setHotel(hotelDetails)
        } catch (error) {
          console.error(`Error fetching hotel details for hotelId ${fetchedBooking.hotelId}:`, error)
        }
      } catch (error) {
        console.error('Error fetching booking data:', error)
      }
    }

    const fetchPrefixesData = async () => {
      try {
        const fetchedPrefixes = await getPrefixes()
        setPrefixes(fetchedPrefixes)
      } catch (error) {
        console.error('Error fetching prefixes:', error)
      }
    }

    fetchPrefixesData()
    fetchBookingData()
  }, [bookingId])

  const onSubmit = async (data) => {
    const requestBody = {
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      phoneNo: data.phoneNo ? `${data.phonePrefix}${data.phoneNo}` : '',
      country: data.country,
      finalPrice: parseFloat(rooms.reduce((acc, room) => acc + room.BaseRate, 0) * 1.08).toFixed(2),
      arrivalTime: data.arrivalTime,
      airportShuttle: data.airportShuttle,
      rentalCar: data.rentalCar,
      taxiShuttle: data.taxiShuttle,
      specialRequest: data.specialRequest.trim(),
      bookingId,
    }

    try {
      const response = await fetch(`http://localhost:3002/api/v1/booking/${bookingId}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
      const responseData = await response.json()
      if (responseData.status === 200) {
        console.log('Booking updated successfully:', responseData)
        window.location.href = `/booking/${bookingId}/final`
      } else if (responseData.status === 404) {
        alert('Booking not found.')
      } else {
        alert('Error updating booking.')
      }
    } catch (error) {
      console.error('Error updating booking:', error)
      alert('An error occurred while updating the booking.')
    }
  }

  let duration =
    booking?.checkInDate && booking?.checkOutDate ? getDateDifference(booking.checkInDate, booking.checkOutDate) : 'N/A'

  const VAT = 8
  const originalPrice = rooms.reduce((acc, room) => acc + room.BaseRate, 0)
  const finalPrice = parseFloat(originalPrice * (1 + VAT / 100)).toFixed(2)

  const formDataWatch = watch()

  const selectBefore = (
    <select {...fields.phonePrefix}>
      {prefixes.map((prefix) => (
        <option key={prefix.code} value={prefix.dial_code}>
          {prefix.name} {prefix.dial_code}
        </option>
      ))}
    </select>
  )

  const renderRoomDetails = () => {
    return rooms.map((room) => (
      <div key={room.id} className="checkout__room-Detail">
        <div className="checkout__room-Title">
          <div className="checkout__name">{room.Description}</div>
          <div className="checkout__room-cancellation">
            <CheckOutlined style={{ color: 'green' }} />
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
    ))
  }

  const checkoutInformation = () => {
    return (
      <div className="checkout__guest-Information">
        <h2>Enter your details</h2>
        <div className="checkout__guest-Warning">
          <FontAwesomeIcon icon={faCircleInfo} />
          <div className="checkout__guest-Warning-title">Almost done! Just fill in the * fields below</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="checkout__guest-Contact">
            <h3>Contact Information</h3>
            <div className="checkout__guest-Details">
              <div className="checkout__guest-Name">
                <label>Full name * </label>
                <input type="text" placeholder="Ex: Le Tien Dat" {...fields.customerName} />
                {errors.customerName && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.customerName.message}
                  </span>
                )}
              </div>
              <div className="checkout__guest-Email">
                <label>Email * </label>
                <input type="email" placeholder="Ex: abc@gmail.com" {...fields.customerEmail} />
                {errors.customerEmail && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.customerEmail.message}
                  </span>
                )}
              </div>
              <div className="checkout__guest-Country">
                <label>Country/region </label>
                <select {...fields.country}>
                  <option value="">Select a country</option>
                  {prefixes.map((prefix) => (
                    <option key={prefix.code} value={prefix.name}>
                      {prefix.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.country.message}
                  </span>
                )}
              </div>
              <div className="checkout__guest-dial">
                <label>Phone No </label>
                <div className="checkout__guest-dial-inp">
                  {selectBefore}
                  <input type="text" placeholder="Enter phone number" {...fields.phoneNo} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }

  const hotelDetails = () => {
    return (
      <div className="checkout__hotel-Details">
        <div className="checkout__hotel-img">
          <img src={hotel?.images?.imgSource} alt="hotel" />
        </div>
        <div className="checkout__hotel-body">
          <div className="checkout__hotel-Name">{hotel?.HotelName}</div>
          <div className="checkout__hotel-Address">
            <FontAwesomeIcon icon={faLocationDot} /> {hotel?.Address?.StreetAddress}
            <br />
            {hotel?.Address?.City}, {hotel?.Address?.Country}
          </div>
        </div>
      </div>
    )
  }

  const bookingDetail = () => {
    return (
      <div className="checkout__booking-Details">
        <div className="checkout__booking-title">Your Booking Information</div>
        <div className="checkout__booking-Body">
          <div className="checkout__booking-time">
            <div className="checkout__booking-Checkin">
              <label>Check-in</label>
              <div>{booking?.checkInDate ? formatDateTime(booking.checkInDate) : 'N/A'}</div>
            </div>
            <div className="checkout__booking-Checkout">
              <label>Check-out</label>
              <div>{booking?.checkOutDate ? formatDateTime(booking.checkOutDate) : 'N/A'}</div>
            </div>
          </div>
          <div className="checkout__booking-Room">
            {booking?.rooms?.length > 0 ? (
              <div>
                You booked {booking.rooms.length} {pluralize(booking.rooms.length, 'room', 'rooms')} for {duration}{' '}
                {pluralize(duration, 'night', 'nights')}
              </div>
            ) : (
              'No rooms booked'
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="progress">
        <Steps
          size="small"
          current={1}
          items={[{ title: 'Choose Room' }, { title: 'Fill Information' }, { title: 'Final' }]}
        />
      </div>
      <section className="checkout">
        <div className="sider-display">
          <div className="checkout__hotel">{hotelDetails()}</div>
          <div className="checkout__booking">{bookingDetail()}</div>
          <PriceSummary originalPrice={originalPrice} finalPrice={finalPrice} VAT={0.08} />
        </div>
        <div className="main-display">
          <div className="checkout__guest">{checkoutInformation()}</div>
          <div className="checkout__room">{renderRoomDetails()}</div>
          <ArrivalTime arrivalTime={formDataWatch.arrivalTime} handleTimeChange={(e) => {}} />
          <AddToYourStay
            airportShuttle={formDataWatch.airportShuttle}
            rentalCar={formDataWatch.rentalCar}
            taxiShuttle={formDataWatch.taxiShuttle}
            specialRequest={formDataWatch.specialRequest}
            handleCheckboxChange={() => {}}
            handleSpecialRequestChange={() => {}}
          />
          <div className="checkout__btn">
            <button onClick={handleSubmit(onSubmit)}>Complete Booking</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Checkout
