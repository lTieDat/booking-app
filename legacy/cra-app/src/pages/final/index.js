import React from "react";
import { useNavigate } from "react-router-dom";
import { Steps } from "antd";
import "./style.scss";

const FinalStep = () => {
  const navigate = useNavigate();

  // Function to navigate to the homepage
  const handleDoneClick = () => {
    navigate("/"); // Navigates to the homepage
  };

  return (
    <section className="final">
      <Steps current={3} className="final__steps">
        <Steps.Step title="Choose Room" />
        <Steps.Step title="Checkout" />
        <Steps.Step title="Finish" />
      </Steps>
      <div className="booking-page">
        <div className="booking-content">
          <div className="booking-header">
            <h2>Booking Successful</h2>
          </div>
          <div className="booking-body">
            <p>
              Congratulations, your reservation has been made. <br />
              You will be notified 2 days prior to the date.
            </p>
          </div>
          <div className="booking-footer">
            <button className="btn-done" onClick={handleDoneClick}>
              Done
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalStep;
