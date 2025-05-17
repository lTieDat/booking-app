import React from 'react'
import { Form, Input, Button, InputNumber, message } from 'antd'
import { v4 as uuidv4 } from 'uuid'

const AddRoomsStep = ({ rooms, setFormData, handlePrev, handleFinish }) => {
  const validateUUID = (value) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    return uuidRegex.test(value)
  }

  const addRoom = () => {
    const newRoomId = uuidv4()
    setFormData((prev) => ({
      ...prev,
      rooms: [
        ...prev.rooms,
        {
          RoomId: newRoomId,
          RoomType: '',
          Description: '',
          BaseRate: 0,
          BedOptions: '',
          MaxOccupancy: 1,
          RoomTags: [],
          NumberAvailable: 1,
          MaxQuantity: 1,
          Images: {
            file: '',
            description: '',
          },
        },
      ],
    }))
  }

  const updateRoom = (index, key, value) => {
    const updatedRooms = [...rooms]

    // Validation logic
    if (key === 'RoomType') {
      if (value.length > 100) {
        message.error('Room Type must not exceed 100 characters')
        return
      }
      if (!value.trim()) {
        message.error('Room Type is required')
        return
      }
    }

    if (key === 'Description' && value.length > 1000) {
      message.error('Description must not exceed 1000 characters')
      return
    }

    if (key === 'BaseRate') {
      if (value <= 0) {
        message.error('Base Rate must be greater than 0')
        return
      }
    }

    if (key === 'BedOptions' && value.length > 50) {
      message.error('Bed Options must not exceed 50 characters')
      return
    }

    if (key === 'RoomTags') {
      const tags = value
      if (tags.length > 5) {
        message.error('Maximum 5 tags allowed')
        return
      }
      if (tags.some((tag) => tag.length > 30)) {
        message.error('Each tag must not exceed 30 characters')
        return
      }
    }

    if (key === 'NumberAvailable') {
      if (value < 0) {
        message.error('Number Available must be 0 or greater')
        return
      }
      if (value > updatedRooms[index].MaxQuantity) {
        message.error('Number Available cannot exceed Max Quantity')
        return
      }
    }

    if (key === 'MaxQuantity' && value < 1) {
      message.error('Max Quantity must be 1 or greater')
      return
    }

    updatedRooms[index][key] = value
    setFormData((prev) => ({ ...prev, rooms: updatedRooms }))
  }

  const handleImageUpload = (index, file) => {
    const reader = new FileReader()
    reader.onload = () => {
      const updatedRooms = [...rooms]
      updatedRooms[index].Images = {
        ...updatedRooms[index].Images,
        file: file,
      }
      setFormData((prev) => ({ ...prev, rooms: updatedRooms }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <Form layout="vertical">
      {rooms.map((room, index) => (
        <div key={room.RoomId || index} className="room-form">
          <h3>Room {index + 1}</h3>
          <Form.Item label="Room Type" required>
            <Input
              placeholder="Enter room type"
              value={room.RoomType}
              onChange={(e) => updateRoom(index, 'RoomType', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              placeholder="Enter room description"
              value={room.Description}
              onChange={(e) => updateRoom(index, 'Description', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Base Rate" required>
            <InputNumber
              min={0}
              placeholder="Enter base rate"
              value={room.BaseRate}
              onChange={(value) => updateRoom(index, 'BaseRate', value)}
              parser={(value) => value.replace(',', '.')}
            />
          </Form.Item>
          <Form.Item label="Bed Options">
            <Input
              placeholder="Enter bed options"
              value={room.BedOptions}
              onChange={(e) => updateRoom(index, 'BedOptions', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Max Occupancy" required>
            <InputNumber
              min={1}
              placeholder="Enter max occupancy"
              value={room.MaxOccupancy}
              onChange={(value) => updateRoom(index, 'MaxOccupancy', value)}
            />
          </Form.Item>
          <Form.Item label="Number Available" required>
            <InputNumber
              min={0}
              placeholder="Enter number available"
              value={room.NumberAvailable}
              onChange={(value) => updateRoom(index, 'NumberAvailable', value)}
            />
          </Form.Item>
          <Form.Item label="Max Quantity" required>
            <InputNumber
              min={1}
              placeholder="Enter max quantity"
              value={room.MaxQuantity}
              onChange={(value) => updateRoom(index, 'MaxQuantity', value)}
            />
          </Form.Item>
          <Form.Item label="Tags">
            <Input
              placeholder="Enter comma-separated tags"
              value={room.RoomTags.join(', ') || ''}
              onChange={(e) =>
                updateRoom(
                  index,
                  'RoomTags',
                  e.target.value
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter((tag) => tag)
                )
              }
            />
          </Form.Item>
          <Form.Item label="Upload Image">
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(index, e.target.files[0])} />
            {room.Images.preview && (
              <img
                src={room.Images.preview}
                alt={`Preview of room ${index + 1}`}
                style={{ marginTop: '10px', maxWidth: '100%', height: 'auto' }}
              />
            )}
          </Form.Item>
          <Form.Item label="Image Description">
            <Input
              placeholder="Enter image description"
              value={room.Images?.description || ''}
              onChange={(e) =>
                updateRoom(index, 'Images', {
                  ...room.Images,
                  description: e.target.value,
                })
              }
            />
          </Form.Item>
        </div>
      ))}
      <Button onClick={addRoom} style={{ marginBottom: 16 }}>
        Add Room
      </Button>
      <div>
        <Button onClick={handlePrev} style={{ marginRight: 8 }}>
          Previous
        </Button>
        <Button type="primary" onClick={handleFinish} disabled={rooms.length === 0}>
          Submit
        </Button>
      </div>
    </Form>
  )
}

export default AddRoomsStep
