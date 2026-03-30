import React, { useState, useEffect } from "react";
import HotelOverview from "./components/HotelOverview";
import { getHotel } from "../../../../../../service/hotelService";
import { useParams } from "react-router-dom";
import { Modal, Button, Upload } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import RoomList from "./components/ListRoom";
import axios from "axios";
import "./style.scss";

const HotelDetail = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [rooms, setRooms] = useState([]);

  // Fetch hotel data on component mount
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const fetchedHotel = await getHotel(hotelId);
        setHotel(fetchedHotel);
        setRooms(fetchedHotel.Rooms);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };
    fetchHotel();
  }, [hotelId]);

  // Handle image selection and preview
  const handleImageChange = (info) => {
    if (info.file) {
      const file = info.file;
      setSelectedImage(file); // Update state with the selected file

      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle saving image into FormData
  const handleSaveImageIntoFormData = () => {
    // Close modal after saving image data
    closeModal();
  };

  const handleSaveAllInfo = async () => {
    const formData = new FormData();
    // Append the hotel data
    formData.append("hotelData", JSON.stringify(hotel));

    // If there's a selected image, append it
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    // console.log("Form Data:", formData.get("hotelData"));

    try {
      const response = await axios.post(
        `http://localhost:3002/api/v1/hotel/updateInfo?hotelID=${hotelId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Hotel info updated:", response.data);
    } catch (error) {
      console.error("Error updating hotel info:", error);
    }
  };
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hotel-detail">
      <div className="hotel-detail__header">
        <HotelOverview hotel={hotel} setHotel={setHotel} />
        <div className="hotel-detail__image-area">
          <div className="image-container">
            <img
              src={hotel.images.imgSource}
              alt="Hotel Main"
              className="hotel-detail__image"
            />
            <Button
              className="edit-button"
              icon={<EditOutlined />}
              onClick={showModal}
            >
              Edit Image
            </Button>
          </div>
        </div>
      </div>

      {/* rooms list */}
      <RoomList room={rooms} setRooms={setRooms} />
      {/* end rooms list */}
      {/* Modal for image upload with preview */}
      <Modal
        title="Upload New Image"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSaveImageIntoFormData}
          >
            Save
          </Button>,
        ]}
      >
        <Upload
          beforeUpload={() => false} // Prevent automatic upload
          onChange={handleImageChange}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>

        {imagePreview && (
          <div className="image-preview">
            <img
              src={imagePreview}
              alt="Selected preview"
              style={{ width: "100%" }}
            />
          </div>
        )}
      </Modal>

      {/* Main Save Button for saving all information including the image */}
      <Button type="primary" onClick={handleSaveAllInfo}>
        Save All Information
      </Button>
    </div>
  );
};

export default HotelDetail;
