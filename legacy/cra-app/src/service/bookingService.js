import { get, post } from "../utils";

export const createBooking = async (draftBooking) => {
  try {
    const createBooking = await post("/booking/create", draftBooking);
    console.log("createBooking", createBooking);
    return createBooking;
  } catch (error) {
    console.error("Create booking error:", error);
    throw error;
  }
};

export const getBooking = async (bookingId) => {
  try {
    const booking = await get(`/booking/${bookingId}`);
    return booking.data;
  } catch (error) {
    console.error("Get booking error:", error);
    throw error;
  }
};

export const getBookingsByEmail = async (email) => {
  try {
    const bookings = await get(`/booking/bookingHistory/${email}`);
    return bookings.data;
  } catch (error) {
    console.error("Get bookings by email error:", error);
    return [];
  }
};

export const getBookingsByHotelId = async (
  hotelId,
  filterStatus,
  searchQuery,
  sortBy,
  page,
  itemPerPage,
  month
) => {
  try {
    const bookings = await get(
      `/booking/bookingHistory/manager/${hotelId}?filterStatus=${filterStatus}&searchQuery=${searchQuery}&sortBy=${sortBy}&page=${page}&itemsPerPage=${itemPerPage}&month=${month}`
    );
    return bookings;
  } catch (error) {
    console.error("Get bookings by hotelId error:", error);
    return [];
  }
};
