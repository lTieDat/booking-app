import React, { useState, useEffect } from 'react'
import { getBooking } from '../../service/bookingService'
import { getRoom, getHotel } from '../../service/hotelService'
import { getPrefixes } from '../../service/userService'
import { CheckOutlined } from '@ant-design/icons'
import { Steps, Input } from 'antd'
import { formatDateTime, getDateDifference } from '../../utils/timeFormat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faLocationDot, faChildren } from '@fortawesome/free-solid-svg-icons'
import PriceSummary from './price'
import AddToYourStay from './AddToYourStay'
import pluralize from '../../utils/pluralize'
import ArrivalTime from './ArrivalTime'
import './style.scss'

const Checkout = () => {
  const bookingId = window.location.pathname.split('/').pop()
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
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    country: '',
    phoneNo: '',
    phonePrefix: '+84',
    arrivalTime: "I don't know",
    airportShuttle: false,
    rentalCar: false,
    taxiShuttle: false,
    specialRequest: '',
  })
  const [errors, setErrors] = useState({})

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

    const fetchPrefixes = async () => {
      try {
        const fetchedPrefixes = await getPrefixes()
        setPrefixes(fetchedPrefixes)
      } catch (error) {
        console.error('Error fetching prefixes:', error)
      }
    }

    fetchPrefixes()
    fetchBookingData()
  }, [bookingId])

  const validateForm = () => {
    const newErrors = {}

    // Validate customerName
    if (!formData.customerName) {
      newErrors.customerName = 'Customer name is required'
    } else if (formData.customerName.length < 2) {
      newErrors.customerName = 'Customer name must be at least 2 characters'
    } else if (formData.customerName.length > 100) {
      newErrors.customerName = 'Customer name must not exceed 100 characters'
    } else if (!/^[a-zA-Z\s\-\']+$/.test(formData.customerName)) {
      newErrors.customerName = 'Customer name can only contain letters, spaces, hyphens, and apostrophes'
    }

    // Validate customerEmail
    if (!formData.customerEmail) {
      newErrors.customerEmail = 'Email is required'
    } else if (formData.customerEmail.length < 5) {
      newErrors.customerEmail = 'Email must be at least 5 characters'
    } else if (formData.customerEmail.length > 100) {
      newErrors.customerEmail = 'Email must not exceed 100 characters'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Invalid email format'
    }

    // Validate specialRequest
    if (formData.specialRequest.length > 500) {
      newErrors.specialRequest = 'Special request must not exceed 500 characters'
    }

    //validate country != select country
    if (!formData.country) {
      newErrors.country = 'Country is required'
    } else if (formData.country.length < 2) {
      newErrors.country = 'Country must be at least 2 characters'
    } else if (formData.country.length > 100) {
      newErrors.country = 'Country must not exceed 100 characters'
    } else if (!/^[a-zA-Z\s\-\']+$/.test(formData.country)) {
      newErrors.country = 'Country can only contain letters, spaces, hyphens, and apostrophes'
    }

    // Validate country and phonePrefix correspondence
    if (formData.country) {
      const selectedPrefix = prefixes.find((prefix) => prefix.name === formData.country)
      if (selectedPrefix && selectedPrefix.dial_code !== formData.phonePrefix) {
        newErrors.country = 'Selected country does not match the phone prefix'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value }
      // Auto-update phonePrefix when country changes
      if (name === 'country') {
        const selectedPrefix = prefixes.find((prefix) => prefix.name === value)
        if (selectedPrefix) {
          newFormData.phonePrefix = selectedPrefix.dial_code
        }
      }
      return newFormData
    })
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleCheckboxChange = (e, type) => {
    const isChecked = e.target.checked
    setFormData((prev) => ({
      ...prev,
      [type]: isChecked,
    }))
  }

  const handleSpecialRequestChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      specialRequest: e.target.value,
    }))
    setErrors((prev) => ({ ...prev, specialRequest: '' }))
  }

  const handleTimeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      arrivalTime: e.target.value,
    }))
  }

  const handleBooking = () => {
    if (!validateForm()) {
      alert('Please fix the errors in the form before submitting.')
      return
    }

    const requestBody = {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      phoneNo: formData.phoneNo ? `${formData.phonePrefix}${formData.phoneNo}` : '',
      country: formData.country,
      finalPrice: parseFloat(rooms.reduce((acc, room) => acc + room.BaseRate, 0) * 1.08).toFixed(2),
      arrivalTime: formData.arrivalTime,
      airportShuttle: formData.airportShuttle,
      rentalCar: formData.rentalCar,
      taxiShuttle: formData.taxiShuttle,
      specialRequest: formData.specialRequest.trim(),
      bookingId,
    }

    const updateBooking = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/v1/booking/${bookingId}/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
        const data = await response.json()
        if (data.status === 200) {
          window.location.href = `/booking/${bookingId}/final`
        } else if (data.status === 404) {
          alert('Booking not found.')
        } else {
          alert('Error updating booking.')
        }
      } catch (error) {
        console.error('Error updating booking:', error)
        alert('An error occurred while updating the booking.')
      }
    }
    updateBooking()
  }

  let duration =
    booking?.checkInDate && booking?.checkOutDate ? getDateDifference(booking.checkInDate, booking.checkOutDate) : 'N/A'

  const VAT = 8
  const originalPrice = rooms.reduce((acc, room) => acc + room.BaseRate, 0)
  const finalPrice = parseFloat(originalPrice * (1 + VAT / 100)).toFixed(2)

  const selectBefore = (
    <select name="phonePrefix" value={formData.phonePrefix} onChange={handleInputChange}>
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
        <div className="checkout__guest-Contact">
          <h3>Contact Information</h3>
          <div className="checkout__guest-Details">
            <div className="checkout__guest-Name">
              <label>Full name * </label>
              <input
                type="text"
                name="customerName"
                placeholder="Ex: Le Tien Dat"
                value={formData.customerName}
                onChange={handleInputChange}
                required
              />
              {errors.customerName && (
                <span className="error" style={{ color: 'red' }}>
                  {errors.customerName}
                </span>
              )}
            </div>
            <div className="checkout__guest-Email">
              <label>Email * </label>
              <input
                type="email"
                name="customerEmail"
                placeholder="Ex: abc@gmail.com"
                value={formData.customerEmail}
                onChange={handleInputChange}
                required
              />
              {errors.customerEmail && (
                <span className="error" style={{ color: 'red' }}>
                  {errors.customerEmail}
                </span>
              )}
            </div>
            <div className="checkout__guest-Country">
              <label>Country/region </label>
              <select name="country" value={formData.country} onChange={handleInputChange}>
                <option value="">Select a country</option>
                {prefixes.map((prefix) => (
                  <option key={prefix.code} value={prefix.name}>
                    {prefix.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span className="error" style={{ color: 'red' }}>
                  {errors.country}
                </span>
              )}
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
                />
              </div>
            </div>
          </div>
        </div>
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
          <ArrivalTime arrivalTime={formData.arrivalTime} handleTimeChange={handleTimeChange} />
          <AddToYourStay
            airportShuttle={formData.airportShuttle}
            rentalCar={formData.rentalCar}
            taxiShuttle={formData.taxiShuttle}
            specialRequest={formData.specialRequest}
            handleCheckboxChange={handleCheckboxChange}
            handleSpecialRequestChange={handleSpecialRequestChange}
          />
          <div className="checkout__btn">
            <button onClick={handleBooking}>Complete Booking</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Checkout
