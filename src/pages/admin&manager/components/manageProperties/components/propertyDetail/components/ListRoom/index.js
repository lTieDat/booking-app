import React, { useState, useEffect } from 'react'
import { Modal, Button, Input, List, Upload, Form, message, Card } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import './style.scss'

const RoomList = ({ room, setRoom }) => {
  const [rooms, setRooms] = useState(room)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [form] = Form.useForm()

  const openModal = (room = null) => {
    setEditingRoom(room)
    setIsModalOpen(true)

    if (room) {
      form.setFieldsValue({
        RoomType: room.RoomType,
        Description: room.Description,
        BaseRate: room.BaseRate,
        BedOptions: room.BedOptions,
        RoomTags: room.RoomTags.join(', '),
      })
      setImagePreview(room.Images?.url)
    } else {
      form.resetFields()
      setImagePreview(null)
    }
  }

  const closeModal = () => {
    form.resetFields()
    setIsModalOpen(false)
    setEditingRoom(null)
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handleSaveRoom = async (values) => {
    try {
      // Additional validation for RoomTags
      const tags = values.RoomTags
        ? values.RoomTags.split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : []
      if (tags.length > 5) {
        message.error('Maximum 5 tags allowed')
        return
      }
      if (tags.some((tag) => tag.length > 30)) {
        message.error('Each tag must not exceed 30 characters')
        return
      }

      const formData = new FormData()
      formData.append('roomData', JSON.stringify({ ...values, RoomTags: tags }))
      if (selectedImage) formData.append('image', selectedImage)

      if (editingRoom) {
        const updatedRoom = {
          ...editingRoom,
          ...values,
          RoomTags: tags,
        }
        setRooms((prevRooms) => prevRooms.map((room) => (room.RoomId === updatedRoom.RoomId ? updatedRoom : room)))
        message.success('Room updated')
      } else {
        const newRoom = {
          RoomId: Date.now(),
          ...values,
          RoomTags: tags,
        }
        setRooms((prevRooms) => [...prevRooms, newRoom])
        message.success('Room added')
      }

      form.resetFields()
      setSelectedImage(null)
      setImagePreview(null)
      setEditingRoom(null)
      closeModal()
    } catch (error) {
      message.error('Error saving room')
    }
  }

  const handleDeleteRoom = async (roomId) => {
    try {
      setRooms(rooms.filter((room) => room.RoomId !== roomId))
      message.success('Room deleted')
    } catch (error) {
      message.error('Error deleting room')
    }
  }

  const handleImageChange = (info) => {
    if (info.file) {
      const file = info.file
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="room-list">
      <h2>Rooms</h2>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>
        Add Room
      </Button>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={rooms}
        renderItem={(room) => (
          <List.Item>
            <Card
              hoverable
              cover={<img alt={room.Description} src={room.Images?.url} />}
              actions={[
                <Button icon={<EditOutlined />} onClick={() => openModal(room)}>
                  Edit
                </Button>,
                <Button icon={<DeleteOutlined />} onClick={() => handleDeleteRoom(room.RoomId)} danger>
                  Delete
                </Button>,
              ]}
            >
              <Card.Meta title={room.RoomType} description={room.Description} />
              <div className="room-details">
                <p>Base Rate: ${room.BaseRate}</p>
                <p>Bed Options: {room.BedOptions}</p>
                <p>Tags: {room.RoomTags.join(', ')}</p>
              </div>
            </Card>
          </List.Item>
        )}
      />

      <Modal title={editingRoom ? 'Edit Room' : 'Add Room'} open={isModalOpen} onCancel={closeModal} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSaveRoom}>
          <Form.Item
            name="RoomType"
            label="Room Type"
            rules={[
              { required: true, message: 'Please enter room type' },
              { max: 100, message: 'Room Type must not exceed 100 characters' },
              { whitespace: true, message: 'Room Type cannot be empty' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Description"
            label="Description"
            rules={[
              { required: true, message: 'Please enter description' },
              { max: 1000, message: 'Description must not exceed 1000 characters' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="BaseRate"
            label="Base Rate"
            rules={[
              { required: true, message: 'Please enter base rate' },
              {
                validator: (_, value) =>
                  value > 0 ? Promise.resolve() : Promise.reject('Base Rate must be greater than 0'),
              },
            ]}
          >
            <Input type="number" step="0.01" />
          </Form.Item>
          <Form.Item
            name="BedOptions"
            label="Bed Options"
            rules={[
              { required: true, message: 'Please enter bed options' },
              { max: 50, message: 'Bed Options must not exceed 50 characters' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="RoomTags"
            label="Room Tags"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve()
                  const tags = value
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter((tag) => tag)
                  if (tags.length > 5) {
                    return Promise.reject('Maximum 5 tags allowed')
                  }
                  if (tags.some((tag) => tag.length > 30)) {
                    return Promise.reject('Each tag must not exceed 30 characters')
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <Input placeholder="Separate tags with commas" />
          </Form.Item>

          <Upload beforeUpload={() => false} onChange={handleImageChange} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
          {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', marginTop: 10 }} />}

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
              {editingRoom ? 'Update Room' : 'Add Room'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default RoomList
