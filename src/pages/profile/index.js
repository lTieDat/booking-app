import React, { useEffect, useState } from 'react'
import { getUserByToken, updateProfile } from '../../service/userService'
import Cookies from 'js-cookie'
import { Button, Modal, Input, Form, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { formatDateTimeExceptHour } from '../../utils/timeFormat'

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Personal details')
  const [userData, setUserData] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentField, setCurrentField] = useState('')
  const [editData, setEditData] = useState({
    fullName: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    userName: '',
    email: '',
  })
  const [confirmLoading, setConfirmLoading] = useState(false)

  const navigate = useNavigate()
  const [dataUpdated, setDataUpdated] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('token')
        if (token) {
          const user = await getUserByToken(token)
          if (user.status === 200) {
            setUserData(user.data)
            setEditData(user.data)
          } else {
            console.error('Error fetching user data', user)
          }
        } else {
          console.error('No token found')
          navigate('/login')
        }
      } catch (error) {
        console.error('Error fetching user data', error)
      }
    }
    fetchUserData()
  }, [dataUpdated])

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const handleEditClick = (field) => {
    setCurrentField(field)
    setIsModalOpen(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditData({
      ...editData,
      [name]: value,
    })
  }

  const handleSaveAll = async () => {
    try {
      setConfirmLoading(true)
      const token = Cookies.get('token')
      if (token) {
        const response = await updateProfile(token, editData)
        if (response.status === 200) {
          notification.success({
            message: 'Profile updated successfully',
          })
          setDataUpdated(!dataUpdated)
          setIsModalOpen(false)
        } else {
          notification.error({
            message: 'Error updating profile',
            description: response.message,
          })
        }
      } else {
        console.error('No token found')
        navigate('/login')
      }
    } catch (error) {
      console.error('Error updating profile', error)
    } finally {
      setConfirmLoading(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div
      style={{
        display: 'flex',
        padding: '20px',
        height: 'auto',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <aside
        style={{
          width: '20%',
          borderRight: '1px solid #ddd',
        }}
      >
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {[
            'Personal details',
            'Preferences',
            'Security',
            'Payment details',
            'Privacy',
            'Email notifications',
            'Other travellers',
          ].map((tab) => (
            <li
              key={tab}
              style={{
                margin: '20px 0',
                fontWeight: 'bold',
                padding: '10px',
                cursor: 'pointer',
                color: activeTab === tab ? '#007bff' : '',
                backgroundColor: activeTab === tab ? '#f0f0f0' : '',
                borderLeft: activeTab === tab ? '4px solid #007bff' : '',
                paddingLeft: activeTab === tab ? '16px' : '',
              }}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </aside>

      <section style={{ flex: 1, paddingLeft: '20px' }}>
        <h2 style={{ fontSize: '24px' }}>{activeTab}</h2>
        <p>Update your information and find out how it's used.</p>
        <div style={{ marginTop: '20px' }}>
          {activeTab === 'Personal details' && userData && (
            <>
              <DetailRow label="Name" value={editData.fullName} onEdit={() => handleEditClick('fullName')} />
              <DetailRow label="Display name" value={editData.userName} onEdit={() => handleEditClick('userName')} />
              <DetailRow label="Email address" value={editData.email} onEdit={() => handleEditClick('email')} />
              <DetailRow label="Phone number" value={editData.phone} onEdit={() => handleEditClick('phone')} />
              <DetailRow
                label="Date of birth"
                value={formatDateTimeExceptHour(editData.dateOfBirth)}
                onEdit={() => handleEditClick('dateOfBirth')}
              />
              <DetailRow label="Address" value={editData.address} onEdit={() => handleEditClick('address')} />
            </>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button type="primary" onClick={handleSaveAll} loading={confirmLoading}>
            Save All
          </Button>
        </div>
      </section>

      <Modal title={`Edit ${currentField}`} open={isModalOpen} onOk={handleCloseModal} onCancel={handleCloseModal}>
        <Form>
          {currentField === 'fullName' && (
            <Form.Item label="Full Name">
              <Input name="fullName" value={editData.fullName} onChange={handleInputChange} />
            </Form.Item>
          )}
          {currentField === 'userName' && (
            <Form.Item label="User Name">
              <Input name="userName" value={editData.userName} onChange={handleInputChange} />
            </Form.Item>
          )}
          {currentField === 'email' && (
            <Form.Item label="Email">
              <Input type="email" name="email" value={editData.email} onChange={handleInputChange} />
            </Form.Item>
          )}
          {currentField === 'phone' && (
            <Form.Item label="Phone">
              <Input name="phone" value={editData.phone} onChange={handleInputChange} />
            </Form.Item>
          )}
          {currentField === 'dateOfBirth' && (
            <Form.Item label="Date of Birth">
              <Input type="date" name="dateOfBirth" value={editData.dateOfBirth} onChange={handleInputChange} />
            </Form.Item>
          )}
          {currentField === 'address' && (
            <Form.Item label="Address">
              <Input name="address" value={editData.address} onChange={handleInputChange} />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  )
}

const DetailRow = ({ label, value, verified, onEdit }) => (
  <div
    className="detail-row"
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: '1px solid #ddd',
    }}
  >
    <div
      className="detail-label"
      style={{
        width: '200px',
      }}
    >
      {label}
    </div>
    <div
      className="detail-value"
      style={{
        flex: 1,
      }}
    >
      {value || 'N/A'}
    </div>
    <div className="detail-edit">
      <Button className="confirm-btn" type="link" onClick={onEdit}>
        Edit
      </Button>
    </div>
  </div>
)

export default ProfilePage
