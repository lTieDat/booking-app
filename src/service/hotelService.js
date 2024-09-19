import { get } from "../utils";

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
    return room.data;
  } catch (error) {
    console.error("Get room error:", error);
    throw error;
  }
};
