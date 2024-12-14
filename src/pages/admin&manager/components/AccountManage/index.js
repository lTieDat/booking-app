import React, { useState } from 'react'
import { Modal, Input, Select, Button } from 'antd'

const AccountManage = () => {
  const dummyData = [
    { id: 1, name: 'Le Tien Dat', email: 'unclebeu03@gmail.com', role: 'Customer' },
    { id: 2, name: 'Le Tien Dat', email: 'letiendat3123@gmail.com', role: 'Customer' },
    { id: 3, name: 'Dat Le', email: 'admin@gmail.com', role: 'Property Manager' },
    { id: 4, name: 'Le Van A', email: 'lva@gmail.com', role: 'Property Manager' },
    { id: 5, name: 'Le Thi B', email: 'ltB@gmail.com', role: 'Customer' },
  ]

  const [users, setUsers] = useState(dummyData)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('Name')
  const [isAscending, setIsAscending] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const handleSearch = (e) => setSearch(e.target.value)

  const handleFilter = (e) => setFilter(e.target.value)

  const handleSort = (e) => setSort(e.target.value)

  const handleSortDirection = () => setIsAscending(!isAscending)

  const handleDelete = (id) => setUsers(users.filter((user) => user.id !== id))

  const handleEdit = (user) => {
    setCurrentUser({ ...user })
    setIsModalVisible(true)
  }

  const handleModalOk = () => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === currentUser.id ? currentUser : user)))
    setIsModalVisible(false)
    setCurrentUser(null)
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    setCurrentUser(null)
  }

  const filteredUsers = users
    .filter((user) => (filter === 'All' ? user : user.role === filter))
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'Name') {
        return isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sort === 'Email') {
        return isAscending ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email)
      } else {
        return 0
      }
    })

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    controls: {
      marginBottom: '20px',
      display: 'flex',
      gap: '10px',
    },
    input: {
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    select: {
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '8px 12px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      backgroundColor: '#343a40',
      color: '#fff',
      padding: '12px',
      border: '1px solid #ddd',
      textAlign: 'left',
      fontSize: '14px',
    },
    td: {
      padding: '10px',
      border: '1px solid #ddd',
    },
    actions: {
      display: 'flex',
      gap: '5px',
      justifyContent: 'center',
    },
    actionButton: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
      border: 'none',
      color: '#fff',
    },
    viewButton: {
      backgroundColor: '#28a745',
    },
    editButton: {
      backgroundColor: '#ffc107',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <input type="text" placeholder="Search by name" value={search} onChange={handleSearch} style={styles.input} />
        <select value={filter} onChange={handleFilter} style={styles.select}>
          <option value="All">All</option>
          <option value="Customer">Customer</option>
          <option value="Property Manager">Property Manager</option>
        </select>
        <select value={sort} onChange={handleSort} style={styles.select}>
          <option value="Name">Name</option>
          <option value="Email">Email</option>
        </select>
        <button onClick={handleSortDirection} style={styles.button}>
          {isAscending ? 'Ascending' : 'Descending'}
        </button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={{ ...styles.th, width: '120px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.role}</td>
              <td style={styles.td}>
                <div style={styles.actions}>
                  <button style={{ ...styles.actionButton, ...styles.viewButton }}>View</button>
                  <button onClick={() => handleEdit(user)} style={{ ...styles.actionButton, ...styles.editButton }}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{ ...styles.actionButton, ...styles.deleteButton }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title="Add new user Information"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        {currentUser && (
          <div>
            <Input
              placeholder="Name"
              value={currentUser.name}
              onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              style={{ marginBottom: '10px' }}
            />
            <Input
              placeholder="Email"
              value={currentUser.email}
              onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              style={{ marginBottom: '10px' }}
            />
            <Select
              value={currentUser.role}
              onChange={(value) => setCurrentUser({ ...currentUser, role: value })}
              style={{ width: '100%' }}
            >
              <Select.Option value="Customer">Customer</Select.Option>
              <Select.Option value="Property Manager">Property Manager</Select.Option>
            </Select>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default AccountManage
