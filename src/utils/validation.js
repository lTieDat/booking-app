const checkInputBooking = (booking) => {
  const errors = {}

  // testcase: DatLT - InputValidation_EmptyInput_Fail (VB11.6)
  if (!booking) {
    return {
      isValid: false,
      errors: {
        location: 'Please select a valid location',
        startDate: 'Please select a valid start date',
        endDate: 'Please select a valid end date',
        adults: 'Please select at least one adult',
        rooms: 'Please select at least one room',
      },
    }
  }

  // testcase: DatLT - InputValidation_MissingCountry_Fail (VB11.2)
  // testcase: DatLT - InputValidation_NonStringCountry_Fail (VB11.7)
  // testcase: DatLT - InputValidation_MissingLocation_Fail (VB11.10)
  // testcase: DatLT - InputValidation_WhitespaceCountry_Fail (VB11.18)
  if (!booking.location || typeof booking.location.country !== 'string' || booking.location.country.trim() === '') {
    errors.location = 'Please select a valid location'
  }

  // testcase: DatLT - InputValidation_MissingBooking_Fail (VB11.12)
  // testcase: DatLT - InputValidation_MissingDateRange_Fail (VB11.3)
  if (!booking.booking) {
    errors.startDate = 'Please select a valid start date'
    errors.endDate = 'Please select a valid end date'
    errors.adults = 'Please select at least one adult'
    errors.rooms = 'Please select at least one room'
    return {
      isValid: false,
      errors,
    }
  }

  const { startDate, endDate, adults, rooms } = booking.booking

  // testcase: DatLT - InputValidation_MissingCheckin_Fail (VB11.11)
  // testcase: DatLT - InputValidation_InvalidDateFormat_Fail (VB11.17)
  const parsedStartDate = startDate ? new Date(startDate) : null
  if (!startDate || isNaN(parsedStartDate.getTime())) {
    errors.startDate = 'Please select a valid start date'
  }

  // testcase: DatLT - InputValidation_MissingCheckout_Fail (VB11.13)
  const parsedEndDate = endDate ? new Date(endDate) : null
  if (!endDate || isNaN(parsedEndDate.getTime())) {
    errors.endDate = 'Please select a valid end date'
  }

  // testcase: DatLT - InputValidation_InvalidDateRange_Fail (VB11.14)
  if (parsedStartDate && parsedEndDate && parsedEndDate < parsedStartDate) {
    errors.endDate = 'End date must be on or after start date'
  }

  // testcase: DatLT - InputValidation_ZeroAdults_Fail (VB11.4)
  // testcase: DatLT - InputValidation_NonNumericAdults_Fail (VB11.8)
  // testcase: DatLT - InputValidation_NonIntegerAdults_Fail (VB11.15)
  if (typeof adults !== 'number' || isNaN(adults) || adults < 1 || !Number.isInteger(adults)) {
    errors.adults = 'Please select at least one adult'
  }

  // testcase: DatLT - InputValidation_ZeroRoom_Fail (VB11.5)
  // testcase: DatLT - InputValidation_NonNumericRooms_Fail (VB11.9)
  // testcase: DatLT - InputValidation_NonIntegerRooms_Fail (VB11.16)
  if (typeof rooms !== 'number' || isNaN(rooms) || rooms < 1 || !Number.isInteger(rooms)) {
    errors.rooms = 'Please select at least one room'
  }

  // testcase: DatLT - InputValidation_Success_Success (VB11.1)
  // testcase: DatLT - InputValidation_SameDayBooking_Success (VB11.19)
  // testcase: DatLT - InputValidation_MultipleInvalid_Fail (VB11.20)
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export { checkInputBooking }
