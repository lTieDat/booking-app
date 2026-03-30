import React, { useState, useEffect } from 'react'
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom'
import SelectProperties from './components/selectProperties'
import AddNewProperty from './components/AddNewProperties'

const ManageProperties = () => {
  const { hotelId } = useParams()
  const location = useLocation()
  const [isAddingNewProperty, setIsAddingNewProperty] = useState(false)
  const navigate = useNavigate()

  const handleAddNewProperty = () => {
    setIsAddingNewProperty(true)
    navigate('/admin/managePage/manage-properties/add-new-property')
  }

  return (
    <div className="dashboard-select-properties">
      <button onClick={handleAddNewProperty} className="add-property-btn">
        Add New Property
      </button>
      {!hotelId ? (
        <>
          <div className="dashboard-title">Select Properties</div>
          <SelectProperties />
        </>
      ) : isAddingNewProperty ? (
        <AddNewProperty />
      ) : (
        !isAddingNewProperty && <Outlet />
      )}
    </div>
  )
}

export default ManageProperties
