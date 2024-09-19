import React, { useState } from "react";
import RoomCard from "./RoomCard";

const RoomSlider = ({ rooms, setSelectedRooms }) => {
  const [selectedQuantities, setSelectedQuantities] = useState({});

  const roomsPerPage = 3;
  const totalRooms = rooms.length;
  const maxIndex = Math.floor(totalRooms / roomsPerPage);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  const displayedRooms = rooms.slice(
    currentRoomIndex * roomsPerPage,
    currentRoomIndex * roomsPerPage + roomsPerPage
  );

  // Handle the room selection change
  const handleQuantityChange = (roomId, quantity) => {
    const updatedQuantities = { ...selectedQuantities, [roomId]: quantity };
    setSelectedQuantities(updatedQuantities);

    // Create an array of selected rooms with quantities
    const selectedRooms = Object.entries(updatedQuantities)
      .filter(([_, qty]) => qty > 0) // Keep rooms with quantity > 0
      .map(([id, qty]) => ({ roomId: id, quantity: qty }));

    setSelectedRooms(selectedRooms); // Pass up the selected rooms
  };

  const handleDotClick = (index) => {
    setCurrentRoomIndex(index);
  };

  return (
    <section className="hotel-detail__rooms-slider">
      <div className="hotel-detail__rooms-list">
        {displayedRooms.map((room) => (
          <RoomCard
            key={room.RoomId}
            room={room}
            handleQuantityChange={handleQuantityChange}
          />
        ))}
      </div>

      <div className="dot-navigation">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentRoomIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default RoomSlider;
