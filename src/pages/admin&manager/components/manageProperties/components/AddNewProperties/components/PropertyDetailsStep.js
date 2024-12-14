import React, { useState, useEffect } from 'react'
import { Form, Input, Button, DatePicker, Upload, Row, Col, message, Switch } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment'

const PropertyDetailStep = ({ handleNext, setFormData, propertyDetails, handlePrev }) => {
  const [imagePreview, setImagePreview] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [formValues, setFormValues] = useState({
    HotelName: propertyDetails?.HotelName || '',
    Description: propertyDetails?.Description || '',
    Tags: propertyDetails?.Tags || '',
    ParkingIncluded: propertyDetails?.ParkingIncluded || false,
    LastRenovationDate: propertyDetails?.LastRenovationDate ? moment(propertyDetails.LastRenovationDate) : null,
    City: propertyDetails?.City || '',
    District: propertyDetails?.District || '',
    Country: propertyDetails?.Country || '',
    FullAddress: propertyDetails?.FullAddress || '',
    image: propertyDetails?.image || null,
  })

  useEffect(() => {
    if (propertyDetails?.image) {
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(propertyDetails.image)
    }
  }, [propertyDetails?.image])

  // Handle image upload
  const handleImageUpload = (info) => {
    if (info.file) {
      const file = info.file
      setSelectedImage(file)

      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handleFormChange = (changedValues) => {
    setFormValues((prev) => ({ ...prev, ...changedValues }))
  }

  const handleSaveDetails = () => {
    const { HotelName, Description, Tags, City, District, Country, FullAddress } = formValues
    formValues.image = selectedImage

    if (!HotelName || !Description || !Tags || !City || !District || !Country || !FullAddress) {
      message.error('Please fill in all fields.')
      return
    }
    setFormData((prev) => ({
      ...prev,
      propertyDetails: { ...formValues },
    }))
    handleNext()
  }

  return (
    <Form layout="vertical" onFinish={handleSaveDetails} onValuesChange={handleFormChange} initialValues={formValues}>
      <h2>Hotel Details</h2>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item label="Hotel Name" name="HotelName" required>
            <Input placeholder="Enter hotel name" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Description" name="Description" required>
            <Input.TextArea placeholder="Enter hotel description" rows={4} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Tags" name="Tags" required>
            <Input placeholder="Enter comma-separated tags" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="ParkingIncluded" valuePropName="checked">
            <label style={{ display: 'block' }}>Parking Included</label>
            <Switch checked={formValues.ParkingIncluded} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Renovation Date" name="LastRenovationDate" required>
            <DatePicker style={{ width: '100%' }} value={formValues.LastRenovationDate} />
          </Form.Item>
        </Col>

        {/* Address Fields */}
        <Col span={12}>
          <Form.Item label="City" name="City" required>
            <Input placeholder="Enter city" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="District" name="District" required>
            <Input placeholder="Enter district" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Country" name="Country" required>
            <Input placeholder="Enter country" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Full Address" name="FullAddress" required>
            <Input.TextArea placeholder="Enter full address" rows={2} />
          </Form.Item>
        </Col>

        {/* Image Upload */}
        <Col span={24}>
          <Form.Item label="Hotel Image" name="image" required>
            <Upload accept="image/*" listType="picture-card" showUploadList={false} customRequest={handleImageUpload}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            {imagePreview && (
              <div style={{ marginTop: 10 }}>
                <img
                  src={imagePreview}
                  alt="hotel image"
                  style={{ width: '50%', height: 'auto', objectFit: 'cover' }}
                />
                <Button type="dashed" onClick={handleDeleteImage} style={{ marginTop: 10, display: 'block' }}>
                  Delete Image
                </Button>
              </div>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Button onClick={handleSaveDetails} type="primary" style={{ marginTop: '10px' }}>
        Next
      </Button>
      <Button onClick={handlePrev} style={{ marginLeft: '10px' }}>
        Previous
      </Button>
    </Form>
  )
}

export default PropertyDetailStep
