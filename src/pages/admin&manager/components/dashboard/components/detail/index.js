import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import maplibregl, { Popup } from 'maplibre-gl'
import { getHotelStatistics } from '../../../../../../service/hotelService'
import { Bar } from 'react-chartjs-2'
import 'maplibre-gl/dist/maplibre-gl.css'
import './style.scss'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const HotelDetails = () => {
  const { hotelId } = useParams()
  const [hotelStats, setHotelStats] = useState(null)
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)

  const getCoordinatesByCountryName = async (countryName) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?country=${countryName}&format=json`)
      const data = await response.json()
      if (data && data.length > 0) {
        const { lon, lat } = data[0]
        return [parseFloat(lon), parseFloat(lat)]
      } else {
        console.error(`No coordinates found for country: ${countryName}`)
        return null
      }
    } catch (error) {
      console.error(`Error fetching coordinates for ${countryName}:`, error)
      return null
    }
  }

  useEffect(() => {
    const fetchHotelStats = async () => {
      try {
        const result = await getHotelStatistics(hotelId)
        setHotelStats(result.data)
      } catch (error) {
        console.error('Error fetching hotel statistics:', error)
      }
    }

    fetchHotelStats()
  }, [hotelId])
  // Initialize the map when hotelStats is available
  useEffect(() => {
    if (!hotelStats || mapRef.current) return

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0, 20],
      zoom: 0.8,
    })

    const { customerCountByCountry } = hotelStats

    const addCountryMarkers = async () => {
      const entries = Object.entries(customerCountByCountry)
      const promises = entries.map(async ([country, count]) => {
        const coordinates = await getCoordinatesByCountryName(country)
        if (coordinates) {
          const marker = new maplibregl.Marker().setLngLat(coordinates).addTo(mapRef.current)
          const popupText = `${country}: ${count} customers`
          const popup = new Popup({ offset: 25 }).setText(popupText)
          popup.addTo(mapRef.current)
          marker.setPopup(popup)
        }
      })
      await Promise.all(promises)
    }

    addCountryMarkers()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [hotelStats])

  if (!hotelStats) {
    return <p>Loading hotel statistics...</p>
  }

  // Prepare data for the bar chart
  const customerCountByCountry = hotelStats.customerCountByCountry || {}
  const barChartData = {
    labels: Object.keys(customerCountByCountry), // Country names
    datasets: [
      {
        label: 'Number of Customers',
        data: Object.values(customerCountByCountry), // Customer counts
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Number of Customers by Country',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="hotel-details">
      <h2>{hotelStats.hotel.Name} Overview</h2>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <h3>Total Bookings</h3>
          <p>{hotelStats.totalBookings}</p>
        </div>

        <div className="card">
          <h3>Total Customers</h3>
          <p>{hotelStats.totalOccupancy}</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p>${hotelStats.totalRevenue}</p>
        </div>
        <div className="card">
          <h3>Average Stay Duration</h3>
          <p>{hotelStats.averageStayDuration.toFixed(2)} days</p>
        </div>
      </div>

      {/* Bar Chart and Map in the Same Row */}
      <div className="chart-map-container">
        <div className="bar-chart-container">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        <div className="map-container" ref={mapContainerRef}></div>
      </div>
    </div>
  )
}

export default HotelDetails
