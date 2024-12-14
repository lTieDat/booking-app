import React, { useState, useEffect } from "react";
import { Modal, Button, Input, DatePicker, Checkbox } from "antd";
import moment from "moment";

const EditBookingModal = ({
  isModalOpen,
  handleCancel,
  booking,
  handleSaveChanges,
}) => {
  const [formData, setFormData] = useState({
    checkInDate: booking.checkInDate ? moment(booking.checkInDate) : null,
    checkOutDate: booking.checkOutDate ? moment(booking.checkOutDate) : null,
    totalAmount: booking.totalAmount || 0,
    rentalCar: booking.rentalCar || false,
    rentalCarPrice: booking.rentalCarPrice || 0,
    taxiShuttle: booking.taxiShuttle || false,
    taxiShuttlePrice: booking.taxiShuttlePrice || 0,
    specialRequest: booking.specialRequest || "",
    laterCheckOutFee: 0, // Additional fee for later checkout
  });

  const [totalAmount, setTotalAmount] = useState(formData.totalAmount);
  const [timeDiff, setTimeDiff] = useState(0); // Time difference in hours

  // Handle form field changes
  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle total amount update when later checkout fee changes
  useEffect(() => {
    const updatedTotalAmount =
      parseFloat(formData.totalAmount) +
      parseFloat(formData.laterCheckOutFee || 0) +
      parseFloat(formData.rentalCarPrice || 0) +
      parseFloat(formData.taxiShuttlePrice || 0);
    setTotalAmount(updatedTotalAmount);
  }, [
    formData.laterCheckOutFee,
    formData.totalAmount,
    formData.rentalCarPrice,
    formData.taxiShuttlePrice,
  ]);

  // Handle check-out date change
  const handleCheckOutDateChange = (date) => {
    handleFieldChange("checkOutDate", date);

    // Compare new checkout date with the current date
    if (date && date.isAfter(moment())) {
      const diffHours = moment.duration(date.diff(moment())).asHours();
      setTimeDiff(diffHours.toFixed(2)); // Set time difference
      handleFieldChange("laterCheckOutFee", 0); // Reset later checkout fee input
    } else {
      setTimeDiff(0);
      handleFieldChange("laterCheckOutFee", 0);
    }
  };

  // Handle save changes with ISO 8601 format
  const onSaveChanges = () => {
    handleSaveChanges(booking.bookingId, {
      ...formData,
      checkInDate: formData.checkInDate
        ? formData.checkInDate.toISOString()
        : null,
      checkOutDate: formData.checkOutDate
        ? formData.checkOutDate.toISOString()
        : null,
      totalAmount: totalAmount, // Include updated total amount with later checkout fee
    });
    handleCancel();
  };

  return (
    <Modal
      title="Edit Booking"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={onSaveChanges}>
          Save Changes
        </Button>,
      ]}
    >
      {/* Check-in and Check-out Date */}
      <div className="form-group">
        <label>Check-in Date</label>
        <DatePicker
          showTime
          value={formData.checkInDate}
          disabled
          onChange={(date) => handleFieldChange("checkInDate", date)}
        />
      </div>

      <div className="form-group">
        <label>Check-out Date</label>
        <DatePicker
          showTime
          value={formData.checkOutDate}
          onChange={handleCheckOutDateChange}
        />
      </div>

      {/* Later Checkout Fee and Time Difference */}
      {formData.checkOutDate && formData.checkOutDate.isAfter(moment()) && (
        <>
          <div className="form-group">
            <label>Time Difference: {timeDiff} hours</label>
          </div>
          <div className="form-group">
            <label>Later Checkout Fee</label>
            <Input
              type="number"
              value={formData.laterCheckOutFee}
              onChange={(e) =>
                handleFieldChange("laterCheckOutFee", e.target.value)
              }
            />
          </div>
        </>
      )}

      {/* Total Amount */}
      <div className="form-group">
        <label>Total Amount (including later checkout fee)</label>
        <Input type="number" value={totalAmount} disabled />
      </div>

      {/* Rental Car Option */}
      <div className="form-group">
        <Checkbox
          checked={formData.rentalCar}
          onChange={(e) => handleFieldChange("rentalCar", e.target.checked)}
        >
          Rental Car Service
        </Checkbox>
        {formData.rentalCar && (
          <Input
            type="number"
            placeholder="Rental Car Price"
            value={formData.rentalCarPrice}
            onChange={(e) =>
              handleFieldChange("rentalCarPrice", e.target.value)
            }
          />
        )}
      </div>

      {/* Taxi Shuttle Option */}
      <div className="form-group">
        <Checkbox
          checked={formData.taxiShuttle}
          onChange={(e) => handleFieldChange("taxiShuttle", e.target.checked)}
        >
          Taxi Shuttle Service
        </Checkbox>
        {formData.taxiShuttle && (
          <Input
            type="number"
            placeholder="Taxi Shuttle Price"
            value={formData.taxiShuttlePrice}
            onChange={(e) =>
              handleFieldChange("taxiShuttlePrice", e.target.value)
            }
          />
        )}
      </div>

      {/* Special Requirements */}
      <div className="form-group">
        <label>Special Requirements</label>
        <Input.TextArea
          rows={4}
          value={formData.specialRequirements}
          onChange={(e) =>
            handleFieldChange("specialRequirements", e.target.value)
          }
        />
      </div>
    </Modal>
  );
};

export default EditBookingModal;
