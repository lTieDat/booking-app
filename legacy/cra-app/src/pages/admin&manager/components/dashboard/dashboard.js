// Dashboard.js
import React from 'react'
import DashboardChart from './components/barchart'
import './style.scss'
import SelectProperties from './components/selectProperties'
import { Outlet, useParams } from 'react-router-dom'

const Dashboard = () => {
  const { hotelId } = useParams()

  return (
    <div className="dashboard">
      {!hotelId && (
        <>
          <div className="dashboard-bookingStat">
            <div className="dashboard-title">Booking Statistics</div>
            <DashboardChart />
          </div>
          <div className="dashboard-selectProperties">
            <div className="dashboard-title">Select Properties</div>
            <SelectProperties />
          </div>
        </>
      )}
      {hotelId && <Outlet />}
    </div>
  )
}

export default Dashboard
