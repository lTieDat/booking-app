import React from "react";

import "./ProfilePage.scss"; // Import styles

const BookingHistory = () => {
  return (
    <div className="profile-page">
      {/* My Trips Section */}
      <section className="my-trips">
        <h2>My trips</h2>
        <div className="trip-card">
          <div className="trip-image"></div>
          <div className="trip-details">
            <h3>Lakeside Motel Waterfront</h3>
            <div className="ratings">
              <span>⭐ 4.5 (1200 Reviews)</span>
            </div>
            <p>Non-refundable</p>
            <p>
              Check in: Sunday, March 18, 2022 <br />
              Check out: Tuesday, March 20, 2022 <br />2 night stay
            </p>
          </div>
          <div className="trip-price">
            <p>
              <span className="strikethrough">$1,320</span> <br />
              <strong>$1,200</strong> <br />
              Includes taxes and fees
            </p>
            <button className="trip-details-btn">View trip details</button>
          </div>
        </div>
      </section>

      {/* Based on your history Section */}
      <section className="history-section">
        <h2>Based on your history</h2>
        <div className="history-cards">
          <div className="history-card">
            <div className="history-image"></div>
            <p>Australia</p>
            <p>2248 properties</p>
          </div>
          <div className="history-card">
            <div className="history-image"></div>
            <p>Japan</p>
            <p>1276 properties</p>
          </div>
          <div className="history-card">
            <div className="history-image"></div>
            <p>New Zealand</p>
            <p>480 properties</p>
          </div>
          <div className="history-card">
            <div className="history-image"></div>
            <p>Greece</p>
            <p>320 properties</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingHistory;
