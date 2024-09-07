const checkInputBooking = (booking) => {
  const { country } = booking.location;
  const { startDate, endDate, adults, rooms } = booking.booking;
  const errors = {};
  if (!country) {
    errors.location = "Please select a valid location";
  }
  if (!startDate || !endDate) {
    errors.date = "Please select a valid date range";
  }
  if (adults < 1) {
    errors.adults = "Please select at least one adult";
  }
  if (rooms < 1) {
    errors.rooms = "Please select at least one room";
  }
  return errors;
};

export { checkInputBooking };
