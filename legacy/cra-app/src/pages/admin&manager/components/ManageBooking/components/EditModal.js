import React, { useState, useEffect } from 'react'
import { Modal, Button, Input, DatePicker, Checkbox } from 'antd'
import moment from 'moment'
import useEditBookingForm from '../../../../../components/CustomHook/useEditBookingForm'

const EditBookingModal = ({ isModalOpen, handleCancel, booking, handleSaveChanges }) => {
  const { watch, setValue, totalAmount, timeDiff, handleCheckOutDateChange, fields } = useEditBookingForm(booking)

  const formData = watch()

  const onSaveChanges = () => {
    handleSaveChanges(booking.bookingId, {
      ...formData,
      checkInDate: formData.checkInDate ? formData.checkInDate.toISOString() : null,
      checkOutDate: formData.checkOutDate ? formData.checkOutDate.toISOString() : null,
      totalAmount: totalAmount,
    })
    handleCancel()
  }

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
        <DatePicker showTime value={formData.checkInDate} disabled />
      </div>

      <div className="form-group">
        <label>Check-out Date</label>
        <DatePicker showTime value={formData.checkOutDate} onChange={handleCheckOutDateChange} />
      </div>

      {/* Later Checkout Fee and Time Difference */}
      {formData.checkOutDate && formData.checkOutDate.isAfter(moment()) && (
        <>
          <div className="form-group">
            <label>Time Difference: {timeDiff} hours</label>
          </div>
          <div className="form-group">
            <label>Later Checkout Fee</label>
            <Input type="number" {...fields.laterCheckOutFee} />
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
        <Checkbox {...fields.rentalCar}>Rental Car Service</Checkbox>
        {formData.rentalCar && <Input type="number" placeholder="Rental Car Price" {...fields.rentalCarPrice} />}
      </div>

      {/* Taxi Shuttle Option */}
      <div className="form-group">
        <Checkbox {...fields.taxiShuttle}>Taxi Shuttle Service</Checkbox>
        {formData.taxiShuttle && <Input type="number" placeholder="Taxi Shuttle Price" {...fields.taxiShuttlePrice} />}
      </div>

      {/* Airport Shuttle Option */}
      <div className="form-group">
        <Checkbox {...fields.airportShuttle}>Airport Shuttle Service</Checkbox>
        {formData.airportShuttle && (
          <Input type="number" placeholder="Airport Shuttle Price" {...fields.airportShuttlePrice} />
        )}
      </div>

      {/* Special Requirements */}
      <div className="form-group">
        <label>Special Requirements</label>
        <Input.TextArea rows={4} {...fields.specialRequest} />
      </div>
    </Modal>
  )
}

export default EditBookingModal
