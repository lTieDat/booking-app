import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect } from 'react'
import moment from 'moment'

/**
 * Custom hook for Edit Booking form management
 * Handles complex booking editing logic with date calculations
 */
export const useEditBookingForm = (booking = {}) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      checkInDate: booking.checkInDate ? moment(booking.checkInDate) : null,
      checkOutDate: booking.checkOutDate ? moment(booking.checkOutDate) : null,
      totalAmount: booking.totalAmount || 0,
      rentalCar: booking.rentalCar || false,
      rentalCarPrice: booking.rentalCarPrice || 0,
      taxiShuttle: booking.taxiShuttle || false,
      taxiShuttlePrice: booking.taxiShuttlePrice || 0,
      airportShuttle: booking.airportShuttle || false,
      airportShuttlePrice: booking.airportShuttlePrice || 0,
      specialRequest: booking.specialRequest || '',
      laterCheckOutFee: 0,
    },
  })

  const [totalAmount, setTotalAmount] = useState(booking.totalAmount || 0)
  const [timeDiff, setTimeDiff] = useState(0)

  // Watch all relevant fields for total calculation
  const formDataWatch = watch()
  const { rentalCarPrice, taxiShuttlePrice, airportShuttlePrice, laterCheckOutFee } = formDataWatch

  // Calculate total amount when any price changes
  useEffect(() => {
    const updatedTotalAmount =
      parseFloat(booking.totalAmount || 0) +
      parseFloat(laterCheckOutFee || 0) +
      parseFloat(rentalCarPrice || 0) +
      parseFloat(taxiShuttlePrice || 0) +
      parseFloat(airportShuttlePrice || 0)
    setTotalAmount(updatedTotalAmount)
  }, [laterCheckOutFee, rentalCarPrice, taxiShuttlePrice, airportShuttlePrice, booking.totalAmount])

  // Handle checkout date changes with time difference calculation
  const handleCheckOutDateChange = (date) => {
    setValue('checkOutDate', date)
    if (date && date.isAfter(moment())) {
      const diffHours = moment.duration(date.diff(moment())).asHours()
      setTimeDiff(diffHours.toFixed(2))
      setValue('laterCheckOutFee', 0) // Reset fee when date changes
    } else {
      setTimeDiff(0)
      setValue('laterCheckOutFee', 0)
    }
  }

  // Register form fields
  const checkInDateField = register('checkInDate')
  const checkOutDateField = register('checkOutDate')
  const totalAmountField = register('totalAmount', {
    validate: {
      isNumber: (value) => !isNaN(value) || 'Total amount must be a number',
      isPositive: (value) => parseFloat(value) >= 0 || 'Total amount cannot be negative',
    },
  })

  const rentalCarField = register('rentalCar')
  const rentalCarPriceField = register('rentalCarPrice', {
    validate: {
      isNumber: (value) => !isNaN(value) || 'Rental car price must be a number',
      isPositive: (value) => parseFloat(value) >= 0 || 'Price cannot be negative',
    },
  })

  const taxiShuttleField = register('taxiShuttle')
  const taxiShuttlePriceField = register('taxiShuttlePrice', {
    validate: {
      isNumber: (value) => !isNaN(value) || 'Taxi shuttle price must be a number',
      isPositive: (value) => parseFloat(value) >= 0 || 'Price cannot be negative',
    },
  })

  const airportShuttleField = register('airportShuttle')
  const airportShuttlePriceField = register('airportShuttlePrice', {
    validate: {
      isNumber: (value) => !isNaN(value) || 'Airport shuttle price must be a number',
      isPositive: (value) => parseFloat(value) >= 0 || 'Price cannot be negative',
    },
  })

  const specialRequestField = register('specialRequest', {
    validate: {
      maxLength: (value) => !value || value.length <= 500 || 'Special request must not exceed 500 characters',
    },
  })

  const laterCheckOutFeeField = register('laterCheckOutFee', {
    validate: {
      isNumber: (value) => !isNaN(value) || 'Later checkout fee must be a number',
      isPositive: (value) => parseFloat(value) >= 0 || 'Fee cannot be negative',
    },
  })

  return {
    register,
    handleSubmit,
    control,
    watch,
    errors,
    setValue,
    totalAmount,
    timeDiff,
    handleCheckOutDateChange,
    fields: {
      checkInDate: checkInDateField,
      checkOutDate: checkOutDateField,
      totalAmount: totalAmountField,
      rentalCar: rentalCarField,
      rentalCarPrice: rentalCarPriceField,
      taxiShuttle: taxiShuttleField,
      taxiShuttlePrice: taxiShuttlePriceField,
      airportShuttle: airportShuttleField,
      airportShuttlePrice: airportShuttlePriceField,
      specialRequest: specialRequestField,
      laterCheckOutFee: laterCheckOutFeeField,
    },
  }
}

export default useEditBookingForm
