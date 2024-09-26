import React, { useEffect, useState } from "react";
import { getUserByToken, updateProfile } from "../../service/userService";
import Cookies from "js-cookie";
import { Button, Modal, Input, Form, notification } from "antd";
import "./PersonalDetails.css";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Personal details");
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState(""); // Track the current field being edited
  const [editData, setEditData] = useState({
    fullName: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    userName: "",
    email: "",
  });
  const [confirmLoading, setConfirmLoading] = useState(false);

  const navigate = useNavigate();
  const [dataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const user = await getUserByToken(token);
          if (user.status === 200) {
            setUserData(user.data);
            setEditData(user.data); // Set editData with the initial user data
          } else {
            console.error("Error fetching user data", user);
          }
        } else {
          console.error("No token found");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, [dataUpdated]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleEditClick = (field) => {
    setCurrentField(field);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleSaveAll = async () => {
    try {
      setConfirmLoading(true);
      const token = Cookies.get("token");
      if (token) {
        const response = await updateProfile(token, editData);
        if (response.status === 200) {
          notification.success({
            message: "Profile updated successfully",
          });
          setDataUpdated(!dataUpdated); // Toggle dataUpdated to trigger refetch
          setIsModalOpen(false); // Close modal after saving
        } else {
          notification.error({
            message: "Error updating profile",
            description: response.message,
          });
        }
      } else {
        console.error("No token found");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error updating profile", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="personal-details-container">
      <aside className="sidebar">
        <ul>
          {[
            "Personal details",
            "Preferences",
            "Security",
            "Payment details",
            "Privacy",
            "Email notifications",
            "Other travellers",
          ].map((tab) => (
            <li
              key={tab}
              className={`sidebar-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </aside>

      <section className="details-section">
        <h2>{activeTab}</h2>
        <p>Update your information and find out how it's used.</p>
        <div className="details-list">
          {activeTab === "Personal details" && userData && (
            <>
              <DetailRow
                label="Name"
                value={editData.fullName}
                onEdit={() => handleEditClick("fullName")}
              />
              <DetailRow
                label="Display name"
                value={editData.userName}
                onEdit={() => handleEditClick("userName")}
              />
              <DetailRow
                label="Email address"
                value={editData.email}
                onEdit={() => handleEditClick("email")}
              />
              <DetailRow
                label="Phone number"
                value={editData.phone}
                onEdit={() => handleEditClick("phone")}
              />
              <DetailRow
                label="Date of birth"
                value={editData.dateOfBirth}
                onEdit={() => handleEditClick("dateOfBirth")}
              />
              <DetailRow
                label="Address"
                value={editData.address}
                onEdit={() => handleEditClick("address")}
              />
            </>
          )}
        </div>
        <div className="save-all-container">
          <Button
            type="primary"
            onClick={handleSaveAll}
            loading={confirmLoading}
          >
            Save All
          </Button>
        </div>
      </section>

      {/* Modal for editing specific fields */}
      <Modal
        title={`Edit ${currentField}`}
        open={isModalOpen}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
      >
        <Form>
          {currentField === "fullName" && (
            <Form.Item label="Full Name">
              <Input
                name="fullName"
                value={editData.fullName}
                onChange={handleInputChange}
              />
            </Form.Item>
          )}
          {currentField === "userName" && (
            <Form.Item label="User Name">
              <Input
                name="userName"
                value={editData.userName}
                onChange={handleInputChange}
              />
            </Form.Item>
          )}
          {currentField === "email" && (
            <Form.Item label="Email">
              <Input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
              />
            </Form.Item>
          )}
          {currentField === "phone" && (
            <Form.Item label="Phone">
              <Input
                name="phone"
                value={editData.phone}
                onChange={handleInputChange}
              />
            </Form.Item>
          )}
          {currentField === "dateOfBirth" && (
            <Form.Item label="Date of Birth">
              <Input
                type="date"
                name="dateOfBirth"
                value={editData.dateOfBirth}
                onChange={handleInputChange}
              />
            </Form.Item>
          )}
          {currentField === "address" && (
            <Form.Item label="Address">
              <Input
                name="address"
                value={editData.address}
                onChange={handleInputChange}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

const DetailRow = ({ label, value, verified, onEdit }) => (
  <div className="detail-row">
    <div className="detail-label">{label}</div>
    <div className="detail-value">{value || "N/A"}</div>
    <div className="detail-edit">
      <Button className="confirm-btn" type="link" onClick={onEdit}>
        Edit
      </Button>
    </div>
  </div>
);

export default ProfilePage;
