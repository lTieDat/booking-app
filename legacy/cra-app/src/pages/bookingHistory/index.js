import React, { useState, useEffect } from 'react'
import { getBookingsByEmail } from '../../service/bookingService'
import { getUserByToken } from '../../service/userService'
import { getHotel } from '../../service/hotelService'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Modal, Button, Input, Rate, notification } from 'antd'
import './BookingHistory.scss'
import Cookies from 'js-cookie'
import { formatDateTime, getDateDifference } from '../../utils/timeFormat'
import pluralize from '../../utils/pluralize'
import { addReview } from '../../service/hotelService'

const BookingHistory = () => {
  const [bookings, setBookings] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentBooking, setCurrentBooking] = useState(null)
  const token = Cookies.get('token')

  // State for review form
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(5)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUserByToken(token)
        const user = userResponse
        console.log('user', user)

        if (user) {
          setUser(user)

          // Fetch bookings by email
          const bookings = await getBookingsByEmail(user.email)
          console.log('bookings', bookings)

          if (bookings.length > 0) {
            // Fetch hotel data for all bookings in parallel
            const hotelPromises = bookings.map(async (booking) => {
              const hotel = await getHotel(booking.hotelId)
              return { ...booking, hotel }
            })

            const bookingsWithHotels = await Promise.all(hotelPromises)
            setBookings(bookingsWithHotels)
          } else {
            setBookings(null)
          }
        } else {
          setBookings(null)
        }
      } catch (error) {
        console.error('Error fetching data', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token])

  console.log(bookings)

  const handleAddReview = () => {
    const createReview = async () => {
      try {
        const createReview = {
          reviewText,
          rating,
          bookingId: currentBooking.bookingId,
          hotelId: currentBooking.hotelId,
          userId: currentBooking.userId,
        }
        const review = await addReview(createReview)
        if (review.status === 200 && review.message.includes('successfully')) {
          notification.success({
            message: 'Review submitted',
            description: 'Your review has been submitted successfully.',
          })
        } else {
          notification.error({
            message: 'Review failed',
            description: 'An error occurred while submitting your review.',
          })
        }
      } catch (error) {
        notification.error({
          message: 'Review failed',
          description: 'An error occurred while submitting your review.',
        })
      }
    }
    createReview()
    setIsModalVisible(false)
  }

  const showModal = (booking) => {
    setCurrentBooking(booking)
    console.log('current booking', currentBooking)
    setIsModalVisible(true)
  }

  if (loading) {
    return (
      <div className="profile-page">
        <section className="my-trips">
          <h2>My trips</h2>
          <Skeleton count={3} height={150} style={{ margin: '30px' }} />
        </section>
      </div>
    )
  }

  return (
    <div className="profile-page">
      {/* My Trips Section */}
      <section className="my-trips">
        <h2>My trips</h2>
        {bookings && bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div className="trip-card" key={index}>
              <div className="trip-image" style={{ width: '40%', height: '100%' }}>
                <img
                  src={booking.hotel.images.imgSource}
                  alt={booking.hotel.HotelName}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="trip-details">
                <h3>{booking.hotel.HotelName}</h3>
                <div className="ratings">
                  <span>⭐ {booking.hotel.Rating}</span>
                </div>
                <p>
                  Estimated check in: {formatDateTime(booking.checkInDate)} <br />
                  Estimated check out: {formatDateTime(booking.checkOutDate)} <br />
                  {getDateDifference(booking.checkInDate, booking.checkOutDate)}{' '}
                  {pluralize(getDateDifference(booking.checkInDate, booking.checkOutDate), 'night', 'nights')}
                </p>

                {/* Conditional Button Rendering */}
                {booking?.review === 'no reviews' ? (
                  <Button type="primary" onClick={() => showModal(booking)}>
                    Add Review
                  </Button>
                ) : (
                  <Button type="primary" onClick={() => showModal(booking)}>
                    See Review
                  </Button>
                )}

                <Button type="primary" style={{ marginLeft: '10px' }}>
                  View Details
                </Button>
              </div>
              <div className="trip-price">
                <p>
                  {booking.originalPrice && <span className="strikethrough">${booking.originalPrice}</span>} <br />
                  <strong>${booking.totalAmount}</strong> <br />
                  Includes taxes and fees
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No trips available</p>
        )}
      </section>

      {/* Ant Design Modal for Review */}
      <Modal
        title={currentBooking?.review === 'no reviews' ? 'Add Your Review' : 'See Your Review'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          if (currentBooking?.review === 'no reviews') {
            handleAddReview()
          }
          setIsModalVisible(false)
        }}
        okText={currentBooking?.review === 'no reviews' ? 'Submit Review' : 'Close'}
      >
        {currentBooking?.review === 'no reviews' ? (
          <>
            <Input.TextArea
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review"
              required
            />
            <Rate value={rating} onChange={setRating} style={{ marginTop: '10px' }} allowHalf />
          </>
        ) : (
          <>
            <p>{currentBooking?.review?.reviewText}</p>
            <Rate disabled value={currentBooking?.review?.rating} />
          </>
        )}
      </Modal>
    </div>
  )
}

export default BookingHistory
