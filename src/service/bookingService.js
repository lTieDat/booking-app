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
