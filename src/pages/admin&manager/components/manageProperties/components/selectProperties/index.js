import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getHotel } from '../../../../../../service/hotelService'
import './style.scss'

const SelectProperties = () => {
  const manager = JSON.parse(localStorage.getItem('manager'))
  const { hotel_id } = manager
  const [hotels, setHotels] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const hotelsPerPage = 5
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const hotelPromises = hotel_id.map(async (id) => {
          const hotel = await getHotel(id)
          return hotel
        })
        const hotelData = await Promise.all(hotelPromises)
        setHotels(hotelData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    fetchDashboardData()
  }, [])

  const indexOfLastHotel = currentPage * hotelsPerPage
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel)

  const nextPage = () => {
    if (currentPage < Math.ceil(hotels.length / hotelsPerPage)) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handleCardClick = (hotelId) => {
    navigate(`/admin/managePage/manage-properties/${hotelId}`)
  }

  return (
    <div className="select-properties">
      <div className={`hotel-list ${currentHotels.length < 5 ? 'align-left' : ''}`}>
        {currentHotels.map((hotel) => (
          <div key={hotel.id} className="hotel-item" onClick={() => handleCardClick(hotel.HotelId)}>
            <div className="hotel-card">
              <img src={hotel.images.imgSource} alt={hotel.name} className="hotel-image" />
              <span className="hotel-name">{hotel.HotelName}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`${currentPage} / ${Math.ceil(hotels.length / hotelsPerPage)}`}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(hotels.length / hotelsPerPage)}>
          Next
        </button>
      </div>
    </div>
  )
}

export default SelectProperties
