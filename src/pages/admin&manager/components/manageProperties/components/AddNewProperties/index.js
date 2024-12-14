import React, { useState } from 'react'
import { Steps, Upload, Button, message } from 'antd'
import PropertyTypeStep from './components/PropertyTypeStep'
import PropertyDetailsStep from './components/PropertyDetailsStep'
import AddRoomsStep from './components/AddRoomsStep'
import './style.scss'
import axios from 'axios'

const { Step } = Steps

const AddNewProperty = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    propertyType: '',
    propertyDetails: {},
    rooms: [],
  })

  const handleFinish = async () => {
    const FormDataSend = new FormData()
    FormDataSend.append('propertyType', formData.propertyType)
    FormDataSend.append('propertyDetails', JSON.stringify(formData.propertyDetails))
    FormDataSend.append('rooms', JSON.stringify(formData.rooms))

    // Append the property image if it exists
    if (formData.propertyDetails.image && formData.propertyDetails.image) {
      FormDataSend.append('image', formData.propertyDetails.image)
    }

    // Append room images, checking if valid file exists
    // formData.rooms.forEach((room, index) => {
    //   if (room.Images && room.Images.file instanceof File) {
    //     FormDataSend.append('images', room.Images.file)
    //   } else {
    //     console.error(`Room ${index} is missing image file`)
    //   }
    // })

    try {
      const response = await axios.post('http://localhost:3002/api/v1/hotel/create', FormDataSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      message.success('Property added successfully')

      // if (response) {
      //   message.success('Property added successfully')
      // } else {
      //   console.error('Error:', response.statusText)
      // }
    } catch (error) {
      console.error('Request failed', error)
    }
  }

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    setCurrentStep(currentStep - 1)
  }

  const steps = [
    {
      title: 'Type of Property',
      content: (
        <PropertyTypeStep propertyType={formData.propertyType} setFormData={setFormData} handleNext={handleNext} />
      ),
    },
    {
      title: 'Property Details',
      content: (
        <PropertyDetailsStep
          propertyDetails={formData.propertyDetails}
          setFormData={setFormData}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      ),
    },
    {
      title: 'Add Rooms',
      content: (
        <AddRoomsStep
          rooms={formData.rooms}
          setFormData={setFormData}
          handlePrev={handlePrev}
          handleFinish={handleFinish}
        />
      ),
    },
  ]

  return (
    <div className="add-new-property">
      <h1>Add New Property</h1>
      <Steps current={currentStep}>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>
      <div className="step-content">{steps[currentStep].content}</div>
    </div>
  )
}

export default AddNewProperty
