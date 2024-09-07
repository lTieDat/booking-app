import React, { useState } from "react";
import { Button, InputNumber, Space, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChild } from "@fortawesome/free-solid-svg-icons";

const RoomPicker = ({ guestInfo, setGuestInfo }) => {
  const [open, setOpen] = useState(false);

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const pluralize = (count, singular, plural) => {
    return count > 1 ? plural : singular;
  };

  const showModal = () => {
    setOpen(true);
  };

  const updateGuestInfo = (type, value) => {
    setGuestInfo({ ...guestInfo, [type]: value });
  };

  return (
    <div>
      <Space direction="vertical">
        <Button onClick={showModal}>
          <FontAwesomeIcon icon={faChild} />
          {guestInfo.adults} {pluralize(guestInfo.adults, "Adult", "Adults")} •{" "}
          {guestInfo.children}{" "}
          {pluralize(guestInfo.children, "Child", "Children")} •{" "}
          {guestInfo.rooms} {pluralize(guestInfo.rooms, "Room", "Rooms")}
        </Button>
      </Space>

      <Modal
        title="Chọn số lượng"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Done
          </Button>,
        ]}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{pluralize(guestInfo.adults, "Adult", "Adults")}</span>
          <InputNumber
            min={1}
            max={10}
            value={guestInfo.adults}
            onChange={(value) => updateGuestInfo("adults", value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <span>{pluralize(guestInfo.children, "Child", "Children")}</span>
          <InputNumber
            min={0}
            max={10}
            value={guestInfo.children}
            onChange={(value) => updateGuestInfo("children", value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <span>{pluralize(guestInfo.rooms, "Room", "Rooms")}</span>
          <InputNumber
            min={1}
            max={10}
            value={guestInfo.rooms}
            onChange={(value) => updateGuestInfo("rooms", value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        ></div>
      </Modal>
    </div>
  );
};

export default RoomPicker;
