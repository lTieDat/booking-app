import React from "react";
import { InputNumber } from "antd";

const RoomCard = ({ room, handleQuantityChange }) => {
  return (
    <div className="hotel-detail__room-card" key={room.RoomId}>
      <div className="room-detail__img">
        <img src={room.Images.url} alt={room.Images.url} />
      </div>
      <div className="room-detail__desc">
        <div className="room-detail__information">
          <h3>{room.RoomType}</h3>
          <p>{room.Description}</p>
          <p>{room.BaseRate}</p>
        </div>
        <div className="room-detail__service">
          {room.RoomTags.map((tag, index) => (
            <div key={index} className="room-detail__serviceBox">
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="room-detail__btn">
        <div className="room-detail__quantity">
          <label>Quantity:</label>
          <InputNumber
            min={0}
            max={room.NumberAvailable}
            defaultValue={0}
            onChange={(value) => handleQuantityChange(room.RoomId, value)}
            className="room-detail__input"
          />
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
