import { get, post } from "../utils";

export const getHotel = async (hotelId) => {
  try {
    const hotel = await get(`/hotel/${hotelId}`);
    return hotel.data;
  } catch (error) {
    console.error("Get hotel error:", error);
    throw error;
  }
};

export const getRoom = async (roomId) => {
  try {
    const room = await get(`/hotel/rooms/${roomId}`);
    console.log(room);
    return room.data;
  } catch (error) {
    console.error("Get room error:", error);
    throw error;
  }
};

export const addReview = async (review) => {
  try {
    const { hotelId, userId, reviewText, rating, bookingId } = review;
    const reviewAdd = await post(`/hotel/${hotelId}/review/${userId}`, {
      reviewText,
      rating,
      bookingId,
    });
    return reviewAdd;
  } catch (error) {
    console.error("Add review error:", error);
    throw error;
  }
};

export const getHotelStatistics = async (hotelId) => {
  try {
    const stats = await get(`/hotel/${hotelId}/statistics`);
    return stats;
  } catch (error) {
    console.error("Get hotel statistics error:", error);
    throw error;
  }
};
