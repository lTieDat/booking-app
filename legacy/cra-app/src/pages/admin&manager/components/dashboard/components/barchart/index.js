// components/DashboardChart.js
import React, { useEffect, useState } from "react";
import { Typography, Card } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { getDashboardData } from "../../../../../../service/adminService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  const manager = JSON.parse(localStorage.getItem("manager"));
  const { token } = manager;
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData(token);
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [token]);

  if (!dashboardData) {
    return <Typography>Loading...</Typography>;
  }

  const {
    totalBookings,
    pendingBookings,
    paidBookings,
    confirmedBookings,
    totalRevenue,
  } = dashboardData;

  return (
    <Card className="dashboard-card">
      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-item">
          <Typography variant="h6">Total Bookings</Typography>
          <Typography variant="h4">{totalBookings}</Typography>
          <Typography>Bookings</Typography>
        </div>

        <div className="stat-item">
          <Typography variant="h6">Pending Bookings</Typography>
          <Typography variant="h4">{pendingBookings}</Typography>
          <Typography>Bookings</Typography>
        </div>

        <div className="stat-item">
          <Typography variant="h6">Paid Bookings</Typography>
          <Typography variant="h4">{paidBookings}</Typography>
          <Typography>Bookings</Typography>
        </div>

        <div className="stat-item">
          <Typography variant="h6">Confirmed Bookings</Typography>
          <Typography variant="h4">{confirmedBookings}</Typography>
          <Typography>Bookings</Typography>
        </div>
      </div>

      {/* Graph Section */}
      <div className="graph-section">
        <Bar
          data={{
            labels: ["Revenue"], // Single label since each dataset represents one hotel
            datasets: totalRevenue.map((hotel, index) => ({
              label: `Hotel ${hotel.hotelId}`, // Each hotel's hotelId as the label in the legend
              data: [hotel.totalRevenue], // Data array with the hotel's revenue
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ][index % 5], // Cycle through 5 colors
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ][index % 5],
              borderWidth: 1, // Border width for each bar
            })),
          }}
        />
      </div>
    </Card>
  );
};

export default DashboardChart;
