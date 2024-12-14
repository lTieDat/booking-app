import React, { useState } from 'react'
import { Upload, Button, Image } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Handle image upload
  const handleImageUpload = (info) => {
    const file = info.file.originFileObj
    if (file) {
      setSelectedImage(file)

      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <Upload accept="image/*" showUploadList={false} beforeUpload={() => false} onChange={handleImageUpload}>
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>

      {imagePreview && (
        <div style={{ marginTop: 16 }}>
          <h3>Image Preview:</h3>
          <Image src={imagePreview} alt="Uploaded preview" style={{ maxWidth: '100%', maxHeight: 300 }} />
        </div>
      )}
    </div>
  )
}

export default ImageUploader
