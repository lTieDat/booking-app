import React, { useState, useEffect } from 'react'
import { getBookingsByHotelId } from '../../../../service/bookingService'
import { formatDateTime } from '../../../../utils/timeFormat'
import { Button, Modal } from 'antd'
import EditBookingModal from './components/EditModal'
import './style.scss'

const ManageBooking = () => {
  const managerData = JSON.parse(localStorage.getItem('manager'))
  const hotelIds = managerData?.hotel_id || []

  const [bookings, setBookings] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filterStatus, setFilterStatus] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const itemsPerPage = 6

  // Fetch bookings for all hotels
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const allBookings = []
        let totalPages = 1

        for (let hotelId of hotelIds) {
          const { bookings, totalPages: hotelTotalPages } = await getBookingsByHotelId(
            hotelId,
            filterStatus,
            searchQuery,
            sortBy,
            currentPage,
            itemsPerPage
          )
          allBookings.push(...bookings)
          totalPages = Math.max(totalPages, hotelTotalPages)
        }

        setBookings(allBookings)
        setTotalPages(totalPages)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    }

    if (hotelIds.length) fetchBookings()
  }, [filterStatus, searchQuery, sortBy])

  // Helper function to cycle the booking status
  const getNextStatus = (currentStatus) => {
    const statusOrder = ['confirmed', 'pending', 'cancelled', 'paid']
    const nextStatusIndex = (statusOrder.indexOf(currentStatus) + 1) % statusOrder.length
    return statusOrder[nextStatusIndex]
  }

  // Update booking status
  const handleStatusChange = (bookingId) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking._id === bookingId ? { ...booking, status: getNextStatus(booking.status) } : booking
      )
    )
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const showModal = (booking) => {
    setSelectedBooking(booking)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setSelectedBooking(null)
  }

  const handleSaveChanges = (bookingId, updatedData) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) => (booking.bookingId === bookingId ? { ...booking, ...updatedData } : booking))
    )
    setIsModalOpen(false)
  }

  return (
    <div className="container">
      {/* Filter, Search, Sort */}
      <div className="filter-search-sort">
        <div className="filter">
          <label htmlFor="status">Filter by Status:</label>
          <select id="status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="searchName">
          <label htmlFor="searchName">Search by Customer:</label>
          <input
            id="searchName"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="sort">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Select</option>
            <option value="totalAmount">Total Amount</option>
            <option value="numberOfGuests">Number of Guests</option>
          </select>
        </div>
      </div>

      {/* Booking Table */}
      <table className="booking-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Hotel/Property</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Guests</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking._id}>
              <td>{index + 1}</td>
              <td>{booking.customerName}</td>
              <td>{booking.hotelName}</td>
              <td>${booking.totalAmount}</td>
              <td>
                <div onClick={() => handleStatusChange(booking._id)}>
                  <span className={`status ${booking.status}`}>{booking.status}</span>
                </div>
              </td>
              <td>{parseInt(booking.numberOfAdults) + parseInt(booking.numberOfChildren)}</td>
              <td>{formatDateTime(booking.checkInDate)}</td>
              <td>{formatDateTime(booking.checkOutDate)}</td>
              <td>
                <Button type="primary" onClick={() => showModal(booking)}>
                  Edit
                </Button>
                <Button type="primary" danger>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal for Editing Booking */}
      {selectedBooking && (
        <EditBookingModal
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          booking={selectedBooking}
          handleSaveChanges={handleSaveChanges}
        />
      )}
    </div>
  )
}

export default ManageBooking
