import React, { useState } from 'react'
import { Button, Row, Col, Input, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const PropertyTypeStep = ({ propertyType, setFormData, handleNext }) => {
  const [newProperty, setNewProperty] = useState('')
  const [customProperties, setCustomProperties] = useState([])
  const [isEditingOther, setIsEditingOther] = useState(false)

  const propertyTypes = ['Hotel', 'Apartment', 'Flat', 'Room', 'Villa']

  const handleButtonClick = (value) => {
    setFormData((prev) => ({ ...prev, propertyType: value }))
  }

  const handleOtherClick = () => {
    setIsEditingOther(true)
  }

  const handleSaveNewProperty = () => {
    if (newProperty && !customProperties.includes(newProperty)) {
      setCustomProperties([...customProperties, newProperty])
      setFormData((prev) => ({ ...prev, propertyType: newProperty }))
      setNewProperty('')
      setIsEditingOther(false)
    } else {
      alert('Please enter a valid property type!')
    }
  }

  const handleInputChange = (e) => {
    setNewProperty(e.target.value)
  }

  const handleCancel = () => {
    setIsEditingOther(false)
    setNewProperty('')
  }

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      justifyContent: 'center',
    },
    button: {
      padding: '1rem 2rem',
      borderRadius: '0.5rem',
      width: '100%',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    selectedButton: {
      backgroundColor: '#1890ff',
      color: 'white',
      borderColor: '#1890ff',
    },
    unselectedButton: {
      backgroundColor: '#f0f0f0',
      color: '#595959',
      borderColor: '#d9d9d9',
    },
    otherButton: {
      backgroundColor: '#f0f0f0',
      color: '#595959',
      borderColor: '#d9d9d9',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1rem 2rem',
      fontWeight: 'bold',
    },
    inputContainer: {
      display: 'flex',
      gap: '1rem',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      width: '60%',
      padding: '0.8rem',
      borderRadius: '0.5rem',
      border: '1px solid #d9d9d9',
    },
    saveCancelContainer: {
      display: 'flex',
      gap: '1rem',
      width: '60%',
      justifyContent: 'space-between',
    },
    saveButton: {
      padding: '0.8rem',
      borderRadius: '0.5rem',
      backgroundColor: '#1890ff',
      color: 'white',
      width: '48%',
    },
    cancelButton: {
      padding: '0.8rem',
      borderRadius: '0.5rem',
      backgroundColor: '#d9d9d9',
      color: 'black',
      width: '48%',
    },
  }

  return (
    <div style={styles.container}>
      <h2>What kind of place will you host?</h2>
      <Row gutter={[16, 16]} justify="center" align="middle">
        {propertyTypes.map((type) => (
          <Col span={8} key={type} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{
                ...styles.button,
                ...(propertyType === type ? styles.selectedButton : styles.unselectedButton),
              }}
              onClick={() => handleButtonClick(type)}
            >
              {type}
            </Button>
          </Col>
        ))}
        {customProperties.map((customType, index) => (
          <Col span={8} key={index} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{
                ...styles.button,
                ...(propertyType === customType ? styles.selectedButton : styles.unselectedButton),
              }}
              onClick={() => handleButtonClick(customType)}
            >
              {customType}
            </Button>
          </Col>
        ))}
        {!isEditingOther && (
          <Col span={8}>
            <Button style={styles.otherButton} onClick={handleOtherClick}>
              <FontAwesomeIcon icon={faPlus} /> Other
            </Button>
          </Col>
        )}
      </Row>

      {isEditingOther && (
        <div style={styles.inputContainer}>
          <Input
            style={styles.input}
            placeholder="Enter custom property type"
            value={newProperty}
            onChange={handleInputChange}
          />
          <div style={styles.saveCancelContainer}>
            <Button style={styles.saveButton} onClick={handleSaveNewProperty}>
              Save
            </Button>
            <Button style={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <Button
        type="primary"
        onClick={handleNext}
        disabled={!propertyType}
        style={{ ...styles.button, marginTop: '2rem' }}
      >
        Next
      </Button>
    </div>
  )
}

export default PropertyTypeStep
