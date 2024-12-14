import React, { useState, useEffect } from "react";
import { Input, Form, Button, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const { TextArea } = Input;

const HotelOverview = ({ hotel, setHotel }) => {
  const [editableHotel, setEditableHotel] = useState({ ...hotel });
  const [newFacility, setNewFacility] = useState("");

  useEffect(() => {
    setEditableHotel({ ...hotel });
  }, [hotel]);

  // Update hotel field and notify parent
  const updateHotelField = (field, value) => {
    const updatedHotel = { ...editableHotel, [field]: value };
    setEditableHotel(updatedHotel);
    setHotel(updatedHotel); // Notify parent component
  };

  // Update address field and notify parent
  const updateAddressField = (field, value) => {
    const updatedAddress = {
      ...editableHotel.Address,
      [field]: value,
    };
    const updatedHotel = { ...editableHotel, Address: updatedAddress };
    setEditableHotel(updatedHotel);
    setHotel(updatedHotel); // Notify parent component
  };

  // Handle facility changes
  const handleFacilityChange = (action, facilityIndex = null) => {
    setEditableHotel((prevState) => {
      let updatedFacilities = [...prevState.RoomTags];
      if (action === "add" && newFacility.trim()) {
        updatedFacilities = [...updatedFacilities, newFacility.trim()];
        setNewFacility("");
      } else if (action === "delete" && facilityIndex !== null) {
        updatedFacilities.splice(facilityIndex, 1);
      }
      const updatedHotel = { ...prevState, RoomTags: updatedFacilities };
      setHotel(updatedHotel); // Notify parent component
      return updatedHotel;
    });
  };

  return (
    <div className="hotel-detail__overview">
      <div className="hotel-detail__container">
        <div className="hotel-detail__information">
          <Form layout="vertical">
            {/* Hotel Name */}
            <Form.Item label="Hotel Name">
              <Input
                name="HotelName"
                value={editableHotel.HotelName}
                onChange={(e) => updateHotelField("HotelName", e.target.value)}
              />
            </Form.Item>

            {/* Hotel Rating */}
            <div className="hotel-detail__rating">
              <p>
                Hotel rating: {editableHotel.Rating} <span>★</span>
              </p>
            </div>

            {/* Hotel Location */}
            <Form.Item label="Location">
              <div className="hotel-detail__location">
                <FontAwesomeIcon icon={faLocationDot} />
                {["StreetAddress", "District", "City", "Country"].map(
                  (field) => (
                    <Input
                      key={field}
                      name={field}
                      placeholder={field}
                      value={editableHotel.Address[field]}
                      onChange={(e) =>
                        updateAddressField(field, e.target.value)
                      }
                      style={{ marginBottom: "8px" }}
                    />
                  )
                )}
              </div>
            </Form.Item>

            {/* Hotel Description */}
            <Form.Item label="Overview">
              <TextArea
                name="Description"
                rows={4}
                value={editableHotel.Description}
                onChange={(e) =>
                  updateHotelField("Description", e.target.value)
                }
              />
            </Form.Item>

            {/* Top Facilities */}
            <Form.Item label="Top Facilities">
              <div className="hotel-detail__facilities">
                {editableHotel.RoomTags.map((facility, index) => (
                  <Tag
                    key={index}
                    closable
                    onClose={() => handleFacilityChange("delete", index)}
                  >
                    {facility}
                  </Tag>
                ))}
              </div>
              <Input
                value={newFacility}
                onChange={(e) => setNewFacility(e.target.value)}
                placeholder="Add a new facility"
                onPressEnter={() => handleFacilityChange("add")}
                style={{ marginBottom: "8px" }}
              />
              <Button
                onClick={() => handleFacilityChange("add")}
                type="primary"
              >
                Add Facility
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HotelOverview;
