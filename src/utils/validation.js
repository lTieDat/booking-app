const checkInputBooking = (booking) => {
  const errors = {}

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

  if (!booking.location || typeof booking.location.country !== 'string' || booking.location.country.trim() === '') {
    errors.location = 'Please select a valid location'
  }

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

  const parsedStartDate = startDate ? new Date(startDate) : null
  if (!startDate || isNaN(parsedStartDate.getTime())) {
    errors.startDate = 'Please select a valid start date'
  }

  const parsedEndDate = endDate ? new Date(endDate) : null
  if (!endDate || isNaN(parsedEndDate.getTime())) {
    errors.endDate = 'Please select a valid end date'
  }

  if (parsedStartDate && parsedEndDate && parsedEndDate < parsedStartDate) {
    errors.endDate = 'End date must be on or after start date'
  }

  if (typeof adults !== 'number' || isNaN(adults) || adults < 1 || !Number.isInteger(adults)) {
    errors.adults = 'Please select at least one adult'
  }

  if (typeof rooms !== 'number' || isNaN(rooms) || rooms < 1 || !Number.isInteger(rooms)) {
    errors.rooms = 'Please select at least one room'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export { checkInputBooking }
