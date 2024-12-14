import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChartLine, faDoorOpen, faComment, faHotel, faGear, faUser } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const location = useLocation()
  const admin = JSON.parse(localStorage.getItem('admin')) || {}
  const manager = JSON.parse(localStorage.getItem('manager')) || {}
  const role = admin.role || manager.role

  const getActiveClass = (path) => (location.pathname.includes(path) ? 'active' : '')

  return (
    <div className={`sidebar`}>
      <div className="sidebar-header">
        <div className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        {!collapsed && <h2>Manage Hotel</h2>}
      </div>
      <nav>
        {role === 'Super_admin' ? (
          <ul>
            <li className={getActiveClass('manage-admins')}>
              <Link to="/admin/managePage/manage-account">
                <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                {!collapsed && <span>Manage accounts</span>}
              </Link>
            </li>
            <li className={getActiveClass('manage-settings')}>
              <Link to="/admin/managePage/manage-settings">
                <FontAwesomeIcon icon={faGear} className="sidebar-icon" />
                {!collapsed && <span>Manage Settings</span>}
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li className={getActiveClass('dashboard')}>
              <Link to="/admin/managePage/dashboard">
                <FontAwesomeIcon icon={faChartLine} className="sidebar-icon" />
                {!collapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li className={getActiveClass('manage-booking')}>
              <Link to="/admin/managePage/manage-booking">
                <FontAwesomeIcon icon={faDoorOpen} className="sidebar-icon" />
                {!collapsed && <span>Manage Bookings</span>}
              </Link>
            </li>
            <li className={getActiveClass('manage-properties')}>
              <Link to="/admin/managePage/manage-properties">
                <FontAwesomeIcon icon={faHotel} className="sidebar-icon" />
                {!collapsed && <span>Manage Properties</span>}
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  )
}

export default Sidebar
